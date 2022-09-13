//IMPORTS TYPES AND CONSTANTS(IGNORE)
/// <reference path = "./types.ts" />
/// <reference path = "./constant.ts" />

//1. Yellow: it indicates the rapid move of the toolpath
//2. Green: it indicates the lead-in/leadout of the toopath 
//3. Red: it indicates the Ramping move of the toolpath
//4. Blue: Most part of the toolpath are blue which indicates the cutting.

//INFO(DESCRIPTIONS NAME LEGAL)
let description = "MORI-5100";
let longDescription = "3/5 AXIS POST FOR DMG MORI-5100";
let vendor = "FANUC";
let vendorUrl = "https://www.fanuc.com/";
let legal = "COPYRIGHT (C) 2022 BY RENO WARNER";
let certificationLevel = 2;
let minimumRevision = 24000;
//FILE INFO
let extension = "nc";
let programNameIsInteger = true;
setCodePage("ascii");
//CAPABILITY
let capabilities = CAPABILITY_MILLING;
let tolerance = spatial(0.002,UNIT.MILLIMETER);
//CIRCULAR CAPABILITIES
let minimumChordLength = spatial(0.01,UNIT.MILLIMETER);//WARNING
let minimumCircularRadius = spatial(0.01,UNIT.MILLIMETER);
let maximumCircularRadius = spatial(1000,UNIT.MILLIMETER);
let minimumCircularSweep = toRad(0.01);
let maximumCircularSweep = toRad(360);
let allowHelicalMoves = true;
let allowedCircularPlanes = undefined;//UNDEFINED = ALL
//PROPERTIES
let properties = {
	enablePrettyPrint: false,//Pretty Print GCODE
	enablePreloadingTools: false,//Preloads Tools In Magazine
	enableOptionalStops: true,//Optionally Stops Program At Key Moments
	enableChipConveyor: false,//Enable Chip Conveyor
	enableSmoothing: true,//Enable


	allow3DArcs: false,// specifies that 3D circular arcs are allowed
	useRadius: false,// specifies that arcs should be output using the radius (R word) instead of the I,J,and K words
	forceIJK: false,// force output of IJK for G2/G3 when not using R word
	useParametricFeed: false,// specifies that feed should be output using Q values
	showNotes: false,// specifies that operation notes should be output
	usePitchForTapping: true,// enable to use pitch instead of feed for the F-word for canned tapping cycles - note that your CNC control must be setup for pitch mode!
	useG95: false,// use IPR/MPR instead of IPM/MPM
	toolBreakageTolerance: 0.01,// value for which tool break detection will raise an alarm. Probably something to od with a toolsetter. or auto breaking check.
	useG54x4: false, // Fanuc 30i supports G54.4 for Workpiece Error Compensation
};

