
//RENO WARNER @ UTAH TECH UNIVERSITY 2022
//DMG MORI 5100 POST FOR FUSION 360
//
//IF YOU ARE MODIFYING THIS SCROLL DOWN TO SECTION (ON OPEN)
//DON'T CHANGE IF YOU DON'T UNDERSTAND THE CODE
//
////IMPORTS TYPES AND CONSTANTS IGNORE
/// <reference path = "./types.ts" />
/// <reference path = "./constant.ts" />

//PATHS
//	YELLOW: RAPID
//	GREEN: LEAD-IN/OUT
//	RED: RAMPING
//	BLUE: CUTTING

//INFO(DESCRIPTIONS NAME LEGAL)
let description = "MORI-5100";
let longDescription = "3/5 AXIS POST FOR DMG MORI-5100";
let vendor = "FANUC";
let vendorUrl = "https://www.fanuc.com/";
let legal = "COPYRIGHT (C) 2022 BY RENO WARNER";
let certificationLevel = 2;
let minimumRevision = 24000;
//FILE INFO(EXTENSIONS FILENAME)
let extension = "nc";
let programNameIsInteger = true;
setCodePage("ascii");
//CAPABILITY
let capabilities = CAPABILITY_MILLING;
let tolerance = spatial(0.002,UNIT.MILLIMETER);
//CIRCULAR CAPABILITIES
let minimumChordLength = spatial(0.01,UNIT.MILLIMETER);
let minimumCircularRadius = spatial(0.01,UNIT.MILLIMETER);
let maximumCircularRadius = spatial(1000,UNIT.MILLIMETER);
let minimumCircularSweep = toRad(0.01);
let maximumCircularSweep = toRad(360);
let allowHelicalMoves = true;
let allowedCircularPlanes = undefined;//UNDEFINED = ALL
//PROPERTIES
let properties = {
	PrettyPrint: false,
	PreloadingTools: false,
	ChipConveyor: false,
	Smoothing: false,

	allow3DArcs: false,// specifies that 3D circular arcs are allowed
	forceIJK: false,// force output of IJK for G2/G3 when not using R word
	usePitchForTapping: true,// enable to use pitch instead of feed for the F-word for canned tapping cycles - note that your CNC control must be setup for pitch mode!
	useG54x4: false, // Fanuc 30i supports G54.4 for Workpiece Error Compensation
};
//CONSTANTS SETTINGS
const MAX_TOOLS = 400;
const MAX_SPINDLE_SPEED = 24000;

var firstFeedParameter = 500;
var useMultiAxisFeatures = true;
var forceMultiAxisIndexing = false; // force multi-axis indexing for 3D programs

