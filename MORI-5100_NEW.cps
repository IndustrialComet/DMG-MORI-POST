"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var CAPABILITY = {
    MILLING: CAPABILITY_MILLING,
    TURNING: CAPABILITY_TURNING,
    JET: CAPABILITY_JET,
    SETUP_SHEET: CAPABILITY_SETUP_SHEET,
    INTERMEDIATE: CAPABILITY_INTERMEDIATE,
};
var UNIT = {
    INCH: IN,
    MILLIMETER: MM,
};
var PLANE = {
    XY: PLANE_XY,
    XZ: PLANE_XZ,
    ZX: PLANE_ZX,
    YZ: PLANE_YZ, //Circular YZ plane.
};
var TOOL_AXIS = {
    X: TOOL_AXIS_X,
    Y: TOOL_AXIS_Y,
    Z: TOOL_AXIS_Z, //XY-plane.
};
var HAS = {
    PARAMETER: HAS_PARAMETER,
    RAPID: HAS_RAPID,
    LINEAR: HAS_LINEAR,
    DWELL: HAS_DWELL,
    CIRCULAR: HAS_CIRCULAR,
    CYCLE: HAS_CYCLE,
    WELL_KNOWN_COMMAND: HAS_WELL_KNOWN_COMMAND,
    COMMENT: HAS_COMMENT, //Has comment flag.
};
var SINGULARITY = {
    LINEARIZE_OFF: SINGULARITY_LINEARIZE_OFF,
    LINEARIZE_LINEAR: SINGULARITY_LINEARIZE_LINEAR,
    LINEARIZE_ROTARY: SINGULARITY_LINEARIZE_ROTARY, //Keep rotary axes in line during multi-axis singularity linearization. More...	
};
var RADIUS_COMPENSATION = {
    OFF: RADIUS_COMPENSATION_OFF,
    LEFT: RADIUS_COMPENSATION_LEFT,
    RIGHT: RADIUS_COMPENSATION_RIGHT, //Right radius compensation.
};
var RECORD = {
    INVALID: RECORD_INVALID,
    WELL_KNOWN_COMMAND: RECORD_WELL_KNOWN_COMMAND,
    PARAMETER: RECORD_PARAMETER,
    LINEAR: RECORD_LINEAR,
    LINEAR_5D: RECORD_LINEAR_5D,
    LINEAR_ZXN: RECORD_LINEAR_ZXN,
    LINEAR_EXTRUDE: RECORD_LINEAR_EXTRUDE,
    CIRCULAR: RECORD_CIRCULAR,
    DWELL: RECORD_DWELL,
    CYCLE: RECORD_CYCLE,
    CYCLE_OFF: RECORD_CYCLE_OFF,
    COMMENT: RECORD_COMMENT,
    WIDE_COMMENT: RECORD_WIDE_COMMENT,
    CIRCULAR_EXTRUDE: RECORD_CIRCULAR_EXTRUDE, //Circular motion with extrude.
};
var COMMAND = {
    INVALID: COMMAND_INVALID,
    STOP: COMMAND_STOP,
    OPTIONAL_STOP: COMMAND_OPTIONAL_STOP,
    END: COMMAND_END,
    SPINDLE_CLOCKWISE: COMMAND_SPINDLE_CLOCKWISE,
    SPINDLE_COUNTERCLOCKWISE: COMMAND_SPINDLE_COUNTERCLOCKWISE,
    START_SPINDLE: COMMAND_START_SPINDLE,
    STOP_SPINDLE: COMMAND_STOP_SPINDLE,
    ORIENTATE_SPINDLE: COMMAND_ORIENTATE_SPINDLE,
    LOAD_TOOL: COMMAND_LOAD_TOOL,
    COOLANT_ON: COMMAND_COOLANT_ON,
    COOLANT_OFF: COMMAND_COOLANT_OFF,
    ACTIVATE_SPEED_FEED_SYNCHRONIZATION: COMMAND_ACTIVATE_SPEED_FEED_SYNCHRONIZATION,
    DEACTIVATE_SPEED_FEED_SYNCHRONIZATION: COMMAND_DEACTIVATE_SPEED_FEED_SYNCHRONIZATION,
    LOCK_MULTI_AXIS: COMMAND_LOCK_MULTI_AXIS,
    UNLOCK_MULTI_AXIS: COMMAND_UNLOCK_MULTI_AXIS,
    EXACT_STOP: COMMAND_EXACT_STOP,
    START_CHIP_TRANSPORT: COMMAND_START_CHIP_TRANSPORT,
    STOP_CHIP_TRANSPORT: COMMAND_STOP_CHIP_TRANSPORT,
    OPEN_DOOR: COMMAND_OPEN_DOOR,
    CLOSE_DOOR: COMMAND_CLOSE_DOOR,
    BREAK_CONTROL: COMMAND_BREAK_CONTROL,
    TOOL_MEASURE: COMMAND_TOOL_MEASURE,
    CALIBRATE: COMMAND_CALIBRATE,
    VERIFY: COMMAND_VERIFY,
    CLEAN: COMMAND_CLEAN,
    ALARM: COMMAND_ALARM,
    ALERT: COMMAND_ALERT,
    CHANGE_PALLET: COMMAND_CHANGE_PALLET,
    POWER_ON: COMMAND_POWER_ON,
    POWER_OFF: COMMAND_POWER_OFF,
    MAIN_CHUCK_OPEN: COMMAND_MAIN_CHUCK_OPEN,
    MAIN_CHUCK_CLOSE: COMMAND_MAIN_CHUCK_CLOSE,
    SECONDARY_CHUCK_OPEN: COMMAND_SECONDARY_CHUCK_OPEN,
    SECONDARY_CHUCK_CLOSE: COMMAND_SECONDARY_CHUCK_CLOSE,
    SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE: COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE,
    SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE: COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE,
    SYNC_CHANNELS: COMMAND_SYNC_CHANNELS,
    PROBE_ON: COMMAND_PROBE_ON,
    PROBE_OFF: COMMAND_PROBE_OFF, //Probe off.
};
var COOLANT = {
    DISABLED: COOLANT_DISABLED,
    FLOOD: COOLANT_FLOOD,
    MIST: COOLANT_MIST,
    TOOL: COOLANT_TOOL,
    THROUGH_TOOL: COOLANT_THROUGH_TOOL,
    AIR: COOLANT_AIR,
    AIR_THROUGH_TOOL: COOLANT_AIR_THROUGH_TOOL,
    SUCTION: COOLANT_SUCTION,
    FLOOD_MIST: COOLANT_FLOOD_MIST,
    FLOOD_THROUGH_TOOL: COOLANT_FLOOD_THROUGH_TOOL, //Flood and through tool coolant mode.
};
var MATERIAL = {
    UNSPECIFIED: MATERIAL_UNSPECIFIED,
    HSS: MATERIAL_HSS,
    TI_COATED: MATERIAL_TI_COATED,
    CARBIDE: MATERIAL_CARBIDE,
    CERAMICS: MATERIAL_CERAMICS, //Ceramics material.
};
var TOOL = {
    UNSPECIFIED: TOOL_UNSPECIFIED,
    DRILL: TOOL_DRILL,
    DRILL_CENTER: TOOL_DRILL_CENTER,
    DRILL_SPOT: TOOL_DRILL_SPOT,
    DRILL_BLOCK: TOOL_DRILL_BLOCK,
    MILLING_END_FLAT: TOOL_MILLING_END_FLAT,
    MILLING_END_BALL: TOOL_MILLING_END_BALL,
    MILLING_END_BULLNOSE: TOOL_MILLING_END_BULLNOSE,
    MILLING_CHAMFER: TOOL_MILLING_CHAMFER,
    MILLING_FACE: TOOL_MILLING_FACE,
    MILLING_SLOT: TOOL_MILLING_SLOT,
    MILLING_RADIUS: TOOL_MILLING_RADIUS,
    MILLING_DOVETAIL: TOOL_MILLING_DOVETAIL,
    MILLING_TAPERED: TOOL_MILLING_TAPERED,
    MILLING_LOLLIPOP: TOOL_MILLING_LOLLIPOP,
    TAP_RIGHT_HAND: TOOL_TAP_RIGHT_HAND,
    TAP_LEFT_HAND: TOOL_TAP_LEFT_HAND,
    REAMER: TOOL_REAMER,
    BORING_BAR: TOOL_BORING_BAR,
    COUNTER_BORE: TOOL_COUNTER_BORE,
    COUNTER_SINK: TOOL_COUNTER_SINK,
    HOLDER_ONLY: TOOL_HOLDER_ONLY,
    TURNING_GENERAL: TOOL_TURNING_GENERAL,
    TURNING_THREADING: TOOL_TURNING_THREADING,
    TURNING_GROOVING: TOOL_TURNING_GROOVING,
    TURNING_BORING: TOOL_TURNING_BORING,
    TURNING_CUSTOM: TOOL_TURNING_CUSTOM,
    PROBE: TOOL_PROBE,
    WIRE: TOOL_WIRE,
    WATER_JET: TOOL_WATER_JET,
    LASER_CUTTER: TOOL_LASER_CUTTER,
    WELDER: TOOL_WELDER,
    GRINDER: TOOL_GRINDER,
    MILLING_FORM: TOOL_MILLING_FORM,
    PLASMA_CUTTER: TOOL_PLASMA_CUTTER,
    MARKER: TOOL_MARKER,
    MILLING_THREAD: TOOL_MILLING_THREAD,
    COMPENSATION_INSERT_CENTER: TOOL_COMPENSATION_INSERT_CENTER,
    COMPENSATION_TIP: TOOL_COMPENSATION_TIP,
    COMPENSATION_TIP_CENTER: TOOL_COMPENSATION_TIP_CENTER,
    COMPENSATION_TIP_TANGENT: TOOL_COMPENSATION_TIP_TANGENT, //Turning tool compensation.
};
var MOVEMENT = {
    RAPID: MOVEMENT_RAPID,
    LEAD_IN: MOVEMENT_LEAD_IN,
    CUTTING: MOVEMENT_CUTTING,
    LEAD_OUT: MOVEMENT_LEAD_OUT,
    LINK_TRANSITION: MOVEMENT_LINK_TRANSITION,
    LINK_DIRECT: MOVEMENT_LINK_DIRECT,
    RAMP_HELIX: MOVEMENT_RAMP_HELIX,
    RAMP_PROFILE: MOVEMENT_RAMP_PROFILE,
    RAMP_ZIG_ZAG: MOVEMENT_RAMP_ZIG_ZAG,
    RAMP: MOVEMENT_RAMP,
    PLUNGE: MOVEMENT_PLUNGE,
    PREDRILL: MOVEMENT_PREDRILL,
    EXTENDED: MOVEMENT_EXTENDED,
    REDUCED: MOVEMENT_REDUCED,
    FINISH_CUTTING: MOVEMENT_FINISH_CUTTING,
    HIGH_FEED: MOVEMENT_HIGH_FEED, //High feed movement type.
};
var HIGH_FEED = {
    NO_MAPPING: HIGH_FEED_NO_MAPPING,
    MAP_MULTI: HIGH_FEED_MAP_MULTI,
    MAP_XY_Z: HIGH_FEED_MAP_XY_Z,
    MAP_ANY: HIGH_FEED_MAP_ANY, //Map all rapid travesals to high feed.
};
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
capabilities = CAPABILITY.MILLING;
tolerance = spatial(0.002, UNIT.MILLIMETER);
minimumChordLength = spatial(0.01, UNIT.MILLIMETER);
minimumCircularRadius = spatial(0.01, UNIT.MILLIMETER);
maximumCircularRadius = spatial(1000, UNIT.MILLIMETER);
minimumCircularSweep = toRad(0.01);
maximumCircularSweep = toRad(360);
allowHelicalMoves = true;
allowedCircularPlanes = undefined; // allow any circular motion
//USER PROPERTIES
properties = {
    writeMachine: false,
    writeTools: false,
    preloadTool: true,
    showSequenceNumbers: false,
    sequenceNumberStart: 10,
    sequenceNumberIncrement: 5,
    optionalStop: true,
    o8: false,
    separateWordsWithSpace: false,
    allow3DArcs: false,
    useRadius: false,
    forceIJK: false,
    useParametricFeed: false,
    showNotes: false,
    useSmoothing: false,
    usePitchForTapping: true,
    useG95: false,
    toolBreakageTolerance: 0.01,
    useG54x4: false // Fanuc 30i supports G54.4 for Workpiece Error Compensation
};
var permittedCommentChars = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,=_-/*#:";
//FORMATS
var formats = {
    //COMMANDS
    g: createFormat({ prefix: "G", decimals: 1 }),
    m: createFormat({ prefix: "M", decimals: 1 }),
    p: createFormat({ prefix: "P", decimals: 1 }),
    h: createFormat({ prefix: "H", decimals: 1 }),
    d: createFormat({ prefix: "D", decimals: 1 }),
    o: createFormat({ width: (properties.o8 ? 8 : 4), zeropad: true, decimals: 0 }),
    //RADIUS
    r: createFormat({ decimals: (unit == MM ? 3 : 4), trimLeadZero: true, forceDecimal: true }),
    //UNIT VECTORS
    xyz: createFormat({ decimals: (unit == MM ? 3 : 4), trimLeadZero: true, forceDecimal: true }),
    ijk: createFormat({ decimals: 6, forceDecimal: true }),
    abc: createFormat({ decimals: 3, forceDecimal: true, scale: DEG }),
    //TIME
    milliseconds: createFormat({ decimals: 0 }),
    seconds: createFormat({ decimals: 3, forceDecimal: true }),
    //ANGLE
    taper: createFormat({ decimals: 1, scale: DEG }),
    //DRILLING
    feed: createFormat({ decimals: (unit == UNIT.MILLIMETER ? 0 : 1), forceDecimal: true }),
    pitch: createFormat({ decimals: (unit == UNIT.MILLIMETER ? 3 : 4), forceDecimal: true }),
    rpm: createFormat({ decimals: 0 }),
    //TOOLS
    tool: createFormat({ decimals: 0 }),
    probe: createFormat({ decimals: 3, zeropad: true, width: 3, forceDecimal: true }),
};
//OUTPUTS
var outputs = {
    x: createVariable({ prefix: "X" }, formats.xyz),
    y: createVariable({ prefix: "Y" }, formats.xyz),
    z: createVariable({ prefix: "Z" }, formats.xyz),
    i: createReferenceVariable({ prefix: "I" }, formats.ijk),
    j: createReferenceVariable({ prefix: "J" }, formats.ijk),
    k: createReferenceVariable({ prefix: "K" }, formats.ijk),
    a: createVariable({ prefix: "A" }, formats.abc),
    b: createVariable({ prefix: "B" }, formats.abc),
    c: createVariable({ prefix: "C" }, formats.abc),
    feed: createVariable({ prefix: "F" }, formats.feed),
    pitch: createVariable({ prefix: "F", force: true }, formats.pitch),
    spindle: createVariable({ prefix: "S", force: true }, formats.rpm),
    d: createVariable({}, formats.d),
};
//MODALS
var modals = {
    motion: createModal({}, formats.g),
    plane: createModal({ onchange: function () { modals.motion.reset(); } }, formats.g),
    abs: createModal({}, formats.g),
    feed: createModal({}, formats.g),
    unit: createModal({}, formats.g),
    cycle: createModal({}, formats.g),
    retraction: createModal({}, formats.g),
    rotation: createModal({ force: true }, formats.g), // G68-G69
};
// fixed settings
var firstFeedParameter = 500;
var useMultiAxisFeatures = true;
var forceMultiAxisIndexing = false; // force multi-axis indexing for 3D programs
var WARNING_WORK_OFFSET = 0;
var ANGLE_PROBE;
(function (ANGLE_PROBE) {
    ANGLE_PROBE[ANGLE_PROBE["NOT_SUPPORTED"] = 0] = "NOT_SUPPORTED";
    ANGLE_PROBE[ANGLE_PROBE["USE_ROTATION"] = 1] = "USE_ROTATION";
    ANGLE_PROBE[ANGLE_PROBE["USE_CAXIS"] = 2] = "USE_CAXIS";
})(ANGLE_PROBE || (ANGLE_PROBE = {}));
// collected state
var sequenceNumber;
var currentWorkOffset;
var optionalSection = false;
var forceSpindleSpeed = false;
var activeMovements; // do not use by default
var currentFeedId;
var g68RotationMode = 0;
var angularProbingMode;
var now = new Date();
var wfo = "";
/**
    Writes the specified block.
*/
function writeBlock() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (properties.showSequenceNumbers) {
        if (optionalSection) {
            var text = formatWords(args);
            if (text) {
                writeWords(["/", "N" + sequenceNumber].concat(text));
            }
        }
        else {
            writeWords2("N" + sequenceNumber, args);
        }
        sequenceNumber += properties.sequenceNumberIncrement;
    }
    else {
        if (optionalSection) {
            writeWords2("/", args);
        }
        else {
            writeWords(args);
        }
    }
}
/**
    Writes the specified optional block.
*/
function writeOptionalBlock() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (properties.showSequenceNumbers) {
        var words = formatWords(args);
        if (words) {
            writeWords(["/", "N" + sequenceNumber].concat(words));
            sequenceNumber += properties.sequenceNumberIncrement;
        }
    }
    else {
        writeWords2("/", args);
    }
}
function formatComment(text) {
    return "(" + filterText(String(text).toUpperCase(), permittedCommentChars).replace(/[\(\)]/g, "") + ")";
}
/**
    Output a comment.
*/
function writeComment(text) {
    writeln(formatComment(text));
}
function onOpen() {
    if (false) { // note: setup your machine here
        var aAxis = createAxis({ coordinate: 0, table: false, axis: [1, 0, 0], range: [-360, 360], preference: 1 });
        var cAxis = createAxis({ coordinate: 2, table: false, axis: [0, 0, 1], range: [-360, 360], preference: 1 });
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
        outputs.i = createReferenceVariable({ prefix: "I", force: true }, formats.ijk);
        outputs.j = createReferenceVariable({ prefix: "J", force: true }, formats.ijk);
        outputs.k = createReferenceVariable({ prefix: "K", force: true }, formats.ijk);
    }
    sequenceNumber = properties.sequenceNumberStart;
    writeln("%");
    if (programComment) {
        var programId;
        try {
            programId = getAsInt(programComment);
        }
        catch (e) {
            error(localize("Program name must be a number."));
            return;
        }
        if (properties.o8) {
            if (!((programId >= 1) && (programId <= 99999999))) {
                error(localize("Program number is out of range."));
                return;
            }
        }
        else {
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
            //O3224 (COMMENT);
        }
        else {
            writeln("O" + formats.o.format(programId));
        }
    }
    else {
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
        writeComment("  " + localize("description") + ": " + description);
    }
    // dump tool formats.inion
    if (properties.writeTools) {
        var zRanges = [];
        if (is3D()) {
            var numberOfSections = getNumberOfSections();
            for (var i = 0; i < numberOfSections; ++i) {
                var section = getSection(i);
                var zRange = section.getGlobalZRange();
                var tool = section.getTool();
                if (zRanges[tool.number]) {
                    zRanges[tool.number].expandToRange(zRange);
                }
                else {
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
                comment += " - " + getToolTypeName(tool);
                writeComment(comment);
            }
        }
    }
    // if (false) {
    // 	// check for duplicate tool number
    // 	for (var i = 0; i < getNumberOfSections(); ++i) {
    // 		var sectioni = getSection(i);
    // 		var tooli = sectioni.getTool();
    // 		for (var j = i + 1; j < getNumberOfSections(); ++j) {
    // 		var sectionj = getSection(j);
    // 		var toolj = sectionj.getTool();
    // 		if (tooli.number == toolj.number) {
    // 			if (formats.xyz.areDifferent(tooli.diameter, toolj.diameter) ||
    // 				formats.xyz.areDifferent(tooli.cornerRadius, toolj.cornerRadius) ||
    // 				formats.abc.areDifferent(tooli.taperAngle, toolj.taperAngle) ||
    // 				(tooli.numberOfFlutes != toolj.numberOfFlutes)) {
    // 			error(
    // 				subst(
    // 				localize("Using the same tool number for different cutter geometry for operation '%1' and '%2'."),
    // 				sectioni.hasParameter("operation-comment") ? sectioni.getParameter("operation-comment") : ("#" + (i + 1)),
    // 				sectionj.hasParameter("operation-comment") ? sectionj.getParameter("operation-comment") : ("#" + (j + 1))
    // 				)
    // 			);
    // 			return;
    // 			}
    // 		}
    // 		}
    // 	}
    // }
    writeComment((now.getMonth() + 1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + now.getHours() + ":" + ('0' + now.getMinutes()).slice(-2));
    // absolute coordinates and feed per min
    writeBlock(modals.plane.format(17), formats.g.format(40), formats.g.format(80), modals.abs.format(90));
    switch (unit) {
        case IN:
            writeBlock(modals.unit.format(20));
            break;
        case MM:
            writeBlock(modals.unit.format(21));
            writeBlock(formats.m.format(0)); //SEE WHY THIS IS M0
            writeComment("PROGRAM IS METRIC");
            break;
    }
    if (properties.useG95 && properties.useParametricFeed) {
        error(localize("Parametric feed is not supported when using G95."));
        return;
    }
    if (properties.useG95) { //G95 Feed mm/ev //inches per rev
        formats.feed = createFormat({ decimals: (unit == MM ? 4 : 5), forceDecimal: true });
        outputs.feed = createVariable({ prefix: "F" }, formats.feed);
    }
}
function onComment(message) {
    var comments = message.split(";").forEach(function (comment) {
        writeComment(comment);
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
    writeBlock(formats.g.format(5.1), mode ? "Q1" : "Q0"); //G5.1 AI look Ahead Control  Q1 = ON
    writeBlock(formats.g.format(332), "R3.");
    return true;
}
var FeedContext = /** @class */ (function () {
    function FeedContext(id, description, feed) {
        this.id = id;
        this.description = description;
        this.feed = feed;
    }
    return FeedContext;
}());
function getFeed(f) {
    if (properties.useG95) {
        return outputs.feed.format(f / spindleSpeed); // use feed value
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
    }
    else if (hasParameter("operation:tool_feedCutting")) {
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
    }
    else if (hasParameter("operation:tool_feedCutting") &&
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
            var feedContext = new FeedContext(id, localize("High Feed"), highFeedrate);
            activeFeeds.push(feedContext);
            activeMovements[MOVEMENT_HIGH_FEED] = feedContext;
        }
        ++id;
    }
    activeFeeds.forEach(function (feedContext) {
        writeBlock("#" + (firstFeedParameter + feedContext.id) + "=" + formats.feed.format(feedContext.feed), formatComment(feedContext.description));
    });
}
var currentWorkPlaneABC = null;
function forceWorkPlane() {
    currentWorkPlaneABC = null;
}
function setWorkPlane(abc) {
    if (!forceMultiAxisIndexing && is3D() && !machineConfiguration.isMultiAxisConfiguration()) {
        return; // ignore
    }
    if (!((currentWorkPlaneABC == null) ||
        formats.abc.areDifferent(abc.x, currentWorkPlaneABC.x) ||
        formats.abc.areDifferent(abc.y, currentWorkPlaneABC.y) ||
        formats.abc.areDifferent(abc.z, currentWorkPlaneABC.z))) {
        return; // no change
    }
    onCommand(COMMAND.UNLOCK_MULTI_AXIS);
    if (useMultiAxisFeatures) {
        if (abc.isNonZero()) {
            writeBlock(formats.g.format(68.2), "X" + formats.xyz.format(0), "Y" + formats.xyz.format(0), "Z" + formats.xyz.format(0), "I" + formats.abc.format(abc.x), "J" + formats.abc.format(abc.y), "K" + formats.abc.format(abc.z)); // set frame
            writeBlock(formats.g.format(53.1)); // turn machine
        }
        else {
            writeBlock(formats.g.format(69)); // cancel frame
        }
    }
    else {
        modals.motion.reset();
        writeBlock(modals.motion.format(0), conditional(machineConfiguration.isMachineCoordinate(0), "A" + formats.abc.format(abc.x)), conditional(machineConfiguration.isMachineCoordinate(1), "B" + formats.abc.format(abc.y)), conditional(machineConfiguration.isMachineCoordinate(2), "C" + formats.abc.format(abc.z)));
    }
    onCommand(COMMAND.LOCK_MULTI_AXIS);
    currentWorkPlaneABC = abc;
}
var closestABC = false; // choose closest machine angles
var currentMachineABC = null;
function getWorkPlaneMachineABC(workPlane) {
    var W = workPlane; // map to global frame
    var abc = machineConfiguration.getABC(W);
    if (closestABC) {
        if (currentMachineABC) {
            abc = machineConfiguration.remapToABC(abc, currentMachineABC);
        }
        else {
            abc = machineConfiguration.getPreferredABC(abc);
        }
    }
    else {
        abc = machineConfiguration.getPreferredABC(abc);
    }
    try {
        abc = machineConfiguration.remapABC(abc);
        currentMachineABC = abc;
    }
    catch (e) {
        error(localize("Machine angles not supported") + ":"
            + conditional(machineConfiguration.isMachineCoordinate(0), " A" + formats.abc.format(abc.x))
            + conditional(machineConfiguration.isMachineCoordinate(1), " B" + formats.abc.format(abc.y))
            + conditional(machineConfiguration.isMachineCoordinate(2), " C" + formats.abc.format(abc.z)));
    }
    var direction = machineConfiguration.getDirection(abc);
    if (!isSameDirection(direction, W.forward)) {
        error(localize("Orientation not supported."));
    }
    if (!machineConfiguration.isABCSupported(abc)) {
        error(localize("Work plane is not supported") + ":"
            + conditional(machineConfiguration.isMachineCoordinate(0), " A" + formats.abc.format(abc.x))
            + conditional(machineConfiguration.isMachineCoordinate(1), " B" + formats.abc.format(abc.y))
            + conditional(machineConfiguration.isMachineCoordinate(2), " C" + formats.abc.format(abc.z)));
    }
    var tcp = false;
    if (tcp) {
        setRotation(W); // TCP mode
    }
    else {
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
    value = value;
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
        onCommand(COMMAND.COOLANT_OFF);
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
            lines.forEach(function (line) {
                var comment = line.replace(r1, "").replace(r2, "");
                if (comment) {
                    writeComment(comment);
                }
            });
        }
    }
    if (insertToolCall) {
        forceWorkPlane();
        retracted = true;
        onCommand(COMMAND.COOLANT_OFF);
        if (properties.optionalStop) {
            onCommand(COMMAND.OPTIONAL_STOP);
        }
        /*
             if (!isFirstSection() && properties.optionalStop) {
                onCommand(COMMAND_OPTIONAL_STOP);
            }
            */
        if (tool.number > 99) {
            warning(localize("Tool number exceeds maximum value."));
        }
        disableLengthCompensation(false);
        writeBlock("T" + formats.tool.format(tool.number), formats.m.format(6)); //conditional(tool.description, formatComment(tool.description)));
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
            (formats.rpm.areDifferent(tool.spindleRPM, outputs.spindle.getCurrent())) ||
            (tool.isClockwise() != getPreviousSection().getTool().isClockwise()))) {
        forceSpindleSpeed = false;
        if (tool.spindleRPM < 1) {
            error(localize("Spindle speed out of range."));
            return;
        }
        if (tool.spindleRPM > 99999) {
            warning(localize("Spindle speed exceeds maximum value."));
        }
        //writeBlock(
        // outputs.spindle.format(tool.spindleRPM), formats.m.format(tool.clockwise ? 3 : 4)
        //);
        onCommand(COMMAND_START_CHIP_TRANSPORT);
        if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) {
            // writeBlock(formats.m.format(xxx)); // shortest path traverse
        }
    }
    var nextTool = undefined;
    var nextToolString = "";
    // wcs
    if (properties.preloadTool) {
        nextTool = getNextTool(tool.number);
        if (nextTool) {
            nextToolString = formats.tool.format(nextTool.number); //Store next tool
        }
        else {
            // preload first tool
            var section = getSection(0);
            var firstToolNumber = section.getTool().number;
            if (tool.number != firstToolNumber) {
                nextToolString = formats.tool.format(firstToolNumber); //Store next tool
            }
        }
    }
    var workOffset = currentSection.workOffset;
    if (workOffset == 0) {
        warningOnce(localize("Work offset has not been specified. Using G54 as WCS."), WARNING_WORK_OFFSET);
        workOffset = 1;
    }
    if (workOffset > 0) {
        if (workOffset > 6) {
            var p = workOffset - 6; // 1->...
            if (p > 300) {
                error(localize("Work offset out of range."));
                return;
            }
            else {
                wfo = (formats.g.format(54.1) + " P" + p); // G54.1P
                currentWorkOffset = workOffset;
            }
        }
        //Block deleted next 6 blocks to not output G5x once only. Moved the formats.g line to positioning line (approx N852) STM 1/31/15
        else {
            wfo = (formats.g.format(53 + workOffset)); // G54->G59
            currentWorkOffset = workOffset;
        }
    }
    forceXYZ();
    if (forceMultiAxisIndexing || !is3D() || machineConfiguration.isMultiAxisConfiguration()) { // use 5-axis indexing for multi-axis mode
        // set working plane after datum shift
        if (currentSection.isMultiAxis()) {
            forceWorkPlane();
            cancelTransformation();
        }
        else {
            var abc = new Vector(0, 0, 0);
            if (useMultiAxisFeatures) {
                var eulerXYZ = currentSection.workPlane.getTransposed().eulerZYX_R;
                abc = new Vector(-eulerXYZ.x, -eulerXYZ.y, -eulerXYZ.z);
                cancelTransformation();
            }
            else {
                abc = getWorkPlaneMachineABC(currentSection.workPlane);
            }
            setWorkPlane(abc);
        }
    }
    else { // pure 3D
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
        }
        else {
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
            writeBlock(modals.abs.format(0), modals.abs.format(90), wfo, outputs.x.format(initialPosition.x), outputs.y.format(initialPosition.y), outputs.spindle.format(tool.spindleRPM), formats.m.format(tool.isClockwise() ? 3 : 4));
            writeBlock(modals.motion.format(0), conditional(insertToolCall, formats.g.format(currentSection.isMultiAxis() ? 43.5 : 43)), formats.h.format(lengthOffset), outputs.z.format(initialPosition.z), setCoolant(tool.coolant), 
            //conditional(insertToolCall), //////////VERIFY THIS;
            conditional(nextTool !== undefined, "T" + nextToolString));
            //writeBlock(setCoolant(tool.coolant));
            lengthCompensationActive = true;
        }
        else {
            writeBlock(modals.abs.format(90), modals.motion.format(0), formats.g.format(currentSection.isMultiAxis() ? (machineConfiguration.isMultiAxisConfiguration() ? 43.4 : 43.5) : 43), formats.h.format(lengthOffset), outputs.x.format(initialPosition.x), outputs.y.format(initialPosition.y), outputs.z.format(initialPosition.z), setCoolant(tool.coolant), 
            //conditional(insertToolCall), 
            conditional(nextTool !== undefined, "T" + nextToolString));
        }
        modals.motion.reset();
    }
    else {
        if (forceSpindleSpeed ||
            (formats.rpm.areDifferent(tool.spindleRPM, outputs.spindle.getCurrent())) ||
            (tool.isClockwise() != getPreviousSection().getTool().isClockwise())) {
            writeBlock(modals.abs.format(90), modals.motion.format(0), outputs.x.format(initialPosition.x), outputs.y.format(initialPosition.y), outputs.spindle.format(tool.spindleRPM), formats.m.format(tool.isClockwise() ? 3 : 4), setCoolant(tool.coolant));
        }
        else {
            writeBlock(setCoolant(tool.coolant) || "");
            writeBlock(modals.abs.format(90), modals.motion.format(0), outputs.x.format(initialPosition.x), outputs.y.format(initialPosition.y));
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
        }
        else {
            initializeActiveFeeds();
        }
    }
    else {
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
function onDwell(seconds) {
    if (seconds > 99999.999) {
        return warning(localize("Dwelling time is out of range."));
    }
    var milliseconds = Math.min(Math.max(1, seconds * 1000), 99999999);
    writeBlock(modals.feed.format(94), formats.g.format(4), "P" + formats.milliseconds.format(milliseconds));
    writeBlock(modals.feed.format(properties.useG95 ? 95 : 94)); // back to G95
}
function onSpindleSpeed(speed) {
    writeBlock(outputs.spindle.format(speed));
}
function onCycle() {
    writeBlock(modals.plane.format(17));
}
function getCommonCycle(x, y, z, r) {
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
            return ANGLE_PROBE.USE_CAXIS;
        }
        else {
            return ANGLE_PROBE.NOT_SUPPORTED;
        }
    }
    else {
        return ANGLE_PROBE.USE_ROTATION;
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
            writeBlock(modals.rotation.format(68), modals.abs.format(90), (g68RotationMode == 1) ? "X0" : "X[#135]", (g68RotationMode == 1) ? "Y0" : "Y[#136]", "Z0", "I0.0", "J0.0", "K1.0", "R[#139]");
            g68RotationMode = 3;
        }
        else if (angularProbingMode != ANGLE_PROBE.NOT_SUPPORTED) {
            writeBlock("#26010=#135");
            writeBlock("#26011=#136");
            writeBlock("#26012=#137");
            writeBlock("#26015=#139");
            writeBlock(formats.g.format(54.4), "P1");
            g68RotationMode = 0;
        }
        else {
            error(localize("Angular probing is not supported for this machine configuration."));
            return;
        }
    }
}
function onCyclePoint(x, y, z) {
    var probeWorkOffsetCode;
    if (isProbeOperation()) {
        setCurrentPosition(new Vector(x, y, z));
        var workOffset = probeOutputWorkOffset ? probeOutputWorkOffset : currentWorkOffset;
        if (workOffset > 99) {
            error(localize("Work offset is out of range."));
            return;
        }
        else if (workOffset > 6) {
            probeWorkOffsetCode = formats.probe.format(workOffset - 6 + 100);
        }
        else {
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
        var P = (cycle.dwell == 0) ? 0 : Math.min(Math.max(1, cycle.dwell * 1000), 99999999); // in milliseconds
        modals.retraction.reset();
        switch (cycleType) {
            case "drilling":
                writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(81)], getCommonCycle(x, y, z, cycle.retract), false), [outputs.feed.format(F)], false));
                break;
            case "counter-boring":
                if (P > 0) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(82)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.feed.format(F)], false));
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(81)], getCommonCycle(x, y, z, cycle.retract), false), [outputs.feed.format(F)], false));
                }
                break;
            case "chip-breaking":
                // cycle.accumulatedDepth is ignored
                if (P > 0) {
                    expandCyclePoint(x, y, z);
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(73)], getCommonCycle(x, y, z, cycle.retract), false), ["Q" + formats.xyz.format(cycle.incrementalDepth),
                        outputs.feed.format(F)], false));
                }
                break;
            case "deep-drilling":
                if (P > 0) {
                    expandCyclePoint(x, y, z);
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(83)], getCommonCycle(x, y, z, cycle.retract), false), ["Q" + formats.xyz.format(cycle.incrementalDepth),
                        // conditional(P > 0, "P" + formats.milliseconds.format(P)),
                        outputs.feed.format(F)], false));
                }
                break;
            case "tapping":
                writeBlock(formats.m.format(29), outputs.spindle.format(tool.spindleRPM));
                if (properties.usePitchForTapping) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.feed.format(95), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND) ? 74 : 84)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.pitch.format(tool.threadPitch)], false));
                    forceFeed();
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND) ? 74 : 84)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.feed.format(F)], false));
                }
                break;
            case "left-tapping":
                writeBlock(formats.m.format(29), outputs.spindle.format(tool.spindleRPM));
                if (properties.usePitchForTapping) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.feed.format(95), modals.cycle.format(74)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.pitch.format(tool.threadPitch)], false));
                    forceFeed();
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(74)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.feed.format(properties.useG95 ? tool.getTappingFeedrate() / spindleSpeed : tool.getTappingFeedrate())], false));
                }
                break;
            case "right-tapping":
                writeBlock(formats.m.format(29), outputs.spindle.format(tool.spindleRPM));
                if (properties.usePitchForTapping) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(84)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.pitch.format(tool.threadPitch)], false));
                    forceFeed();
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(84)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.feed.format(properties.useG95 ? tool.getTappingFeedrate() / spindleSpeed : tool.getTappingFeedrate())], false));
                }
                break;
            case "tapping-with-chip-breaking":
            case "left-tapping-with-chip-breaking":
            case "right-tapping-with-chip-breaking":
                writeBlock(formats.m.format(29), outputs.spindle.format(tool.spindleRPM));
                if (properties.usePitchForTapping) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND ? 74 : 84))], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        "Q" + formats.xyz.format(cycle.incrementalDepth),
                        outputs.pitch.format(tool.threadPitch)], false));
                    forceFeed();
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format((tool.type == TOOL_TAP_LEFT_HAND ? 74 : 84))], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        "Q" + formats.xyz.format(cycle.incrementalDepth),
                        outputs.feed.format(properties.useG95 ? tool.getTappingFeedrate() / spindleSpeed : tool.getTappingFeedrate())], false));
                }
                break;
            case "fine-boring":
                writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(76)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                    "Q" + formats.xyz.format(cycle.shift),
                    outputs.feed.format(F)], false));
                break;
            case "back-boring":
                var dx = (modals.plane.getCurrent() == 19) ? cycle.backBoreDistance : 0;
                var dy = (modals.plane.getCurrent() == 18) ? cycle.backBoreDistance : 0;
                var dz = (modals.plane.getCurrent() == 17) ? cycle.backBoreDistance : 0;
                writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(87)], getCommonCycle(x - dx, y - dy, z - dz, cycle.bottom), false), ["Q" + formats.xyz.format(cycle.shift),
                    "P" + formats.milliseconds.format(P),
                    outputs.feed.format(F)], false));
                break;
            case "reaming":
                if (P > 0) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(89)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.feed.format(F)], false));
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(85)], getCommonCycle(x, y, z, cycle.retract), false), [outputs.feed.format(F)], false));
                }
                break;
            case "stop-boring":
                if (P > 0) {
                    expandCyclePoint(x, y, z);
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(86)], getCommonCycle(x, y, z, cycle.retract), false), [outputs.feed.format(F)], false));
                }
                break;
            case "manual-boring":
                writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(88)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                    outputs.feed.format(F)], false));
                break;
            case "boring":
                if (P > 0) {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(89)], getCommonCycle(x, y, z, cycle.retract), false), ["P" + formats.milliseconds.format(P),
                        outputs.feed.format(F)], false));
                }
                else {
                    writeBlock.apply(void 0, __spreadArray(__spreadArray([modals.retraction.format(98), modals.abs.format(90), modals.cycle.format(85)], getCommonCycle(x, y, z, cycle.retract), false), [outputs.feed.format(F)], false));
                }
                break;
            case "probing-x":
                forceXYZ();
                // move slowly always from clearance not retract
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9811, "X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter / 2)), "Q" + formats.xyz.format(cycle.probeOvertravel), "S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
                );
                break;
            case "probing-y":
                forceXYZ();
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9811, "Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter / 2)), "Q" + formats.xyz.format(cycle.probeOvertravel), "S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
                );
                break;
            case "probing-z":
                forceXYZ();
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(Math.min(z - cycle.depth + cycle.probeClearance, cycle.retract)), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9811, "Z" + formats.xyz.format(z - cycle.depth), 
                //"Q" + formats.xyz.format(cycle.probeOvertravel),
                "S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolLengthOffset)
                );
                break;
            case "probing-x-wall":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "X" + formats.xyz.format(cycle.width1), outputs.z.format(z - cycle.depth), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(cycle.probeClearance), "S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
                );
                break;
            case "probing-y-wall":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "Y" + formats.xyz.format(cycle.width1), outputs.z.format(z - cycle.depth), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(cycle.probeClearance), "S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
                );
                break;
            case "probing-x-channel":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "X" + formats.xyz.format(cycle.width1), "Q" + formats.xyz.format(cycle.probeOvertravel), 
                //not required "R" + formats.xyz.format(cycle.probeClearance),
                "S" + probeWorkOffsetCode // "T" + formats.tool.format(probeToolDiameterOffset)
                );
                break;
            case "probing-x-channel-with-island":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "X" + formats.xyz.format(cycle.width1), outputs.z.format(z - cycle.depth), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(-cycle.probeClearance), "S" + probeWorkOffsetCode);
                break;
            case "probing-y-channel":
                outputs.y.reset();
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "Y" + formats.xyz.format(cycle.width1), "Q" + formats.xyz.format(cycle.probeOvertravel), 
                //not required "R" + formats.xyz.format(cycle.probeClearance),
                "S" + probeWorkOffsetCode);
                break;
            case "probing-y-channel-with-island":
                outputs.y.reset();
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "Y" + formats.xyz.format(cycle.width1), outputs.z.format(z - cycle.depth), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(-cycle.probeClearance), "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-circular-boss":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9814, "D" + formats.xyz.format(cycle.width1), "Z" + formats.xyz.format(z - cycle.depth), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(cycle.probeClearance), "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-circular-hole":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9814, "D" + formats.xyz.format(cycle.width1), "Q" + formats.xyz.format(cycle.probeOvertravel), 
                //not required "R" + formats.xyz.format(cycle.probeClearance),
                "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-circular-hole-with-island":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9814, "Z" + formats.xyz.format(z - cycle.depth), "D" + formats.xyz.format(cycle.width1), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(-cycle.probeClearance), "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-rectangular-hole":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "X" + formats.xyz.format(cycle.width1), "Q" + formats.xyz.format(cycle.probeOvertravel), 
                // not required "R" + formats.xyz.format(-cycle.probeClearance),
                "S" + probeWorkOffsetCode);
                writeBlock(formats.g.format(65), "P" + 9812, "Y" + formats.xyz.format(cycle.width2), "Q" + formats.xyz.format(cycle.probeOvertravel), 
                // not required "R" + formats.xyz.format(-cycle.probeClearance),
                "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-rectangular-boss":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "Z" + formats.xyz.format(z - cycle.depth), "X" + formats.xyz.format(cycle.width1), "R" + formats.xyz.format(cycle.probeClearance), 
                //"Q" + formats.xyz.format(cycle.probeOvertravel),
                "S" + probeWorkOffsetCode);
                writeBlock(formats.g.format(65), "P" + 9812, "Z" + formats.xyz.format(z - cycle.depth), "Y" + formats.xyz.format(cycle.width2), "R" + formats.xyz.format(cycle.probeClearance), "Q" + formats.xyz.format(cycle.probeOvertravel), "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-rectangular-hole-with-island":
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9812, "Z" + formats.xyz.format(z - cycle.depth), "X" + formats.xyz.format(cycle.width1), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(-cycle.probeClearance), "S" + probeWorkOffsetCode);
                writeBlock(formats.g.format(65), "P" + 9812, "Z" + formats.xyz.format(z - cycle.depth), "Y" + formats.xyz.format(cycle.width2), "Q" + formats.xyz.format(cycle.probeOvertravel), "R" + formats.xyz.format(-cycle.probeClearance), "S" + probeWorkOffsetCode);
                break;
            case "probing-xy-inner-corner":
                var cornerX = x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter / 2);
                var cornerY = y + approach(cycle.approach2) * (cycle.probeClearance + tool.diameter / 2);
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
                writeBlock(formats.g.format(65), "P" + 9815, outputs.x.format(cornerX), outputs.y.format(cornerY), conditional(cornerI != 0, "I" + formats.xyz.format(cornerI)), conditional(cornerJ != 0, "J" + formats.xyz.format(cornerJ)), "Q" + formats.xyz.format(cycle.probeOvertravel), conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE.USE_CAXIS), "S" + probeWorkOffsetCode));
                break;
            case "probing-xy-outer-corner":
                var cornerX = x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter / 2);
                var cornerY = y + approach(cycle.approach2) * (cycle.probeClearance + tool.diameter / 2);
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
                writeBlock(formats.g.format(65), "P" + 9816, outputs.x.format(cornerX), outputs.y.format(cornerY), conditional(cornerI != 0, "I" + formats.xyz.format(cornerI)), conditional(cornerJ != 0, "J" + formats.xyz.format(cornerJ)), "Q" + formats.xyz.format(cycle.probeOvertravel), conditional((g68RotationMode == 0) || (angularProbingMode == ANGLE_PROBE.USE_CAXIS), "S" + probeWorkOffsetCode));
                break;
            case "probing-x-plane-angle":
                forceXYZ();
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9843, "X" + formats.xyz.format(x + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter / 2)), "D" + formats.xyz.format(cycle.probeSpacing), "Q" + formats.xyz.format(cycle.probeOvertravel));
                g68RotationMode = 1;
                break;
            case "probing-y-plane-angle":
                forceXYZ();
                writeBlock(formats.g.format(65), "P" + 9810, outputs.z.format(z - cycle.depth), getFeed(F)); // protected positioning move
                writeBlock(formats.g.format(65), "P" + 9843, "Y" + formats.xyz.format(y + approach(cycle.approach1) * (cycle.probeClearance + tool.diameter / 2)), "D" + formats.xyz.format(cycle.probeSpacing), "Q" + formats.xyz.format(cycle.probeOvertravel));
                g68RotationMode = 1;
                break;
            default:
                expandCyclePoint(x, y, z);
        }
    }
    else {
        if (isProbeOperation()) {
            // do nothing
        }
        else if (cycleExpanded) {
            expandCyclePoint(x, y, z);
        }
        else {
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
    }
    else if (!cycleExpanded) {
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
        }
        else {
            writeBlock(modals.motion.format(1), x, y, z, f);
        }
    }
    else if (f) {
        if (getNextRecord().isMotion()) { // try not to output feed without motion
            forceFeed(); // force feed on next line
        }
        else {
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
    }
    else {
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
        }
        else if (f) {
            if (getNextRecord().isMotion()) { // try not to output feed without motion
                forceFeed(); // force feed on next line
            }
            else {
                writeBlock(modals.motion.format(1), f);
            }
        }
    }
    else {
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
        }
        else if (f) {
            if (getNextRecord().isMotion()) { // try not to output feed without motion
                forceFeed(); // force feed on next line
            }
            else {
                writeBlock(modals.motion.format(1), f);
            }
        }
    }
}
/** Adjust final point to lie exactly on circle. */
var CircularData = /** @class */ (function () {
    function CircularData(_plane, _center, _end) {
        // use Output variables, since last point could have been adjusted if previous move was circular
        var start = new Vector(outputs.x.getCurrent(), outputs.y.getCurrent(), outputs.z.getCurrent());
        var saveStart = new Vector(start.x, start.y, start.z);
        var center = new Vector(formats.xyz.getResultingValue(_center.x), formats.xyz.getResultingValue(_center.y), formats.xyz.getResultingValue(_center.z));
        var end = new Vector(_end.x, _end.y, _end.z);
        switch (_plane) {
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
        this.start = new Vector(formats.xyz.getResultingValue(start.x), formats.xyz.getResultingValue(start.y), formats.xyz.getResultingValue(start.z));
        var temp = Vector.diff(center, start);
        this.offset = new Vector(formats.xyz.getResultingValue(temp.x), formats.xyz.getResultingValue(temp.y), formats.xyz.getResultingValue(temp.z));
        this.center = Vector.sum(this.start, this.offset);
        this.radius = this.offset.length;
        temp = Vector.diff(end, center).normalized;
        this.end = new Vector(formats.xyz.getResultingValue(this.center.x + temp.x * this.radius), formats.xyz.getResultingValue(this.center.y + temp.y * this.radius), formats.xyz.getResultingValue(this.center.z + temp.z * this.radius));
        switch (_plane) {
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
    return CircularData;
}());
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
                writeBlock(modals.abs.format(90), modals.plane.format(17), modals.motion.format(clockwise ? 2 : 3), outputs.i.format(circle.offset.x, 0), outputs.j.format(circle.offset.y, 0), getFeed(feed));
                break;
            case PLANE_ZX:
                writeBlock(modals.abs.format(90), modals.plane.format(18), modals.motion.format(clockwise ? 2 : 3), outputs.i.format(circle.offset.x, 0), outputs.k.format(circle.offset.z, 0), getFeed(feed));
                break;
            case PLANE_YZ:
                writeBlock(modals.abs.format(90), modals.plane.format(19), modals.motion.format(clockwise ? 2 : 3), outputs.j.format(circle.offset.y, 0), outputs.k.format(circle.offset.z, 0), getFeed(feed));
                break;
            default:
                linearize(tolerance);
        }
    }
    else if (!properties.useRadius) {
        switch (getCircularPlane()) {
            case PLANE_XY:
                writeBlock(modals.abs.format(90), modals.plane.format(17), modals.motion.format(clockwise ? 2 : 3), outputs.x.format(circle.end.x), outputs.y.format(circle.end.y), outputs.z.format(circle.end.z), outputs.i.format(circle.offset.x, 0), outputs.j.format(circle.offset.y, 0), getFeed(feed));
                break;
            case PLANE_ZX:
                writeBlock(modals.abs.format(90), modals.plane.format(18), modals.motion.format(clockwise ? 2 : 3), outputs.x.format(circle.end.x), outputs.y.format(circle.end.y), outputs.z.format(circle.end.z), outputs.i.format(circle.offset.x, 0), outputs.k.format(circle.offset.z, 0), getFeed(feed));
                break;
            case PLANE_YZ:
                writeBlock(modals.abs.format(90), modals.plane.format(19), modals.motion.format(clockwise ? 2 : 3), outputs.x.format(circle.end.x), outputs.y.format(circle.end.y), outputs.z.format(circle.end.z), outputs.j.format(circle.offset.y, 0), outputs.k.format(circle.offset.z, 0), getFeed(feed));
                break;
            default:
                if (properties.allow3DArcs) {
                    // make sure maximumCircularSweep is well below 360deg
                    // we could use G02.4 or G03.4 - direction is calculated
                    var ip = getPositionU(0.5);
                    writeBlock(modals.abs.format(90), modals.motion.format(clockwise ? 2.4 : 3.4), outputs.x.format(ip.x), outputs.y.format(ip.y), outputs.z.format(ip.z), getFeed(feed));
                    writeBlock(outputs.x.format(x), outputs.y.format(y), outputs.z.format(z));
                }
                else {
                    linearize(tolerance);
                }
        }
    }
    else { // use radius mode
        var r = circle.radius;
        if (toDeg(getCircularSweep()) > (180 + 1e-9)) {
            r = -r; // allow up to <360 deg arcs
        }
        switch (getCircularPlane()) {
            case PLANE_XY:
                writeBlock(modals.plane.format(17), modals.motion.format(clockwise ? 2 : 3), outputs.x.format(x), outputs.y.format(y), outputs.z.format(z), "R" + formats.r.format(r), getFeed(feed));
                break;
            case PLANE_ZX:
                writeBlock(modals.plane.format(18), modals.motion.format(clockwise ? 2 : 3), outputs.x.format(x), outputs.y.format(y), outputs.z.format(z), "R" + formats.r.format(r), getFeed(feed));
                break;
            case PLANE_YZ:
                writeBlock(modals.plane.format(19), modals.motion.format(clockwise ? 2 : 3), outputs.x.format(x), outputs.y.format(y), outputs.z.format(z), "R" + formats.r.format(r), getFeed(feed));
                break;
            default:
                if (properties.allow3DArcs) {
                    // make sure maximumCircularSweep is well below 360deg
                    // we could use G02.4 or G03.4 - direction is calculated
                    var ip = getPositionU(0.5);
                    writeBlock(modals.abs.format(90), modals.motion.format(clockwise ? 2.4 : 3.4), outputs.x.format(ip.x), outputs.y.format(ip.y), outputs.z.format(ip.z), getFeed(feed));
                    writeBlock(outputs.x.format(x), outputs.y.format(y), outputs.z.format(z));
                }
                else {
                    linearize(tolerance);
                }
        }
    }
}
var currentCoolantMode = COOLANT.DISABLED;
function setCoolant(coolant) {
    if (isProbeOperation()) { // avoid coolant output for probing
        coolant = COOLANT.DISABLED;
    }
    if (coolant == currentCoolantMode) {
        return ""; // coolant is already active
    }
    if (coolant == COOLANT.DISABLED) {
        writeBlock(formats.m.format((currentCoolantMode == COOLANT.THROUGH_TOOL) ? 89 : 9));
        currentCoolantMode = COOLANT.DISABLED;
        return "";
    }
    var m;
    switch (coolant) {
        case COOLANT.FLOOD:
            m = 8;
            break;
        case COOLANT.THROUGH_TOOL:
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
    return "";
}
var mapCommand = {
    COMMAND_STOP: 0,
    COMMAND_OPTIONAL_STOP: 1,
    COMMAND_END: 2,
    COMMAND_SPINDLE_CLOCKWISE: 3,
    COMMAND_SPINDLE_COUNTERCLOCKWISE: 4,
    COMMAND_STOP_SPINDLE: 5,
    COMMAND_ORIENTATE_SPINDLE: 19
};
function onCommand(command) {
    switch (command) {
        case COMMAND.COOLANT_OFF:
            setCoolant(COOLANT.DISABLED);
            return;
        case RECORD_CIRCULAR: //////////////REMOVE /  /.............
            return;
        case COMMAND.COOLANT_ON:
            setCoolant(COOLANT_FLOOD);
            return;
        case COMMAND.STOP:
            writeBlock(formats.m.format(0));
            forceSpindleSpeed = true;
            return;
        case COMMAND.START_SPINDLE:
            onCommand(tool.isClockwise() ? COMMAND.SPINDLE_CLOCKWISE : COMMAND.SPINDLE_COUNTERCLOCKWISE);
            return;
        case COMMAND.LOCK_MULTI_AXIS:
            return;
        case COMMAND.UNLOCK_MULTI_AXIS:
            return;
        case COMMAND.START_CHIP_TRANSPORT:
            return;
        case COMMAND.STOP_CHIP_TRANSPORT:
            return;
        case COMMAND.BREAK_CONTROL:
            if (!toolChecked) { // avoid duplicate COMMAND_BREAK_CONTROL
                //onCommand(COMMAND_STOP_SPINDLE);
                onCommand(COMMAND.COOLANT_OFF);
                writeBlock(formats.g.format(53), "Z" + formats.xyz.format(0), formats.m.format(19)); // retract
                writeBlock(formats.g.format(8), formats.p.format(0));
                writeBlock(formats.g.format(65), "P" + 9858, "T" + formats.tool.format(tool.number), 
                //"B" + formats.xyz.format(0),
                "H" + formats.xyz.format(properties.toolBreakageTolerance));
                toolChecked = true;
            }
            return;
        case COMMAND.TOOL_MEASURE:
            return;
    }
    var stringId = getCommandStringId(command);
    var mcode = mapCommand[stringId];
    if (mcode != undefined) {
        writeBlock(formats.m.format(mcode));
    }
    else {
        onUnsupportedCommand(command);
    }
}
var toolChecked = false; // specifies that the tool has been checked with the probe
function onSectionEnd() {
    if ((((getCurrentSectionId() + 1) >= getNumberOfSections()) ||
        (tool.number != getNextSection().getTool().number)) &&
        tool.breakControl) {
        onCommand(COMMAND.BREAK_CONTROL);
    }
    else {
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
    onCommand(COMMAND.COOLANT_OFF);
    writeBlock(modals.feed.format(0), formats.g.format(49));
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
    }
    else {
        var homeX;
        if (machineConfiguration.hasHomePositionX()) {
            homeX = "X" + formats.xyz.format(machineConfiguration.getHomePositionX());
        }
        var homeY;
        if (machineConfiguration.hasHomePositionY()) {
            homeY = "Y" + formats.xyz.format(machineConfiguration.getHomePositionY());
        }
        writeBlock(modals.abs.format(90), formats.g.format(53), modals.motion.format(0), homeX || "", homeY || "");
    }
    onImpliedCommand(COMMAND.END);
    onImpliedCommand(COMMAND.STOP_SPINDLE);
    writeBlock(formats.m.format(30)); // stop program, spindle stop, coolant off
    writeln("%");
}