// fixed settings
var firstFeedParameter = 500;
var useMultiAxisFeatures = true;
var forceMultiAxisIndexing = false; // force multi-axis indexing for 3D programs
enum ANGLE_PROBE {
	NOT_SUPPORTED,
	USE_ROTATION,
	USE_CAXIS,
}
// collected state
var currentWorkOffset: number;
var optionalSection = false;
var forceSpindleSpeed = false;
var activeMovements: FeedContext[] | undefined;// do not use by default
var currentFeedId: number | undefined;
var g68RotationMode = 0;
var angularProbingMode: ANGLE_PROBE;
var wfo: string | undefined;
//([A-Z]+) ([A-Z_]+)([,\)])
//$2: $1$3
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
	//ANGLE
	taper: createFormat({decimals:1,scale:DEG}),
	//FEED
	//if (properties.useG95) {formats.f = createFormat({decimals:(unit == UNIT.MILLIMETER ? 4 : 5),forceDecimal:true});
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
const writer = {
	block(...words:(string|undefined)[]): void {
		return writeWords([[optionalSection?"/":""].concat(words.filter(word=>word!==undefined) as string[]).join(properties.enablePrettyPrint?" ":"")]);
	},
	comment(...words:(string | undefined)[]): void {
		return writeWords(["("+(words.filter(word=>word!==undefined||word==="")).map(word=>localize(filterText((word as string).toUpperCase()," ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,=_-/*#:")||"").replace(/[\(\)]/g,"")).join(" ")+")"]);
	},
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
//FEED

//COOLANT
var coolant = {
	current: COOLANT.OFF,
	set(mode: COOLANT): string | undefined {
		if(isProbeOperation()) {
			mode = COOLANT.OFF;
		}

		if(mode === coolant.current) return "";//writer.block(formats.m.format((currentCoolantMode == COOLANT.THROUGH_TOOL) ? 89 : 9));

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
		writer.block(formats.g.format(332),"R3.");//////////////////WARNING///R4 is longer but higher precision

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
			error(localize("Machine angles not supported") + ":" + conditional(machineConfiguration.isMachineCoordinate(0)," A" + formats.abc.format(abc.x)) + conditional(machineConfiguration.isMachineCoordinate(1)," B" + formats.abc.format(abc.y)) + conditional(machineConfiguration.isMachineCoordinate(2)," C" + formats.abc.format(abc.z)));
		}
		
		let direction = machineConfiguration.getDirection(abc);

		if (!isSameDirection(direction,matrix.forward)) {error(localize("Orientation not supported."))};
		
		if (!machineConfiguration.isABCSupported(abc)) {error(localize("Work plane is not supported") + ":" + conditional(machineConfiguration.isMachineCoordinate(0)," A" + formats.abc.format(abc.x)) + conditional(machineConfiguration.isMachineCoordinate(1)," B" + formats.abc.format(abc.y)) + conditional(machineConfiguration.isMachineCoordinate(2)," C" + formats.abc.format(abc.z)))};
	
		var tcp = false;

		if (tcp) {
			setRotation(matrix); // TCP mode
		} else {
			var O = machineConfiguration.getOrientation(abc);
			var R = machineConfiguration.getRemainingOrientation(abc,matrix);
			setRotation(R);
		}
		
		return abc;
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
		return error(localize("PROGRAM NAME IS UNDEFINED"));
	} else {
		let programNumber = Number(programName);
		//VERIFY PROGRAM NUMBER
		if(programNumber !== programNumber || programNumber === Infinity || programNumber === -Infinity) return error(localize("PROGRAM NUMBER IS NOT A NUMBER"));
		if(programNumber < 1 || programNumber > 9999) return error(localize("PROGRAM NUMBER IS OUT OF RANGE"));
		//WRITE PROGRAM NUMBER/COMMENT/NAME
		writer.comment(programName,(programComment === "")?undefined:programComment);
		writer.block(formats.o.format(programNumber));
	}
	//TOOLS BOUNDS TIME SPINDLE FEED
	let tools: ({number: number,zRange: RANGE,description: string | undefined,comment: string | undefined})[] = [];
	let bounds = new BoundingBox();
	let time = 0;
	let max = {spindle: 0,feed: 0};
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
		// for(let index = 0;index < tools.length;index++) {
		// 	if(sectionTool) return;
		// }
		tools.push({number: sectionTool.number,zRange: zRange,description: sectionTool.desciption,comment: sectionTool.comment});
	}
	//TOOLS
	for(let index = 0;index < tools.length;index++) {
		writer.comment("T"+tools[index].number,tools[index].description,"ZMIN" + tools[index].zRange.getMinimum().toFixed(1),tools[index].comment);
	}
	//BOUNDING BOX MAX TIME
	writer.comment("BOUNDING BOX",(unit === UNIT.MILLIMETER ? "MM" : "INCH")+"  ","X:"+bounds.lower.x.toFixed(1),"Y:"+bounds.lower.y.toFixed(1),"Z:"+bounds.lower.z.toFixed(1),"X:"+bounds.upper.x.toFixed(1),"Y:"+bounds.upper.y.toFixed(1),"Z:"+bounds.upper.z.toFixed(1));
	writer.comment("MAX  SPINDLE:",max.spindle.toFixed(0),"RPM","FEED:",max.feed.toFixed(0),(unit === UNIT.MILLIMETER ? "MM" : "INCH")+"/MIN");
	writer.comment("TIME  ",Math.floor(time/3600).toString()+":"+Math.floor(time / 60).toString()+":"+(time % 60).toFixed(0));
	
	//return comment and description
	// 	if (false) {
	// 		// check for duplicate tool number
	// 		for (var i = 0; i < getNumberOfSections(); ++i) {
	// 			var sectioni = getSection(i);
	// 			var tooli = sectioni.getTool();
	// 			for (var j = i + 1; j < getNumberOfSections(); ++j) {
	// 				var sectionj = getSection(j);
	// 				var toolj = sectionj.getTool();
	// 				if (tooli.number == toolj.number) {
	// 					if (formats.xyz.areDifferent(tooli.diameter,toolj.diameter) || formats.xyz.areDifferent(tooli.cornerRadius,toolj.cornerRadius) || formats.abc.areDifferent(tooli.taperAngle,toolj.taperAngle) || (tooli.numberOfFlutes != toolj.numberOfFlutes)) {
	// 						error(
	// 							subst(
	// 								localize("Using the same tool number for different cutter geometry for operation '%1' and '%2'."),
	// 								sectioni.hasParameter("operation-comment") as boolean ? sectioni.getParameter("operation-comment") as string : ("#" + (i + 1)),
	// 								sectionj.hasParameter("operation-comment") as boolean ? sectionj.getParameter("operation-comment") as string : ("#" + (j + 1))
	// 							)
	// 						);
	// 						return;
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// 			var comment = formats.tool.format(tool.number) + " " +
	// 				"D=" + formats.xyz.format(tool.diameter) + " " +
	// 				localize("CR") + "=" + formats.xyz.format(tool.cornerRadius);
	// 			if ((tool.taperAngle > 0) && (tool.taperAngle < Math.PI)) {
	// 				comment += " " + localize("TAPER") + "=" + formats.taper.format(tool.taperAngle) + localize("deg");
	// 			}
	// 			if (zRanges[tool.number]) {
	// 				comment += " - " + localize("ZMIN") + "=" + formats.xyz.format(zRanges[tool.number].getMinimum());
	// 			}
	// 			comment += " - " + getToolTypeName(tool);
	// 			writeComment(comment);
	// 		}
	// 	}
	//MACHINE CONFIGURATION COMMENT
	writer.comment("MACHINE");
	writer.comment(machineConfiguration.getVendor(),machineConfiguration.getModel(),machineConfiguration.getDescription());
	//ABSOLUTE AND CANCEL COMMANDS
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
	//M0 TEMPORARY STOP
	writer.block(formats.m.format(0));
	//NO PARAMETRIC FEED AND G95
	if (properties.useG95 && properties.useParametricFeed) return error(localize("Parametric feed is not supported when using G95."));
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

class FeedContext {
	id: number;
	description: string;
	feed: number;

	constructor(id: number,description: string,feed: number) {
		this.id = id;
		this.description = description;
		this.feed = feed;
	}
}

function getFeed(f: number) {
	if (properties.useG95) {
		return outputs.f.format(f/spindleSpeed); // use feed value
	}
	if (activeMovements) {
		var feedContext: FeedContext = activeMovements[movement];
		if (feedContext != undefined) {
			if (!formats.f.areDifferent(feedContext.feed,f)) {
				if (feedContext.id == currentFeedId) {
					return ""; // nothing has changed
				}
				force.feed();
				currentFeedId = feedContext.id;
				return "F#" + (firstFeedParameter + feedContext.id);
			}
		}
		currentFeedId = undefined; // force Q feed next time
	}
	return outputs.f.format(f); // use feed value
}

