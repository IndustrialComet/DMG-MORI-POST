declare const CAPABILITY_MILLING: number;
declare const CAPABILITY_TURNING: number;
declare const CAPABILITY_JET: number;
declare const CAPABILITY_SETUP_SHEET: number;
declare const CAPABILITY_INTERMEDIATE: number;

enum CAPABILITY {
	MILLING = CAPABILITY_MILLING,
	TURNING = CAPABILITY_TURNING,
	JET = CAPABILITY_JET,
	SETUP_SHEET = CAPABILITY_SETUP_SHEET,
	INTERMEDIATE = CAPABILITY_INTERMEDIATE,
}

declare const IN: number;//Inch unit.
declare const MM: number;//Millimeters unit.

enum UNIT {
	INCH = IN,
	MILLIMETER = MM,
}

declare const PLANE_XY: number;//Circular XY plane.
declare const PLANE_ZX: number;//Circular ZX plane.
declare const PLANE_YZ: number;//Circular YZ plane.

enum PLANE {
	XY = PLANE_XY,//Circular XY plane.
	ZX = PLANE_ZX,//Circular ZX plane.
	YZ = PLANE_YZ,//Circular YZ plane.
}


declare const X: number;//X coordinate index.
declare const Y: number;//Y coordinate index.
declare const Z: number;//Z coordinate index.
declare const A: number;//A rotary index.
declare const B: number;//B rotary index.
declare const C: number;//C rotary index.
declare const ABC: number;//All rotaries index.

declare const TOOL_AXIS_X: number;//YZ-plane.
declare const TOOL_AXIS_Y: number;//ZX-plane.
declare const TOOL_AXIS_Z: number;//XY-plane.

enum TOOL_AXIS {
	X = TOOL_AXIS_X,//YZ-plane.
	Y = TOOL_AXIS_Y,//ZX-plane.
	Z = TOOL_AXIS_Z,//XY-plane.
}

declare const HAS_PARAMETER: number;//Has parameter flag.
declare const HAS_RAPID: number;//Has rapid flag.
declare const HAS_LINEAR: number;//Has linear flag.
declare const HAS_DWELL: number;//Has dwell flag.
declare const HAS_CIRCULAR: number;//Has circular flag.
declare const HAS_CYCLE: number;//Has cycle flag.
declare const HAS_WELL_KNOWN_COMMAND: number;//Has well-known COMMAND flag.
declare const HAS_COMMENT: number;//Has comment flag.

enum HAS {
	PARAMETER = HAS_PARAMETER,//Has parameter flag.
	RAPID = HAS_RAPID,//Has rapid flag.
	LINEAR = HAS_LINEAR,//Has linear flag.
	DWELL = HAS_DWELL,//Has dwell flag.
	CIRCULAR = HAS_CIRCULAR,//Has circular flag.
	CYCLE = HAS_CYCLE,//Has cycle flag.
	WELL_KNOWN_COMMAND = HAS_WELL_KNOWN_COMMAND,//Has well-known COMMAND flag.
	COMMENT = HAS_COMMENT,//Has comment flag.
}

declare const SINGULARITY_LINEARIZE_OFF: number;//Don't linearize moves around multi-axis singularities. More...
declare const SINGULARITY_LINEARIZE_LINEAR: number;
declare const SINGULARITY_LINEARIZE_ROTARY: number;//Keep rotary axes in line during multi-axis singularity linearization. More...

enum SINGULARITY {
	LINEARIZE_OFF = SINGULARITY_LINEARIZE_OFF,//Don't linearize moves around multi-axis singularities. More...
	LINEARIZE_LINEAR = SINGULARITY_LINEARIZE_LINEAR,
	LINEARIZE_ROTARY = SINGULARITY_LINEARIZE_ROTARY,//Keep rotary axes in line during multi-axis singularity linearization. More...	
}

declare const RADIUS_COMPENSATION_OFF: number;//Center radius compensation.
declare const RADIUS_COMPENSATION_LEFT: number;//Left radius compensation.
declare const RADIUS_COMPENSATION_RIGHT: number;//Right radius compensation.

enum RADIUS_COMPENSATION {
	OFF = RADIUS_COMPENSATION_OFF,//Center radius compensation.
	LEFT = RADIUS_COMPENSATION_LEFT,//Left radius compensation.
	RIGHT = RADIUS_COMPENSATION_RIGHT,//Right radius compensation.
}

