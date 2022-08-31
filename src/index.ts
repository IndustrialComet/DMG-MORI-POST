/// <reference path="./types/index.d.ts" />
/**
	Copyright (C) 2012-2016 by Autodesk, Inc.
	All rights reserved.

	Mitsubishi post processor configuration.

	$Revision: 41219 005532ae5e98d01a137e4416fcc3a06548d1c11d $
	$Date: 2016-10-27 16:04:24 $
	
	FORKID {04622D27-72F0-45d4-85FB-DB346FD1AE22}
*/

description = "MORI-5100";
//longDescription = "POST FOR 3/5-AXIS DMG-MORI 5100.";

legal = "COPYRIGHT (C) 2022 BY RENO WARNER";

vendor = "FANUC";
vendorUrl = "https://www.fanuc.com/";

certificationLevel = 2;
minimumRevision = 24000;

extension = "nc";
programNameIsInteger = false;
setCodePage("ascii");

capabilities = CAPABILITY_MILLING;
tolerance = spatial(0.002, MM);

minimumChordLength = spatial(0.01, MM);
minimumCircularRadius = spatial(0.01, MM);
maximumCircularRadius = spatial(1000, MM);
minimumCircularSweep = toRad(0.01);
maximumCircularSweep = toRad(360);

allowHelicalMoves = true;
allowedCircularPlanes = undefined; // allow any circular motion

//USER PROPERTIES
properties = {
	writeMachine: false, // write machine
	writeTools: false, // writes the tools
	preloadTool: true, // preloads next tool on tool change if any
	showSequenceNumbers: false, // show sequence numbers
	sequenceNumberStart: 10, // first sequence number
	sequenceNumberIncrement: 5, // increment for sequence numbers
	optionalStop: true, // optional stop
	o8: false, // specifies 8-digit program number
	separateWordsWithSpace: false, // specifies that the words should be separated with a white space
	allow3DArcs: false, // specifies that 3D circular arcs are allowed
	useRadius: false, // specifies that arcs should be output using the radius (R word) instead of the I, J, and K words
	forceIJK: false, // force output of IJK for G2/G3 when not using R word
	useParametricFeed: false, // specifies that feed should be output using Q values
	showNotes: false, // specifies that operation notes should be output
	useSmoothing: false, // specifies if smoothing should be used or not
	usePitchForTapping: true, // enable to use pitch instead of feed for the F-word for canned tapping cycles - note that your CNC control must be setup for pitch mode!
	useG95: false, // use IPR/MPR instead of IPM/MPM
	toolBreakageTolerance: 0.01, // value for which tool break detection will raise an alarm
	useG54x4: false // Fanuc 30i supports G54.4 for Workpiece Error Compensation
};

var permittedCommentChars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,=_-/*#:";

//FORMATS
var formats = {
	//COMMANDS
	g: createFormat({prefix:"G", decimals:1}),
	m: createFormat({prefix:"M", decimals:1}),
	p: createFormat({prefix:"P", decimals:1}),
	h: createFormat({prefix:"H", decimals:1}),
	d: createFormat({prefix:"D", decimals:1}),
	o: createFormat({width:(properties.o8 ? 8 : 4), zeropad:true, decimals:0}),
	//RADIUS
	r: createFormat({decimals:(unit == MM ? 3 : 4), trimLeadZero:true, forceDecimal:true}),// THIS COULD BE AN ISSUE;
	//UNIT VECTORS
	xyz: createFormat({decimals:(unit == MM ? 3 : 4), trimLeadZero:true, forceDecimal:true}),
	ijk: createFormat({decimals:6, forceDecimal:true}),
	abc: createFormat({decimals:3, forceDecimal:true, scale:DEG}),
	//TIME
	milliseconds: createFormat({decimals:0}),
	seconds: createFormat({decimals:3, forceDecimal:true}),
	//ANGLE
	taper: createFormat({decimals:1, scale:DEG}),
	//DRILLING
	feed: createFormat({decimals:(unit == MM ? 0 : 1), forceDecimal:true}),
	pitch:createFormat({decimals:(unit == MM ? 3 : 4), forceDecimal:true}),
	rpm: createFormat({decimals:0}),
	//TOOLS
	tool: createFormat({decimals:0}),
	probe: createFormat({decimals:3, zeropad:true, width:3, forceDecimal:true}),
};
//OUTPUTS
var outputs = {
	x: createVariable({prefix:"X"}, formats.xyz),
	y: createVariable({prefix:"Y"}, formats.xyz),
	z: createVariable({prefix:"Z"}, formats.xyz),
	i: createReferenceVariable({prefix:"I"}, formats.ijk),
	j: createReferenceVariable({prefix:"J"}, formats.ijk),
	k: createReferenceVariable({prefix:"K"}, formats.ijk),
	a: createVariable({prefix:"A"}, formats.abc),
	b: createVariable({prefix:"B"}, formats.abc),
	c: createVariable({prefix:"C"}, formats.abc),
	feed: createVariable({prefix:"F"}, formats.feed),
	pitch: createVariable({prefix:"F", force:true}, formats.pitch),
	spindle: createVariable({prefix:"S", force:true}, formats.rpm),
	d: createVariable({}, formats.d),
}
//MODALS
var modals = {
	motion: createModal({}, formats.g),// G0-G3
	plane:createModal({onchange:function () {modals.motion.reset();}}, formats.g),// G17-19
	abs: createModal({}, formats.g),// G90-91
	feed: createModal({}, formats.g),// G94-95
	unit: createModal({}, formats.g),// G20-21
	cycle: createModal({}, formats.g),// G81
	retraction: createModal({}, formats.g),// G98-99
	rotation: createModal({force:true}, formats.g),// G68-G69
}

// fixed settings
var firstFeedParameter = 500;
var useMultiAxisFeatures = true;
var forceMultiAxisIndexing = false; // force multi-axis indexing for 3D programs

var WARNING_WORK_OFFSET = 0;

var ANGLE_PROBE_NOT_SUPPORTED = 0;
var ANGLE_PROBE_USE_ROTATION = 1;
var ANGLE_PROBE_USE_CAXIS = 2;

// collected state
var sequenceNumber: number;
var currentWorkOffset: number;
var optionalSection = false;
var forceSpindleSpeed = false;
var activeMovements; // do not use by default
var currentFeedId: number | undefined;
var g68RotationMode = 0;
var angularProbingMode;
var now = new Date();
var wfo;

/**
	Writes the specified block.
*/
function writeBlock(...args : string[]) {
	if (properties.showSequenceNumbers) {
	if (optionalSection) {
		var text = formatWords(args);
		if (text) {
		writeWords("/", "N" + sequenceNumber, text);
		}
	} else {
		writeWords2("N" + sequenceNumber, args);
	}
	sequenceNumber += properties.sequenceNumberIncrement;
	} else {
	if (optionalSection) {
		writeWords2("/", args);
	} else {
		writeWords(args);
	}
	}
}

/**
	Writes the specified optional block.
*/
function writeOptionalBlock() {
	if (properties.showSequenceNumbers) {
	var words = formatWords(arguments);
	if (words) {
		writeWords("/", "N" + sequenceNumber, words);
		sequenceNumber += properties.sequenceNumberIncrement;
	}
	} else {
	writeWords2("/", arguments);
	}
}

function formatComment(text: string) {
	return "(" + filterText(String(text).toUpperCase(), permittedCommentChars).replace(/[\(\)]/g, "") + ")";
}

/**
	Output a comment.
*/
function writeComment(text: string) {
	writeln(formatComment(text));
}