function initializeActiveFeeds() {
	activeMovements = new Array();
	var movements = currentSection.getMovements();
	
	var id = 0;
	var activeFeeds: FeedContext[] = [];
	if (hasParameter("operation:tool_feedCutting")) {
		if (movements & ((1 << MOVEMENT.CUTTING) | (1 << MOVEMENT.LINK_TRANSITION) | (1 << MOVEMENT.EXTENDED))) {
			var feedContext = new FeedContext(id,localize("Cutting"),getParameter("operation:tool_feedCutting") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.CUTTING] = feedContext;
			activeMovements[MOVEMENT.LINK_TRANSITION] = feedContext;
			activeMovements[MOVEMENT.EXTENDED] = feedContext;
		}
		++id;
		if (movements & (1 << MOVEMENT.PREDRILL)) {
			feedContext = new FeedContext(id,localize("Predrilling"),getParameter("operation:tool_feedCutting") as number);
			activeMovements[MOVEMENT.PREDRILL] = feedContext;
			activeFeeds.push(feedContext);
		}
		++id;
	}
	
	if (hasParameter("operation:finishFeedrate")) {
		if (movements & (1 << MOVEMENT.FINISH_CUTTING)) {
			var feedContext = new FeedContext(id,localize("Finish"),getParameter("operation:finishFeedrate") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.FINISH_CUTTING] = feedContext;
		}
		++id;
	} else if (hasParameter("operation:tool_feedCutting")) {
		if (movements & (1 << MOVEMENT.FINISH_CUTTING)) {
			var feedContext = new FeedContext(id,localize("Finish"),getParameter("operation:tool_feedCutting") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.FINISH_CUTTING] = feedContext;
		}
		++id;
	}
	
	if (hasParameter("operation:tool_feedEntry")) {
		if (movements & (1 << MOVEMENT.LEAD_IN)) {
			var feedContext = new FeedContext(id,localize("Entry"),getParameter("operation:tool_feedEntry") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.LEAD_IN] = feedContext;
		}
		++id;
	}

	if (hasParameter("operation:tool_feedExit")) {
		if (movements & (1 << MOVEMENT.LEAD_OUT)) {
			var feedContext = new FeedContext(id,localize("Exit"),getParameter("operation:tool_feedExit") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.LEAD_OUT] = feedContext;
		}
		++id;
	}

	if (hasParameter("operation:noEngagementFeedrate")) {
		if (movements & (1 << MOVEMENT.LINK_DIRECT)) {
			var feedContext = new FeedContext(id,localize("Direct"),getParameter("operation:noEngagementFeedrate") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.LINK_DIRECT] = feedContext;
		}
		++id;
	} else if(hasParameter("operation:tool_feedCutting") && hasParameter("operation:tool_feedEntry") && hasParameter("operation:tool_feedExit")) {
		if (movements & (1 << MOVEMENT.LINK_DIRECT)) {
			var feedContext = new FeedContext(id,localize("Direct"),Math.max(getParameter("operation:tool_feedCutting") as number,getParameter("operation:tool_feedEntry") as number,getParameter("operation:tool_feedExit") as number));
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.LINK_DIRECT] = feedContext;
		}
		++id;
	}
	
	if (hasParameter("operation:reducedFeedrate")) {
		if (movements & (1 << MOVEMENT.REDUCED)) {
			var feedContext = new FeedContext(id,localize("Reduced"),getParameter("operation:reducedFeedrate") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.REDUCED] = feedContext;
		}
		++id;
	}

	if(hasParameter("operation:tool_feedRamp")) {
		if (movements & ((1 << MOVEMENT.RAMP) | (1 << MOVEMENT.RAMP_HELIX) | (1 << MOVEMENT.RAMP_PROFILE) | (1 << MOVEMENT.RAMP_ZIG_ZAG))) {
			var feedContext = new FeedContext(id,localize("Ramping"),getParameter("operation:tool_feedRamp") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.RAMP] = feedContext;
			activeMovements[MOVEMENT.RAMP_HELIX] = feedContext;
			activeMovements[MOVEMENT.RAMP_PROFILE] = feedContext;
			activeMovements[MOVEMENT.RAMP_ZIG_ZAG] = feedContext;
		}
		++id;
	}
	if (hasParameter("operation:tool_feedPlunge")) {
		if (movements & (1 << MOVEMENT.PLUNGE)) {
			var feedContext = new FeedContext(id,localize("Plunge"),getParameter("operation:tool_feedPlunge") as number);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.PLUNGE] = feedContext;
		}
		++id;
	}
	if (true) { // high feed
		if (movements & (1 << MOVEMENT.HIGH_FEED)) {
			var feedContext = new FeedContext(id,localize("High Feed"),highFeedrate);
			activeFeeds.push(feedContext);
			activeMovements[MOVEMENT.HIGH_FEED] = feedContext;
		}
		++id;
	}
	
	for (var i = 0; i < activeFeeds.length; ++i) {
		var feedContext = activeFeeds[i];
		writer.block("#" + (firstFeedParameter + feedContext.id) + "=" + formats.f.format(feedContext.feed));
		writer.comment(feedContext.description);
	}
}

var probeOutputWorkOffset = 1;

function onParameter(name: string,value: Value) {
	if (name == "probe-output-work-offset") {
		probeOutputWorkOffset = (Number(value) > 0) ? Number(value) : 1;
	}
}