declare const RECORD_WELL_KNOWN_COMMAND: number;//Well-known COMMAND.
declare const RECORD_PARAMETER: number;//Parameter.
declare const RECORD_LINEAR: number;//Linear motion.
declare const RECORD_LINEAR_5D: number;//Linear 5-axis motion.
declare const RECORD_LINEAR_ZXN: number;//Linear 5-axis motion.
declare const RECORD_LINEAR_EXTRUDE: number;//Linear motion with extrude.
declare const RECORD_CIRCULAR: number;//Circular motion.
declare const RECORD_DWELL: number;//Dwell.
declare const RECORD_CYCLE: number;//Cycle.
declare const RECORD_CYCLE_OFF: number;//End of cycle.
declare const RECORD_COMMENT: number;//Comment.
declare const RECORD_WIDE_COMMENT: number;//Comment.
declare const RECORD_CIRCULAR_EXTRUDE: number;//Circular motion with extrude.

enum RECORD {
	WELL_KNOWN_COMMAND = RECORD_WELL_KNOWN_COMMAND,//Well-known COMMAND.
	PARAMETER = RECORD_PARAMETER,//Parameter.
	LINEAR = RECORD_LINEAR,//Linear motion.
	LINEAR_5D = RECORD_LINEAR_5D,//Linear 5-axis motion.
	LINEAR_ZXN = RECORD_LINEAR_ZXN,//Linear 5-axis motion.
	LINEAR_EXTRUDE = RECORD_LINEAR_EXTRUDE,//Linear motion with extrude.
	CIRCULAR = RECORD_CIRCULAR,//Circular motion.
	DWELL = RECORD_DWELL,//Dwell.
	CYCLE = RECORD_CYCLE,//Cycle.
	CYCLE_OFF = RECORD_CYCLE_OFF,//End of cycle.
	COMMENT = RECORD_COMMENT,//Comment.
	WIDE_COMMENT = RECORD_WIDE_COMMENT,//Comment.
	CIRCULAR_EXTRUDE = RECORD_CIRCULAR_EXTRUDE,//Circular motion with extrude.
}

declare const COMMAND_STOP: number;//Program stop (well-known number;M00).
declare const COMMAND_OPTIONAL_STOP: number;//Optional program stop (well-known number;M01).
declare const COMMAND_END: number;//Program end (well-known number;M02).
declare const COMMAND_SPINDLE_CLOCKWISE: number;//Clockwise spindle direction (well-known number;M03).
declare const COMMAND_SPINDLE_COUNTERCLOCKWISE: number;//Counterclockwise spidle direction (well-known number;M04).
declare const COMMAND_START_SPINDLE: number;
declare const COMMAND_STOP_SPINDLE: number;//Spindle stop (well-known number;M05).
declare const COMMAND_ORIENTATE_SPINDLE: number;
declare const COMMAND_LOAD_TOOL: number;//Tool change (M06).
declare const COMMAND_COOLANT_ON: number;//Coolant on (M08).
declare const COMMAND_COOLANT_OFF: number;//Coolant off (M09).
declare const COMMAND_ACTIVATE_SPEED_FEED_SYNCHRONIZATION: number;//Activate speed-feed synchronization (well-known COMMAND).
declare const COMMAND_DEACTIVATE_SPEED_FEED_SYNCHRONIZATION: number;//Deactivate speed-feed synchronization (well-known COMMAND).
declare const COMMAND_LOCK_MULTI_AXIS: number;//Locks the 4th and 5th axes. This number;is optional.
declare const COMMAND_UNLOCK_MULTI_AXIS: number;//Unlocks the 4th and 5th axes. This number;is optional.
declare const COMMAND_EXACT_STOP: number;//Exact stop. This number;is optional.
declare const COMMAND_START_CHIP_TRANSPORT: number;//Close chip transport.
declare const COMMAND_STOP_CHIP_TRANSPORT: number;//Stop chip transport.
declare const COMMAND_OPEN_DOOR: number;//Open primary door.
declare const COMMAND_CLOSE_DOOR: number;//Close primary door.
declare const COMMAND_BREAK_CONTROL: number;//Break control.
declare const COMMAND_TOOL_MEASURE: number;//Measure tool.
declare const COMMAND_CALIBRATE: number;//Run calibration cycle.
declare const COMMAND_VERIFY: number;//Verify part/tool/machine integrity.
declare const COMMAND_CLEAN: number;//Run cleaning cycle.
declare const COMMAND_ALARM: number;//Alarm.
declare const COMMAND_ALERT: number;//Alert.
declare const COMMAND_CHANGE_PALLET: number;//Change pallet.
declare const COMMAND_POWER_ON: number;//Power on.
declare const COMMAND_POWER_OFF: number;//Power off.
declare const COMMAND_MAIN_CHUCK_OPEN: number;//Open main chuck. More...
declare const COMMAND_MAIN_CHUCK_CLOSE: number;//Close main chuck. More...
declare const COMMAND_SECONDARY_CHUCK_OPEN: number;//Open secondary chuck. More...
declare const COMMAND_SECONDARY_CHUCK_CLOSE: number;//Close secondary chuck. More...
declare const COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE: number;//Activate spindle synchronization. More...
declare const COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE: number;//Deactivate spindle synchronization. More...
declare const COMMAND_SYNC_CHANNELS: number;//Sync channels.
declare const COMMAND_PROBE_ON: number;//Probe on.
declare const COMMAND_PROBE_OFF: number;//Probe off.