enum ANGLE_PROBE {
	NOT_SUPPORTED,
	USE_ROTATION,
	USE_CAXIS,
}
//STATE
var currentWorkOffset: number;
var optionalSection = false;
var forceSpindleSpeed = false;
var currentFeedId: number | undefined;
var g68RotationMode = 0;
var angularProbingMode: ANGLE_PROBE;
var wfo: string | undefined;
//FORMATS
var formats = Object.freeze({
	//COMMANDS
	g: createFormat({prefix:"G",decimals:1}),
	//AUXILIARY COMMANDS
	m: createFormat({prefix:"M",decimals:1}),
	//MILLISECONDS
	p: createFormat({prefix:"P",decimals:0}),
	//TOOL LENGTH OFFSET
	h: createFormat({prefix:"H",decimals:1}),
	//DIAMETER
	d: createFormat({prefix:"D",decimals:1}),
	//NAME
	o: createFormat({prefix:"O",width:4,zeropad:true,decimals:0}),
	//RADIUS
	r: createFormat({prefix:"R",decimals:(unit == UNIT.MILLIMETER ? 3 : 4),trimLeadZero:true,forceDecimal:true}),// THIS COULD BE AN ISSUE;
	//UNIT VECTORS
	xyz: createFormat({decimals:(unit == UNIT.MILLIMETER ? 3 : 4),trimLeadZero:true,forceDecimal:true}),
	ijk: createFormat({decimals:6,forceDecimal:true,trimLeadZero:true}),
	abc: createFormat({decimals:3,forceDecimal:true,scale:DEG}),
	//FEED
	f: createFormat({decimals:(unit == UNIT.MILLIMETER ? 0 : 1),forceDecimal:true}),
	//
	pitch:createFormat({decimals:(unit == UNIT.MILLIMETER ? 3 : 4),forceDecimal:true}),
	//SPINDLE
	s: createFormat({decimals:0}),
	//TOOL
	t: createFormat({prefix:"T",decimals:0}),
	//PROBE
	probe: createFormat({decimals:3,zeropad:true,width:3,forceDecimal:true}),
});
//OUTPUTS
var outputs = Object.freeze({
	//XYZ
	x: createVariable({prefix:"X"},formats.xyz),
	y: createVariable({prefix:"Y"},formats.xyz),
	z: createVariable({prefix:"Z"},formats.xyz),
	//IJK
	i: createReferenceVariable({prefix:"I",force: properties.forceIJK},formats.ijk),
	j: createReferenceVariable({prefix:"J",force: properties.forceIJK},formats.ijk),
	k: createReferenceVariable({prefix:"K",force: properties.forceIJK},formats.ijk),
	//ABC
	a: createVariable({prefix:"A"},formats.abc),
	b: createVariable({prefix:"B"},formats.abc),
	c: createVariable({prefix:"C"},formats.abc),
	//FEED
	f: createVariable({prefix:"F"},formats.f),
	//PITCH
	pitch: createVariable({prefix:"F",force:true},formats.pitch),
	//SPINDLE
	s: createVariable({prefix:"S",force:true},formats.s),
	//DIAMETER
	d: createVariable({},formats.d),
});
//MODALS
var modals = Object.freeze({
	motion: createModal({},formats.g),// G0-G3
	plane: createModal({onchange:function () {modals.motion.reset();}},formats.g),// G17-19
	abs: createModal({},formats.g),// G90-91
	f: createModal({},formats.g),// G94-95
	unit: createModal({},formats.g),// G20-21
	cycle: createModal({},formats.g),// G81
	retraction: createModal({},formats.g),// G98-99
	rotation: createModal({force:true},formats.g),// G68-G69
});
//WRITER
var writer = {
	block(...words:(string|undefined)[]): void {
		return writeWords([[optionalSection?"/":""].concat(words.filter(word=>word!==undefined) as string[]).join(properties.PrettyPrint?" ":"")]);
	},
	comment(...words:(string | undefined)[]): void {
		return writeWords(["("+(words.filter(word=>word!==undefined||word==="")).map(word=>localize(filterText((word as string).toUpperCase()," ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,=_-/*#:")||"").replace(/[\(\)]/g,"")).join(" ")+")"]);
	},
	warning(...words:(string | undefined)[]): void {
		return warning(words.filter(word=>word!==undefined||word==="").map(word=>localize(word||"")).join(" "));
	},
	warningOnce(...words:(string | undefined)[]): void {
		return warningOnce(words.filter(word=>word!==undefined||word==="").map(word=>localize(word||"")).join(" "),words.reduce((accumulation,word)=>accumulation+((word!==undefined)?word?.length:0),0));
	},
	error(...words:(string | undefined)[]): void {
		return error(words.filter(word=>word!==undefined||word==="").map(word=>localize(word||"")).join(" "));
	}
};
//FORCE
var force = {
	//FORCE OUPUT XYZ
	xyz() {
		outputs.x.reset();
		outputs.y.reset();
		outputs.z.reset();
	},
	//FORCE OUPUT ABC
	abc() {
		outputs.a.reset();
		outputs.b.reset();
		outputs.c.reset();
	},
	//FORCE FEED
	feed() {
		currentFeedId = undefined;
		outputs.f.reset();
	},
	//FORCE OUPUT XYZ/ABC/FEED
	all() {
		force.xyz();
		force.abc();
		force.feed();
	}
};
//COOLANT
var coolant = {
	current: COOLANT.OFF,
	set(mode: COOLANT): string | undefined {
		if(isProbeOperation()) {
			mode = COOLANT.OFF;
		}
		if(mode === coolant.current) return "";

		let current = coolant.current;

		coolant.current = mode;

		switch(mode) {
			case COOLANT.OFF:
				switch(current) {
					case COOLANT.THROUGH_TOOL:
						return formats.m.format(89);
					default:
						return formats.m.format(9);
				}
			case COOLANT.AIR:
				//return formats.m.format(51);
			case COOLANT.AIR_THROUGH_TOOL:
				//return formats.m.format(165);
			case COOLANT.FLOOD:
				return formats.m.format(8);
			case COOLANT.FLOOD_MIST:
				//return formats.m.format();
			case COOLANT.FLOOD_THROUGH_TOOL:
				return formats.m.format(88);
			case COOLANT.MIST:
				//return formats.m.format(55);
			case COOLANT.SUCTION:
				//return formats.m.format(180);
			case COOLANT.THROUGH_TOOL:
				//return formats.m.format();
			default:
				onUnsupportedCoolant(mode);//ERROR
				return formats.m.format(9);
		}
	}
}
//SMOOTHING
var smoothing = {
	current: false,
	set(mode: boolean): boolean {
		if(mode === smoothing.current) return false;
		// 1) Make sure G49 is called before the execution of G5.1 Q1 Rx
		// 2) G5.1 Q1 Rx must be engaged BEFORE G43-Tool Length Comp
		// 3) AICC and AIAPC need to be turned on and off for each tool
		// 4) AICC and AIAPC does not apply to canned drilling cycles
 		// validate(!lengthCompensationActive,"Length compensation is active while trying to update smoothing.");
		smoothing.current = mode;
		writer.block(formats.g.format(5.1),mode ? "Q1" : "Q0");
		writer.block(formats.g.format(332),"R3.");

		return true;
	}
}
//WORK PLANE
var workPlane = {
	current: null as null | Vector,
	abc: {
		current: null as Vector | null,
		closest: false,
	},
	force() {
		workPlane.current = null;
	},
	reset() {
		workPlane.set(new Vector());
	},
	set(abc: Vector) {
		if(!forceMultiAxisIndexing && is3D() && !machineConfiguration.isMultiAxisConfiguration()) return;
	
		if(!((workPlane.current === null) || formats.abc.areDifferent(abc.x,workPlane.current.x) || formats.abc.areDifferent(abc.y,workPlane.current.y) || formats.abc.areDifferent(abc.z,workPlane.current.z))) return;
	
		onCommand(COMMAND.UNLOCK_MULTI_AXIS);
	
		if(useMultiAxisFeatures) {
			if (abc.isNonZero()) {
				writer.block(formats.g.format(68.2),"X" + formats.xyz.format(0),"Y" + formats.xyz.format(0),"Z" + formats.xyz.format(0),"I" + formats.abc.format(abc.x),"J" + formats.abc.format(abc.y),"K" + formats.abc.format(abc.z)); // set frame
				writer.block(formats.g.format(53.1)); // turn machine
			} else {
				writer.block(formats.g.format(69)); // cancel frame
			}
		} else {
			modals.motion.reset();
			writer.block(modals.motion.format(0),conditional(machineConfiguration.isMachineCoordinate(0),"A" + formats.abc.format(abc.x)),conditional(machineConfiguration.isMachineCoordinate(1),"B" + formats.abc.format(abc.y)),conditional(machineConfiguration.isMachineCoordinate(2),"C" + formats.abc.format(abc.z)));
		}
		
		onCommand(COMMAND.LOCK_MULTI_AXIS);
	
		workPlane.current = abc;
	},
	get(matrix: Matrix): Vector {
		let abc = machineConfiguration.getABC(matrix);
		
		abc = (workPlane.abc.closest && workPlane.abc.current)? machineConfiguration.remapToABC(abc,workPlane.abc.current) : machineConfiguration.getPreferredABC(abc);

		try {
			workPlane.abc.current = machineConfiguration.remapABC(abc);
		} catch (e) {
			writer.error("WORK PLANE:","A" + formats.abc.format(abc.x)," B" + formats.abc.format(abc.y),"C" + formats.abc.format(abc.z));
			return new Vector(0,0,0);
		}
		
		let direction = machineConfiguration.getDirection(abc);

		if (!isSameDirection(direction,matrix.forward)) {
			writer.error("WORK PLANE: NOT SUPPORTED");
			return new Vector(0,0,0);
		};
		
		if (!machineConfiguration.isABCSupported(abc)) {
			writer.error("WORK PLANE: NOT SUPPORTED"," A" + formats.abc.format(abc.x)," B" + formats.abc.format(abc.y)," C" + formats.abc.format(abc.z));
			return new Vector(0,0,0);
		};
	
		var tcp = false;

		if (tcp) {
			setRotation(matrix);// TCP mode
		} else {
			var R = machineConfiguration.getRemainingOrientation(abc,matrix);
			setRotation(R);
		}
		
		return abc;
	},
}
//WORK OFFSET
var workOffset = {
	current: number,
	set(offset: number): boolean {
		let number = parseInt(offset)===0?54:parseInt(offset);

		let offset = (currentSection.workOffset === 0) ? 54 : currentSection.workOffset;
		if(offset !== currentSection.workOffset) {
			writer.warningOnce("WORK OFFSET: NULL. USING 54");
			return;
		};
		if(offset % 1 !== 0) {
			writer.error("WORK OFFSET: NOT AN INTEGER. USE 1-48 OR 54-59");
			return;
		}; 
		if(offset >= 1 && offset <= 48) {
			wfo = (formats.g.format(54.1) + " P" + offset);
			currentWorkOffset = offset;
		} else if(offset >= 54 && offset <= 59) {
			wfo = (formats.g.format(offset));
			currentWorkOffset = offset;
		} else {
			writer.error("WORK OFFSET: INVALID. USE 1-48 OR 54-59");
			return;
		}
	},
	format(offset: number): string {
		if(offset >= 1 && offset <= 48) {
			return formats.g.format(54.1) + "P" + offset;
		}
		return formats.g.format(offset);
	},
}
//ON OPEN(POST PROCESSOR INITILIZATION)
function onOpen() {
	//SETUP?
	if(false) {
		var aAxis = createAxis({coordinate:0,table:false,axis:[1,0,0],range:[-360,360],preference:1});
		var cAxis = createAxis({coordinate:2,table:false,axis:[0,0,1],range:[-360,360],preference:1});
		machineConfiguration = new MachineConfiguration(aAxis,cAxis);

		setMachineConfiguration(machineConfiguration);
		optimizeMachineAngles2(0); // TCP mode
	}
	if(!machineConfiguration.isMachineCoordinate(0)) {
		outputs.a.disable();
	}
	if(!machineConfiguration.isMachineCoordinate(1)) {
		outputs.b.disable();
	}
	if(!machineConfiguration.isMachineCoordinate(2)) {
		outputs.c.disable();
	}
	//PROGRAM START
	writer.block("%");//% FILE START
	//PROGRAM NUMBER
	if(programName === undefined) {
		return writer.error("PROGRAM NAME: UNDEFINED");
	} else {
		let programNumber = parseInt(programName);
		//VERIFY PROGRAM NUMBER
		if(programNumber !== programNumber || programNumber === Infinity || programNumber === -Infinity) {
			writer.error("PROGRAM NUMBER: NOT A NUMBER");
			return;
		}
		if(programNumber < 1 || programNumber > 9999) {
			writer.error("PROGRAM NUMBER IS OUT OF RANGE");
			return;
		};
		//WRITE PROGRAM NUMBER/COMMENT/NAME
		writer.block(formats.o.format(programNumber));
		writer.comment(programName,(programComment === "")?undefined:programComment);
	}
	//INFO(TOOLS BOUNDS TIME SPINDLE FEED)
	let tools: ({number: number,zRange: RANGE,description: string | undefined,comment: string | undefined})[] = [];
	let bounds = new BoundingBox(); 
	let time = 0;
	let max = {spindle: 0,feed: 0};
	let offsets: {
		[key: string]: Boolean,
	} = {};
	//LOOP OVER SECTIONS
	for(let index = 0;index < getNumberOfSections();index++) {
		let section = getSection(index);
		let sectionTool = section.getTool();
		let zRange = section.getGlobalZRange();
		let boundingBox = section.getBoundingBox();
		//ADD TO GLOBAL SECTION
		bounds.expandToBox(boundingBox);
		max.spindle = Math.max(section.getMaximumSpindleSpeed(),max.spindle);
		max.feed = Math.max(section.getMaximumFeedrate(),max.feed);
		time += section.getCycleTime();
		//CHECK IF TOOL IS USED OR PUSH ANOTHER TOOL
		if(tools[sectionTool.number] === undefined) {
			tools[sectionTool.number] = {number: sectionTool.number,zRange: zRange,description: sectionTool.desciption,comment: sectionTool.comment}
		} else {
			tools[sectionTool.number].zRange.expandToRange(zRange);
		}
		offsets[section.workOffset] = true;
	}
	//COMMENT(WORK OFFSETS)
	writer.comment("WORK OFFSETS: " + Object.keys(offsets).map(offset=> {
		
	}).join(","));
	//COMMENT(TOOLS)
	writer.comment("TOOLS");
	tools.filter(current => current !== undefined).forEach(current => {
		writer.comment("T"+current.number,"ZMIN: " + current.zRange.getMinimum().toFixed(3));
	});
	//COMMENT(BOUNDING BOX MAX TIME)
	writer.comment("BOUNDING BOX:",(unit === UNIT.MILLIMETER ? "MM" : "INCH"))
	writer.comment("X:" + bounds.lower.x.toFixed(3),"Y:" + bounds.lower.y.toFixed(3),"Z:" + bounds.lower.z.toFixed(3));
	writer.comment("X:" + bounds.upper.x.toFixed(3),"Y:" + bounds.upper.y.toFixed(3),"Z:" + bounds.upper.z.toFixed(3));
	writer.comment("MAX");
	writer.comment("SPINDLE:",max.spindle.toFixed(0),"RPM");
	writer.comment("FEED:",max.feed.toFixed(1),(unit === UNIT.MILLIMETER ? "MM" : "INCH")+"/MIN");
	writer.comment("TIME");
	writer.comment(Math.floor(time/3600).toString()+":"+Math.floor(time / 60).toString()+":"+(time % 60).toFixed(0));
	//COMMENT(MACHINE CONFIGURATION)
		//writer.comment("MACHINE");
		//writer.comment(machineConfiguration.getVendor(),machineConfiguration.getModel(),machineConfiguration.getDescription());
	//ABSOLUTE AND CANCEL OFFSET COMMANDS
	writer.block(modals.plane.format(17),formats.g.format(40),formats.g.format(80),modals.abs.format(90));
	//UNITS
	switch (unit) {
		case UNIT.INCH:
			writer.block(modals.unit.format(20));//G21 INPUT INCH
			break;
		case UNIT.MILLIMETER:
			writer.block(modals.unit.format(21));//G21 INPUT METRIC
			break;
	}
	//STOP
	onCommand(COMMAND.STOP);
}
//ON COMMENT(MANUAL NC INSERTION)
function onComment(message: Value) {
	writer.comment(...String(message).split(";"));
}