function onSection() {
	var forceToolAndRetract = optionalSection && !currentSection.isOptional();
	
	optionalSection = currentSection.isOptional();

	var insertToolCall = forceToolAndRetract || isFirstSection() || currentSection.getForceToolChange && currentSection.getForceToolChange() || (tool.number != getPreviousSection().getTool().number);
	
	var newWorkOffset = isFirstSection() || (getPreviousSection().workOffset != currentSection.workOffset); // work offset changes
	var newWorkPlane = isFirstSection() || !isSameDirection(getPreviousSection().getGlobalFinalToolAxis(),currentSection.getGlobalInitialToolAxis());
	var forceSmoothing =  properties.enableSmoothing && (hasParameter("operation-strategy") && (getParameter("operation-strategy") == "drill") || !isFirstSection() && getPreviousSection().hasParameter("operation-strategy") && (getPreviousSection().getParameter("operation-strategy") == "drill")); // force smoothing in case !insertToolCall (2d chamfer)
	if (insertToolCall || newWorkOffset || newWorkPlane || forceSmoothing) {
		
	/*
		// stop spindle before retract during tool change
		if (insertToolCall && !isFirstSection()) {
			onCommand(COMMAND_STOP_SPINDLE);
		}
		*/
		retracted = true;

		onCommand(COMMAND.COOLANT_OFF);

		writer.block(modals.f.format(0),formats.g.format(49));
		writer.block(formats.g.format(53),"Z" + formats.xyz.format(0),formats.m.format(19)); //RETRACT
		writer.block(modals.abs.format(90));
		
		force.xyz();

		smoothing.set(false);
	}
	// if (hasParameter("operation-comment")) {
	// 	writer.comment(getParameter("operation-comment") as string);
	// }
	// if (properties.showNotes && hasParameter("notes")) {
	// 	var notes = getParameter("notes");
	// 	if (notes) {
	// 		String(notes).split("\n").forEach(line=> {
	// 			var comment = line.replace(new RegExp("^[\\s]+","g"),"").replace(new RegExp("[\\s]+$","g"),"");
	// 			if (comment) {
	// 				writer.comment(comment);
	// 			}
	// 		});
	// 	}
	// }
	
	if (insertToolCall) {
		workPlane.force();
		
		retracted = true;
		onCommand(COMMAND.COOLANT_OFF);
	
		if (properties.enableOptionalStops) {
			onCommand(COMMAND.OPTIONAL_STOP);
		}
/*
	 if (!isFirstSection() && properties.optionalStops) {
			onCommand(COMMAND.OPTIONAL_STOP);
		}
	*/
		if (tool.number > 99) {
			warning(localize("Tool number exceeds maximum value."));
		}

		disableLengthCompensation(false);

 		writer.block(formats.t.format(tool.number));//T[TOOL NUMBER]: CHANGE TOOL NUMBER
		onCommand(COMMAND.LOAD_TOOL);

		// if (properties.preloadTools) { //IF PRELOAD IS ON IT CHANGES THE MAGAZINE BEFORE THE TOOL CHANGE
		// 	var nextTool = getNextTool(tool.number);
		// 	if (nextTool) {
		// 		writer.block(formats.t.format(nextTool.number));
		// 	} else {
		// 		// preload first tool
		// 		var section = getSection(0);
		// 		var firstToolNumber = section.getTool().number;
		// 		if (tool.number != firstToolNumber) {
		// 			writer.block(formats.t.format(firstToolNumber));
		// 		}
		// 	}
		// }
	}
	if (!isProbeOperation() && (insertToolCall || forceSpindleSpeed || isFirstSection() || (formats.s.areDifferent(tool.spindleRPM,outputs.s.getCurrent() as number)) || (tool.isClockwise() != getPreviousSection().getTool().isClockwise()))) {
		forceSpindleSpeed = false;
		
		if (tool.spindleRPM < 1) {
			error(localize("Spindle speed out of range."));
			return;
		}
		if (tool.spindleRPM > 99999) {
			warning(localize("Spindle speed exceeds maximum value."));
		}
		//writer.block(
		 // outputs.s.format(tool.spindleRPM),formats.m.format(tool.isClockwise() ? 3 : 4)
		//);
		if(properties.enableChipConveyor) {
			onCommand(COMMAND.START_CHIP_TRANSPORT);
		}
		// if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) {
		// 	// writer.block(formats.m.format(xxx)); // shortest path traverse
		// }
	}
	var nextTool = ((getNextTool(tool.number)!==undefined)?getNextTool(tool.number):getSection(0).getTool()) as Tool;

	var workOffset = currentSection.workOffset;
	if (workOffset == 0) {
		warningOnce(localize("Work offset has not been specified. Using G54 as WCS."),0);
		workOffset = 1;
	}
	if (workOffset > 0) {
		if (workOffset > 6) {
			var p = workOffset - 6; // 1->...
			if (p > 300) {
				error(localize("Work offset out of range."));
				return;
			} else {
					wfo =(formats.g.format(54.1) + " P" + p); // G54.1P
					currentWorkOffset = workOffset;
			 }
		} 
		//Block deleted next 6 blocks to not output G5x once only. Moved the formats.g line to positioning line (approx N852) STM 1/31/15
		else {
		wfo = (formats.g.format(53 + workOffset)); // G54->G59
		currentWorkOffset = workOffset;
		}
	}

	force.xyz();

	if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) { // use 5-axis indexing for multi-axis mode
		// set working plane after datum shift

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
			error(localize("Tool orientation is not supported."));
			return;
		}
		setRotation(remaining);
	}

	// set coolant after we have positioned at Z
	//coolant.set(tool.coolant);

	if (properties.enableSmoothing) {
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
		var lengthOffset = tool.lengthOffset;
		if (lengthOffset > 99) return error(localize("Length offset out of range."));

		modals.motion.reset();
		writer.block(modals.plane.format(17));
		
		if (!machineConfiguration.isHeadConfiguration()) {
			writer.block(modals.abs.format(0),modals.abs.format(90),wfo,outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y),outputs.s.format(tool.spindleRPM),formats.m.format(tool.isClockwise() ? 3 : 4));
		 	writer.block(modals.motion.format(0),conditional(insertToolCall,formats.g.format(currentSection.isMultiAxis() ? 43.5 : 43)),formats.h.format(lengthOffset),outputs.z.format(initialPosition.z),coolant.set(tool.coolant),properties.enablePreloadingTools?formats.t.format(nextTool.number):undefined);
			lengthCompensationActive = true;
		}else {
			writer.block(modals.abs.format(90),modals.motion.format(0),formats.g.format(currentSection.isMultiAxis() ? (machineConfiguration.isMultiAxisConfiguration() ? 43.4 : 43.5) : 43),formats.h.format(lengthOffset),outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y),outputs.z.format(initialPosition.z),coolant.set(tool.coolant),properties.enablePreloadingTools?formats.t.format(nextTool.number):undefined);
		}
		modals.motion.reset();
	} else { 
		if(forceSpindleSpeed || (formats.s.areDifferent(tool.spindleRPM,outputs.s.getCurrent() as number)) || (tool.isClockwise() != getPreviousSection().getTool().isClockwise())) {
			writer.block(modals.abs.format(90),modals.motion.format(0),outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y),outputs.s.format(tool.spindleRPM),formats.m.format(tool.isClockwise() ? 3 : 4),coolant.set(tool.coolant));
		} else {
			writer.block(coolant.set(tool.coolant));
			writer.block(modals.abs.format(90),modals.motion.format(0),outputs.x.format(initialPosition.x),outputs.y.format(initialPosition.y));
		 }
	 }
		
	validate(lengthCompensationActive,"Length compensation is not active.");

	if (properties.useParametricFeed &&
			hasParameter("operation-strategy") &&
			(getParameter("operation-strategy") != "drill")) {
		if (!insertToolCall &&
				activeMovements &&
				(getCurrentSectionId() > 0) &&
				(getPreviousSection().getPatternId() == currentSection.getPatternId())) {
			// use the current feeds
		} else {
			initializeActiveFeeds();
		}
	} else {
		activeMovements = undefined;
	}

	if (isProbeOperation()) {
		if (g68RotationMode != 0) {
			error(localize("You cannot probe while G68 Rotation is in effect."));
			return;
		}
		angularProbingMode = getAngularProbingMode();
		writer.block(formats.g.format(65),"P" + 9832);//G65 MACRO 9832
	}

	retracted = false;
}
function onDwell(seconds: number) {
	if (seconds > 99999.999) {
		warning(localize("Dwelling time is out of range."));
	}
	writer.block(modals.f.format(94),formats.g.format(4),formats.p.format(Math.min(Math.max(1,seconds * 1000),99999999)));
	writer.block(modals.f.format(properties.useG95 ? 95 : 94));
}
function onSpindleSpeed(speed: number) {
	writer.block(outputs.s.format(speed));
}
function onCycle() {
	writer.block(modals.plane.format(17));
}
function getCommonCycle(x: number,y: number,z: number,r: number) {
	//force.xyz(); // force xyz on first drill hole of any cycle
	return [outputs.x.format(x),outputs.y.format(y),
		outputs.z.format(z),
		"R" + formats.xyz.format(r)];
}
function approach(value: string) {
	validate((value == "positive") || (value == "negative"),"Invalid approach.");
	return (value == "positive") ? 1 : -1;
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
		return error(localize("Angular probing is not supported for this machine configuration."));
	}
}