enum COMMAND {
	STOP = COMMAND_STOP,//Program stop (well-known COMMAND M00).
	OPTIONAL_STOP = COMMAND_OPTIONAL_STOP,//Optional program stop (well-known COMMAND M01).
	END = COMMAND_END,//Program end (well-known COMMAND M02).
	SPINDLE_CLOCKWISE = COMMAND_SPINDLE_CLOCKWISE,//Clockwise spindle direction (well-known COMMAND M03).
	SPINDLE_COUNTERCLOCKWISE = COMMAND_SPINDLE_COUNTERCLOCKWISE,//Counterclockwise spidle direction (well-known COMMAND M04).
	START_SPINDLE = COMMAND_START_SPINDLE,
	STOP_SPINDLE = COMMAND_STOP_SPINDLE,//Spindle stop (well-known COMMAND M05).
	ORIENTATE_SPINDLE = COMMAND_ORIENTATE_SPINDLE,
	LOAD_TOOL = COMMAND_LOAD_TOOL,//Tool change (M06).
	COOLANT_ON = COMMAND_COOLANT_ON,//Coolant on (M08).
	COOLANT_OFF = COMMAND_COOLANT_OFF,//Coolant off (M09).
	ACTIVATE_SPEED_FEED_SYNCHRONIZATION = COMMAND_ACTIVATE_SPEED_FEED_SYNCHRONIZATION,//Activate speed-feed synchronization (well-known COMMAND).
	DEACTIVATE_SPEED_FEED_SYNCHRONIZATION = COMMAND_DEACTIVATE_SPEED_FEED_SYNCHRONIZATION,//Deactivate speed-feed synchronization (well-known COMMAND).
	LOCK_MULTI_AXIS = COMMAND_LOCK_MULTI_AXIS,//Locks the 4th and 5th axes. This COMMAND is optional.
	UNLOCK_MULTI_AXIS = COMMAND_UNLOCK_MULTI_AXIS,//Unlocks the 4th and 5th axes. This COMMAND is optional.
	EXACT_STOP = COMMAND_EXACT_STOP,//Exact stop. This COMMAND is optional.
	START_CHIP_TRANSPORT = COMMAND_START_CHIP_TRANSPORT,//Close chip transport.
	STOP_CHIP_TRANSPORT = COMMAND_STOP_CHIP_TRANSPORT,//Stop chip transport.
	OPEN_DOOR = COMMAND_OPEN_DOOR,//Open primary door.
	CLOSE_DOOR = COMMAND_CLOSE_DOOR,//Close primary door.
	BREAK_CONTROL = COMMAND_BREAK_CONTROL,//Break control.
	TOOL_MEASURE = COMMAND_TOOL_MEASURE,//Measure tool.
	CALIBRATE = COMMAND_CALIBRATE,//Run calibration cycle.
	VERIFY = COMMAND_VERIFY,//Verify part/tool/machine integrity.
	CLEAN = COMMAND_CLEAN,//Run cleaning cycle.
	ALARM = COMMAND_ALARM,//Alarm.
	ALERT = COMMAND_ALERT,//Alert.
	CHANGE_PALLET = COMMAND_CHANGE_PALLET,//Change pallet.
	POWER_ON = COMMAND_POWER_ON,//Power on.
	POWER_OFF = COMMAND_POWER_OFF,//Power off.
	MAIN_CHUCK_OPEN = COMMAND_MAIN_CHUCK_OPEN,//Open main chuck. More...
	MAIN_CHUCK_CLOSE = COMMAND_MAIN_CHUCK_CLOSE,//Close main chuck. More...
	SECONDARY_CHUCK_OPEN = COMMAND_SECONDARY_CHUCK_OPEN,//Open secondary chuck. More...
	SECONDARY_CHUCK_CLOSE = COMMAND_SECONDARY_CHUCK_CLOSE,//Close secondary chuck. More...
	SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE = COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE,//Activate spindle synchronization. More...
	SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE = COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE,//Deactivate spindle synchronization. More...
	SYNC_CHANNELS = COMMAND_SYNC_CHANNELS,//Sync channels.
	PROBE_ON = COMMAND_PROBE_ON,//Probe on.
	PROBE_OFF = COMMAND_PROBE_OFF,//Probe off.
}