function onOpen() {

	if (false) { // note: setup your machine here
	var aAxis = createAxis({coordinate:0, table:false, axis:[1, 0, 0], range:[-360,360], preference:1});
	var cAxis = createAxis({coordinate:2, table:false, axis:[0, 0, 1], range:[-360,360], preference:1});
	machineConfiguration = new MachineConfiguration(aAxis, cAxis);

	setMachineConfiguration(machineConfiguration);
	optimizeMachineAngles2(0); // TCP mode
	}

	if (!machineConfiguration.isMachineCoordinate(0)) {
		outputs.a.disable();
	}
	if (!machineConfiguration.isMachineCoordinate(1)) {
		outputs.b.disable();
	}
	if (!machineConfiguration.isMachineCoordinate(2)) {
		outputs.c.disable();
	}
	
	if (!properties.separateWordsWithSpace) {
	setWordSeparator("");
	}

	if (properties.forceIJK) {
	outputs.i = createReferenceVariable({prefix:"I", force:true}, formats.ijk);
	outputs.j = createReferenceVariable({prefix:"J", force:true}, formats.ijk);
	outputs.k = createReferenceVariable({prefix:"K", force:true}, formats.ijk);
	}

	sequenceNumber = properties.sequenceNumberStart;
	writeln("%");

	if (programComment) {
		var programId;
		try {
			programId = getAsInt(programComment);
		} catch(e) {
			error(localize("Program name must be a number."));
			return;
		}
		if (properties.o8) {
			if (!((programId >= 1) && (programId <= 99999999))) {
				error(localize("Program number is out of range."));
				return;
			}
		} else {
			if (!((programId >= 1) && (programId <= 9999))) {
				error(localize("Program number is out of range."));
				return;
			}
		}
		if ((programId >= 8000) && (programId <= 9999)) {
			warning(localize("Program number is reserved by tool builder."));
		}
		if (programName) {
			writeln("O" + formats.o.format(programId) + " (" + filterText(String(programName).toUpperCase(), permittedCommentChars) + ")");
		} else {
			writeln("O" + formats.o.format(programId));
		}
	} else {
	//error(localize("Program name has not been specified."));
	return;
	}

	// dump machine configuration// 
	var vendor = machineConfiguration.getVendor();
	var model = machineConfiguration.getModel();
	var description = machineConfiguration.getDescription();

	if (properties.writeMachine) {
		writeComment(localize("Machine"));
		writeComment("  " + localize("vendor") + ": " + vendor);
		writeComment("  " + localize("model") + ": " + model);
		writeComment("  " + localize("description") + ": "  + description);
	}

	// dump tool formats.inion
	if (properties.writeTools) {
		var zRanges = {};
		if (is3D()) {
			var numberOfSections = getNumberOfSections();
			for (var i = 0; i < numberOfSections; ++i) {
			var section = getSection(i);
			var zRange = section.getGlobalZRange();
			var tool = section.getTool();
			if (zRanges[tool.number]) {
				zRanges[tool.number].expandToRange(zRange);
			} else {
				zRanges[tool.number] = zRange;
			}
			}
		}

		var tools = getToolTable();
		if (tools.getNumberOfTools() > 0) {
			for (var i = 0; i < tools.getNumberOfTools(); ++i) {
			var tool = tools.getTool(i);
			var comment = "T" + formats.tool.format(tool.number) + " " +
				"D=" + formats.xyz.format(tool.diameter) + " " +
				localize("CR") + "=" + formats.xyz.format(tool.cornerRadius);
			if ((tool.taperAngle > 0) && (tool.taperAngle < Math.PI)) {
				comment += " " + localize("TAPER") + "=" + formats.taper.format(tool.taperAngle) + localize("deg");
			}
			if (zRanges[tool.number]) {
				comment += " - " + localize("ZMIN") + "=" + formats.xyz.format(zRanges[tool.number].getMinimum());
			}
			comment += " - " + getToolTypeName(tool.type);
			writeComment(comment);
			}
		}
	}
	
	if (false) {
		// check for duplicate tool number
		for (var i = 0; i < getNumberOfSections(); ++i) {
			var sectioni = getSection(i);
			var tooli = sectioni.getTool();
			for (var j = i + 1; j < getNumberOfSections(); ++j) {
			var sectionj = getSection(j);
			var toolj = sectionj.getTool();
			if (tooli.number == toolj.number) {
				if (formats.xyz.areDifferent(tooli.diameter, toolj.diameter) ||
					formats.xyz.areDifferent(tooli.cornerRadius, toolj.cornerRadius) ||
					formats.abc.areDifferent(tooli.taperAngle, toolj.taperAngle) ||
					(tooli.numberOfFlutes != toolj.numberOfFlutes)) {
				error(
					subst(
					localize("Using the same tool number for different cutter geometry for operation '%1' and '%2'."),
					sectioni.hasParameter("operation-comment") ? sectioni.getParameter("operation-comment") : ("#" + (i + 1)),
					sectionj.hasParameter("operation-comment") ? sectionj.getParameter("operation-comment") : ("#" + (j + 1))
					)
				);
				return;
				}
			}
			}
		}
	}
	
	writeComment((now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + now.getHours() + ":" + ('0'+now.getMinutes()).slice(-2));
	// absolute coordinates and feed per min
	writeBlock(modals.plane.format(17), formats.g.format(40), formats.g.format(80), modals.abs.format(90));

	switch (unit) {
		case IN:
			writeBlock(modals.unit.format(20));
			break;
		case MM:
			writeBlock(modals.unit.format(21));
			writeBlock(formats.m.format(0));//SEE WHY THIS IS M0
			writeComment("PROGRAM IS METRIC");
			break;
	}
	
	if (properties.useG95 && properties.useParametricFeed) {
		error(localize("Parametric feed is not supported when using G95."));
		return;
	}

	if (properties.useG95) {//G95 Feed mm/ev //inches per rev
		formats.feed = createFormat({decimals:(unit == MM ? 4 : 5), forceDecimal:true});
		outputs.feed = createVariable({prefix:"F"}, formats.feed);
	}
}

function onComment(message: string) {
	var comments = message.split(";").forEach(comment=> {
		writeComment(comment)
	});
}

/** Force output of X, Y, and Z. */
function forceXYZ() {
	outputs.x.reset();
	outputs.y.reset();
	outputs.z.reset();
}

/** Force output of A, B, and C. */
function forceABC() {
	outputs.a.reset();
	outputs.b.reset();
	outputs.c.reset();
}

function forceFeed() {
	currentFeedId = undefined;
	outputs.feed.reset();
}

/** Force output of X, Y, Z, A, B, C, and F on next output. */
function forceAny() {
	forceXYZ();
	forceABC();
	forceFeed();
}

var lengthCompensationActive = false;
var retracted = false; // specifies that the tool has been retracted to the safe plane
/** Disables length compensation if currently active or if forced. */

function disableLengthCompensation(force) {
	if (lengthCompensationActive || force) {
	//validate(retracted, "Cannot cancel length compensation if the machine is not fully retracted.");
	 // writeBlock(formats.g.format(49));
	lengthCompensationActive = false;
	}
}

var currentSmoothing = false;

function setSmoothing(mode) {
	if (mode == currentSmoothing) {
	return false;
	}

	// 1) Make sure G49 is called before the execution of G05.1 Q1 Rx
	// 2) G05.1 Q1 Rx must be engaged BEFORE G43-Tool Length Comp
	// 3) AICC and AIAPC need to be turned on and off for each tool
	// 4) AICC and AIAPC does not apply to canned drilling cycles
 // validate(!lengthCompensationActive, "Length compensation is active while trying to update smoothing.");

	currentSmoothing = mode;
	writeBlock(formats.g.format(5.1), mode ? "Q1" : "Q0");
	writeBlock(formats.g.format(332), "R3.");
	return true;
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

function getFeed(f) {
	if (properties.useG95) {
	return outputs.feed.format(f/spindleSpeed); // use feed value
	}
	if (activeMovements) {
	var feedContext = activeMovements[movement];
	if (feedContext != undefined) {
		if (!formats.feed.areDifferent(feedContext.feed, f)) {
		if (feedContext.id == currentFeedId) {
			return ""; // nothing has changed
		}
		forceFeed();
		currentFeedId = feedContext.id;
		return "F#" + (firstFeedParameter + feedContext.id);
		}
	}
	currentFeedId = undefined; // force Q feed next time
	}
	return outputs.feed.format(f); // use feed value
}

function initializeActiveFeeds() {
	activeMovements = new Array();
	var movements = currentSection.getMovements();
	
	var id = 0;
	var activeFeeds = new Array();
	if (hasParameter("operation:tool_feedCutting")) {
	if (movements & ((1 << MOVEMENT_CUTTING) | (1 << MOVEMENT_LINK_TRANSITION) | (1 << MOVEMENT_EXTENDED))) {
		var feedContext = new FeedContext(id, localize("Cutting"), getParameter("operation:tool_feedCutting"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_CUTTING] = feedContext;
		activeMovements[MOVEMENT_LINK_TRANSITION] = feedContext;
		activeMovements[MOVEMENT_EXTENDED] = feedContext;
	}
	++id;
	if (movements & (1 << MOVEMENT_PREDRILL)) {
		feedContext = new FeedContext(id, localize("Predrilling"), getParameter("operation:tool_feedCutting"));
		activeMovements[MOVEMENT_PREDRILL] = feedContext;
		activeFeeds.push(feedContext);
	}
	++id;
	}
	
	if (hasParameter("operation:finishFeedrate")) {
	if (movements & (1 << MOVEMENT_FINISH_CUTTING)) {
		var feedContext = new FeedContext(id, localize("Finish"), getParameter("operation:finishFeedrate"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_FINISH_CUTTING] = feedContext;
	}
	++id;
	} else if (hasParameter("operation:tool_feedCutting")) {
	if (movements & (1 << MOVEMENT_FINISH_CUTTING)) {
		var feedContext = new FeedContext(id, localize("Finish"), getParameter("operation:tool_feedCutting"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_FINISH_CUTTING] = feedContext;
	}
	++id;
	}
	
	if (hasParameter("operation:tool_feedEntry")) {
	if (movements & (1 << MOVEMENT_LEAD_IN)) {
		var feedContext = new FeedContext(id, localize("Entry"), getParameter("operation:tool_feedEntry"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_LEAD_IN] = feedContext;
	}
	++id;
	}

	if (hasParameter("operation:tool_feedExit")) {
	if (movements & (1 << MOVEMENT_LEAD_OUT)) {
		var feedContext = new FeedContext(id, localize("Exit"), getParameter("operation:tool_feedExit"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_LEAD_OUT] = feedContext;
	}
	++id;
	}

	if (hasParameter("operation:noEngagementFeedrate")) {
	if (movements & (1 << MOVEMENT_LINK_DIRECT)) {
		var feedContext = new FeedContext(id, localize("Direct"), getParameter("operation:noEngagementFeedrate"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_LINK_DIRECT] = feedContext;
	}
	++id;
	} else if (hasParameter("operation:tool_feedCutting") &&
			 hasParameter("operation:tool_feedEntry") &&
			 hasParameter("operation:tool_feedExit")) {
	if (movements & (1 << MOVEMENT_LINK_DIRECT)) {
		var feedContext = new FeedContext(id, localize("Direct"), Math.max(getParameter("operation:tool_feedCutting"), getParameter("operation:tool_feedEntry"), getParameter("operation:tool_feedExit")));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_LINK_DIRECT] = feedContext;
	}
	++id;
	}
	
	if (hasParameter("operation:reducedFeedrate")) {
	if (movements & (1 << MOVEMENT_REDUCED)) {
		var feedContext = new FeedContext(id, localize("Reduced"), getParameter("operation:reducedFeedrate"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_REDUCED] = feedContext;
	}
	++id;
	}

	if (hasParameter("operation:tool_feedRamp")) {
	if (movements & ((1 << MOVEMENT_RAMP) | (1 << MOVEMENT_RAMP_HELIX) | (1 << MOVEMENT_RAMP_PROFILE) | (1 << MOVEMENT_RAMP_ZIG_ZAG))) {
		var feedContext = new FeedContext(id, localize("Ramping"), getParameter("operation:tool_feedRamp"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_RAMP] = feedContext;
		activeMovements[MOVEMENT_RAMP_HELIX] = feedContext;
		activeMovements[MOVEMENT_RAMP_PROFILE] = feedContext;
		activeMovements[MOVEMENT_RAMP_ZIG_ZAG] = feedContext;
	}
	++id;
	}
	if (hasParameter("operation:tool_feedPlunge")) {
	if (movements & (1 << MOVEMENT_PLUNGE)) {
		var feedContext = new FeedContext(id, localize("Plunge"), getParameter("operation:tool_feedPlunge"));
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_PLUNGE] = feedContext;
	}
	++id;
	}
	if (true) { // high feed
	if (movements & (1 << MOVEMENT_HIGH_FEED)) {
		var feedContext = new FeedContext(id, localize("High Feed"), this.highFeedrate);
		activeFeeds.push(feedContext);
		activeMovements[MOVEMENT_HIGH_FEED] = feedContext;
	}
	++id;
	}
	
	for (var i = 0; i < activeFeeds.length; ++i) {
	var feedContext = activeFeeds[i];
	writeBlock("#" + (firstFeedParameter + feedContext.id) + "=" + formats.feed.format(feedContext.feed), formatComment(feedContext.description));
	}
}

var currentWorkPlaneABC = Vector | null;

function forceWorkPlane() {
	currentWorkPlaneABC = null;
}

function setWorkPlane(abc: Vector) {
	if (!forceMultiAxisIndexing && is3D() && !machineConfiguration.isMultiAxisConfiguration()) {
	return; // ignore
	}

	if (!((currentWorkPlaneABC == null) ||
		formats.abc.areDifferent(abc.x, currentWorkPlaneABC.x) ||
		formats.abc.areDifferent(abc.y, currentWorkPlaneABC.y) ||
		formats.abc.areDifferent(abc.z, currentWorkPlaneABC.z))) {
	return; // no change
	}

	onCommand(COMMAND_UNLOCK_MULTI_AXIS);

	if (useMultiAxisFeatures) {
	if (abc.isNonZero()) {
		writeBlock(formats.g.format(68.2), "X" + formats.xyz.format(0), "Y" + formats.xyz.format(0), "Z" + formats.xyz.format(0), "I" + formats.abc.format(abc.x), "J" + formats.abc.format(abc.y), "K" + formats.abc.format(abc.z)); // set frame
		writeBlock(formats.g.format(53.1)); // turn machine
	} else {
		writeBlock(formats.g.format(69)); // cancel frame
	}
	} else {
	modals.motion.reset();
	writeBlock(
		modals.motion.format(0),
		conditional(machineConfiguration.isMachineCoordinate(0), "A" + formats.abc.format(abc.x)),
		conditional(machineConfiguration.isMachineCoordinate(1), "B" + formats.abc.format(abc.y)),
		conditional(machineConfiguration.isMachineCoordinate(2), "C" + formats.abc.format(abc.z))
	);
	}
	
	onCommand(COMMAND_LOCK_MULTI_AXIS);

	currentWorkPlaneABC = abc;
}

var closestABC = false; // choose closest machine angles
var currentMachineABC;

function getWorkPlaneMachineABC(workPlane) {
	var W = workPlane; // map to global frame

	var abc = machineConfiguration.getABC(W);
	if (closestABC) {
	if (currentMachineABC) {
		abc = machineConfiguration.remapToABC(abc, currentMachineABC);
	} else {
		abc = machineConfiguration.getPreferredABC(abc);
	}
	} else {
	abc = machineConfiguration.getPreferredABC(abc);
	}
	
	try {
	abc = machineConfiguration.remapABC(abc);
	currentMachineABC = abc;
	} catch (e) {
	error(
		localize("Machine angles not supported") + ":"
		+ conditional(machineConfiguration.isMachineCoordinate(0), " A" + formats.abc.format(abc.x))
		+ conditional(machineConfiguration.isMachineCoordinate(1), " B" + formats.abc.format(abc.y))
		+ conditional(machineConfiguration.isMachineCoordinate(2), " C" + formats.abc.format(abc.z))
	);
	}
	
	var direction = machineConfiguration.getDirection(abc);
	if (!isSameDirection(direction, W.forward)) {
	error(localize("Orientation not supported."));
	}
	
	if (!machineConfiguration.isABCSupported(abc)) {
	error(
		localize("Work plane is not supported") + ":"
		+ conditional(machineConfiguration.isMachineCoordinate(0), " A" + formats.abc.format(abc.x))
		+ conditional(machineConfiguration.isMachineCoordinate(1), " B" + formats.abc.format(abc.y))
		+ conditional(machineConfiguration.isMachineCoordinate(2), " C" + formats.abc.format(abc.z))
	);
	}

	var tcp = false;
	if (tcp) {
	setRotation(W); // TCP mode
	} else {
	var O = machineConfiguration.getOrientation(abc);
	var R = machineConfiguration.getRemainingOrientation(abc, W);
	setRotation(R);
	}
	
	return abc;
}

function isProbeOperation() {
	return (hasParameter("operation-strategy") && getParameter("operation-strategy") == "probe");
}

var probeOutputWorkOffset = 1;

function onParameter(name, value) {
	if (name == "probe-output-work-offset") {
	probeOutputWorkOffset = (value > 0) ? value : 1;
	}
}

function onSection() {
	var forceToolAndRetract = optionalSection && !currentSection.isOptional();
	optionalSection = currentSection.isOptional();

	var insertToolCall = forceToolAndRetract || isFirstSection() ||
	currentSection.getForceToolChange && currentSection.getForceToolChange() ||
	(tool.number != getPreviousSection().getTool().number);
	
	var newWorkOffset = isFirstSection() ||
	(getPreviousSection().workOffset != currentSection.workOffset); // work offset changes
	var newWorkPlane = isFirstSection() ||
	!isSameDirection(getPreviousSection().getGlobalFinalToolAxis(), currentSection.getGlobalInitialToolAxis());
	var forceSmoothing = properties.useSmoothing &&
	(hasParameter("operation-strategy") && (getParameter("operation-strategy") == "drill") ||
	!isFirstSection() && getPreviousSection().hasParameter("operation-strategy") && (getPreviousSection().getParameter("operation-strategy") == "drill")); // force smoothing in case !insertToolCall (2d chamfer)
	if (insertToolCall || newWorkOffset || newWorkPlane || forceSmoothing) {
	
	/*
	// stop spindle before retract during tool change
	if (insertToolCall && !isFirstSection()) {
		onCommand(COMMAND_STOP_SPINDLE);
	}
	*/
	// retract to safe plane
	retracted = true;
	onCommand(COMMAND_COOLANT_OFF);
	writeBlock(modals.feed.format(0), formats.g.format(49)); 
	writeBlock(formats.g.format(53), "Z" + formats.xyz.format(0), formats.m.format(19)); // retract
	writeBlock(modals.abs.format(90));
	forceXYZ();
	//if ((insertToolCall && !isFirstSection()) || forceSmoothing) {
	 // disableLengthCompensation();
		setSmoothing(false);
	//}
	}

	//writeln("");
/*
	if (hasParameter("operation-comment")) {
	var comment = getParameter("operation-comment");
	if (comment) {
		writeComment(comment);
	}
	}
	*/
	if (properties.showNotes && hasParameter("notes")) {
	var notes = getParameter("notes");
	if (notes) {
		var lines = String(notes).split("\n");
		var r1 = new RegExp("^[\\s]+", "g");
		var r2 = new RegExp("[\\s]+$", "g");
		for (line in lines) {
		var comment = lines[line].replace(r1, "").replace(r2, "");
		if (comment) {
			writeComment(comment);
		}
		}
	}
	}
	
	if (insertToolCall) {
	forceWorkPlane();
	
	retracted = true;
	onCommand(COMMAND_COOLANT_OFF);
	
	if (properties.optionalStop) {
		onCommand(COMMAND_OPTIONAL_STOP);
	}
/*
	 if (!isFirstSection() && properties.optionalStop) {
		onCommand(COMMAND_OPTIONAL_STOP);
	}
	*/
	if (tool.number > 99) {
		warning(localize("Tool number exceeds maximum value."));
	}

	disableLengthCompensation();
	writeBlock("T" + formats.tool.format(tool.number), formats.m.format(6), conditional(tool.description, formatComment(tool.description)));
	if (tool.comment) {
		writeComment(tool.comment);
	}
	var showToolZMin = false;
	if (showToolZMin) {
		if (is3D()) {
		var numberOfSections = getNumberOfSections();
		var zRange = currentSection.getGlobalZRange();
		var number = tool.number;
		for (var i = currentSection.getId() + 1; i < numberOfSections; ++i) {
			var section = getSection(i);
			if (section.getTool().number != number) {
			break;
			}
			zRange.expandToRange(section.getGlobalZRange());
		}
		writeComment(localize("ZMIN") + "=" + zRange.getMinimum());
		}
	}
/*
	if (properties.preloadTool) {
		var nextTool = getNextTool(tool.number);
		if (nextTool) {
		writeBlock("T" + formats.tool.format(nextTool.number));
		} else {
		// preload first tool
		var section = getSection(0);
		var firstToolNumber = section.getTool().number;
		if (tool.number != firstToolNumber) {
			writeBlock("T" + formats.tool.format(firstToolNumber));
		}
		}
	}
	*/
	}
	
	if (!isProbeOperation() &&
		(insertToolCall ||
		 forceSpindleSpeed ||
		 isFirstSection() ||
		 (formats.rpm.areDifferent(tool.spindleRPM, outputs.s.getCurrent())) ||
		 (tool.clockwise != getPreviousSection().getTool().clockwise))) {
	forceSpindleSpeed = false;
	
	if (tool.spindleRPM < 1) {
		error(localize("Spindle speed out of range."));
		return;
	}
	if (tool.spindleRPM > 99999) {
		warning(localize("Spindle speed exceeds maximum value."));
	}
	//writeBlock(
	 // outputs.s.format(tool.spindleRPM), formats.m.format(tool.clockwise ? 3 : 4)
	//);

	onCommand(COMMAND_START_CHIP_TRANSPORT);
	if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) {
		// writeBlock(formats.m.format(xxx)); // shortest path traverse
	}
	}

	// wcs
	if (properties.preloadTool) {
		var nextTool = getNextTool(tool.number);
		if (nextTool) {
		nextTool = formats.tool.format(nextTool.number); //Store next tool
		} else {
		// preload first tool
		var section = getSection(0);
		var firstToolNumber = section.getTool().number;
		if (tool.number != firstToolNumber) {
			nextTool = formats.tool.format(firstToolNumber);//Store next tool
		}
		}
	}
	var workOffset = currentSection.workOffset;
	if (workOffset == 0) {
		warning(localize("Work offset has not been specified. Using G54 as WCS."), WARNING_WORK_OFFSET);
		workOffset = 1;
	}
	if (workOffset > 0) {
		if (workOffset > 6) {
			var p = workOffset - 6; // 1->...
			if (p > 300) {
			error(localize("Work offset out of range."));
			return;
			} else {
				var wfo =(formats.g.format(54.1) + " P" + p); // G54.1P
				currentWorkOffset = workOffset;
			 }
		} 
	//Block deleted next 6 blocks to not output G5x once only. Moved the formats.g line to positioning line (approx N852) STM 1/31/15
		else {
		var wfo = (formats.g.format(53 + workOffset)); // G54->G59
		currentWorkOffset = workOffset;
		}
	}

	forceXYZ();

	if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) { // use 5-axis indexing for multi-axis mode
	// set working plane after datum shift

	if (currentSection.isMultiAxis()) {
		forceWorkPlane();
		formats.cancelTransion();
	} else {
		var abc = new Vector(0, 0, 0);
		if (useMultiAxisFeatures) {
		var eulerXYZ = currentSection.workPlane.getTransposed().eulerZYX_R;
			abc = new Vector(-eulerXYZ.x, -eulerXYZ.y, -eulerXYZ.z);
		formats.cancelTransion();
		} else {
			abc = getWorkPlaneMachineABC(currentSection.workPlane);
		}
		setWorkPlane(abc);
	}
	} else { // pure 3D
		var remaining = currentSection.workPlane;
		if (!isSameDirection(remaining.forward, new Vector(0, 0, 1))) {
			error(localize("Tool orientation is not supported."));
			return;
		}
		setRotation(remaining);
	}

	// set coolant after we have positioned at Z
	//setCoolant(tool.coolant);

	if (properties.useSmoothing) {
	if (hasParameter("operation-strategy") && (getParameter("operation-strategy") != "drill")) {
		if (setSmoothing(true)) {
		// we force G43 using lengthCompensationActive
		}
	} else {
		if (setSmoothing(false)) {
		// we force G43 using lengthCompensationActive
		}
	}
	}

	forceAny();
	modals.motion.reset();

	var initialPosition = getFramePosition(currentSection.getInitialPosition());
	if (!retracted) {
	if (getCurrentPosition().z < initialPosition.z) {
		writeBlock(modals.motion.format(0), outputs.z.format(initialPosition.z));
	}
	}

	if (insertToolCall || !lengthCompensationActive || retracted || (!isFirstSection() && getPreviousSection().isMultiAxis())) {
	var lengthOffset = tool.lengthOffset;
	if (lengthOffset > 99) {
		error(localize("Length offset out of range."));
		return;
	}

	modals.motion.reset();
	writeBlock(modals.plane.format(17));
	
	if (!machineConfiguration.isHeadConfiguration()) {
		writeBlock(
		modals.abs.format(0),
		modals.abs.format(90), wfo, outputs.x.format(initialPosition.x), outputs.y.format(initialPosition.y),
		outputs.s.format(tool.spindleRPM), formats.m.format(tool.clockwise ? 3 : 4));
	 writeBlock(
		modals.motion.format(0), 
		conditional(insertToolCall, formats.g.format(currentSection.isMultiAxis() ? 43.5 : 43)), 
		formats.h.format(lengthOffset),
		outputs.z.format(initialPosition.z),
		setCoolant(tool.coolant), 		
		conditional(insertToolCall), 
		conditional(nextTool, "T" + nextTool)
		);
		//writeBlock(setCoolant(tool.coolant));
		lengthCompensationActive = true;
	}else {
		writeBlock(
		modals.abs.format(90),
		modals.motion.format(0),
		formats.g.format(currentSection.isMultiAxis() ? (machineConfiguration.isMultiAxisConfiguration() ? 43.4 : 43.5) : 43),
		formats.h.format(lengthOffset),
		outputs.x.format(initialPosition.x),
		outputs.y.format(initialPosition.y),
		outputs.z.format(initialPosition.z), 
		setCoolant(tool.coolant),
		conditional(insertToolCall), 
		conditional(nextTool, "T" + nextTool)
		);
	}
	modals.motion.reset();
	} else { 
	if(forceSpindleSpeed ||
		(formats.rpm.areDifferent(tool.spindleRPM, outputs.s.getCurrent())) ||
		(tool.clockwise != getPreviousSection().getTool().clockwise)) {
	 writeBlock(
		 modals.abs.format(90),
		 modals.motion.format(0),
		 outputs.x.format(initialPosition.x),
		 outputs.y.format(initialPosition.y), outputs.s.format(tool.spindleRPM), formats.m.format(tool.clockwise ? 3 : 4), setCoolant(tool.coolant)
	 );
	} else {
		writeBlock(setCoolant(tool.coolant));
		writeBlock(
		modals.abs.format(90),
		modals.motion.format(0),
		outputs.x.format(initialPosition.x),
		outputs.y.format(initialPosition.y)
		);
	 }
	 }
	
	validate(lengthCompensationActive, "Length compensation is not active.");

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
	writeBlock(formats.g.format(65), "P" + 9832); // spin the probe on
	}

	retracted = false;
}

function onDwell(seconds: number) {
	if (seconds > 99999.999) {
		return warning(localize("Dwelling time is out of range."));
	}
	let milliseconds = clamp(1, seconds * 1000, 99999999);
	writeBlock(modals.feed.format(94), formats.g.format(4), "P" + formats.milli.format(milliseconds));
	writeBlock(modals.feed.format(properties.useG95 ? 95 : 94)); // back to G95
}


function onSpindleSpeed(speed: number) {
	writeBlock(outputs.spindle.format(speed));
}

function onCycle() {
	writeBlock(modals.plane.format(17));
}

function getCommonCycle(x: number, y: number, z: number, r: Modal) {
	//forceXYZ(); // force xyz on first drill hole of any cycle
	return [outputs.x.format(x), outputs.y.format(y),
	outputs.z.format(z),
	"R" + formats.xyz.format(r)];
}

/** Convert approach to sign. */
function approach(value) {
	validate((value == "positive") || (value == "negative"), "Invalid approach.");
	return (value == "positive") ? 1 : -1;
}

/**
	Determine if angular probing is supported
*/
function getAngularProbingMode() {
	if (machineConfiguration.isMultiAxisConfiguration()) {
	if (machineConfiguration.isMachineCoordinate(2)) {
		return ANGLE_PROBE_USE_CAXIS;
	} else {
		return ANGLE_PROBE_NOT_SUPPORTED;
	}
	} else {
	return ANGLE_PROBE_USE_ROTATION;
	}
}

/**
	Output rotation offset based on angular probing cycle.
*/
function setProbingAngle() {
	if ((g68RotationMode == 1) || (g68RotationMode == 2)) { // Rotate coordinate system for Angle Probing
	if (!properties.useG54x4) {
		modals.rotation.reset();
		modals.abs.reset();
		writeBlock(
		modals.rotation.format(68), modals.abs.format(90),
		(g68RotationMode == 1) ? "X0" : "X[#135]",
		(g68RotationMode == 1) ? "Y0" : "Y[#136]",
		"Z0", "I0.0", "J0.0", "K1.0", "R[#139]"
		);
		g68RotationMode = 3;
	} else if (angularProbingMode != ANGLE_PROBE_NOT_SUPPORTED) {
		writeBlock("#26010=#135");
		writeBlock("#26011=#136");
		writeBlock("#26012=#137");
		writeBlock("#26015=#139");
		writeBlock(formats.g.format(54.4), "P1");
		g68RotationMode = 0;
	} else {
		error(localize("Angular probing is not supported for this machine configuration."));
		return;
	}
	}
}

function onCyclePoint(x: number, y: number, z: number) {
	var probeWorkOffsetCode;
	if (isProbeOperation()) {
	setCurrentPosition(new Vector(x, y, z));

	var workOffset = probeOutputWorkOffset ? probeOutputWorkOffset : currentWorkOffset;
	if (workOffset > 99) {
		error(localize("Work offset is out of range."));
		return;
	} else if (workOffset > 6) {
		probeWorkOffsetCode = probe100Format.format(workOffset - 6 + 100);
	} else {
		probeWorkOffsetCode = workOffset + "."; // G54->G59
	}
	}

	if (isFirstCyclePoint()) {
	repositionToCycleClearance(cycle, x, y, z);
	
	// return to initial Z which is clearance plane and set absolute mode

	var F = cycle.feedrate;
	if (properties.useG95) {
		F /= spindleSpeed;
	}
	var P = (cycle.dwell == 0) ? 0 : clamp(1, cycle.dwell * 1000, 99999999); // in milliseconds

	modals.retraction.reset();
	
	switch (cycleType) {
	case "drilling":
		writeBlock(
		modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(81),
		getCommonCycle(x, y, z, cycle.retract),
		outputs.feed.format(F)
		);
		break;
	case "counter-boring":
		if (P > 0) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(82),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			outputs.feed.format(F)
		);
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(81),
			getCommonCycle(x, y, z, cycle.retract),
			outputs.feed.format(F)
		);
		}
		break;
	case "chip-breaking":
		// cycle.accumulatedDepth is ignored
		if (P > 0) {
		expandCyclePoint(x, y, z);
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(73),
			getCommonCycle(x, y, z, cycle.retract),
			"Q" + formats.xyz.format(cycle.incrementalDepth),
			outputs.feed.format(F)
		);
		}
		break;
	case "deep-drilling":
		if (P > 0) {
		expandCyclePoint(x, y, z);
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(83),
			getCommonCycle(x, y, z, cycle.retract),
			"Q" + formats.xyz.format(cycle.incrementalDepth),
			// conditional(P > 0, "P" + formats.milli.format(P)),
			outputs.feed.format(F)
		);
		}
		break;
	case "tapping":
		writeBlock(formats.m.format(29), outputs.s.format(tool.spindleRPM));
		if (properties.usePitchForTapping) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.feed.format(95), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND) ? 74 : 84),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			pitcoutputs.h.format(tool.threadPitch)
		);
		forceFeed();
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND) ? 74 : 84),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			outputs.feed.format(F)
		);
		}
		break;
	case "left-tapping":
		writeBlock(formats.m.format(29), outputs.s.format(tool.spindleRPM));
		if (properties.usePitchForTapping) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.feed.format(95), modals.cycle.format(74),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			pitcoutputs.h.format(tool.threadPitch)
		);
		forceFeed();
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(74),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			outputs.feed.format(properties.useG95 ? tool.getTappingFeedrate()/spindleSpeed : tool.getTappingFeedrate())
		);
		}
		break;
	case "right-tapping":
		writeBlock(formats.m.format(29), outputs.s.format(tool.spindleRPM));
		if (properties.usePitchForTapping) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(84),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			pitcoutputs.h.format(tool.threadPitch)
		);
		forceFeed();
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(84),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			outputs.feed.format(properties.useG95 ? tool.getTappingFeedrate()/spindleSpeed : tool.getTappingFeedrate())
		);
		}
		break;
	case "tapping-with-chip-breaking":
	case "left-tapping-with-chip-breaking":
	case "right-tapping-with-chip-breaking":
		writeBlock(formats.m.format(29), outputs.s.format(tool.spindleRPM));
		if (properties.usePitchForTapping) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND ? 74 : 84)),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			"Q" + formats.xyz.format(cycle.incrementalDepth),
			pitcoutputs.h.format(tool.threadPitch)
		);
		forceFeed();
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND ? 74 : 84)),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			"Q" + formats.xyz.format(cycle.incrementalDepth),
			outputs.feed.format(properties.useG95 ? tool.getTappingFeedrate()/spindleSpeed : tool.getTappingFeedrate())
		);
		}
		break;
	case "fine-boring":
		writeBlock(
		modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(76),
		getCommonCycle(x, y, z, cycle.retract),
		"P" + formats.milli.format(P), // not optional
		"Q" + formats.xyz.format(cycle.shift),
		outputs.feed.format(F)
		);
		break;
	case "back-boring":
		var dx = (modals.plane.getCurrent() == 19) ? cycle.backBoreDistance : 0;
		var dy = (modals.plane.getCurrent() == 18) ? cycle.backBoreDistance : 0;
		var dz = (modals.plane.getCurrent() == 17) ? cycle.backBoreDistance : 0;
		writeBlock(
		modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(87),
		getCommonCycle(x - dx, y - dy, z - dz, cycle.bottom),
		"Q" + formats.xyz.format(cycle.shift),
		"P" + formats.milli.format(P), // not optional
		outputs.feed.format(F)
		);
		break;
	case "reaming":
		if (P > 0) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(89),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P),
			outputs.feed.format(F)
		);
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(85),
			getCommonCycle(x, y, z, cycle.retract),
			outputs.feed.format(F)
		);
		}
		break;
	case "stop-boring":
		if (P > 0) {
		expandCyclePoint(x, y, z);
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(86),
			getCommonCycle(x, y, z, cycle.retract),
			outputs.feed.format(F)
		);
		}
		break;
	case "manual-boring":
		writeBlock(
		modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(88),
		getCommonCycle(x, y, z, cycle.retract),
		"P" + formats.milli.format(P), // not optional
		outputs.feed.format(F)
		);
		break;
	case "boring":
		if (P > 0) {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(89),
			getCommonCycle(x, y, z, cycle.retract),
			"P" + formats.milli.format(P), // not optional
			outputs.feed.format(F)
		);
		} else {
		writeBlock(
			modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(85),
			getCommonCycle(x, y, z, cycle.retract),
			outputs.feed.format(F)
		);
		}
		break;
		
	case "probing-x":
		forceXYZ();
		// move slowly always from clearance not retract
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9811,
		"X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
		);
		break;
	case "probing-y":
		forceXYZ();
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9811,
		"Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
		);
		break;
	case "probing-z":
		forceXYZ();
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(Math.min(z - cycle.depth + cycle.probeClearance, cycle.retract)), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9811,
		"Z" + formats.xyz.format(z - cycle.depth),
		//"Q" + formats.xyz.format(cycle.probeOvertravel),
		"S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolLengthOffset)
		);
		break;
	case "probing-x-wall":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"X" + formats.xyz.format(cycle.width1),
		outputs.z.format(z - cycle.depth),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(cycle.probeClearance),
		"S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
		);
		break;
	case "probing-y-wall":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Y" + formats.xyz.format(cycle.width1),
		outputs.z.format(z - cycle.depth),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(cycle.probeClearance),
		"S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
		);
		break;
	case "probing-x-channel":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"X" + formats.xyz.format(cycle.width1),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		 //not required "R" + formats.xyz.format(cycle.probeClearance),
		"S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
		);
		break;
	case "probing-x-channel-with-island":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"X" + formats.xyz.format(cycle.width1),
		outputs.z.format(z - cycle.depth),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-y-channel":
		outputs.y.reset();
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Y" + formats.xyz.format(cycle.width1),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		 //not required "R" + formats.xyz.format(cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-y-channel-with-island":
		outputs.y.reset();
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Y" + formats.xyz.format(cycle.width1),
		outputs.z.format(z - cycle.depth),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-xy-circular-boss":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9814,
		"D" + formats.xyz.format(cycle.width1),
		"Z" + formats.xyz.format(z - cycle.depth),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-xy-circular-hole":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9814,
		"D" + formats.xyz.format(cycle.width1),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		 //not required "R" + formats.xyz.format(cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-xy-circular-hole-with-island":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9814,
		"Z" + formats.xyz.format(z - cycle.depth),
		"D" + formats.xyz.format(cycle.width1),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-xy-rectangular-hole":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"X" + formats.xyz.format(cycle.width1),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		// not required "R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Y" + formats.xyz.format(cycle.width2),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		// not required "R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-xy-rectangular-boss":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Z" + formats.xyz.format(z - cycle.depth),
		"X" + formats.xyz.format(cycle.width1),
		"R" + formats.xyz.format(cycle.probeClearance),
		//"Q" + formats.xyz.format(cycle.probeOvertravel),
		"S" + probeWorkOffsetCode
		);
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Z" + formats.xyz.format(z - cycle.depth),
		"Y" + formats.xyz.format(cycle.width2),
		"R" + formats.xyz.format(cycle.probeClearance),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"S" + probeWorkOffsetCode
		);
		break;
	case "probing-xy-rectangular-hole-with-island":
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Z" + formats.xyz.format(z - cycle.depth),
		"X" + formats.xyz.format(cycle.width1),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
		writeBlock(
		formats.g.format(65), "P" + 9812,
		"Z" + formats.xyz.format(z - cycle.depth),
		"Y" + formats.xyz.format(cycle.width2),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		"R" + formats.xyz.format(-cycle.probeClearance),
		"S" + probeWorkOffsetCode
		);
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
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9815, outputs.x.format(cornerX), outputs.y.format(cornerY),
		conditional(cornerI != 0, "I" + formats.xyz.format(cornerI)),
		conditional(cornerJ != 0, "J" + formats.xyz.format(cornerJ)),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE_USE_CAXIS), "S" + probeWorkOffsetCode)
		);
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
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9816, outputs.x.format(cornerX), outputs.y.format(cornerY),
		conditional(cornerI != 0, "I" + formats.xyz.format(cornerI)),
		conditional(cornerJ != 0, "J" + formats.xyz.format(cornerJ)),
		"Q" + formats.xyz.format(cycle.probeOvertravel),
		conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE_USE_CAXIS), "S" + probeWorkOffsetCode)
		);
		break;
	case "probing-x-plane-angle":
		forceXYZ();
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9843,
		"X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),
		"D" + formats.xyz.format(cycle.probeSpacing),
		"Q" + formats.xyz.format(cycle.probeOvertravel)
		);
		g68RotationMode = 1;
		break;
	case "probing-y-plane-angle":
		forceXYZ();
		writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
		writeBlock(
		formats.g.format(65), "P" + 9843,
		"Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter/2)),
		"D" + formats.xyz.format(cycle.probeSpacing),
		"Q" + formats.xyz.format(cycle.probeOvertravel)
		);
		g68RotationMode = 1;
		break;
	default:
		expandCyclePoint(x, y, z);
	}
	} else {
	if (isProbeOperation()) {
		// do nothing
	} else if (cycleExpanded) {
		expandCyclePoint(x, y, z);
	} else {
		writeBlock(outputs.x.format(x), outputs.y.format(y));
	}
	}
}

