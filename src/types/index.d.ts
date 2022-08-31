interface Integer {}
/// <reference path="./Vector.ts" />
/// <reference path="./Format.ts" />
/// <reference path="./Modal.ts" />
/// <reference path="./Section.ts" />
/// <reference path="./MachineConfiguration.ts" />

declare function getMachineConfiguration(): MachineConfiguration;
declare function setMachineConfiguration(machine: n): void;
declare function getMultiAxisMoveLength(x: number, y: number, z: number, a: number, b: number, c: number): MoveLength;
declare function optimizeMachineAngles(): void;
declare function optimizeMachineAngles2(optimizeType: r): void;
declare function optimizeMachineAnglesByMachine(machine: MachineConfiguration, optimizeType: Integer): void;
declare function isSectionSpecialCycle(uri: g): Boolean;
declare function setSectionSpecialCycle(uri: string, specialCycle: boolean): void;
declare function getProduct(): string;
declare function getProductUri(): string;
declare function getProductUrl(): string;
declare function getVendor(): string;
declare function getVendorUrl(): string;
declare function getVersion(): string;
declare function openUrl(url: g): void;
declare function printDocument(path: g): Boolean;
declare function printDocumentTo(path: string, printerName: string): Boolean;
declare function createToolRenderer(): ToolRenderer;
declare function invokeOnRapid(x: number, y: number, z: number): Boolean;
Boolean 	invokeOnRapid5declare function D(x: number, y: number, z: number, dx: number, dy: number, dz: number): void;
declare function invokeOnLinear(x: number, y: number, z: number, feedrate: number): Boolean;
Boolean 	invokeOnLinear5declare function D(x: number, y: number, z: number, dx: number, dy: number, dz: number, feedrate: number): void;
declare function invokeOnCircular(clockwise: boolean, cx: number, cy: number, cz: number, x: number, y: number, z: number, nx: number, ny: number, nz: number, feedrate: number): Boolean;
declare function activatePolarMode(tolerance: number, currentAngle: number, Vector polarDirection): VectorPair;
declare function deactivatePolarMode(): void;
declare function isPolarModeActive(): Boolean;
declare function getPolarPosition(x: number, y: number, z: number): VectorPair;
declare function setCurrentPositionAndDirection(posDir: r): void;
declare function setExitCode(code: r): void;
declare function error(message: g): void;
declare function warning(message: g): void;
warningOnce (string &message, id: Integer)
declare function log(message: g): void;
declare function getCurrentNCLocation(): string;
declare function getSystemUnit(): Integer;
declare function getPlatform(): string;
declare function hasSymbol(symbol: r): Boolean;
declare function isTextSupported(text: g): Boolean;
declare function getCodePage(): Integer;
declare function setCodePage(name: g): void;
declare function write(message: g): void;
declare function writeln(message: g): void;
declare function getWordSeparator(): string;
declare function setWordSeparator(message: g): void;
declare function writeWords(message: string): void;
declare function writeWords2(message: string): void;
declare function formatWords(message: g): string;
declare function subst(message: string): string;
declare function getLangId(): string;
declare function isSupportedText (message: string): boolean;
declare function localize(message: g): string;
declare function localize2 (section: string, message: string): string;
declare function loadLocale(langId: g): Boolean;
declare function include(path: g): void;
declare function findFile(path: g): string;
declare function getHeader(): string;
declare function getHeaderVersion(): string;
declare function getHeaderCommit(): string;
declare function getHeaderDate(): string;
Date 	getHeaderDate2 ()
declare function getHeaderSnippet(keyword: g): string;
declare function getIntermediatePath(): string;
declare function getOutputPath(): string;
declare function getSimulationStreamPath(): string;
declare function getConfigurationFolder(): string;
declare function getConfigurationPath(): string;
declare function getPostProcessorFolder(): string;
declare function getPostProcessorPath(): string;
declare function getCascadingPath(): string;
declare function setCascadingPath(string): void;
declare function getSecurityLevel(): Integer;
declare function exportNCAs(path: string, format: string): void;
declare function execute(path: string, arguments: string, hide: boolean, workingFolder: string): Integer;
declare function executeNoWait(path: string, arguments: string, hide: boolean, workingFolder: string): void;
declare function setEOL(eol: g): void;
declare function isRedirecting(): Boolean;
declare function closeRedirection(): void;
declare function redirectToFile(path: g): void;
declare function redirectToBuffer(): void;
declare function getRedirectionBuffer(): string;
string 	getRedirectionBuffer2 (clear: n)
declare function registerPostProcessing(path: g): void;
declare function getWorkpiece(): BoundingBox;
declare function getFixture(): BoundingBox;
declare function getMachineConfigurations(): string;
declare function getMachineConfigurationByName(name: g): MachineConfiguration;
declare function loadMachineConfiguration(path: g): MachineConfiguration;
declare function isInteractionAllowed(): Boolean;
declare function alert(title: string, description: string): void;
declare function promptKey(title: string, description: string): string;
string 	promptKey2 (title: string, description: string, accept: string)
string 	promptKey3 (title: string, description: string, accept: string, keys: string)
declare function promptText(title: string, description: string): string;
declare function getAsInt(text: g): Integer;
declare function getAsFloat(text: g): number;
declare function isSafeText(text: string, permitted: string): Boolean;
declare function filterText(text: string, keep: string): string;
declare function translateText(text: string, src: string, dest: string): string;
declare function loadText(url: string, encoding: string): string;
declare function getOutputUnit(): Integer;
declare function setOutputUnit(unit: r): void;
declare function getDogLeg(): Boolean;
declare function setDogLeg(dogLeg: n): void;
declare function getRotation(): Matrix;
declare function setRotation(rotation: x): void;
declare function cancelRotation(): void;
declare function getTranslation(): Vector;
declare function cancelTransformation(): void;
declare function setTranslation(translation: r): void;
declare function cancelTranslation(): void;
declare function getFramePosition(position: r): Vector;
declare function getFrameDirection(direction: r): Vector;
declare function getSectionFramePosition(framePosition: r): Vector;
declare function getSectionFrameDirection(frameDirection: r): Vector;
declare function getHighFeedMapping(): Integer;
declare function setHighFeedMapping(mode: r): void;
declare function getHighFeedrate(): number;
declare function setHighFeedrate(feedrate: r): void;
declare function getGlobalPosition(p: r): Vector;
declare function getWCSPosition(p: r): Vector;
declare function getSectionPosition(p: r): Vector;
declare function getCurrentGlobalPosition(): Vector;
declare function getCurrentPosition(): Vector;
declare function setCurrentPosition(currentPosition: r): void;
declare function setCurrentPositionX(x: r): void;
declare function setCurrentPositionY(y: r): void;
declare function setCurrentPositionZ(z: r): void;
declare function getCurrentDirection(): Vector;
declare function setCurrentDirection(currentDirection: r): void;
declare function getCurrentSpindleSpeed(): number;
declare function setCurrentSpindleSpeed(spindleSpeed: r): void;
declare function setCurrentABC(abc: r): void;
declare function skipRemainingSection(): void;
declare function isClockwiseSpindleDirection(): Boolean;
declare function isSpindleActive(): Boolean;
declare function isCoolantActive(): Boolean;
declare function isProbeOperation(section: n): Boolean;
declare function isInspectionOperation(section: n): Boolean;
declare function isDepositionOperation(section: n): Boolean;
declare function isDrillingCycle(Section section, checkBoringCycles: boolean): Boolean;
declare function isTappingCycle(section: n): Boolean;
declare function isAxialCenterDrilling(Section section, checkLiveTool: boolean): Boolean;
declare function isMillingCycle(Section section, checkBoringCycles: boolean): Boolean;
declare function isSpeedFeedSynchronizationActive(): Boolean;
declare function is3D(): boolean;
declare function isMultiAxis(): Boolean;
declare function isMultiChannelProgram(): Boolean;
declare function getnumberOfChannels(): Integer;
declare function getCurrentChannel(): Integer;
declare function getnumberOfSyncGroups(channel: r): Integer;
declare function getCurrentSyncGroup(): Integer;
declare function getnumberOfRecords(): Integer;
declare function getRecord(id: r): Record;
declare function getCurrentSectionId(): Integer;
declare function getnumberOfSections(): Integer;
declare function getSection(index: r): Section;
declare function getPreviousSection(): Section;
declare function hasNextSection(): Boolean;
declare function getNextSection(): Section;
declare function getToolTable(): ToolTable;
declare function writeToolTable(orderBy: r): void;
declare function getCurrentRecordId(): Integer;
declare function getMachiningDistance(tool: r): number;
declare function isExpanding(): Boolean;
declare function getEnd(): Vector;
declare function getDirection(): Vector;
declare function getLength(): number;
declare function getCircularCenter(): Vector;
declare function getCircularStartRadius(): number;
declare function getCircularRadius(): number;
declare function getCircularSweep(): number;
declare function getCircularChordLength(): number;
declare function isClockwise(): Boolean;
declare function isFullCircle(): Boolean;
declare function isHelical(): Boolean;
declare function isSpiral(): Boolean;
declare function getCircularNormal(): Vector;
declare function getCircularPlane(): Integer;
declare function getHelicalOffset(): Vector;
declare function getHelicalDistance(): number;
declare function getHelicalPitch(): number;
declare function canLinearize(): Boolean;
declare function linearize(tolerance: r): void;
declare function getnumberOfSegments(tolerance: r): Integer;
declare function getPositionU(u: r): Vector;
declare function getCircularMotion(): CircularMotion;
declare function getFeedrate(): number;
declare function getMovement(): Integer;
declare function getPower(): Boolean;
declare function getSpindleSpeed(): number;
declare function isSpindleSpeedDifferent(section: n): Boolean;
declare function getRadiusCompensation(): Integer;
declare function getCompensationOffset(): Integer;
declare function hasPreviousRecord(): Boolean;
declare function getPreviousRecord(): Record;
declare function hasNextRecord(): Boolean;
declare function getNextRecord(): Record;
declare function getFirstTool(): Tool;
declare function setWriteInvocations(writeInvocations: n): void;
declare function setWriteStack(writeStack: n): void;
declare function writeSectionNotes(): void;
declare function writeSetupNotes(): void;
declare function isFirstCyclePoint(): Boolean;
declare function isLastCyclePoint(): Boolean;
declare function getCyclePointId(): Integer;
declare function getnumberOfCyclePoints(): Integer;
declare function getCyclePoint(index: r): Vector;
declare function onImpliedCommand(command: r): void;
declare function hasGlobalParameter(name: g): Boolean;
declare function getGlobalParameter(name: string, Value defaultValue): Value;
declare function getProperty(ScriptObject property, Value defaultValue): Value;
declare function setProperty(ScriptObject property, Value value): void;
declare function hasParameter(name: g): Boolean;
declare function getParameter(name: string, Value defaultValue): Value;
declare function registerTerminationHandler(function: n): void;
declare function toDeg(radians: r): number;
declare function toRad(degrees: r): number;
declare function parseSpatial (string &value): number;
declare function getPlane(direction: r): Integer;
declare function getISOPlane(plane: r): Integer;
declare function isSameDirection(a, b): Boolean;
declare function getSectionsInChannel(channel: r): Array;
declare function validatePropertyDefinitions(): Boolean;
declare function validateProperties(): Boolean;
declare function getProgramNameAsInt(min: Integer, max: Integer): Integer;
declare function getProgramNameAsstring(charLimit: r): string;
declare function isToolChangeNeeded(Section section, arguments: string): Boolean;
declare function getNextTool(number: r): Tool;
declare function getNextTool(Section section, firstTool: boolean, arguments: string): Tool;
declare function isNewWorkPlane(section: n): Boolean;
declare function isNewWorkOffset(section: n): Boolean;
declare function toolZRange(): Range;
declare function range(first: number, end: number, step: number): Array;
declare function interval(from: number, to: number): Array;
declare function flatten(array: y): Array;
declare function getQuadrant(angle: r): Integer;
declare function conditional(condition, value): string;
declare function validate(Value expression, message: string): void;
declare function debug(message: g): void;
declare function spatial(value: number,unit: Integer): number;
declare function getInverseTime(distance: number, speed: number): number;
declare function cycleNotSupported(): void;
declare function isWorkpieceDefined(): Boolean;
declare function isTurning(): Boolean;
declare function isMilling(): Boolean;
declare function isJet(): Boolean;
declare function isFirstSection(): Boolean;
declare function isLastSection(): Boolean;
declare function onExpandedRapid(x: number, y: number, z: number): void;
declare function onExpandedLinear(x: number, y: number, z: number, feed: number): void;
declare function onExpandedSpindleSpeed(spindleSpeed: r): void;
declare function createMachineConfiguration(specifiers: p): MachineConfiguration;
declare function getMachineConfigurationAsText(machine: n): string;
declare function createAxis(specifiers: p): Axis;
declare function createFormat(specifiers: p): Formatnumber;
declare function createOutputVariable(specifiers: Specifier, format: Format): OutputVariable;
declare function createVariable(specifiers: {},format: Format): Variable;
declare function createIncrementalVariable(specifiers: Specifier, format: Format): IncrementalVariable;
declare function createReferenceVariable(specifiers: Specifier, format: Format): ReferenceVariable;
declare function createModal(specifiers: Specifier, format: Format): Modal;
declare function createModalGroup(specifiers: Specifier, Array groups, format: Format): ModalGroup;
declare function repositionToCycleClearance(Map cycle, x: number, y: number, z: number): void;
declare function expandCyclePoint(x: number, y: number, z: number): void;
declare function isWellKnownCycle(): Boolean;
declare function isProbingCycle(uri: g): Boolean;
declare function isSubSpindleCycle(uri: g): Boolean;
declare function isWellKnownCommand(command: r): Boolean;
declare function getCommandstringId(command: r): string;
declare function canIgnoreCommand(command: r): Boolean;
declare function onUnsupportedCommand(command: r): void;
declare function expandManualNC(command: Integer,value: Value): void;
declare function onUnsupportedCoolant(coolant: r): void;
declare function getCoolantName(coolant: r): string;
declare function getMaterialName(material: r): string;
declare function getToolTypeName(tool): string;
declare function onMachine(): void;
declare function onOpen(): void;
declare function onCycle(): void;
declare function onCyclePoint(x: number, y: number, z: number): void;
declare function onCyclePath(): void;
declare function onCyclePathEnd(): void;
declare function onCycleEnd(): void;
declare function onParameter(name: string,value: Value): void;
declare function onPassThrough(value: e): void;
declare function onComment(comment: g): void;
declare function onRapid(x: number, y: number, z: number): void;
declare function onLinear(x: number, y: number, z: number, feed: number): void;
declare function onLinearExtrude(x: number, y: number, z: number, feed: number, extrusionLength: number): void;
declare function onCircular(clockwise: boolean, cx: number, cy: number, cz: number, x: number, y: number, z: number, feed: number): void;
declare function onCircularExtrude(clockwise: boolean, cx: number, cy: number, cz: number, x: number, y: number, z: number, feed: number, extrusionLength: number): void;
declare function onRapid5D(x: number, y: number, z: number, dx: number, dy: number, dz: number): void;
declare function onLinear5D(x: number, y: number, z: number, dx: number, dy: number, dz: number, feed: number): void;
declare function onRewindMachine(a: number, b: number, c: number): void;
declare function onRewindMachineEntry(a: number, b: number, c: number): void;
declare function onMoveToSafeRetractPosition(): void;
declare function onReturnFromSafeRetractPosition(x: number, y: number, z: number): void;
declare function onRotateAxes(x: number, y: number, z: number, a: number, b: number, c: number): void;
declare function onMovement(movement: r): void;
declare function onPower(power: n): void;
declare function onRadiusCompensation(): void;
declare function onToolCompensation(compensation: r): void;
declare function onDwell(time: r): void;
declare function onSpindleSpeed(spindleSpeed: r): void;
declare function onLayer(layernumber: r): void;
declare function onLayerEnd(layernumber: r): void;
declare function onExtrusionReset(length: r): void;
declare function onExtruderChange(extruderId: r): void;
declare function onExtruderTemp(temp: number, wait: boolean, extruderId: Integer): void;
declare function onBedTemp(temp: number, wait: boolean): void;
declare function onFanSpeed(speed: number, fanId: Integer): void;
declare function onMaxAcceleration(xAxis: number, yAxis: number, zAxis: number, eAxis: number): void;
declare function onAcceleration(travel: number, printing: number, retract: number): void;
declare function onJerk(xAxis: number, yAxis: number, zAxis: number, eAxis: number): void;
declare function onCOmmand(command: r): void;
declare function onOrientateSpindle(angle: r): void;
declare function onSectionEnd(): void;
declare function onClose(): void;

