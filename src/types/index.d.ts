import * as CONSTANT from "./constant";
import {Vector,VectorPair} from "./vector";
import {Record} from "./record";
import {Modal} from "./modal";
import {MachineConfiguration} from "./machine-configuration";

declare global {
    function getMachineConfiguration(): MachineConfiguration;
    function setMachineConfiguration(machine: MachineConfiguration): void;
    function getMultiAxisMoveLength(x: number,y: number,z: number,a: number,b: number,c: number): MoveLength;
    function optimizeMachineAngles(): void;
    function optimizeMachineAngles2(optimizeType: r): void;
    function optimizeMachineAnglesByMachine(machine: MachineConfiguration,optimizeType: Integer): void;
    function isSectionSpecialCycle(uri: g): boolean;
    function setSectionSpecialCycle(uri: string,specialCycle: boolean): void;
    function getProduct(): string;
    function getProductUri(): string;
    function getProductUrl(): string;
    function getVendor(): string;
    function getVendorUrl(): string;
    function getVersion(): string;
    function openUrl(url: g): void;
    function printDocument(path: g): boolean;
    function printDocumentTo(path: string,printerName: string): boolean;
    function createToolRenderer(): ToolRenderer;
    function invokeOnRapid(x: number,y: number,z: number): boolean;
    function invokeOnRapid5D(x: number,y: number,z: number,dx: number,dy: number,dz: number): boolean;
    function invokeOnLinear(x: number,y: number,z: number,feedrate: number): boolean;
    function invokeOnLinear5D(x: number,y: number,z: number,dx: number,dy: number,dz: number,feedrate: number): boolean;
    function invokeOnCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,nx: number,ny: number,nz: number,feedrate: number): boolean;
    function activatePolarMode(tolerance: number,currentAngle: number,polarDirection: Vector): VectorPair;
    function deactivatePolarMode(): void;
    function isPolarModeActive(): boolean;
    function getPolarPosition(x: number,y: number,z: number): VectorPair;
    function setCurrentPositionAndDirection(posDir: r): void;
    function setExitCode(code: r): void;
    function error(message: g): void;
    function warning(message: g): void;
    function warningOnce(message: string,id: Integer): void;
    function log(message: g): void;
    function getCurrentNCLocation(): string;
    function getSystemUnit(): Integer;
    function getPlatform(): string;
    function hasSymbol(symbol: r): boolean;
    function isTextSupported(text: g): boolean;
    function getCodePage(): Integer;
    function setCodePage(name: g): void;
    function write(message: g): void;
    function writeln(message: g): void;
    function getWordSeparator(): string;
    function setWordSeparator(message: g): void;
    function writeWords(message: string): void;
    function writeWords2(message: string): void;
    function formatWords(message: g): string;
    function subst(message: string): string;
    function getLangId(): string;
    function isSupportedText(message: string): boolean;
    function localize(message: g): string;
    function localize2(section: string,message: string): string;
    function loadLocale(langId: g): boolean;
    function include(path: g): void;
    function findFile(path: g): string;
    function getHeader(): string;
    function getHeaderVersion(): string;
    function getHeaderCommit(): string;
    function getHeaderDate(): string;
    function getHeaderDate2(): Date;
    function getHeaderSnippet(keyword: g): string;
    function getIntermediatePath(): string;
    function getOutputPath(): string;
    function getSimulationStreamPath(): string;
    function getConfigurationFolder(): string;
    function getConfigurationPath(): string;
    function getPostProcessorFolder(): string;
    function getPostProcessorPath(): string;
    function getCascadingPath(): string;
    function setCascadingPath(string): void;
    function getSecurityLevel(): Integer;
    function exportNCAs(path: string,format: string): void;
    function execute(path: string,arguments: string,hide: boolean,workingFolder: string): Integer;
    function executeNoWait(path: string,arguments: string,hide: boolean,workingFolder: string): void;
    function setEOL(eol: g): void;
    function isRedirecting(): boolean;
    function closeRedirection(): void;
    function redirectToFile(path: g): void;
    function redirectToBuffer(): void;
    function getRedirectionBuffer(): string;
    function getRedirectionBuffer2(clear: n): string;
    function registerPostProcessing(path: g): void;
    function getWorkpiece(): BoundingBox;
    function getFixture(): BoundingBox;
    function getMachineConfigurations(): string;
    function getMachineConfigurationByName(name: g): MachineConfiguration;
    function loadMachineConfiguration(path: g): MachineConfiguration;
    function isInteractionAllowed(): boolean;
    function alert(title: string,description: string): void;
    function promptKey(title: string,description: string): string;
    function promptKey2(title: string,description: string,accept: string): string;
    function promptKey3(title: string,description: string,accept: string,keys: string): string;
    function promptText(title: string,description: string): string;
    function getAsInt(text: g): Integer;
    function getAsFloat(text: g): number;
    function isSafeText(text: string,permitted: string): boolean;
    function filterText(text: string,keep: string): string;
    function translateText(text: string,src: string,dest: string): string;
    function loadText(url: string,encoding: string): string;
    function getOutputUnit(): Integer;
    function setOutputUnit(unit: r): void;
    function getDogLeg(): boolean;
    function setDogLeg(dogLeg: n): void;
    function getRotation(): Matrix;
    function setRotation(rotation: x): void;
    function cancelRotation(): void;
    function getTranslation(): Vector;
    function cancelTransformation(): void;
    function setTranslation(translation: r): void;
    function cancelTranslation(): void;
    function getFramePosition(position: r): Vector;
    function getFrameDirection(direction: r): Vector;
    function getSectionFramePosition(framePosition: r): Vector;
    function getSectionFrameDirection(frameDirection: r): Vector;
    function getHighFeedMapping(): Integer;
    function setHighFeedMapping(mode: r): void;
    function getHighFeedrate(): number;
    function setHighFeedrate(feedrate: r): void;
    function getGlobalPosition(p: r): Vector;
    function getWCSPosition(p: r): Vector;
    function getSectionPosition(p: r): Vector;
    function getCurrentGlobalPosition(): Vector;
    function getCurrentPosition(): Vector;
    function setCurrentPosition(currentPosition: r): void;
    function setCurrentPositionX(x: r): void;
    function setCurrentPositionY(y: r): void;
    function setCurrentPositionZ(z: r): void;
    function getCurrentDirection(): Vector;
    function setCurrentDirection(currentDirection: r): void;
    function getCurrentSpindleSpeed(): number;
    function setCurrentSpindleSpeed(spindleSpeed: r): void;
    function setCurrentABC(abc: r): void;
    function skipRemainingSection(): void;
    function isClockwiseSpindleDirection(): boolean;
    function isSpindleActive(): boolean;
    function isCoolantActive(): boolean;
    function isProbeOperation(section: n): boolean;
    function isInspectionOperation(section: n): boolean;
    function isDepositionOperation(section: n): boolean;
    function isDrillingCycle(section: Section,checkBoringCycles: boolean): boolean;
    function isTappingCycle(section: n): boolean;
    function isAxialCenterDrilling(section: Section,checkLiveTool: boolean): boolean;
    function isMillingCycle(section: Section,checkBoringCycles: boolean): boolean;
    function isSpeedFeedSynchronizationActive(): boolean;
    function is3D(): boolean;
    function isMultiAxis(): boolean;
    function isMultiChannelProgram(): boolean;
    function getnumberOfChannels(): Integer;
    function getCurrentChannel(): Integer;
    function getnumberOfSyncGroups(channel: r): Integer;
    function getCurrentSyncGroup(): Integer;
    function getnumberOfRecords(): Integer;
    function getRecord(id: r): Record;
    function getCurrentSectionId(): Integer;
    function getnumberOfSections(): Integer;
    function getSection(index: r): Section;
    function getPreviousSection(): Section;
    function hasNextSection(): boolean;
    function getNextSection(): Section;
    function getToolTable(): ToolTable;
    function writeToolTable(orderBy: r): void;
    function getCurrentRecordId(): Integer;
    function getMachiningDistance(tool: r): number;
    function isExpanding(): boolean;
    function getEnd(): Vector;
    function getDirection(): Vector;
    function getLength(): number;
    function getCircularCenter(): Vector;
    function getCircularStartRadius(): number;
    function getCircularRadius(): number;
    function getCircularSweep(): number;
    function getCircularChordLength(): number;
    function isClockwise(): boolean;
    function isFullCircle(): boolean;
    function isHelical(): boolean;
    function isSpiral(): boolean;
    function getCircularNormal(): Vector;
    function getCircularPlane(): Integer;
    function getHelicalOffset(): Vector;
    function getHelicalDistance(): number;
    function getHelicalPitch(): number;
    function canLinearize(): boolean;
    function linearize(tolerance: r): void;
    function getnumberOfSegments(tolerance: r): Integer;
    function getPositionU(u: r): Vector;
    function getCircularMotion(): CircularMotion;
    function getFeedrate(): number;
    function getMovement(): Integer;
    function getPower(): boolean;
    function getSpindleSpeed(): number;
    function isSpindleSpeedDifferent(section: n): boolean;
    function getRadiusCompensation(): Integer;
    function getCompensationOffset(): Integer;
    function hasPreviousRecord(): boolean;
    function getPreviousRecord(): Record;
    function hasNextRecord(): boolean;
    function getNextRecord(): Record;
    function getFirstTool(): Tool;
    function setWriteInvocations(writeInvocations: n): void;
    function setWriteStack(writeStack: n): void;
    function writeSectionNotes(): void;
    function writeSetupNotes(): void;
    function isFirstCyclePoint(): boolean;
    function isLastCyclePoint(): boolean;
    function getCyclePointId(): Integer;
    function getnumberOfCyclePoints(): Integer;
    function getCyclePoint(index: r): Vector;
    function onImpliedCommand(command: CONSTANT.COMMAND): void;
    function hasGlobalParameter(name: g): boolean;
    function getGlobalParameter(name: string,defaultValue: Value): Value;
    function getProperty(property: ScriptObject,defaultValue: Value): Value;
    function setProperty(property: ScriptObject,value: Value): void;
    function hasParameter(name: g): boolean;
    function getParameter(name: string,defaultValue: Value): Value;
    function registerTerminationHandler(function: n): void;
    function toDeg(radians: r): number;
    function toRad(degrees: r): number;
    function parseSpatial(string &value): number;
    function getPlane(direction: r): Integer;
    function getISOPlane(plane: r): Integer;
    function isSameDirection(a,b): boolean;
    function getSectionsInChannel(channel: r): Array;
    function validatePropertyDefinitions(): boolean;
    function validateProperties(): boolean;
    function getProgramNameAsInt(min: Integer,max: Integer): Integer;
    function getProgramNameAsstring(charLimit: r): string;
    function isToolChangeNeeded(section: Section,arguments: string): boolean;
    function getNextTool(number: r): Tool;
    function getNextTool(section: Section,firstTool: boolean,arguments: string): Tool;
    function isNewWorkPlane(section: n): boolean;
    function isNewWorkOffset(section: n): boolean;
    function toolZRange(): Range;
    function range(first: number,end: number,step: number): Array;
    function interval(from: number,to: number): Array;
    function flatten(array: y): Array;
    function getQuadrant(angle: r): Integer;
    function conditional(condition,value): string;
    function validate(expression: Value,message: string): void;
    function debug(message: g): void;
    function spatial(value: number,unit: Integer): number;
    function getInverseTime(distance: number,speed: number): number;
    function cycleNotSupported(): void;
    function isWorkpieceDefined(): boolean;
    function isTurning(): boolean;
    function isMilling(): boolean;
    function isJet(): boolean;
    function isFirstSection(): boolean;
    function isLastSection(): boolean;
    function onExpandedRapid(x: number,y: number,z: number): void;
    function onExpandedLinear(x: number,y: number,z: number,feed: number): void;
    function onExpandedSpindleSpeed(spindleSpeed: r): void;
    function createMachineConfiguration(specifiers: p): MachineConfiguration;
    function getMachineConfigurationAsText(machine: n): string;
    function createAxis(specifiers: p): Axis;
    function createFormat(specifiers: p): Formatnumber;
    function createOutputVariable(specifiers: Specifier,format: Format): OutputVariable;
    function createVariable(specifiers: {},format: Format): Variable;
    function createIncrementalVariable(specifiers: Specifier,format: Format): IncrementalVariable;
    function createReferenceVariable(specifiers: Specifier,format: Format): ReferenceVariable;
    function createModal(specifiers: Specifier,format: Format): Modal;
    function createModalGroup(specifiers: Specifier,groups: Array,format: Format): ModalGroup;
    function repositionToCycleClearance(cycle: Map,x: number,y: number,z: number): void;
    function expandCyclePoint(x: number,y: number,z: number): void;
    function isWellKnownCycle(): boolean;
    function isProbingCycle(uri: g): boolean;
    function isSubSpindleCycle(uri: g): boolean;
    function isWellKnownCommand(command: CONSTANT.COMMAND): boolean;
    function getCommandstringId(command: CONSTANT.COMMAND): string;
    function canIgnoreCommand(command: CONSTANT.COMMAND): boolean;
    function onUnsupportedCommand(command: CONSTANT.COMMAND): void;
    function expandManualNC(command: CONSTANT.COMMAND,value: Value): void;
    function onUnsupportedCoolant(coolant: CONSTANT.COOLANT): void;
    function getCoolantName(coolant: CONSTANT.COOLANT): string;
    function getMaterialName(material: r): string;
    function getToolTypeName(tool): string;
    function onMachine(): void;
    function onOpen(): void;
    function onCycle(): void;
    function onCyclePoint(x: number,y: number,z: number): void;
    function onCyclePath(): void;
    function onCyclePathEnd(): void;
    function onCycleEnd(): void;
    function onParameter(name: string,value: Value): void;
    function onPassThrough(value: e): void;
    function onComment(comment: g): void;
    function onRapid(x: number,y: number,z: number): void;
    function onLinear(x: number,y: number,z: number,feed: number): void;
    function onLinearExtrude(x: number,y: number,z: number,feed: number,extrusionLength: number): void;
    function onCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number): void;
    function onCircularExtrude(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number,extrusionLength: number): void;
    function onRapid5D(x: number,y: number,z: number,dx: number,dy: number,dz: number): void;
    function onLinear5D(x: number,y: number,z: number,dx: number,dy: number,dz: number,feed: number): void;
    function onRewindMachine(a: number,b: number,c: number): void;
    function onRewindMachineEntry(a: number,b: number,c: number): void;
    function onMoveToSafeRetractPosition(): void;
    function onReturnFromSafeRetractPosition(x: number,y: number,z: number): void;
    function onRotateAxes(x: number,y: number,z: number,a: number,b: number,c: number): void;
    function onMovement(movement: r): void;
    function onPower(power: n): void;
    function onRadiusCompensation(): void;
    function onToolCompensation(compensation: r): void;
    function onDwell(time: r): void;
    function onSpindleSpeed(spindleSpeed: r): void;
    function onLayer(layernumber: r): void;
    function onLayerEnd(layernumber: r): void;
    function onExtrusionReset(length: r): void;
    function onExtruderChange(extruderId: r): void;
    function onExtruderTemp(temp: number,wait: boolean,extruderId: Integer): void;
    function onBedTemp(temp: number,wait: boolean): void;
    function onFanSpeed(speed: number,fanId: Integer): void;
    function onMaxAcceleration(xAxis: number,yAxis: number,zAxis: number,eAxis: number): void;
    function onAcceleration(travel: number,printing: number,retract: number): void;
    function onJerk(xAxis: number,yAxis: number,zAxis: number,eAxis: number): void;
    function onCOmmand(command: CONSTANT.COMMAND): void;
    function onOrientateSpindle(angle: r): void;
    function onSectionEnd(): void;


    var outputUnit: Integer; 
    var currentSection: Section; 
    var highFeedMapping: Integer; 
    var highFeedrate: number; 
    var linenumber: Integer; 
    var initialCyclePosition: Vector; 
    var abortOnDeprecation: boolean; 
    var end: Vector; 
    var length: number; 
    var center: Vector;//The center of the current circular motion.
    var normal: Vector;//The circular plane normal of the current circular motion.
    var plane: Integer; 
    var radius: number;//The radius of the current circular motion.
    var sweep: number;//The sweep of the current circular motion.
    var clockwise: boolean;//Specifies that the current cicular motion is clockwise.
    var chordLength: number;//The chord length of the current circular motion(0 forcircles: full).
    var fullCircle: boolean;//Specifies that the currect circular motion is a full circle.
    var helical: boolean;//Specifies that the currect circular motion is helical.
    var helicalOffset: Vector;//The helical offset for the current circular motion.
    var helicalDistance: number;//The helical distance for the currect circular motion.
    var movement: Integer; 
    var radiusCompensation: Integer; 
    var description: string; 
    var vendor: string; 
    var vendorUrl: string; 
    var legal: string; 
    var unit: Integer; 
    var programName: string; 
    var programNameIsInteger: boolean; 
    var debugMode: boolean; 
    var preventPost: boolean; 
    var filename: string; 
    var extension: string; 
    var version: string; 
    var certificationLevel: Integer; 
    var revision: Integer; 
    var minimumRevision: Integer; 
    var deprecated: boolean; 
    var capabilities: Integer; 
    var tolerance: number; 
    var mapWorkOrigin: boolean; 
    var mapToWCS: boolean; 
    var allowMachineChangeOnSection: boolean; 
    var minimumChordLength: number; 
    var minimumCircularRadius: number; 
    var maximumCircularRadius: number; 
    var minimumCircularSweep: number; 
    var maximumCircularSweep: number; 
    var allowHelicalMoves: boolean; 
    var allowSpiralMoves: boolean; 
    var allowedCircularPlanes: Integer | undefined; 
    var machineParameters: MachineParameters; 
    var properties: Map; 
    var NUL: string;//NUL ASCII control code.
    var SOH: string;//SOH ASCII control code.
    var STX: string;//STX ASCII control code.
    var ETX: string;//ETX ASCII control code.
    var EOT: string;//EOT ASCII control code.
    var ENQ: string;//ENQ ASCII control code.
    var ACK: string;//ACK ASCII control code.
    var BEL: string;//BEL ASCII control code.
    var BS: string;//BS ASCII control code.
    var TAB: string;//TAB ASCII control code.
    var LF: string;//LF ASCII control code.
    var VT: string;//VT ASCII control code.
    var FF: string;//FF ASCII control code.
    var CR: string;//CR ASCII control code.
    var SO: string;//SO ASCII control code.
    var SI: string;//SI ASCII control code.
    var DLE: string;//DLE ASCII control code.
    var DC1: string;//DC1 ASCII control code.
    var DC2: string;//DC2 ASCII control code.
    var DC3: string;//DC3 ASCII control code.
    var DC4: string;//DC4 ASCII control code.
    var NAK: string;//NAK ASCII control code.
    var SYN: string;//SYN ASCII control code.
    var ETB: string;//ETB ASCII control code.
    var CAN: string;//CAN ASCII control code.
    var EM: string;//EM ASCII control code.
    var SUB: string;//SUB ASCII control code.
    var ESC: string;//ESC ASCII control code.
    var FS: string;//FS ASCII control code.
    var GS: string;//GS ASCII control code.
    var RS: string;//RS ASCII control code.
    var US: string;//US ASCII control code.
    var EOL: string;//The default end-of-line marker.
    var SP: string;//Space string.
    var PAH_SEPARATOR: string;//File path separator.
    var tool: Tool; 
    var spindleAxis: Integer; 
    var feedrate: number; 
    var spindleSpeed: number; 
    var machineConfiguration: MachineConfiguration; 
    var cycleType: string; 
    var cycle: Map; 
    var cycleExpanded: boolean
}

export {
    CONSTANT,
};