function onCycleEnd() {
	if (isProbeOperation()) {
	writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(cycle.clearance)); // protected retract move
	writeBlock(formats.g.format(65), "P" + 9833); // spin the probe off
	setProbingAngle(); // define rotation of part
	// we can move in rapid from retract optionally
	} else if (!cycleExpanded) {
	writeBlock(modals.cycle.format(80), modals.feed.format(94));
	outputs.z.reset();
	}
}

var pendingRadiusCompensation = -1;

function onRadiusCompensation() {
	pendingRadiusCompensation = radiusCompensation;
}

function onRapid(_x, _y, _z) {
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	if (x || y || z) {
	if (pendingRadiusCompensation >= 0) {
		error(localize("Radius compensation mode cannot be changed at rapid traversal."));
		return;
	}
	writeBlock(modals.motion.format(0), x, y, z);
	forceFeed();
	}
}

function onLinear(_x, _y, _z, feed) {
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	var f = getFeed(feed);
	if (x || y || z) {
	if (pendingRadiusCompensation >= 0) {
		pendingRadiusCompensation = -1;
		var d = tool.diameterOffset;
		if (d > 99) {
		warning(localize("The diameter offset exceeds the maximum value."));
		}
		writeBlock(modals.plane.format(17));
		switch (radiusCompensation) {
		case RADIUS_COMPENSATION_LEFT:
		outputs.d.reset();
		writeBlock(modals.motion.format(1), formats.g.format(41), outputs.d.format(d), x, y, z, f);
		break;
		case RADIUS_COMPENSATION_RIGHT:
		outputs.d.reset();
		writeBlock(modals.motion.format(1), formats.g.format(42), x, y, z, outputs.d.format(d), f);
		break;
		default:
		writeBlock(modals.motion.format(1), formats.g.format(40), x, y, z, f);
		}
	} else {
		writeBlock(modals.motion.format(1), x, y, z, f);
	}
	} else if (f) {
	if (getNextRecord().isMotion()) { // try not to output feed without motion
		forceFeed(); // force feed on next line
	} else {
		writeBlock(modals.motion.format(1), f);
	}
	}
}