declare var outputUnit: Integer; 
declare var currentSection: Section; 
declare var highFeedMapping: Integer; 
declare var highFeedrate: number; 
declare var linenumber: Integer; 
declare var initialCyclePosition: Vector; 
declare var abortOnDeprecation: boolean; 
declare var end: Vector; 
declare var length: number; 
declare var center: Vector;//The center of the current circular motion.
declare var normal: Vector;//The circular plane normal of the current circular motion.
declare var plane: Integer; 
declare var radius: number;//The radius of the current circular motion.
declare var sweep: number;//The sweep of the current circular motion.
declare var clockwise: boolean;//Specifies that the current cicular motion is clockwise.
declare var chordLength: number;//The chord length of the current circular motion (0 for full circles).
declare var fullCircle: boolean;//Specifies that the currect circular motion is a full circle.
declare var helical: boolean;//Specifies that the currect circular motion is helical.
declare var helicalOffset: Vector;//The helical offset for the current circular motion.
declare var helicalDistance: number;//The helical distance for the currect circular motion.
declare var movement: Integer; 
declare var radiusCompensation: Integer; 
declare var description: string; 
declare var vendor: string; 
declare var vendorUrl: string; 
declare var legal: string; 
declare var unit: Integer; 
declare var programName: string; 
declare var programNameIsInteger: boolean; 
declare var debugMode: boolean; 
declare var preventPost: boolean; 
declare var filename: string; 
declare var extension: string; 
declare var version: string; 
declare var certificationLevel: Integer; 
declare var revision: Integer; 
declare var minimumRevision: Integer; 
declare var deprecated: boolean; 
declare var capabilities: Integer; 
declare var tolerance: number; 
declare var mapWorkOrigin: boolean; 
declare var mapToWCS: boolean; 
declare var allowMachineChangeOnSection: boolean; 
declare var minimumChordLength: number; 
declare var minimumCircularRadius: number; 
declare var maximumCircularRadius: number; 
declare var minimumCircularSweep: number; 
declare var maximumCircularSweep: number; 
declare var allowHelicalMoves: boolean; 
declare var allowSpiralMoves: boolean; 
declare var allowedCircularPlanes: Integer | undefined; 
declare var machineParameters: MachineParameters; 
declare var properties: Map; 
declare var NUL: string;//NUL ASCII control code.
declare var SOH: string;//SOH ASCII control code.
declare var STX: string;//STX ASCII control code.
declare var ETX: string;//ETX ASCII control code.
declare var EOT: string;//EOT ASCII control code.
declare var ENQ: string;//ENQ ASCII control code.
declare var ACK: string;//ACK ASCII control code.
declare var BEL: string;//BEL ASCII control code.
declare var BS: string;//BS ASCII control code.
declare var TAB: string;//TAB ASCII control code.
declare var LF: string;//LF ASCII control code.
declare var VT: string;//VT ASCII control code.
declare var FF: string;//FF ASCII control code.
declare var CR: string;//CR ASCII control code.
declare var SO: string;//SO ASCII control code.
declare var SI: string;//SI ASCII control code.
declare var DLE: string;//DLE ASCII control code.
declare var DC1: string;//DC1 ASCII control code.
declare var DC2: string;//DC2 ASCII control code.
declare var DC3: string;//DC3 ASCII control code.
declare var DC4: string;//DC4 ASCII control code.
declare var NAK: string;//NAK ASCII control code.
declare var SYN: string;//SYN ASCII control code.
declare var ETB: string;//ETB ASCII control code.
declare var CAN: string;//CAN ASCII control code.
declare var EM: string;//EM ASCII control code.
declare var SUB: string;//SUB ASCII control code.
declare var ESC: string;//ESC ASCII control code.
declare var FS: string;//FS ASCII control code.
declare var GS: string;//GS ASCII control code.
declare var RS: string;//RS ASCII control code.
declare var US: string;//US ASCII control code.
declare var EOL: string;//The default end-of-line marker.
declare var SP: string;//Space string.
declare var PATH_SEPARATOR: string;//File path separator.
declare var IN: Integer;//Inch unit.
declare var MM: Integer;//Millimeters unit.
declare var PLANE_XY: Integer;//Circular XY plane.
declare var PLANE_XZ: Integer;//Circular XZ plane. Deprecated use PLANE_ZX instead.
declare var PLANE_ZX: Integer;//Circular ZX plane.
declare var PLANE_YZ: Integer;//Circular YZ plane.
declare var X: Integer;//X coordinate index.
declare var Y: Integer;//Y coordinate index.
declare var Z: Integer;//Z coordinate index.
declare var A: Integer;//A rotary index.
declare var B: Integer;//B rotary index.
declare var C: Integer;//C rotary index.
declare var ABC: Integer;//All rotaries index.
declare var TOOL_AXIS_X: Integer;//YZ-plane.
declare var TOOL_AXIS_Y: Integer;//ZX-plane.
declare var TOOL_AXIS_Z: Integer;//XY-plane.
declare var RADIUS_COMPENSATION_OFF: Integer;//Center radius compensation.
declare var RADIUS_COMPENSATION_LEFT: Integer;//Left radius compensation.
declare var RADIUS_COMPENSATION_RIGHT: Integer;//Right radius compensation.
declare var SINGULARITY_LINEARIZE_OFF: Integer;//Don't linearize moves around multi-axis singularities. More...
declare var SINGULARITY_LINEARIZE_LINEAR: Integer;
declare var SINGULARITY_LINEARIZE_ROTARY: Integer;//Keep rotary axes in line during multi-axis singularity linearization. More...