function onCyclePoint(x: number,y: number,z: number) {
	var probeWorkOffsetCode;
	if (isProbeOperation()) {
		setCurrentPosition(new Vector(x,y,z));

		var workOffset = probeOutputWorkOffset ? probeOutputWorkOffset : currentWorkOffset;
		if (workOffset > 99) {
			error(localize("Work offset is out of range."));
			return;
		} else if(workOffset > 6) {
			probeWorkOffsetCode = formats.probe.format(workOffset - 6 + 100);
		} else {
			probeWorkOffsetCode = workOffset + "."; // G54->G59
		}
	}
	if (isFirstCyclePoint()) {
		repositionToCycleClearance(cycle,x,y,z);
		
		// return to initial Z which is clearance plane and set absolute mode

		var F = properties.useG95 ? cycle.feedrate/spindleSpeed : cycle.feedrate;

		var P = (cycle.dwell == 0) ? 0 : Math.min(Math.max(1,cycle.dwell * 1000),99999999);//IN MILLISECONDS

		modals.retraction.reset();
		
		switch(cycleType) {
			case "drilling":
				return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(81),...getCommonCycle(x,y,z,cycle.retract),outputs.f.format(F));
			case "counter-boring":
				return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(82),...getCommonCycle(x,y,z,cycle.retract),((P > 0)?formats.p.format(P):undefined),outputs.f.format(F));
			case "chip-breaking":
				if (P > 0) {// cycle.accumulatedDepth is ignored
					return expandCyclePoint(x,y,z);
				} else {
					return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(73),...getCommonCycle(x,y,z,cycle.retract),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.f.format(F));
				}
			case "deep-drilling":
				if (P > 0) {
					return expandCyclePoint(x,y,z);
				} else {
					return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(83),...getCommonCycle(x,y,z,cycle.retract),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.f.format(F));
				}
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
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(74),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(properties.useG95 ? tool.getTappingFeedrate()/spindleSpeed : tool.getTappingFeedrate()));
				}
				break;
			case "right-tapping":
				writer.block(formats.m.format(29),outputs.s.format(tool.spindleRPM));//M29 SYNCHRONIZED TAPPING SPINDLE SPEED
				if (properties.usePitchForTapping) {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(84),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.pitch.format(tool.threadPitch));
					force.feed();
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(84),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(properties.useG95 ? tool.getTappingFeedrate()/spindleSpeed : tool.getTappingFeedrate()));
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
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format((tool.type == TOOL.TAP_LEFT_HAND ? 74 : 84)),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),"Q" + formats.xyz.format(cycle.incrementalDepth),outputs.f.format(properties.useG95 ? tool.getTappingFeedrate()/spindleSpeed : tool.getTappingFeedrate()));
				}
				break;
			case "fine-boring":
				return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(76),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),"Q" + formats.xyz.format(cycle.shift),outputs.f.format(F));// not optional
			case "back-boring":
				var dx = (modals.plane.getCurrent() == 19) ? cycle.backBoreDistance : 0;
				var dy = (modals.plane.getCurrent() == 18) ? cycle.backBoreDistance : 0;
				var dz = (modals.plane.getCurrent() == 17) ? cycle.backBoreDistance : 0;
				writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(87),...getCommonCycle(x - dx,y - dy,z - dz,cycle.bottom),"Q" + formats.xyz.format(cycle.shift),formats.p.format(P),outputs.f.format(F));// not optional
				break;
			case "reaming":
				return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(89),...getCommonCycle(x,y,z,cycle.retract),((P > 0)?formats.p.format(P):undefined),outputs.f.format(F));
			case "stop-boring":
				if (P > 0) {
					expandCyclePoint(x,y,z);
				} else {
					writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(86),...getCommonCycle(x,y,z,cycle.retract),outputs.f.format(F));
				}
				break;
			case "manual-boring":
				return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(88),...getCommonCycle(x,y,z,cycle.retract),formats.p.format(P),outputs.f.format(F));
			case "boring":
				return writer.block(modals.retraction.format(98),modals.abs.format(90),modals.cycle.format(89),...getCommonCycle(x,y,z,cycle.retract),((P > 0)?formats.p.format(P):undefined),outputs.f.format(F));// not optional
			case "probing-x":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9811,"X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);// formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-y":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9811,"Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode); // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-z":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(Math.min(z - cycle.depth + cycle.probeClearance,cycle.retract)),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9811,"Z" + formats.xyz.format(z - cycle.depth),"S" + probeWorkOffsetCode);//"Q" + formats.xyz.format(cycle.probeOvertravel), // formats.tool.format(probeToolLengthOffset)
				break;
			case "probing-x-wall":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode); // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-y-wall":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode); // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-x-channel":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);//not required "R" + formats.xyz.format(cycle.probeClearance), // formats.tool.format(probeToolDiameterOffset)
				break;
			case "probing-x-channel-with-island":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-y-channel":
				outputs.y.reset();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode); //not required "R" + formats.xyz.format(cycle.probeClearance),
				break;
			case "probing-y-channel-with-island":
				outputs.y.reset();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width1),outputs.z.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-circular-boss":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9814,"D" + formats.xyz.format(cycle.width1),"Z" + formats.xyz.format(z - cycle.depth),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-circular-hole":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9814,"D" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);//not required "R" + formats.xyz.format(cycle.probeClearance),
				break;
			case "probing-xy-circular-hole-with-island":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9814,"Z" + formats.xyz.format(z - cycle.depth),"D" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"R" + formats.xyz.format(-cycle.probeClearance),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-rectangular-hole":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"X" + formats.xyz.format(cycle.width1),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);// not required "R" + formats.xyz.format(-cycle.probeClearance),
				writer.block(formats.g.format(65),"P" + 9812,"Y" + formats.xyz.format(cycle.width2),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);// not required "R" + formats.xyz.format(-cycle.probeClearance),
				break;
			case "probing-xy-rectangular-boss":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9812,"Z" + formats.xyz.format(z - cycle.depth),"X" + formats.xyz.format(cycle.width1),"R" + formats.xyz.format(cycle.probeClearance),"S" + probeWorkOffsetCode);//"Q" + formats.xyz.format(cycle.probeOvertravel),
				writer.block(formats.g.format(65),"P" + 9812,"Z" + formats.xyz.format(z - cycle.depth),"Y" + formats.xyz.format(cycle.width2),"R" + formats.xyz.format(cycle.probeClearance),"Q" + formats.xyz.format(cycle.probeOvertravel),"S" + probeWorkOffsetCode);
				break;
			case "probing-xy-rectangular-hole-with-island":
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z),getFeed(F));
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
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
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
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9816,outputs.x.format(cornerX),outputs.y.format(cornerY),conditional(cornerI != 0,"I" + formats.xyz.format(cornerI)),conditional(cornerJ != 0,"J" + formats.xyz.format(cornerJ)),"Q" + formats.xyz.format(cycle.probeOvertravel),conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE.USE_CAXIS),"S" + probeWorkOffsetCode));
				break;
			case "probing-x-plane-angle":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9843,"X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"D" + formats.xyz.format(cycle.probeSpacing),"Q" + formats.xyz.format(cycle.probeOvertravel));
				g68RotationMode = 1;
				break;
			case "probing-y-plane-angle":
				force.xyz();
				writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(z - cycle.depth),getFeed(F));
				writer.block(formats.g.format(65),"P" + 9843,"Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),"D" + formats.xyz.format(cycle.probeSpacing),"Q" + formats.xyz.format(cycle.probeOvertravel));
				g68RotationMode = 1;
				break;
			default:
				return expandCyclePoint(x,y,z);
		}
	} else {
		if (!isProbeOperation()) {
			if(cycleExpanded) {
				return expandCyclePoint(x,y,z);
			} else {
				return writer.block(outputs.x.format(x),outputs.y.format(y));
			}
		}
	}
}