function onRapid5D(_x, _y, _z, _a, _b, _c) {
	if (pendingRadiusCompensation >= 0) {
	error(localize("Radius compensation mode cannot be changed at rapid traversal."));
	return;
	}
	if (currentSection.isOptimizedForMachine()) {
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	var a = outputs.a.format(_a);
	var b = outputs.b.format(_b);
	var c = outputs.c.format(_c);
	writeBlock(modals.motion.format(0), x, y, z, a, b, c);
	} else {
	forceXYZ();
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	var i = formats.ijk.format(_a);
	var j = formats.ijk.format(_b);
	var k = formats.ijk.format(_c);
	writeBlock(modals.motion.format(0), x, y, z, "I" + i, "J" + j, "K" + k);
	}
	forceFeed();
}

function onLinear5D(_x, _y, _z, _a, _b, _c, feed) {
	if (pendingRadiusCompensation >= 0) {
	error(localize("Radius compensation cannot be activated/deactivated for 5-axis move."));
	return;
	}

	if (currentSection.isOptimizedForMachine()) {
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	var a = outputs.a.format(_a);
	var b = outputs.b.format(_b);
	var c = outputs.c.format(_c);
	var f = getFeed(feed);
	if (x || y || z || a || b || c) {
		writeBlock(modals.motion.format(1), x, y, z, a, b, c, f);
	} else if (f) {
		if (getNextRecord().isMotion()) { // try not to output feed without motion
		forceFeed(); // force feed on next line
		} else {
		writeBlock(modals.motion.format(1), f);
		}
	}
	} else {
	forceXYZ();
	var x = outputs.x.format(_x);
	var y = outputs.y.format(_y);
	var z = outputs.z.format(_z);
	var i = formats.ijk.format(_a);
	var j = formats.ijk.format(_b);
	var k = formats.ijk.format(_c);
	var f = getFeed(feed);
	if (x || y || z || i || j || k) {
		writeBlock(modals.motion.format(1), x, y, z, "I" + i, "J" + j, "K" + k, f);
	} else if (f) {
		if (getNextRecord().isMotion()) { // try not to output feed without motion
		forceFeed(); // force feed on next line
		} else {
		writeBlock(modals.motion.format(1), f);
		}
	}
	}
}