declare var HAS_PARAMETER: Integer;//Has parameter flag.
declare var HAS_RAPID: Integer;//Has rapid flag.
declare var HAS_LINEAR: Integer;//Has linear flag.
declare var HAS_DWELL: Integer;//Has dwell flag.
declare var HAS_CIRCULAR: Integer;//Has circular flag.
declare var HAS_CYCLE: Integer;//Has cycle flag.
declare var HAS_WELL_KNOWN_COMMAND: Integer;//Has well-known COMMAND flag.
declare var HAS_COMMENT: Integer;//Has comment flag.

//RECORDS
interface RECORD {};
declare var RECORD_INVALID: Integer;//Invalid record type.
declare var RECORD_WELL_KNOWN_COMMAND: Integer;//Well-known COMMAND.
declare var RECORD_PARAMETER: Integer;//Parameter.
declare var RECORD_LINEAR: Integer;//Linear motion.
declare var RECORD_LINEAR_5D: Integer;//Linear 5-axis motion.
declare var RECORD_LINEAR_ZXN: Integer;//Linear 5-axis motion.
declare var RECORD_LINEAR_EXTRUDE: Integer;//Linear motion with extrude.
declare var RECORD_CIRCULAR: Integer;//Circular motion.
declare var RECORD_DWELL: Integer;//Dwell.
declare var RECORD_CYCLE: Integer;//Cycle.
declare var RECORD_CYCLE_OFF: Integer;//End of cycle.
declare var RECORD_COMMENT: Integer;//Comment.
declare var RECORD_WIDE_COMMENT: Integer;//Comment.
declare var RECORD_CIRCULAR_EXTRUDE: Integer;//Circular motion with extrude.