var lengthCompensationActive = false;
var retracted = false; // specifies that the tool has been retracted to the safe plane
/** Disables length compensation if currently active or if forced. */
function disableLengthCompensation(force: boolean) {
	if (lengthCompensationActive || force) {
		//validate(retracted,"Cannot cancel length compensation if the machine is not fully retracted.");
	 	// writer.block(formats.g.format(49));
		lengthCompensationActive = false;
	}
}

var probeOutputWorkOffset = 1;

function onParameter(name: string,value: Value) {
	if (name == "probe-output-work-offset") {
		probeOutputWorkOffset = (Number(value) > 0) ? Number(value) : 1;
	}
}

function onSection() {
	writer.comment("a0");//REMOVE
	var forceToolAndRetract = optionalSection && !currentSection.isOptional();
	
	optionalSection = currentSection.isOptional();

	var insertToolCall = forceToolAndRetract || isFirstSection() || currentSection.getForceToolChange && currentSection.getForceToolChange() || (tool.number != getPreviousSection().getTool().number);
	
	var newWorkOffset = isFirstSection() || (getPreviousSection().workOffset != currentSection.workOffset); // work offset changes
	var newWorkPlane = isFirstSection() || !isSameDirection(getPreviousSection().getGlobalFinalToolAxis(),currentSection.getGlobalInitialToolAxis());
	var forceSmoothing =  properties.Smoothing && (hasParameter("operation-strategy") && (getParameter("operation-strategy") == "drill") || !isFirstSection() && getPreviousSection().hasParameter("operation-strategy") && (getPreviousSection().getParameter("operation-strategy") == "drill")); // force smoothing in case !insertToolCall (2d chamfer)
	writer.comment(insertToolCall.toString(),newWorkOffset.toString(),newWorkPlane.toString(),forceSmoothing.toString());
	if (insertToolCall || newWorkOffset || newWorkPlane || forceSmoothing) {	
		/*
		// stop spindle before retract during tool change
		if (insertToolCall && !isFirstSection()) {
			onCommand(COMMAND_STOP_SPINDLE);
		}
		*/
		writer.comment("B1");//REMOVE
		retracted = true;

		onCommand(COMMAND.COOLANT_OFF);

		writer.block(modals.f.format(0),formats.g.format(49));//G49
		writer.block(formats.g.format(53),"Z" + formats.xyz.format(0),formats.m.format(19));//RETRACT
		writer.block(modals.abs.format(90));//G90 ABSOLUTE
		
		force.xyz();

		smoothing.set(false);
	}
	
	if (insertToolCall) {
		if (tool.number < 0 || tool.number > MAX_TOOLS) {
			writer.error("TOOL NUMBER: OUT OF RANGE");
			return;
		}

		workPlane.force();
		
		retracted = true;
		onCommand(COMMAND.COOLANT_OFF);
	
		disableLengthCompensation(false);

 		writer.block(formats.t.format(tool.number));//T[TOOL NUMBER]: CHANGE TOOL NUMBER
		onCommand(COMMAND.OPTIONAL_STOP);
		onCommand(COMMAND.LOAD_TOOL);
	}

	if (!isProbeOperation() && (insertToolCall || forceSpindleSpeed || isFirstSection() || (formats.s.areDifferent(tool.spindleRPM,outputs.s.getCurrent() as number)) || (tool.isClockwise() != getPreviousSection().getTool().isClockwise()))) {
		forceSpindleSpeed = false;
		
		if(tool.spindleRPM < 1 || tool.spindleRPM > MAX_SPINDLE_SPEED) {

		}
		//writer.block(
		 // outputs.s.format(tool.spindleRPM),formats.m.format(tool.isClockwise() ? 3 : 4)
		//);
		if(properties.ChipConveyor) {
			onCommand(COMMAND.START_CHIP_TRANSPORT);
		}
		// if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) {
		// 	// writer.block(formats.m.format(xxx)); // shortest path traverse
		// }
	}
	//NEXT TOOL
	let nextTool = ((getNextTool(tool.number)!==undefined)?getNextTool(tool.number):getSection(0).getTool()) as Tool;
	//WORK OFFSET


	force.xyz();

	if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) { // use 5-axis indexing for multi-axis mode
		if (currentSection.isMultiAxis()) {
			workPlane.force();
			cancelTransformation();
		} else {
			var abc = new Vector(0,0,0);
			if (useMultiAxisFeatures) {
				var eulerXYZ = currentSection.workPlane.getTransposed().eulerZYX_R;
				abc = new Vector(-eulerXYZ.x,-eulerXYZ.y,-eulerXYZ.z);
				cancelTransformation();
			} else {
				abc = workPlane.get(currentSection.workPlane);
			}
			workPlane.set(abc);
		}
	} else { 
		var remaining = currentSection.workPlane;
		if (!isSameDirection(remaining.forward,new Vector(0,0,1))) {
			writer.error("TOOL ORIENTATION: NOT SUPPORTED");
			return;
		}
		setRotation(remaining);
	}
	//coolant.set(tool.coolant);
	if (properties.Smoothing) {
		if (hasParameter("operation-strategy") && (getParameter("operation-strategy") != "drill")) {
			if (smoothing.set(true)) {
				// we force G43 using lengthCompensationActive
			}
		} else {
			if (smoothing.set(false)) {
				// we force G43 using lengthCompensationActive
			}
		}
	}

	force.all();
	modals.motion.reset();

	var initialPosition = getFramePosition(currentSection.getInitialPosition());
	if (!retracted) {
		if (getCurrentPosition().z < initialPosition.z) {
			writer.block(modals.motion.format(0),outputs.z.format(initialPosition.z));
		}
	}

	if (insertToolCall || !lengthCompensationActive || retracted || (!isFirstSection() && getPreviousSection().isMultiAxis())) {
		writer.comment("c2")
		var lengthOffset = tool.lengthOffset;
		if (lengthOffset < 0 ||lengthOffset > MAX_TOOLS) {
			writer.error("LENGTH OFFSET: INVALID > " + MAX_TOOLS);
			return;
		}

		modals.motion.reset();
		writer.block(modals.plane.format(17));
		
		if (!machineConfiguration.isHeadConfiguration()) {
			writer.comment("d3");
			writer.block(modals.abs.format(0),modals.abs.format(90),wfo,outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y),outputs.s.format(tool.spindleRPM),formats.m.format(tool.isClockwise() ? 3 : 4));
		 	writer.block(modals.motion.format(0),conditional(insertToolCall,formats.g.format(currentSection.isMultiAxis() ? 43.5 : 43)),formats.h.format(lengthOffset),outputs.z.format(initialPosition.z),coolant.set(tool.coolant),properties.PreloadingTools?formats.t.format(nextTool.number):undefined);
			lengthCompensationActive = true;
		}else {
			writer.comment("e4");
			writer.block(modals.abs.format(90),modals.motion.format(0),formats.g.format(currentSection.isMultiAxis() ? (machineConfiguration.isMultiAxisConfiguration() ? 43.4 : 43.5) : 43),formats.h.format(lengthOffset),outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y),outputs.z.format(initialPosition.z),coolant.set(tool.coolant),properties.PreloadingTools?formats.t.format(nextTool.number):undefined);
		}
		modals.motion.reset();
	} else { 
		writer.comment("f5");
		if(forceSpindleSpeed || (formats.s.areDifferent(tool.spindleRPM,outputs.s.getCurrent() as number)) || (tool.isClockwise() != getPreviousSection().getTool().isClockwise())) {
			writer.block(modals.abs.format(90),modals.motion.format(0),outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y),outputs.s.format(tool.spindleRPM),formats.m.format(tool.isClockwise() ? 3 : 4),coolant.set(tool.coolant));
		} else {
			writer.block(coolant.set(tool.coolant));
			writer.block(modals.abs.format(90),modals.motion.format(0),outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y));
		}
	}
	
	validate(lengthCompensationActive,"Length compensation is not active.");

	if (isProbeOperation()) {
		if (g68RotationMode != 0) {
			writer.error("PROBE: UNABLE DUE TO G68");
			return;
		}
		angularProbingMode = getAngularProbingMode();
		writer.block(formats.g.format(65),"P" + 9832);//G65 MACRO 9832
	}

	retracted = false;
}
//ON DWELL(DRILLING)
function onDwell(seconds: number) {
	if (seconds > 99999.999) {
		writer.error("DWELL TIME: INVALID");
		return;
	}
	writer.block(modals.f.format(94),formats.g.format(4),formats.p.format(Math.min(Math.max(1,seconds * 1000),99999999)));
	writer.block(modals.f.format(94));
}
//ON SPINDLE SPEED
function onSpindleSpeed(speed: number) {
	writer.block(outputs.s.format(speed));
}
//ON CYLCE
function onCycle() {
	writer.block(modals.plane.format(17));
}