/** Adjust final point to lie exactly on circle. */
function CircularData(_plane, _center, _end) {
	// use Output variables, since last point could have been adjusted if previous move was circular
	var start = new Vector(outputs.x.getCurrent(), outputs.y.getCurrent(), outputs.z.getCurrent());
	var saveStart = new Vector(start.x, start.y, start.z);
	var center = new Vector(
	formats.xyz.getResultingValue(_center.x),
	formats.xyz.getResultingValue(_center.y),
	formats.xyz.getResultingValue(_center.z));
	var end = new Vector(_end.x, _end.y, _end.z);
	switch(_plane) {
		case PLANE_XY:
			start.setZ(center.z);
			end.setZ(center.z);
			break;
		case PLANE_ZX:
			start.setY(center.y);
			end.setY(center.y);
			break;
		case PLANE_YZ:
			start.setX(center.x);
			end.setX(center.x);
			break;
		default:
			this.center = new Vector(_center.x, _center.y, _center.z);
			this.start = new Vector(start.x, start.y, start.z);
			this.end = new Vector(_end.x, _end.y, _end.z);
			this.offset = Vector.diff(center, start);
			this.radius = this.offset.length;
			break;
	}
	this.start = new Vector(
	formats.xyz.getResultingValue(start.x),
	formats.xyz.getResultingValue(start.y),
	formats.xyz.getResultingValue(start.z)
	);
	var temp = Vector.diff(center, start);
	this.offset = new Vector(
	formats.xyz.getResultingValue(temp.x),
	formats.xyz.getResultingValue(temp.y),
	formats.xyz.getResultingValue(temp.z)
	);
	this.center = Vector.sum(this.start, this.offset);
	this.radius = this.offset.length;

	temp = Vector.diff(end, center).normalized;
	this.end = new Vector(
	formats.xyz.getResultingValue(this.center.x + temp.x * this.radius),
	formats.xyz.getResultingValue(this.center.y + temp.y * this.radius),
	formats.xyz.getResultingValue(this.center.z + temp.z * this.radius)
	);

	switch(_plane) {
		case PLANE_XY:
		this.start.setZ(saveStart.z);
		this.end.setZ(_end.z);
		this.offset.setZ(0);
		break;
	case PLANE_ZX:
		this.start.setY(saveStart.y);
		this.end.setY(_end.y);
		this.offset.setY(0);
		break;
	case PLANE_YZ:
		this.start.setX(saveStart.x);
		this.end.setX(_end.x);
		this.offset.setX(0);
		break;
	}
}