declare const COOLANT_OFF: number;//Coolant disabled.
declare const COOLANT_FLOOD: number;//Flood coolant mode.
declare const COOLANT_MIST: number;//Mist coolant mode.
declare const COOLANT_THROUGH_TOOL: number;//Coolant through tool mode.
declare const COOLANT_AIR: number;//Air mode.
declare const COOLANT_AIR_THROUGH_TOOL: number;//Air through tool mode.
declare const COOLANT_SUCTION: number;//Suction mode.
declare const COOLANT_FLOOD_MIST: number;//Flood and mist coolant mode.
declare const COOLANT_FLOOD_THROUGH_TOOL: number;//Flood and through tool coolant mode.

enum COOLANT {
	OFF = COOLANT_OFF,
	FLOOD = COOLANT_FLOOD,//Flood coolant mode.
	MIST = COOLANT_MIST,//Mist coolant mode.
	THROUGH_TOOL = COOLANT_THROUGH_TOOL,//Coolant through tool mode.
	AIR = COOLANT_AIR,//Air mode.
	AIR_THROUGH_TOOL = COOLANT_AIR_THROUGH_TOOL,//Air through tool mode.
	SUCTION = COOLANT_SUCTION,//Suction mode.
	FLOOD_MIST = COOLANT_FLOOD_MIST,//Flood and mist coolant mode.
	FLOOD_THROUGH_TOOL = COOLANT_FLOOD_THROUGH_TOOL,//Flood and through tool coolant mode.
}

declare const MATERIAL_UNSPECIFIED: number;//Unspecified material.
declare const MATERIAL_HSS: number;//High-speed steel material.
declare const MATERIAL_TI_COATED: number;//TI coated material.
declare const MATERIAL_CARBIDE: number;//Carbide material.
declare const MATERIAL_CERAMICS: number;//Ceramics material.

enum MATERIAL {
	UNSPECIFIED = MATERIAL_UNSPECIFIED,//Unspecified material.
	HSS = MATERIAL_HSS,//High-speed steel material.
	TI_COATED = MATERIAL_TI_COATED,//TI coated material.
	CARBIDE = MATERIAL_CARBIDE,//Carbide material.
	CERAMICS = MATERIAL_CERAMICS,//Ceramics material.
}