//COMMANDS
interface COMMAND {};
declare var COMMAND_INVALID: COMMAND;//Invalid (well-known COMMAND).
declare var COMMAND_STOP: COMMAND;//Program stop (well-known COMMAND M00).
declare var COMMAND_OPTIONAL_STOP: COMMAND;//Optional program stop (well-known COMMAND M01).
declare var COMMAND_END: COMMAND;//Program end (well-known COMMAND M02).
declare var COMMAND_SPINDLE_CLOCKWISE: COMMAND;//Clockwise spindle direction (well-known COMMAND M03).
declare var COMMAND_SPINDLE_COUNTERCLOCKWISE: COMMAND;//Counterclockwise spidle direction (well-known COMMAND M04).
declare var COMMAND_START_SPINDLE: COMMAND 
declare var COMMAND_STOP_SPINDLE: COMMAND;//Spindle stop (well-known COMMAND M05).
declare var COMMAND_ORIENTATE_SPINDLE: COMMAND 
declare var COMMAND_LOAD_TOOL: COMMAND;//Tool change (M06).
declare var COMMAND_COOLANT_ON: COMMAND;//Coolant on (M08).
declare var COMMAND_COOLANT_OFF: COMMAND;//Coolant off (M09).
declare var COMMAND_ACTIVATE_SPEED_FEED_SYNCHRONIZATION: COMMAND;//Activate speed-feed synchronization (well-known COMMAND).
declare var COMMAND_DEACTIVATE_SPEED_FEED_SYNCHRONIZATION: COMMAND;//Deactivate speed-feed synchronization (well-known COMMAND).
declare var COMMAND_LOCK_MULTI_AXIS: COMMAND;//Locks the 4th and 5th axes. This COMMAND is optional.
declare var COMMAND_UNLOCK_MULTI_AXIS: COMMAND;//Unlocks the 4th and 5th axes. This COMMAND is optional.
declare var COMMAND_EXACT_STOP: COMMAND;//Exact stop. This COMMAND is optional.
declare var COMMAND_START_CHIP_TRANSPORT: COMMAND;//Close chip transport.
declare var COMMAND_STOP_CHIP_TRANSPORT: COMMAND;//Stop chip transport.
declare var COMMAND_OPEN_DOOR: COMMAND;//Open primary door.
declare var COMMAND_CLOSE_DOOR: COMMAND;//Close primary door.
declare var COMMAND_BREAK_CONTROL: COMMAND;//Break control.
declare var COMMAND_TOOL_MEASURE: COMMAND;//Measure tool.
declare var COMMAND_CALIBRATE: COMMAND;//Run calibration cycle.
declare var COMMAND_VERIFY: COMMAND;//Verify part/tool/machine integrity.
declare var COMMAND_CLEAN: COMMAND;//Run cleaning cycle.
declare var COMMAND_ALARM: COMMAND;//Alarm.
declare var COMMAND_ALERT: COMMAND;//Alert.
declare var COMMAND_CHANGE_PALLET: COMMAND;//Change pallet.
declare var COMMAND_POWER_ON: COMMAND;//Power on.
declare var COMMAND_POWER_OFF: COMMAND;//Power off.
declare var COMMAND_MAIN_CHUCK_OPEN: COMMAND;//Open main chuck. More...
declare var COMMAND_MAIN_CHUCK_CLOSE: COMMAND;//Close main chuck. More...
declare var COMMAND_SECONDARY_CHUCK_OPEN: COMMAND;//Open secondary chuck. More...
declare var COMMAND_SECONDARY_CHUCK_CLOSE: COMMAND;//Close secondary chuck. More...
declare var COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE: COMMAND;//Activate spindle synchronization. More...
declare var COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE: COMMAND;//Deactivate spindle synchronization. More...
declare var COMMAND_SYNC_CHANNELS: COMMAND;//Sync channels.
declare var COMMAND_PROBE_ON: COMMAND;//Probe on.
declare var COMMAND_PROBE_OFF: COMMAND;//Probe off.