function onCircular(clockwise, cx, cy, cz, x, y, z, feed) {
	if (pendingRadiusCompensation >= 0) {
	error(localize("Radius compensation cannot be activated/deactivated for a circular move."));
	return;
	}
	var circle = new CircularData(getCircularPlane(), new Vector(cx, cy, cz), new Vector(x, y, z));

	if (isFullCircle()) {
	if (properties.useRadius || isHelical()) { // radius mode does not support full arcs
		linearize(tolerance);
		return;
	}
	switch (getCircularPlane()) {
	case PLANE_XY:
		writeBlock(modals.abs.format(90), modals.plane.format(17), modals.motion.format(clockwise ? 2 : 3),
		outputs.i.format(circle.offset.x, 0), outputs.j.format(circle.offset.y, 0),
		getFeed(feed)
		);
		break;
	case PLANE_ZX:
		writeBlock(modals.abs.format(90), modals.plane.format(18), modals.motion.format(clockwise ? 2 : 3),
		outputs.i.format(circle.offset.x, 0), outputs.k.format(circle.offset.z, 0),
		getFeed(feed)
		);
		break;
	case PLANE_YZ:
		writeBlock(modals.abs.format(90), modals.plane.format(19), modals.motion.format(clockwise ? 2 : 3),
		outputs.j.format(circle.offset.y, 0), outputs.k.format(circle.offset.z, 0),
		getFeed(feed)
		);
		break;
	default:
		linearize(tolerance);
	}
	} else if (!properties.useRadius) {
	switch (getCircularPlane()) {
	case PLANE_XY:
		writeBlock(modals.abs.format(90), modals.plane.format(17), modals.motion.format(clockwise ? 2 : 3),
		outputs.x.format(circle.end.x), outputs.y.format(circle.end.y), outputs.z.format(circle.end.z),
		outputs.i.format(circle.offset.x, 0), outputs.j.format(circle.offset.y, 0),
		getFeed(feed)
		);
		break;
	case PLANE_ZX:
		writeBlock(modals.abs.format(90), modals.plane.format(18), modals.motion.format(clockwise ? 2 : 3),
		outputs.x.format(circle.end.x), outputs.y.format(circle.end.y), outputs.z.format(circle.end.z),
		outputs.i.format(circle.offset.x, 0), outputs.k.format(circle.offset.z, 0),
		getFeed(feed)
		);
		break;
	case PLANE_YZ:
		writeBlock(modals.abs.format(90), modals.plane.format(19), modals.motion.format(clockwise ? 2 : 3),
		 outputs.x.format(circle.end.x), outputs.y.format(circle.end.y), outputs.z.format(circle.end.z),
		 outputs.j.format(circle.offset.y, 0), outputs.k.format(circle.offset.z, 0),
		 getFeed(feed)
		);
		break;
	default:
		if (properties.allow3DArcs) {
		// make sure maximumCircularSweep is well below 360deg
		// we could use G02.4 or G03.4 - direction is calculated
		var ip = getPositionU(0.5);
		writeBlock(modals.abs.format(90), modals.motion.format(clockwise ? 2.4 : 3.4), outputs.x.format(ip.x), outputs.y.format(ip.y), outputs.z.format(ip.z), getFeed(feed));
		writeBlock(outputs.x.format(x), outputs.y.format(y), outputs.z.format(z));
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
	case PLANE_XY:
		writeBlock(modals.plane.format(17), modals.motion.format(clockwise ? 2 : 3),
		outputs.x.format(x), outputs.y.format(y), outputs.z.format(z),
		"R" + formats.r.format(r),
		getFeed(feed)
		);
		break;
	case PLANE_ZX:
		writeBlock(modals.plane.format(18), modals.motion.format(clockwise ? 2 : 3),
		outputs.x.format(x), outputs.y.format(y), outputs.z.format(z),
		"R" + formats.r.format(r),
		getFeed(feed)
		);
		break;
	case PLANE_YZ:
		writeBlock(modals.plane.format(19), modals.motion.format(clockwise ? 2 : 3),
		outputs.x.format(x), outputs.y.format(y), outputs.z.format(z),
		"R" + formats.r.format(r),
		getFeed(feed)
		);
		break;
	default:
		if (properties.allow3DArcs) {
		// make sure maximumCircularSweep is well below 360deg
		// we could use G02.4 or G03.4 - direction is calculated
		var ip = getPositionU(0.5);
		writeBlock(modals.abs.format(90), modals.motion.format(clockwise ? 2.4 : 3.4), outputs.x.format(ip.x), outputs.y.format(ip.y), outputs.z.format(ip.z), getFeed(feed));
		writeBlock(outputs.x.format(x), outputs.y.format(y), outputs.z.format(z));
		} else {
		linearize(tolerance);
		}
	}
	}
}

var currentCoolantMode = COOLANT_DISABLED;

function setCoolant(coolant: COOLANT) {
	if (isProbeOperation()) { // avoid coolant output for probing
		coolant = COOLANT_DISABLED;
	}

	if (coolant == currentCoolantMode) {
		return; // coolant is already active
	}
	
	if (coolant == COOLANT_DISABLED) {
		writeBlock(formats.m.format((currentCoolantMode == COOLANT_THROUGH_TOOL) ? 89 : 9));
		currentCoolantMode = COOLANT_DISABLED;
		return;
	}

	var m;
	switch (coolant) {
		case COOLANT_FLOOD:
			m = 8;
			break;
		case COOLANT_THROUGH_TOOL:
			m = 88;
			break;
		default:
			onUnsupportedCoolant(coolant);
			m = 9;
	}
	if (m) {
		//writeBlock(formats.m.format(m)); //take out the writeblock contained in the function
		currentCoolantMode = coolant;
		return formats.m.format(m); //output as formats.m instead of block 
	}
}

var mapCommand = {
	COMMAND_STOP:0,
	COMMAND_OPTIONAL_STOP:1,
	COMMAND_END:2,
	COMMAND_SPINDLE_CLOCKWISE:3,
	COMMAND_SPINDLE_COUNTERCLOCKWISE:4,
	COMMAND_STOP_SPINDLE:5,
	COMMAND_ORIENTATE_SPINDLE:19
};

function onCommand(command: COMMAND) {
	switch (command) {
	case COMMAND_COOLANT_OFF:
		setCoolant(COOLANT_DISABLED);
		return;
	case RECORD_CIRCULAR://////////////REMOVE /  /.............
		return;
	case COMMAND_COOLANT_ON:
		setCoolant(COOLANT_FLOOD);
	return;
	case COMMAND_STOP:
		writeBlock(formats.m.format(0));
		forceSpindleSpeed = true;
	return;
	case COMMAND_START_SPINDLE:
		onCommand(tool.clockwise ? COMMAND_SPINDLE_CLOCKWISE : COMMAND_SPINDLE_COUNTERCLOCKWISE);
		return;
	case COMMAND_LOCK_MULTI_AXIS:
		return;
	case COMMAND_UNLOCK_MULTI_AXIS:
		return;
	case COMMAND_START_CHIP_TRANSPORT:
		return;
	case COMMAND_STOP_CHIP_TRANSPORT:
		return;
	case COMMAND_BREAK_CONTROL:
		if (!toolChecked) { // avoid duplicate COMMAND_BREAK_CONTROL
			//onCommand(COMMAND_STOP_SPINDLE);
			onCommand(COMMAND_COOLANT_OFF);
			writeBlock(formats.g.format(53), "Z" + formats.xyz.format(0), formats.m.format(19)); // retract
			writeBlock(formats.g.format(8), formats.p.format(0)); 
			writeBlock(
			formats.g.format(65),
			"P" + 9858,
			"T" + formats.tool.format(tool.number),
			//"B" + formats.xyz.format(0),
			"H" + formats.xyz.format(properties.toolBreakageTolerance)
			);
			toolChecked = true;
		}
	return;
	case COMMAND_TOOL_MEASURE:
	return;
	}
	
	var stringId = getCommandStringId(command);
	var mcode = mapCommand[stringId];
	if (mcode != undefined) {
	writeBlock(formats.m.format(mcode));
	} else {
	onUnsupportedCommand(command);
	}
}
var toolChecked = false; // specifies that the tool has been checked with the probe

function onSectionEnd() {
	if ((((getCurrentSectionId() + 1) >= getNumberOfSections()) ||
		(tool.number != getNextSection().getTool().number)) &&
		tool.breakControl) {
	onCommand(COMMAND_BREAK_CONTROL);
	} else {
	toolChecked = false;
	}
	forceAny();
}
// allow manual insertion of comma delimited g-code
function onPassThrough(text) {
	var commands = String(text).split(",");
	for (text in commands) {
	writeBlock(commands[text]);
	}
}

function onClose() {
	//writeln("");
	optionalSection = false;

	onCommand(COMMAND_COOLANT_OFF);
	writeBlock(modals.feed.format(0),formats.g.format(49)); 
	writeBlock(formats.g.format(53), "Z" + formats.xyz.format(0), formats.m.format(19)); // retract
	retracted = true;
	
	//disableLengthCompensation(true);
	setSmoothing(false);
	outputs.z.reset();

	setWorkPlane(new Vector(0, 0, 0)); // reset working plane

	if (properties.useG54x4) {
	writeBlock(formats.g.format(54.4), "P0");
	}

	if (!machineConfiguration.hasHomePositionX() && !machineConfiguration.hasHomePositionY()) {
		// 90/91 mode is don't care
		writeBlock(formats.g.format(53), "X" + formats.xyz.format(-25.)); // return to home
		writeBlock(formats.g.format(53), "Y" + formats.xyz.format(0)); // return to home
	} else {
		var homeX;
		if (machineConfiguration.hasHomePositionX()) {
			homeX = "X" + formats.xyz.format(machineConfiguration.getHomePositionX());
		}
		var homeY;
		if (machineConfiguration.hasHomePositionY()) {
			homeY = "Y" + formats.xyz.format(machineConfiguration.getHomePositionY());
		}
		writeBlock(modals.abs.format(90), formats.g.format(53), modals.motion.format(0), homeX, homeY);
	}

	onImpliedCommand(COMMAND_END);
	onImpliedCommand(COMMAND_STOP_SPINDLE);
	writeBlock(formats.m.format(30)); // stop program, spindle stop, coolant off
	writeln("%");
}