declare const TOOL_UNSPECIFIED: number;//Unspecified tool.
declare const TOOL_DRILL: number;//Drill.
declare const TOOL_DRILL_CENTER: number;//Center drill.
declare const TOOL_DRILL_SPOT: number;//Spot drill.
declare const TOOL_DRILL_BLOCK: number;//Block drill.
declare const TOOL_MILLING_END_FLAT: number;//Flat end-mill.
declare const TOOL_MILLING_END_BALL: number;//Ball end-mill.
declare const TOOL_MILLING_END_BULLNOSE: number;//Bullnose mill.
declare const TOOL_MILLING_CHAMFER: number;//Chamfer mill.
declare const TOOL_MILLING_FACE: number;//Face mill.
declare const TOOL_MILLING_SLOT: number;//Slot mill.
declare const TOOL_MILLING_RADIUS: number;//Radius mill.
declare const TOOL_MILLING_DOVETAIL: number;//Dovetail mill.
declare const TOOL_MILLING_TAPERED: number;//Tapered mill.
declare const TOOL_MILLING_LOLLIPOP: number;//Lollipop mill.
declare const TOOL_TAP_RIGHT_HAND: number;//Right tap tool.
declare const TOOL_TAP_LEFT_HAND: number;//Left tap tool.
declare const TOOL_REAMER: number;//Reamer tool.
declare const TOOL_BORING_BAR: number;//Boring bar tool.
declare const TOOL_COUNTER_BORE: number;//Counterbore tool.
declare const TOOL_COUNTER_SINK: number;//Countersink tool.
declare const TOOL_HOLDER_ONLY: number;//Holder.
declare const TOOL_TURNING_GENERAL: number;//General turning tool.
declare const TOOL_TURNING_THREADING: number;//Thread turning tool.
declare const TOOL_TURNING_GROOVING: number;//Groove turning tool.
declare const TOOL_TURNING_BORING: number;//Boring turning tool.
declare const TOOL_TURNING_CUSTOM: number;//Custom turning tool.
declare const TOOL_PROBE: number;//Probe.
declare const TOOL_WIRE: number;//Wire.
declare const TOOL_WATER_JET: number;//Water jet.
declare const TOOL_LASER_CUTTER: number;//Laser cutter.
declare const TOOL_WELDER: number;//Welder.
declare const TOOL_GRINDER: number;//Grinder.
declare const TOOL_MILLING_FORM: number;//Form mill.
declare const TOOL_PLASMA_CUTTER: number;//Plasma cutter.
declare const TOOL_MARKER: number;//Marker tool.
declare const TOOL_MILLING_THREAD: number;//Thread mill.
declare const TOOL_COMPENSATION_INSERT_CENTER: number;//Turning tool compensation.
declare const TOOL_COMPENSATION_TIP: number;//Turning tool compensation.
declare const TOOL_COMPENSATION_TIP_CENTER: number;//Turning tool compensation.
declare const TOOL_COMPENSATION_TIP_TANGENT: number;//Turning tool compensation.

enum TOOL {
	UNSPECIFIED = TOOL_UNSPECIFIED,//Unspecified tool.
	DRILL = TOOL_DRILL,//Drill.
	DRILL_CENTER = TOOL_DRILL_CENTER,//Center drill.
	DRILL_SPOT = TOOL_DRILL_SPOT,//Spot drill.
	DRILL_BLOCK = TOOL_DRILL_BLOCK,//Block drill.
	MILLING_END_FLAT = TOOL_MILLING_END_FLAT,//Flat end-mill.
	MILLING_END_BALL = TOOL_MILLING_END_BALL,//Ball end-mill.
	MILLING_END_BULLNOSE = TOOL_MILLING_END_BULLNOSE,//Bullnose mill.
	MILLING_CHAMFER = TOOL_MILLING_CHAMFER,//Chamfer mill.
	MILLING_FACE = TOOL_MILLING_FACE,//Face mill.
	MILLING_SLOT = TOOL_MILLING_SLOT,//Slot mill.
	MILLING_RADIUS = TOOL_MILLING_RADIUS,//Radius mill.
	MILLING_DOVETAIL = TOOL_MILLING_DOVETAIL,//Dovetail mill.
	MILLING_TAPERED = TOOL_MILLING_TAPERED,//Tapered mill.
	MILLING_LOLLIPOP = TOOL_MILLING_LOLLIPOP,//Lollipop mill.
	TAP_RIGHT_HAND = TOOL_TAP_RIGHT_HAND,//Right tap tool.
	TAP_LEFT_HAND = TOOL_TAP_LEFT_HAND,//Left tap tool.
	REAMER = TOOL_REAMER,//Reamer tool.
	BORING_BAR = TOOL_BORING_BAR,//Boring bar tool.
	COUNTER_BORE = TOOL_COUNTER_BORE,//Counterbore tool.
	COUNTER_SINK = TOOL_COUNTER_SINK,//Countersink tool.
	HOLDER_ONLY = TOOL_HOLDER_ONLY,//Holder.
	TURNING_GENERAL = TOOL_TURNING_GENERAL,//General turning tool.
	TURNING_THREADING = TOOL_TURNING_THREADING,//Thread turning tool.
	TURNING_GROOVING = TOOL_TURNING_GROOVING,//Groove turning tool.
	TURNING_BORING = TOOL_TURNING_BORING,//Boring turning tool.
	TURNING_CUSTOM = TOOL_TURNING_CUSTOM,//Custom turning tool.
	PROBE = TOOL_PROBE,//Probe.
	WIRE = TOOL_WIRE,//Wire.
	WATER_JET = TOOL_WATER_JET,//Water jet.
	LASER_CUTTER = TOOL_LASER_CUTTER,//Laser cutter.
	WELDER = TOOL_WELDER,//Welder.
	GRINDER = TOOL_GRINDER,//Grinder.
	MILLING_FORM = TOOL_MILLING_FORM,//Form mill.
	PLASMA_CUTTER = TOOL_PLASMA_CUTTER,//Plasma cutter.
	MARKER = TOOL_MARKER,//Marker tool.
	MILLING_THREAD = TOOL_MILLING_THREAD,//Thread mill.
	COMPENSATION_INSERT_CENTER = TOOL_COMPENSATION_INSERT_CENTER,//Turning tool compensation.
	COMPENSATION_TIP = TOOL_COMPENSATION_TIP,//Turning tool compensation.
	COMPENSATION_TIP_CENTER = TOOL_COMPENSATION_TIP_CENTER,//Turning tool compensation.
	COMPENSATION_TIP_TANGENT = TOOL_COMPENSATION_TIP_TANGENT,//Turning tool compensation.
}