function getCommonCycle(x: number,y: number,z: number,r: number) {
	force.xyz();
	return [outputs.x.format(x),outputs.y.format(y),outputs.z.format(z),"R" + formats.xyz.format(r)];
}

function approach(value: string): number {
	switch(value) {
		case "positive":
			return 1;
		case "negative":
			return -1;
		default:
			writer.error("APPROACH: INVALID");
			return 0;
	}
}
function getAngularProbingMode() {
	if (machineConfiguration.isMultiAxisConfiguration()) {
		if (machineConfiguration.isMachineCoordinate(2)) {
			return ANGLE_PROBE.USE_CAXIS;
		} else {
			return ANGLE_PROBE.NOT_SUPPORTED;
		}
	} else {
		return ANGLE_PROBE.USE_ROTATION;
	}
}
function setProbingAngle() {
	if((g68RotationMode == 1) || (g68RotationMode == 2)) { // Rotate coordinate system for Angle Probing
		if(!properties.useG54x4) {
			modals.motion.reset();
			modals.abs.reset();
			writer.block(modals.rotation.format(68),modals.abs.format(90),(g68RotationMode == 1) ? "X0" : "X[#135]",(g68RotationMode == 1) ? "Y0" : "Y[#136]","Z0","I0.0","J0.0","K1.0","R[#139]");
			g68RotationMode = 3;
		} else if(angularProbingMode != ANGLE_PROBE.NOT_SUPPORTED) {
			writer.block("#26010=#135");
			writer.block("#26011=#136");
			writer.block("#26012=#137");
			writer.block("#26015=#139");
			writer.block(formats.g.format(54.4),"P1");
			g68RotationMode = 0;
		}
		writer.error("ANGULAR PROBING: NOT SUPPORTED");
	}
}
//ON CYCLE POINT
function onCyclePoint(x: number,y: number,z: number) {
	var probeWorkOffsetCode;
	if (isProbeOperation()) {
		setCurrentPosition(new Vector(x,y,z));

		var workOffset = probeOutputWorkOffset ? probeOutputWorkOffset : currentWorkOffset;
		if (workOffset > 59) {
			writer.error("WORK OFFSET: OUT OF RANGE");
			return;
		};
		if(workOffset >= 1 && workOffset <= 48) {
			probeWorkOffsetCode = formats.probe.format(workOffset + 100);
		} else {
			probeWorkOffsetCode = workOffset + "."; // G54->G59
		}
	}
	if (isFirstCyclePoint()) {
		repositionToCycleClearance(cycle,x,y,z);
		
		var F = cycle.feedrate;

		var P = (cycle.dwell == 0) ? 0 : Math.min(Math.max(1,cycle.dwell * 1000),99999999);//IN MILLISECONDS

		modals.retraction.reset();
		
		switch(cycleType) {
			case "drilling":
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(81),...getCommonCycle(x,y,z,cycle.retract),outputs.f.format(F));
				break;
			case "counter-boring":
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format((P > 0)?82:81),...getCommonCycle(x,y,z,cycle.retract),((P > 0)?formats.p.format(P):undefined),outputs.f.format(F));
				break;
			case "chip-breaking":
				if (P > 0) {// cycle.accumulatedDepth is ignored
					expandCyclePoint(x,y,z);
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(73),...getCommonCycle(x,y,z,cycle.retract),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.f.format(F));
				}
				break;
			case "deep-drilling":
				if (P > 0) {
					expandCyclePoint(x,y,z);
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(83),...getCommonCycle(x,y,z,cycle.retract),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.f.format(F));
				}
				break;
			case "tapping":
				writer.block(formats.m.format(29),outputs.s.format(tool.spindleRPM));//M29 SYNCHRONIZED TAPPING SPINDLE SPEED
				if (properties.usePitchForTapping) {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.f.format(95),modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND) ? 74 : 84),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.pitch.format(tool.threadPitch));
					force.feed();
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND) ? 74 : 84),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(F));
				}
				break;
			case "left-tapping":
				writer.block(formats.m.format(29),outputs.s.format(tool.spindleRPM));//M29 SYNCHRONIZED TAPPING SPINDLE SPEED
				if (properties.usePitchForTapping) {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.f.format(95),modals.cycle.format(74),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.pitch.format(tool.threadPitch));
					force.feed();
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(74),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(tool.getTappingFeedrate()));
				}
				break;
			case "right-tapping":
				writer.block(formats.m.format(29),outputs.s.format(tool.spindleRPM));//M29 SYNCHRONIZED TAPPING SPINDLE SPEED
				if (properties.usePitchForTapping) {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(84),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.pitch.format(tool.threadPitch));
					force.feed();
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(84),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(tool.getTappingFeedrate()));
				}
				break;
			case "tapping-with-chip-breaking":
			case "left-tapping-with-chip-breaking":
			case "right-tapping-with-chip-breaking":
				writer.block(formats.m.format(29),outputs.s.format(tool.spindleRPM));//M29 SYNCHRONIZED TAPPING SPINDLE SPEED
				if (properties.usePitchForTapping) {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format((tool.type == TOOL.TAP_LEFT_HAND ? 74 : 84)),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.pitch.format(tool.threadPitch));
					force.feed();
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format((tool.type == TOOL.TAP_LEFT_HAND ? 74 : 84)),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.f.format(tool.getTappingFeedrate()));
				}
				break;
			case "fine-boring":
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(76),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),"Q" + formats.xyz.format(cycle.shift),outputs.f.format(F));
				break;
			case "back-boring":
				var dx = (modals.plane.getCurrent() == 19) ? cycle.backBoreDistance : 0;
				var dy = (modals.plane.getCurrent() == 18) ? cycle.backBoreDistance : 0;
				var dz = (modals.plane.getCurrent() == 17) ? cycle.backBoreDistance : 0;
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(87),...getCommonCycle(x - dx,y - dy,z - dz,cycle.bottom),"Q" + formats.xyz.format(cycle.shift),formats.p.format(P),outputs.f.format(F));
				break;
			case "reaming":
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(89),...getCommonCycle(x,y,z,cycle.retract),((P > 0)?formats.p.format(P):undefined),outputs.f.format(F));
				break;
			case "stop-boring":
				if (P > 0) {
					expandCyclePoint(x,y,z);
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(86),...getCommonCycle(x,y,z,cycle.retract),outputs.f.format(F));
				}
				break;
			case "manual-boring":
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(88),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(F));
				break;
			case "boring":
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(89),...getCommonCycle(x,y,z,cycle.retract),((P > 0)?formats.p.format(P):undefined),outputs.f.format(F));
				break;
			case "probing-x":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9811,"X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);// formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-y":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9811,"Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode); // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-z":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(Math.min(z - cycle.depth + cycle.probeClearance,cycle.retract)),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9811,"Z" + formats.xyz.format(z - cycle.depth),"S" + probeWorkOffsetCode);//"Q" + formats.xyz.format(cycle.probeOvertravel), // formats.tool.format(probeToolLengthOffset)
				break;
			case "probing-x-wall":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode); // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-y-wall":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode); // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-x-channel":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);//not required "R" + formats.xyz.format(cycle.probeClearance), // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-x-channel-with-island":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-y-channel":
				outputs.y.reset();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode); //not required "R" + formats.xyz.format(cycle.probeClearance),
				break;
			case "probing-y-channel-with-island":
				outputs.y.reset();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-circular-boss":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9814,"D" + formats.xyz.format(cycle.width1),"Z" + formats.xyz.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-circular-hole":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9814,"D" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);//not required "R" + formats.xyz.format(cycle.probeClearance),
				break;
			case "probing-xy-circular-hole-with-island":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9814,"Z" + formats.xyz.format(z - cycle.depth),"D" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-rectangular-hole":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);// not required "R" + formats.xyz.format(-cycle.probeClearance),
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width2),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);// not required "R" + formats.xyz.format(-cycle.probeClearance),
				break;
			case "probing-xy-rectangular-boss":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"Z" + formats.xyz.format(z - cycle.depth),"X" + formats.xyz.format(cycle.width1),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode);//"Q" + formats.xyz.format(cycle.probeOvertravel),
				writer.block(formats.g.format(65),"P" + 9812,"Z" + formats.xyz.format(z - cycle.depth),"Y" + formats.xyz.format(cycle.width2),"R" + formats.xyz.format(cycle.probeClearance),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-rectangular-hole-with-island":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9812,"Z" + formats.xyz.format(z - cycle.depth),"X" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				writer.block(formats.g.format(65),"P" + 9812,"Z" + formats.xyz.format(z - cycle.depth),"Y" + formats.xyz.format(cycle.width2),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-inner-corner":
				var cornerX = x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2);
				var cornerY = y + approach(cycle.approach2) * (cycle.probeClearance + tool.diameter/2);
				var cornerI = 0;
				var cornerJ = 0;
				if (cycle.probeSpacing !== undefined) {
					cornerI = cycle.probeSpacing;
					cornerJ = cycle.probeSpacing;
				}
				if ((cornerI != 0) && (cornerJ != 0)) {
					g68RotationMode = 2;
				}
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9815,outputs.x.format(cornerX),outputs.y.format(cornerY),conditional(cornerI != 0,"I" + formats.xyz.format(cornerI)),conditional(cornerJ != 0,"J" + formats.xyz.format(cornerJ)),"Q" + formats.xyz.format(cycle.probeOvertravel),conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE.USE_CAXIS),"S" + probeWorkOffsetCode));
				break;
			case "probing-xy-outer-corner":
				var cornerX = x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2);
				var cornerY = y + approach(cycle.approach2) * (cycle.probeClearance + tool.diameter/2);
				var cornerI = 0;
				var cornerJ = 0;
				if (cycle.probeSpacing !== undefined) {
					cornerI = cycle.probeSpacing;
					cornerJ = cycle.probeSpacing;
				}
				if ((cornerI != 0) && (cornerJ != 0)) {
					g68RotationMode = 2;
				}
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9816,outputs.x.format(cornerX),outputs.y.format(cornerY),conditional(cornerI != 0,"I" + formats.xyz.format(cornerI)),conditional(cornerJ != 0,"J" + formats.xyz.format(cornerJ)),"Q" + formats.xyz.format(cycle.probeOvertravel),conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE.USE_CAXIS),"S" + probeWorkOffsetCode));
				break;
			case "probing-x-plane-angle":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9843,"X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"D" + formats.xyz.format(cycle.probeSpacing),"Q" + formats.xyz.format(cycle.probeOvertravel));
				g68RotationMode = 1;
				break;
			case "probing-y-plane-angle":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),outputs.f.format(F));
				writer.block(formats.g.format(65),"P" + 9843,"Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"D" + formats.xyz.format(cycle.probeSpacing),"Q" + formats.xyz.format(cycle.probeOvertravel));
				g68RotationMode = 1;
				break;
			default:
				return expandCyclePoint(x,y,z);
		}
	} else {
		if(!isProbeOperation()) {
			if(cycleExpanded) {
				return expandCyclePoint(x,y,z);
			} else {
				return writer.block(outputs.x.format(x),outputs.y.format(y));
			}
		}
	}
}
//ON CYCLE END
function onCycleEnd() {
	if (isProbeOperation()) {
		writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(cycle.clearance)); // protected retract move	// we can move in rapid from retract optionally
		writer.block(formats.g.format(65),"P" + 9833);//spin the probe off
		setProbingAngle(); // define rotation of part
	} else if (!cycleExpanded) {
		writer.block(modals.cycle.format(80),modals.f.format(94));
		outputs.z.reset();
	}
}
//ON RADIUS COMPENSATION(DISABLED)
function onRadiusCompensation() {
	writer.error("RADIUS COMPENSATION: DISABLED");
}
//ON RAPID
function onRapid(_x: number,_y: number,_z: number) {
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	if (x || y || z) {
		writer.block(modals.motion.format(0),x,y,z);
		force.feed();
	}
}
//ON LINEAR
function onLinear(_x: number,_y: number,_z: number,feed: number) {
	let x = outputs.x.format(_x);
	let y = outputs.y.format(_y);
	let z = outputs.z.format(_z);
	let f = outputs.f.format(feed);
	if (x || y || z) {
		writer.block(modals.motion.format(1),x,y,z,f);
	} else if(f) {
		if (getNextRecord().isMotion()) {
			force.feed();// force feed on next line
		}
		writer.block(modals.motion.format(1),f);
	}
}
//LINEAR RAPID
function onRapid5D(_x: number,_y: number,_z: number,_a: number,_b: number,_c: number) {
	if (currentSection.isOptimizedForMachine()) {
		let x = outputs.x.format(_x);
		let y = outputs.y.format(_y);
		let z = outputs.z.format(_z);
		let a = outputs.a.format(_a);
		let b = outputs.b.format(_b);
		let c = outputs.c.format(_c);
		writer.block(modals.motion.format(0),x,y,z,a,b,c);
	} else {
		force.xyz();
		let x = outputs.x.format(_x);
		let y = outputs.y.format(_y);
		let z = outputs.z.format(_z);
		let i = formats.ijk.format(_a);
		let j = formats.ijk.format(_b);
		let k = formats.ijk.format(_c);
		writer.block(modals.motion.format(0),x,y,z,"I" + i,"J" + j,"K" + k);
	}
	force.feed();
}
//LINEAR
function onLinear5D(_x: number,_y: number,_z: number,_a: number,_b: number,_c: number,feed: number) {
	if (currentSection.isOptimizedForMachine()) {
		let x = outputs.x.format(_x);
		let y = outputs.y.format(_y);
		let z = outputs.z.format(_z);
		let a = outputs.a.format(_a);
		let b = outputs.b.format(_b);
		let c = outputs.c.format(_c);
		let f = outputs.f.format(feed);
		if(x || y || z || a || b || c) {
			writer.block(modals.motion.format(1),x,y,z,a,b,c,f);
		} else if(f) {
			if (getNextRecord().isMotion()) { // try not to output feed without motion
				force.feed(); // force feed on next line
			} else {
				writer.block(modals.motion.format(1),f);
			}
		}
	} else {
		force.xyz();
		let x = outputs.x.format(_x);
		let y = outputs.y.format(_y);
		let z = outputs.z.format(_z);
		let i = formats.ijk.format(_a);
		let j = formats.ijk.format(_b);
		let k = formats.ijk.format(_c);
		let f = outputs.f.format(feed);
		if (x || y || z || i || j || k) {
			writer.block(modals.motion.format(1),x,y,z,"I" + i,"J" + j,"K" + k,f);
		} else if (f) {
			if (getNextRecord().isMotion()) { // try not to output feed without motion
				force.feed(); // force feed on next line
			} else {
				writer.block(modals.motion.format(1),f);
			}
		}
	}
}
/** Adjust final point to lie exactly on circle. */
class CircularData {
	center: Vector;
	start: Vector;
	end: Vector;
	offset: Vector;
	radius: number;