//MOVEMENT
interface MOVEMENT;
declare var MOVEMENT_RAPID: Integer;//Rapid movement type.
declare var MOVEMENT_LEAD_IN: Integer;//Lead-in movement type.
declare var MOVEMENT_CUTTING: Integer;//Cutting movement type.
declare var MOVEMENT_LEAD_OUT: Integer;//Lead-out movement type.
declare var MOVEMENT_LINK_TRANSITION: Integer;//Transition linking movement type.
declare var MOVEMENT_LINK_DIRECT: Integer;//Drection linking movement type.
declare var MOVEMENT_RAMP_HELIX: Integer;//Helical ramp movement type.
declare var MOVEMENT_RAMP_PROFILE: Integer;//Profile ramp movement type.
declare var MOVEMENT_RAMP_ZIG_ZAG: Integer;//Zig-zag ramp movement type.
declare var MOVEMENT_RAMP: Integer;//Ramp movement type.
declare var MOVEMENT_PLUNGE: Integer;//Plunge movement type.
declare var MOVEMENT_PREDRILL: Integer;//Predrill movement type.
declare var MOVEMENT_EXTENDED: Integer;//Extended movement type.
declare var MOVEMENT_REDUCED: Integer;//Reduced cutting feed movement type.
declare var MOVEMENT_FINISH_CUTTING: Integer;//Finish cutting movement type.
declare var MOVEMENT_HIGH_FEED: Integer;//High feed movement type.
declare var HIGH_FEED_NO_MAPPING: Integer;//Do not map rapid traveerrorsal to high feed.
declare var HIGH_FEED_MAP_MULTI: Integer;//Map rapid travesal along more than one axis to high feed.
declare var HIGH_FEED_MAP_XY_Z: Integer 
declare var HIGH_FEED_MAP_ANY: Integer;//Map all rapid travesals to high feed.
declare var tool: Tool; 
declare var spindleAxis: Integer; 
declare var feedrate: number; 
declare var spindleSpeed: number; 
declare var machineConfiguration: MachineConfiguration; 
declare var cycleType: string; 
declare var cycle: Map; 
declare var cycleExpanded: boolean