function onCycleEnd() {
	if (isProbeOperation()) {
		writer.block(formats.g.format(65),"P" + 9810,outputs.z.format(cycle.clearance)); // protected retract move
		writer.block(formats.g.format(65),"P" + 9833); // spin the probe off
		setProbingAngle(); // define rotation of part
		// we can move in rapid from retract optionally
	} else if (!cycleExpanded) {
		writer.block(modals.cycle.format(80),modals.f.format(94));
		outputs.z.reset();
	}
}

var pendingRadiusCompensation = -1;
//ON RADIUS COMPENSATION
function onRadiusCompensation() {
	pendingRadiusCompensation = radiusCompensation;
}
//ON RAPID
function onRapid(_x: number,_y: number,_z: number) {
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	if (x || y || z) {
		if (pendingRadiusCompensation >= 0) return error(localize("Radius compensation mode cannot be changed at rapid traversal."));
		writer.block(modals.motion.format(0),x,y,z);
		force.feed();
	}
}
//LINEAR
function onLinear(_x: number,_y: number,_z: number,feed: number) {
	let x = outputs.x.format(_x);
	let y = outputs.y.format(_y);
	let z = outputs.z.format(_z);
	let f = getFeed(feed);
	if (x || y || z) {
		if (pendingRadiusCompensation >= 0) {
			pendingRadiusCompensation = -1;
			var d = tool.diameterOffset;
			if (d > 99) {
				warning(localize("The diameter offset exceeds the maximum value."));
			}
			writer.block(modals.plane.format(17));
			switch (radiusCompensation) {
			case RADIUS_COMPENSATION_LEFT:
				outputs.d.reset();
				writer.block(modals.motion.format(1),formats.g.format(41),outputs.d.format(d),x,y,z,f);
				break;
			case RADIUS_COMPENSATION_RIGHT:
				outputs.d.reset();
				writer.block(modals.motion.format(1),formats.g.format(42),x,y,z,outputs.d.format(d),f);
				break;
			default:
				writer.block(modals.motion.format(1),formats.g.format(40),x,y,z,f);
			}
		} else {
			writer.block(modals.motion.format(1),x,y,z,f);
		}
	} else if (f) {
		if (getNextRecord().isMotion()) {return force.feed(); // force feed on next line
		}
		return writer.block(modals.motion.format(1),f);
	}
}
//LINEAR RAPID
function onRapid5D(_x: number,_y: number,_z: number,_a: number,_b: number,_c: number) {
	if (pendingRadiusCompensation >= 0) return error(localize("Radius compensation mode cannot be changed at rapid traversal."));

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
	if (pendingRadiusCompensation >= 0) return error(localize("Radius compensation cannot be activated/deactivated for 5-axis move."));

	if (currentSection.isOptimizedForMachine()) {
		let x = outputs.x.format(_x);
		let y = outputs.y.format(_y);
		let z = outputs.z.format(_z);
		let a = outputs.a.format(_a);
		let b = outputs.b.format(_b);
		let c = outputs.c.format(_c);
		let f = getFeed(feed);
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
		let f = getFeed(feed);
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
function onCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number) {
	if (pendingRadiusCompensation >= 0) return error(localize("Radius compensation cannot be activated/deactivated for a circular move."));

	var circle = new CircularData(getCircularPlane(),new Vector(cx,cy,cz),new Vector(x,y,z));

	if (isFullCircle()) {
		if (properties.useRadius || isHelical()) { // radius mode does not support full arcs
			linearize(tolerance);
			return;
		}
		switch (getCircularPlane()) {
		case PLANE.XY:
			writer.block(modals.abs.format(90),modals.plane.format(17),modals.motion.format(clockwise ? 2 : 3),outputs.i.format(circle.offset.x,0),outputs.j.format(circle.offset.y,0),getFeed(feed));
			break;
		case PLANE.ZX:
			writer.block(modals.abs.format(90),modals.plane.format(18),modals.motion.format(clockwise ? 2 : 3),outputs.i.format(circle.offset.x,0),outputs.k.format(circle.offset.z,0),getFeed(feed));
			break;
		case PLANE.YZ:
			writer.block(modals.abs.format(90),modals.plane.format(19),modals.motion.format(clockwise ? 2 : 3),outputs.j.format(circle.offset.y,0),outputs.k.format(circle.offset.z,0),getFeed(feed));
			break;
		default:
			linearize(tolerance);
		}
	} else if (!properties.useRadius) {
		switch (getCircularPlane()) {
		case PLANE.XY:
			writer.block(modals.abs.format(90),modals.plane.format(17),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(circle.end.x),outputs.y.format(circle.end.y),outputs.z.format(circle.end.z),outputs.i.format(circle.offset.x,0),outputs.j.format(circle.offset.y,0),getFeed(feed));
			break;
		case PLANE.ZX:
			writer.block(modals.abs.format(90),modals.plane.format(18),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(circle.end.x),outputs.y.format(circle.end.y),outputs.z.format(circle.end.z),outputs.i.format(circle.offset.x,0),outputs.k.format(circle.offset.z,0),getFeed(feed));
			break;
		case PLANE.YZ:
			writer.block(modals.abs.format(90),modals.plane.format(19),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(circle.end.x),outputs.y.format(circle.end.y),outputs.z.format(circle.end.z),outputs.j.format(circle.offset.y,0),outputs.k.format(circle.offset.z,0),getFeed(feed));
			break;
		default:
			if (properties.allow3DArcs) {
				// make sure maximumCircularSweep is well below 360deg
				// we could use G02.4 or G03.4 - direction is calculated
				var ip = getPositionU(0.5);
				writer.block(modals.abs.format(90),modals.motion.format(clockwise ? 2.4 : 3.4),outputs.x.format(ip.x),outputs.y.format(ip.y),outputs.z.format(ip.z),getFeed(feed));
				writer.block(outputs.x.format(x),outputs.y.format(y),outputs.z.format(z));
			} else {
				linearize(tolerance);
			}
		}
	} else { // use radius mode
		var r = circle.radius;
		if (toDeg(getCircularSweep()) > (180 + 1e-9)) {
			r = -r; // allow up to <360 deg arcs
		}
		switch (getCircularPlane()) {
		case PLANE.XY:
			writer.block(modals.plane.format(17),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(x),outputs.y.format(y),outputs.z.format(z),"R" + formats.r.format(r),getFeed(feed));
			break;
		case PLANE.ZX:
			writer.block(modals.plane.format(18),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(x),outputs.y.format(y),outputs.z.format(z),"R" + formats.r.format(r),getFeed(feed));
			break;
		case PLANE.YZ:
			writer.block(modals.plane.format(19),modals.motion.format(clockwise ? 2 : 3),outputs.x.format(x),outputs.y.format(y),outputs.z.format(z),"R" + formats.r.format(r),getFeed(feed));
			break;
		default:
			if (properties.allow3DArcs) {
				// make sure maximumCircularSweep is well below 360deg
				// we could use G02.4 or G03.4 - direction is calculated
				var ip = getPositionU(0.5);
				writer.block(modals.abs.format(90),modals.motion.format(clockwise ? 2.4 : 3.4),outputs.x.format(ip.x),outputs.y.format(ip.y),outputs.z.format(ip.z),getFeed(feed));
				writer.block(outputs.x.format(x),outputs.y.format(y),outputs.z.format(z));
			} else {
				linearize(tolerance);
			}
		}
	}
}
//COMMAND
function onCommand(command: COMMAND): void {
	switch (command) {
		case COMMAND.STOP:
			forceSpindleSpeed = true;
			return writer.block(formats.m.format(0));
		case COMMAND.OPTIONAL_STOP:
			return writer.block(formats.m.format(1));
		case COMMAND.END:
			return writer.block(formats.m.format(2));
		case COMMAND.SPINDLE_CLOCKWISE:
			return writer.block(formats.m.format(3));
		case COMMAND.SPINDLE_COUNTERCLOCKWISE:
			return writer.block(formats.m.format(4));
		case COMMAND.START_SPINDLE:
			return onCommand(tool.isClockwise() ? COMMAND.SPINDLE_CLOCKWISE : COMMAND.SPINDLE_COUNTERCLOCKWISE);
		case COMMAND.STOP_SPINDLE:
			return writer.block(formats.m.format(5));
		case COMMAND.ORIENTATE_SPINDLE:
			return writer.block(formats.m.format(19));
		case COMMAND.LOAD_TOOL:
			return writer.block(formats.m.format(6));
		case COMMAND.COOLANT_ON:
			return writer.block(coolant.set(COOLANT.FLOOD));
		case COMMAND.COOLANT_OFF:
			return writer.block(coolant.set(COOLANT.OFF));
		case COMMAND.ACTIVATE_SPEED_FEED_SYNCHRONIZATION:
			//M29
			return;
		case COMMAND.DEACTIVATE_SPEED_FEED_SYNCHRONIZATION:
			return;
		case COMMAND.UNLOCK_MULTI_AXIS:
			if(machineConfiguration.isMultiAxisConfiguration() && machineConfiguration.getNumberOfAxes() >= 4) {
				writer.block(formats.g.format(10));//G10 UNLOCKS 4TH AXIS
				if(machineConfiguration.getNumberOfAxes() == 5) {
					writer.block(formats.g.format(12));//G12 UNLOCKS 5TH AXIS 
 				}
			}
			return;
		case COMMAND.LOCK_MULTI_AXIS:
			if(machineConfiguration.isMultiAxisConfiguration() && machineConfiguration.getNumberOfAxes() >= 4) {
				writer.block(formats.g.format(11)); //G11 LOCKS 4TH AXIS
				if(machineConfiguration.getNumberOfAxes() == 5) {
					writer.block(formats.g.format(13));//G13 LOCKS 5TH AXIS
 				}
			}
			return;
		case COMMAND.UNLOCK_MULTI_AXIS:
			return;
		case COMMAND.EXACT_STOP:
			return;
		case COMMAND.START_CHIP_TRANSPORT:
			return writer.block(formats.m.format(200));
		case COMMAND.STOP_CHIP_TRANSPORT:
			return writer.block(formats.m.format(201));
		case COMMAND.OPEN_DOOR:
			return;
		case COMMAND.CLOSE_DOOR:
			return;
		case COMMAND.BREAK_CONTROL:
			if (!toolChecked) {
				//onCommand(COMMAND_STOP_SPINDLE);
				onCommand(COMMAND.COOLANT_OFF);
				writer.block(formats.g.format(53),"Z" + formats.xyz.format(0),formats.m.format(19));//RETRACT
				//writer.block(formats.g.format(8),formats.p.format(0)); //WHATS GCODE 8
				writer.block(formats.g.format(65),"P" + 9858,formats.t.format(tool.number),"H" + formats.xyz.format(properties.toolBreakageTolerance));//"B" + formats.xyz.format(0),
				toolChecked = true;
			}
		case COMMAND.TOOL_MEASURE:
			return;
		case COMMAND.CALIBRATE:
			return;
		case COMMAND.VERIFY:
			return;
		case COMMAND.CLEAN:
			return;
		case COMMAND.ALARM:
			return;
		case COMMAND.ALERT:
			return;
		case COMMAND.CHANGE_PALLET:
			return;
		case COMMAND.POWER_ON:
			return;
		case COMMAND.POWER_OFF:
			return;
		case COMMAND.MAIN_CHUCK_OPEN:
			return;
		case COMMAND.MAIN_CHUCK_CLOSE:
			return;
		case COMMAND.SECONDARY_CHUCK_OPEN:
			return;
		case COMMAND.SECONDARY_CHUCK_CLOSE:
			return;
		case COMMAND.SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE:
			return;
		case COMMAND.SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE:
			return;
		case COMMAND.SYNC_CHANNELS:
			return;
		case COMMAND.PROBE_ON:
			return;
		case COMMAND.PROBE_OFF:
			return;
		default:
			return onUnsupportedCommand(command);
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
//PASS THROUGH
function onPassThrough(text: Value) {
	String(text).split(",").forEach(command=> {
		writer.block(command);
	});
}
//CLOSE
function onClose() {
	optionalSection = false;

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
	if (!machineConfiguration.hasHomePositionX() && !machineConfiguration.hasHomePositionY()) {
		writer.block(formats.g.format(53),"X" + formats.xyz.format(-25.));//G53 MACHINE COORD X-25.
		writer.block(formats.g.format(53),"Y" + formats.xyz.format(0));//G53 MACHINE COORD Y0
	} else {
		var homeX;
		if (machineConfiguration.hasHomePositionX()) {
			homeX = "X" + formats.xyz.format(machineConfiguration.getHomePositionX());
		}
		var homeY;
		if (machineConfiguration.hasHomePositionY()) {
			homeY = "Y" + formats.xyz.format(machineConfiguration.getHomePositionY());
		}
		writer.block(modals.abs.format(90),formats.g.format(53),modals.motion.format(0),homeX,homeY);//G90 ABSOLUTE G53 MACHINE COORD G0 POSITION X0 Y0
	}

	onImpliedCommand(COMMAND.END);
	onImpliedCommand(COMMAND.STOP_SPINDLE);
	//END PROGRAM
	writer.block(formats.m.format(30));//M30 END PROGRAM
	//END FILE
	writeln("%");//% END FILE
}