	constructor(_plane: PLANE,_center: Vector,_end: Vector) {
		// use Output variables,since last point could have been adjusted if previous move was circular
		var start = new Vector(outputs.x.getCurrent() as number,outputs.y.getCurrent() as number,outputs.z.getCurrent() as number);
		var saveStart = new Vector(start.x,start.y,start.z);
		var center = new Vector(
			formats.xyz.getResultingValue(_center.x),
			formats.xyz.getResultingValue(_center.y),
			formats.xyz.getResultingValue(_center.z));
		var end = new Vector(_end.x,_end.y,_end.z);
		switch(_plane) {
			case PLANE.XY:
				start.setZ(center.z);
				end.setZ(center.z);
				break;
			case PLANE.ZX:
				start.setY(center.y);
				end.setY(center.y);
				break;
			case PLANE.YZ:
				start.setX(center.x);
				end.setX(center.x);
				break;
			default:
				this.center = new Vector(_center.x,_center.y,_center.z);
				this.start = new Vector(start.x,start.y,start.z);
				this.end = new Vector(_end.x,_end.y,_end.z);
				this.offset = Vector.diff(center,start);
				this.radius = this.offset.length;
				break;
			}
		this.start = new Vector(
			formats.xyz.getResultingValue(start.x),
			formats.xyz.getResultingValue(start.y),
			formats.xyz.getResultingValue(start.z)
		);
		var temp = Vector.diff(center,start);
		this.offset = new Vector(
			formats.xyz.getResultingValue(temp.x),
			formats.xyz.getResultingValue(temp.y),
			formats.xyz.getResultingValue(temp.z)
		);
		this.center = Vector.sum(this.start,this.offset);
		this.radius = this.offset.length;

		temp = Vector.diff(end,center).normalized;
		this.end = new Vector(
			formats.xyz.getResultingValue(this.center.x + temp.x * this.radius),
			formats.xyz.getResultingValue(this.center.y + temp.y * this.radius),
			formats.xyz.getResultingValue(this.center.z + temp.z * this.radius)
		);

		switch(_plane) {
			case PLANE.XY:
				this.start.setZ(saveStart.z);
				this.end.setZ(_end.z);
				this.offset.setZ(0);
				break;
			case PLANE.ZX:
				this.start.setY(saveStart.y);
				this.end.setY(_end.y);
				this.offset.setY(0);
				break;
			case PLANE.YZ:
				this.start.setX(saveStart.x);
				this.end.setX(_end.x);
				this.offset.setX(0);
				break;
		}
	}
}
//CIRCULAR
function onCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,f: number) {
	var circle = new CircularData(getCircularPlane(),new Vector(cx,cy,cz),new Vector(x,y,z));

	if (isFullCircle()) {
		if (isHelical()) {
			linearize(tolerance);
			return;
		}
		switch (getCircularPlane()) {
		case PLANE.XY:
			writer.block(modals.abs.format(90),modals.plane.format(17),modals.motion.format(clockwise ? 2 : 3),outputs.i.format(circle.offset.x,0),outputs.j.format(circle.offset.y,0),outputs.f.format(f));
			break;
		case PLANE.ZX:
			writer.block(modals.abs.format(90),modals.plane.format(18),modals.motion.format(clockwise ? 2 : 3),outputs.i.format(circle.offset.x,0),outputs.k.format(circle.offset.z,0),outputs.f.format(f));
			break;
		case PLANE.YZ:
			writer.block(modals.abs.format(90),modals.plane.format(19),modals.motion.format(clockwise ? 2 : 3),outputs.j.format(circle.offset.y,0),outputs.k.format(circle.offset.z,0),outputs.f.format(f));
			break;
		default:
			linearize(tolerance);
		}
	} else {
		switch (getCircularPlane()) {
		case PLANE.XY:
			writer.block(modals.abs.format(90),modals.plane.format(17),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(circle.end.x),outputs.y.format(circle.end.y),outputs.z.format(circle.end.z),outputs.i.format(circle.offset.x,0),outputs.j.format(circle.offset.y,0),outputs.f.format(f));
			break;
		case PLANE.ZX:
			writer.block(modals.abs.format(90),modals.plane.format(18),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(circle.end.x),outputs.y.format(circle.end.y),outputs.z.format(circle.end.z),outputs.i.format(circle.offset.x,0),outputs.k.format(circle.offset.z,0),outputs.f.format(f));
			break;
		case PLANE.YZ:
			writer.block(modals.abs.format(90),modals.plane.format(19),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(circle.end.x),outputs.y.format(circle.end.y),outputs.z.format(circle.end.z),outputs.j.format(circle.offset.y,0),outputs.k.format(circle.offset.z,0),outputs.f.format(f));
			break;
		default:
			if (properties.allow3DArcs) {
				// make sure maximumCircularSweep is well below 360deg
				// we could use G02.4 or G03.4 - direction is calculated
				var ip = getPositionU(0.5);
				writer.block(modals.abs.format(90),modals.motion.format(clockwise ? 2.4 : 3.4),outputs.x.format(ip.x),outputs.y.format(ip.y),outputs.z.format(ip.z),outputs.f.format(f));
				writer.block(outputs.x.format(x),outputs.y.format(y),outputs.z.format(z));
			} else {
				linearize(tolerance);
			}
		}
	}
}
//ON COMMAND(GENERIC COMMANDS)
function onCommand(command: COMMAND): void {
	switch (command) {
		case COMMAND.STOP:
			forceSpindleSpeed = true;
			writer.block(formats.m.format(0));
			break;
		case COMMAND.OPTIONAL_STOP:
			writer.block(formats.m.format(1));
			break;
		case COMMAND.END:
			writer.block(formats.m.format(2));
			break;
		case COMMAND.SPINDLE_CLOCKWISE:
			writer.block(formats.m.format(3));
			break;
		case COMMAND.SPINDLE_COUNTERCLOCKWISE:
			writer.block(formats.m.format(4));
			break;
		case COMMAND.START_SPINDLE:
			onCommand(tool.isClockwise() ? COMMAND.SPINDLE_CLOCKWISE : COMMAND.SPINDLE_COUNTERCLOCKWISE);
			break;
		case COMMAND.STOP_SPINDLE:
			writer.block(formats.m.format(5));
			break;
		case COMMAND.ORIENTATE_SPINDLE:
			writer.block(formats.m.format(19));
			break;
		case COMMAND.LOAD_TOOL:
			writer.block(formats.m.format(6));
			break;
		case COMMAND.COOLANT_ON:
			writer.block(coolant.set(COOLANT.FLOOD));
			break;
		case COMMAND.COOLANT_OFF:
			writer.block(coolant.set(COOLANT.OFF));
			break;
		case COMMAND.ACTIVATE_SPEED_FEED_SYNCHRONIZATION:
			//M29
			break;
		case COMMAND.DEACTIVATE_SPEED_FEED_SYNCHRONIZATION:
			break;
		case COMMAND.UNLOCK_MULTI_AXIS:
			if(machineConfiguration.isMultiAxisConfiguration() && machineConfiguration.getNumberOfAxes() >= 4) {
				writer.block(formats.g.format(10));//G10 UNLOCKS 4TH AXIS
				if(machineConfiguration.getNumberOfAxes() == 5) {
					writer.block(formats.g.format(12));//G12 UNLOCKS 5TH AXIS 
 				}
			}
			break;
		case COMMAND.LOCK_MULTI_AXIS:
			if(machineConfiguration.isMultiAxisConfiguration() && machineConfiguration.getNumberOfAxes() >= 4) {
				writer.block(formats.g.format(11)); //G11 LOCKS 4TH AXIS
				if(machineConfiguration.getNumberOfAxes() == 5) {
					writer.block(formats.g.format(13));//G13 LOCKS 5TH AXIS
 				}
			}
			break;
		case COMMAND.EXACT_STOP:
			break;
		case COMMAND.START_CHIP_TRANSPORT:
			writer.block(formats.m.format(200));
			break;
		case COMMAND.STOP_CHIP_TRANSPORT:
			writer.block(formats.m.format(201));
			break;
		case COMMAND.OPEN_DOOR:
			writer.block(formats.m.format(82));
			break;
		case COMMAND.CLOSE_DOOR:
			writer.block(formats.m.format(83));
			break;
		case COMMAND.BREAK_CONTROL:
			if (!toolChecked) {
				//onCommand(COMMAND_STOP_SPINDLE);
				onCommand(COMMAND.COOLANT_OFF);
				writer.block(formats.g.format(53),"Z" + formats.xyz.format(0),formats.m.format(19));//RETRACT
				//writer.block(formats.g.format(8),formats.p.format(0)); //WHATS GCODE 8
				writer.block(formats.g.format(65),"P" + 9858,formats.t.format(tool.number),"H" + formats.xyz.format(0.01));//"B" + formats.xyz.format(0),
				toolChecked = true;
			}
			break;
		case COMMAND.TOOL_MEASURE:
			break;
		case COMMAND.CALIBRATE:
			break;
		case COMMAND.VERIFY:
			break;
		case COMMAND.CLEAN:
			break;
		case COMMAND.ALARM:
			break;
		case COMMAND.ALERT:
			break;
		case COMMAND.CHANGE_PALLET:
			break;
		case COMMAND.POWER_ON:
			break;
		case COMMAND.POWER_OFF:
			break;
		case COMMAND.MAIN_CHUCK_OPEN:
			break;
		case COMMAND.MAIN_CHUCK_CLOSE:
			break;
		case COMMAND.SECONDARY_CHUCK_OPEN:
			break;
		case COMMAND.SECONDARY_CHUCK_CLOSE:
			break;
		case COMMAND.SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE:
			break;
		case COMMAND.SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE:
			break;
		case COMMAND.SYNC_CHANNELS:
			break;
		case COMMAND.PROBE_ON:
			break;
		case COMMAND.PROBE_OFF:
			break;
		default:
			onUnsupportedCommand(command);
			break;
	}
}
var toolChecked = false; // specifies that the tool has been checked with the probe
//SECTION END
function onSectionEnd() {
	if ((((getCurrentSectionId() + 1) >= getNumberOfSections()) || (tool.number != getNextSection().getTool().number)) && tool.breakControl) {
		onCommand(COMMAND.BREAK_CONTROL);
	} else {
		toolChecked = false;
	}
	force.all();
}
//ON PASS THROUGH
function onPassThrough(text: Value) {
	String(text).split(",").forEach(command=> {
		writer.block(command);
	});
}
//ON CLOSE
function onClose() {
	optionalSection = false;
	//COOLANT OFF
	onCommand(COMMAND.COOLANT_OFF);

	writer.block(modals.f.format(0),formats.g.format(49));//F0//G49 FEED RATE OFF
	writer.block(formats.g.format(53),"Z" + formats.xyz.format(0),formats.m.format(19));//G53 MACHINE COORDIANTE Z0 M19 ORIENTATE SPINDLE
	retracted = true;
	//disableLengthCompensation(true);
	smoothing.set(false);

	outputs.z.reset();

	workPlane.reset();//RESET

	if (properties.useG54x4) {
		writer.block(formats.g.format(54.4),"P0");//G54.4  P0
	}
	//HOME
	writer.block(formats.g.format(53),"X" + formats.xyz.format(-33.9892));//G53 MACHINE COORD X-25.
	writer.block(formats.g.format(53),"Y" + formats.xyz.format(0));//G53 MACHINE COORD Y0
	//END COMMANDS
	onImpliedCommand(COMMAND.END);
	onImpliedCommand(COMMAND.STOP_SPINDLE);
	//END PROGRAM
	writer.block(formats.m.format(30));//M30 END PROGRAM
	//END FILE
	writeln("%");//% END FILE
}