declare const MOVEMENT_RAPID: number;//Rapid movement type.
declare const MOVEMENT_LEAD_IN: number;//Lead-in movement type.
declare const MOVEMENT_CUTTING: number;//Cutting movement type.
declare const MOVEMENT_LEAD_OUT: number;//Lead-out movement type.
declare const MOVEMENT_LINK_TRANSITION: number;//Transition linking movement type.
declare const MOVEMENT_LINK_DIRECT: number;//Drection linking movement type.
declare const MOVEMENT_RAMP_HELIX: number;//Helical ramp movement type.
declare const MOVEMENT_RAMP_PROFILE: number;//Profile ramp movement type.
declare const MOVEMENT_RAMP_ZIG_ZAG: number;//Zig-zag ramp movement type.
declare const MOVEMENT_RAMP: number;//Ramp movement type.
declare const MOVEMENT_PLUNGE: number;//Plunge movement type.
declare const MOVEMENT_PREDRILL: number;//Predrill movement type.
declare const MOVEMENT_EXTENDED: number;//Extended movement type.
declare const MOVEMENT_REDUCED: number;//Reduced cutting feed movement type.
declare const MOVEMENT_FINISH_CUTTING: number;//Finish cutting movement type.
declare const MOVEMENT_HIGH_FEED: number;//High feed movement type.

enum MOVEMENT {
	RAPID = MOVEMENT_RAPID,//Rapid movement type.
	LEAD_IN = MOVEMENT_LEAD_IN,//Lead-in movement type.
	CUTTING = MOVEMENT_CUTTING,//Cutting movement type.
	LEAD_OUT = MOVEMENT_LEAD_OUT,//Lead-out movement type.
	LINK_TRANSITION = MOVEMENT_LINK_TRANSITION,//Transition linking movement type.
	LINK_DIRECT = MOVEMENT_LINK_DIRECT,//Drection linking movement type.
	RAMP_HELIX = MOVEMENT_RAMP_HELIX,//Helical ramp movement type.
	RAMP_PROFILE = MOVEMENT_RAMP_PROFILE,//Profile ramp movement type.
	RAMP_ZIG_ZAG = MOVEMENT_RAMP_ZIG_ZAG,//Zig-zag ramp movement type.
	RAMP = MOVEMENT_RAMP,//Ramp movement type.
	PLUNGE = MOVEMENT_PLUNGE,//Plunge movement type.
	PREDRILL = MOVEMENT_PREDRILL,//Predrill movement type.
	EXTENDED = MOVEMENT_EXTENDED,//Extended movement type.
	REDUCED = MOVEMENT_REDUCED,//Reduced cutting feed movement type.
	FINISH_CUTTING = MOVEMENT_FINISH_CUTTING,//Finish cutting movement type.
	HIGH_FEED = MOVEMENT_HIGH_FEED,//High feed movement type.
}

declare const HIGH_FEED_NO_MAPPING: number;//Do not map rapid traveerrorsal to high feed.
declare const HIGH_FEED_MAP_MULTI: number;//Map rapid travesal along more than one axis to high feed.
declare const HIGH_FEED_MAP_XY_Z: number;
declare const HIGH_FEED_MAP_ANY: number;//Map all rapid travesals to high feed.

enum HIGH_FEED {
	NO_MAPPING = HIGH_FEED_NO_MAPPING,//Do not map rapid traveerrorsal to high feed.
	MAP_MULTI = HIGH_FEED_MAP_MULTI,//Map rapid travesal along more than one axis to high feed.
	MAP_XY_Z = HIGH_FEED_MAP_XY_Z,
	MAP_ANY = HIGH_FEED_MAP_ANY,//Map all rapid travesals to high feed.
}