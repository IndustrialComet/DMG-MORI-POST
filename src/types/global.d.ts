//import * as CONSTANT from "./constant";
//import {Record} from "./record";
//import {Modal} from "./modal";
//import {MachineConfiguration} from "./machine-configuration";
// ?([A-Z]+) ([A-Z]+)([,)])
//$2: $1$3
declare type Value = number | boolean | string;

declare class RANGE {
        minimum: number;
        maximum: number;
        span: number;
        middle: number;

        constructor();
        constructor(a: number,b: number);

        isNonRange(): boolean;
        getMinimum(): number;
        getMaximum(): number;
        getSpan(): number;
        getMiddle(): number;
        grow(offset: Number): void;
        reduce(offset: Number): void;
        translate(offset: Number): void;
        expandTo(value: Number): void;
        expandToRange(value: RANGE): void;
        getU(value: Number): number;
        isWithin(value: Number): boolean;
        clamp(value: Number): number;
        toString(): string;
}

declare class Vector {
        x: number;//The X coordinate.
        y: number;//The Y coordinate.
        z: number;//The Z coordinate.
        length: number;//The length of the vector.
        length2: number;//The square of the length of the vector.
        negated: Vector;//The negated vector.
        abs: Vector;//The vector with the absolute coordinates.
        normalized: Vector;//The vector normalized to length 1.

        constructor();
        constructor(x: number,y: number,z: number);

        getX(): number;
        setX(x: number): void;
        getY(): number;
        setY(y: number): void;
        getZ(): number;
        setZ(z: number): void;
        getCoordinate(coordinate: number): number;
        setCoordinate(coordinate: number,value: number): void;
        add(value: Vector): void;
        add(x: number,y: number,z: number): void;
        subtract(value: Vector): void;
        subtract(x: number,y: number,z: number): void;
        multiply(value: number): void;
        divide(value: number): void;
        isNonZero(): boolean;
        isZero(): boolean;
        getXYAngle(): number;
        getZAngle(): number;
        getLength(): number;
        getLength2(): number;
        normalize(): void;
        getNormalized(): Vector;
        negate(): void;
        getNegated(): Vector;
        getAbsolute(): Vector;
        getMinimum(): number;
        getMaximum(): number;
        tostring(): string;
        toDeg(): Vector;
        toRad(): Vector;
        static sum(left: Vector,right: Vector): Vector;
        static diff(left: Vector,right: Vector): Vector;
        static product(left: Vector,right: number): Vector;
        static dot(left: Vector,right: Vector): number;
        static getAngle(v1: Vector,v2: Vector): number;
        static cross(left: Vector,right: Vector): Vector;
        static getDistance(left: Vector,right: Vector): number;
        static getDistance2 (left: Vector,right: Vector): number;
        static lerp(left: Vector,right: Vector,u: number): Vector;
        static getBySpherical(xyAngle: number,zAngle: number,radius: number): Vector;
}
declare interface VectorPair {
        first: Vector,
        second: Vector,
}
declare interface Section {
        unit: number;//unit). More...
        workOrigin: Vector;//The work origin in the WCS.
        workPlane: Matrix;//The work plane in the WCS.
        wcsOrigin: Vector;//The work coordinate system(WCS) origin.
        wcsPlane: Matrix;//The work coordinate system(WCS) plane.
        workOffset: number;//The work offset corresponding to the WCS.
        probeWorkOffset: number;//The work offset corresponding to the Probe WCS.
        wcsIndex: number;//The index used in the WCS.
        wcs: String;//The WCS.
        dynamicWorkOffset: number;//the display coordinates. More...
        axisSubstitution: Boolean;//Specifies that the section uses axis substitution.
        axisSubstitutionRadius: Number;//Specifies the nominal axis substitution radius.
        type: number;//Specifies the type of the section(TYPE_MILLING, TYPE_TURNING, TYPE_JET: or).
        quality: number;//Specifies the associated quality.
        tailstock: Boolean;//Specifies that tailstock is used.
        partCatcher: Boolean;//Specifies that part catcher should be activated if available.
        spindle: number;//Specifies the active spindle.
        properties: Map;//The operation properties.
        strategy: String;//Specifies the strategy type of the section.

        getId(): number;
        //PostPropertyMap::getOperationProperties(): PropertyMap;
        //optional< string >getStrategy: ; ()
        getNumberOfRecords(): number;
        getRecord(id: number): Record;
        getJobId(): number;
        getPatternId(): number;
        getNumberOfPatternInstances(): number;
        isPatterned(): boolean;
        getChannel(): number;
        getForceToolChange(): boolean;
        isOptional(): boolean;
        getFirstCompensationOffset(): number;
        getTool(): Tool;
        getContent(): number;
        isMultiAxis(): boolean;
        getUnit(): number;
        getType(): number;
        getQuality(): number;
        getJetMode(): number;
        getTailstock(): boolean;
        getPartCatcher(): boolean;
        getSpindle(): number;
        getFeedMode(): number;
        getToolOrientation(): number;
        getWorkOrigin(): Vector;
        getWorkPlane(): Matrix;
        isXOriented(): boolean;
        isYOriented(): boolean;
        isZOriented(): boolean;
        isTopWorkPlane(): boolean;
        getGlobalWorkOrigin(): Vector;
        getGlobalWorkPlane(): Matrix;
        getToolAxis(): number;
        getWCSOrigin(): Vector;
        getWCSPlane(): Matrix;
        getDynamicWCSOrigin(): Vector;
        getDynamicWCSPlane(): Matrix;
        getFCSOrigin(): Vector;
        getFCSPlane(): Matrix;
        getModelOrigin(): Vector;
        getModelPlane(): Matrix;
        getWorkOffset(): number;
        getProbeWorkOffset(): number;
        getWCS(): string;
        getWCSIndex(): number;
        hasDynamicWorkOffset(): boolean;
        getDynamicWorkOffset(): number;
        getAxisSubstitution(): boolean;
        getAxisSubstitutionRadius(): number;
        getGlobalPosition(p: Vector): Vector;
        getWCSPosition(p: Vector): Vector;
        getSectionPosition(p: Vector): Vector;
        getMaximumSpindleSpeed(): number;
        getMaximumFeedrate(): number;
        getCuttingDistance(): number;
        getRapidDistance(): number;
        getMovements(): number;
        getCycleTime(): number;
        getNumberOfCyclePoints(): number;
        getZRange(): RANGE;
        getGlobalZRange(): RANGE;
        getGlobalRange(direction: Vector): RANGE;
        getBoundingBox(): BoundingBox;
        getGlobalBoundingBox(): BoundingBox;
        getOptimizedBoundingBox(machine: MachineConfiguration,abc: Vector): BoundingBox;
        isCuttingMotionAwayFromRotary(distance: number,tolerance: number): boolean;
        hasWellDefinedPosition(): boolean;
        getFirstPosition(): Vector;
        getInitialPosition(): Vector;
        getFinalPosition(): Vector;
        getInitialToolAxis(): Vector;
        getGlobalInitialToolAxis(): Vector;
        getInitialToolAxisABC(): Vector;
        getFinalToolAxis(): Vector;
        getFinalToolAxisABC(): Vector;
        getGlobalFinalToolAxis(): Vector;
        getInitialSpindleOn(): boolean;
        getInitialSpindleSpeed(): number;
        getFinalSpindleOn(): boolean;
        getFinalSpindleSpeed(): number;
        getMaximumTilt(): number;
        getLowerToolAxisABC(): Vector;
        getUpperToolAxisABC(): Vector;
        isOptimizedForMachine(): boolean;
        getOptimizedTCPMode(): number;
        hasParameter(name: string): boolean;
        getParameter(name: string,defaultValue?: Value): Value;
        hasCycle(uri: string): boolean;
        hasAnyCycle(): boolean;
        getNumberOfCyclesWithId(uri: string): number;
        getNumberOfCycles(): number;
        getCycleId(index: number): string;
        getFirstCycle(): string;
        getLastCycle(): string;
        doesStartWithCycle(uri: string): boolean;
        doesEndWithCycle(uri: string): boolean;//noexcept
        doesStartWithCycleIgnoringPositioning(uri: string): boolean;
        doesEndWithCycleIgnoringPositioning(uri: string): boolean;
        doesStrictCycle(uri: string): boolean;
        hasCycleParameter(index: number,name: string): boolean;
        getCycleParameter(index: number,name: string): Value;
        optimizeMachineAnglesByMachine(machine: MachineConfiguration,optimizeType: number): void;
        optimize3DPositionsByMachine(machine: MachineConfiguration,abc: Vector,optimizeType: number): void;
        getABCByPreference(machine: MachineConfiguration,orientation: Matrix,current: Vector,controllingAxis: number,type: number,options: number): Vector;
        doesToolpathFitWithinLimits(machine: MachineConfiguration,current: Vector): boolean;
        checkGroup(groups: number): boolean;
}
declare class MachineConfiguration {
        constructor();
        constructor(u: Axis);
        constructor(u: Axis,v: Axis);
        constructor(u: Axis,v: Axis,w: Axis);
    
        getXML(): string;
        getMilling(): boolean;
        setMilling(milling: boolean): void;
        getTurning(): boolean;
        setTurning(turning: boolean): void;
        getWire(): boolean;
        setWire(wire: boolean): void;
        getJet(): boolean;
        setJet(jet: boolean): void;
        getAdditiveFFF(): boolean;
        setAdditiveFFF(additive: boolean): void;
        getInspection(): boolean;
        setInspection(inspection: boolean): void;
        getToolChanger(): boolean;
        setToolChanger(toolChanger: boolean): void;
        getToolPreload(): boolean;
        setToolPreload(toolPreload: boolean): void;
        getNumberOfTools(): number;
        setNumberOfTools(NumberOfTools: number): void;
        getMaximumToolLength(): number;
        setMaximumToolLength(maximumToolLength: number): void;
        getMaximumToolDiameter(): number;
        setMaximumToolDiameter(maximumToolDiameter: number): void;
        getMaximumToolWeight(): number;
        setMaximumToolWeight(maximumToolWeight: number): void;
        getMaximumFeedrate(): number;
        setMaximumFeedrate(maximumFeedrate: number): void;
        getMaximumCuttingFeedrate(): number;
        setMaximumCuttingFeedrate(maximumCuttingFeedrate: number): void;
        getMaximumBlockProcessingSpeed(): number;
        setMaximumBlockProcessingSpeed(maximumBlockProcessingSpeed: number): void;
        getNumberOfWorkOffsets(): number;
        setNumberOfWorkOffsets(NumberOfWorkOffsets: number): void;
        getFeedrateRatio(): number;
        setFeedrateRatio(feedrateRatio: number): void;
        getToolChangeTime(): number;
        setToolChangeTime(toolChangeTime: number): void;
        addAxis(axis: Axis): void;
        performRewinds(): boolean;
        enableMachineRewinds(): void;
        disableMachineRewinds(): void;
        getReconfigure(): boolean;
        setReconfigure(enable: boolean): void;
        setRewindStockExpansion(expansion: Vector): void;
        getRewindStockExpansion(): Vector;
        setSafeRetractDistance(safeRetractDistance: number): void;
        getSafeRetractDistance(): number;
        setSafeRetractFeedrate(safeRetractFeedrate: number): void;
        getSafeRetractFeedrate(): number;
        setSafePlungeFeedrate(safePlungeFeedrate: number): void;
        getSafePlungeFeedrate(): number;
        getDimensions(): Vector;
        setDimensions(dimensions: Vector): void;
        getWidth(): number;
        setWidth(width: number): void;
        getDepth(): number;
        setDepth(depth: number): void;
        getHeight(): number;
        setHeight(height: number): void;
        getWeight(): number;
        setWeight(weight: number): void;
        getPartDimensions(): Vector;
        setPartDimensions(partDimensions: Vector): void;
        getPartMaximumX(): number;
        setPartMaximumX(width: number): void;
        getPartMaximumY(): number;
        setPartMaximumY(depth: number): void;
        getPartMaximumZ(): number;
        setPartMaximumZ(height: number): void;
        getWeightCapacity(): number;
        setWeightCapacity(weightCapacity: number): void;
        getSpindleAxis(): Vector;
        setSpindleAxis(spindleAxis: Vector): void;
        getSpindleDescription(): string;
        setSpindleDescription(spindleDescription: string): void;
        getMaximumSpindlePower(): number;
        setMaximumSpindlePower(maximumSpindlePower: number): void;
        getMaximumSpindleSpeed(): number;
        setMaximumSpindleSpeed(maximumSpindleSpeed: number): void;
        getCollectChuck(): string;
        setCollectChuck(collectChuck: string): void;
        getToolLength(): number;
        setToolLength(toolLength: number): void;
        getVirtualTooltip(): boolean;
        setVirtualTooltip(virtualPositioning: boolean): void;
        getAxisByName(name: string): Axis;
        getAxisX(): Axis;
        getAxisY(): Axis;
        getAxisZ(): Axis;
        isSupportedPosition(position: Vector): boolean;
        getValidityStatus(): number;
        isSupported(): boolean;
        setMultiAxisFeedrate(feedMode: number,maximumFeedrate: number,feedType: number,outputTolerance: number,bpwRatio: number): void;
        getMultiAxisFeedrateMode(): number;
        getMultiAxisFeedrateMaximum(): number;
        getMultiAxisFeedrateDPMType(): number;
        getMultiAxisFeedrateInverseTimeUnits(): number;
        getMultiAxisFeedrateOutputTolerance(): number;
        getMultiAxisFeedrateBpwRatio(): number;
        setSingularity(adjust: boolean,method: number,cone: number,angle: number,tolerance: number,linearizationTolerance: number): void;
        getSingularityAdjust(): boolean;
        getSingularityMethod(): number;
        getSingularityCone(): number;
        getSingularityAngle(): number;
        getSingularityTolerance(): number;
        getSingularityLinearizationTolerance(): number;
        isMachineAxisRotation(abc: Vector): boolean;
        booleanis3DConfiguration(): void;
        isMultiAxisConfiguration(): boolean;
        getNumberOfAxes(): number;
        isHeadConfiguration(): boolean;
        isTableConfiguration(): boolean;
        getAxisU(): Axis;
        getAxisV(): Axis;
        getAxisW(): Axis;
        getIndexOfAxisById(id: AxisId): number;
        isMachineCoordinate(coordinate: number): boolean;
        getAxisByCoordinate(coordinate: number): Axis;
        clamp(_abc: Vector): Vector;
        clampToResolution(_abc: Vector): Vector;
        getRotationAxis(axis: Axis): Vector;
        preserveRotaryAtZero(currentDirection: Vector,previousABC: Vector,currentABC: Vector): Vector;
        getClosestABC(current: Vector,abc: Vector): Vector;
        isXYZSupported(_xyz: Vector): boolean;
        isABCSupported(_abc: Vector): boolean;
        isDirectionSupported(direction: Vector): boolean;
        getOptimizedPosition(currentXYZ: Vector,currentABC: Vector,tcpType: number,optimizeType: number,forceAdjustment: boolean): Vector;
        getOptimizedDirection(direction: Vector,currentABC: Vector,reverse: boolean,forceAdjustment: boolean): Vector;
        getOptimizedTables(currentXYZ: Vector,currentABC: Vector,reverse: boolean,optimizeType: number,isVector: boolean,forceAdjustment: boolean): Vector;
        getOptimizedHeads(currentXYZ: Vector,currentABC: Vector,reverse: boolean,optimizeType: number,forceAdjustment: boolean,pivotPoint: boolean): Vector;
        getABC(orientation: Matrix): Vector;
        getABCByDirectionBoth(direction: Vector): VectorPair;
        getABCByDirection(direction: Vector): Vector;
        getABCByDirection2 (direction: Vector): Vector;
        getABCByPreference(orientation: Matrix,current: Vector,controllingAxis: number,type: number,options: number): Vector;
        getOtherABCByDirection(abc: Vector): Vector;
        getPreferredABC(abc: Vector): Vector;
        remapABC(abc: Vector): Vector;
        remapToABC(abc: Vector,current: Vector): Vector;
        getCoordinates(): number;
        getPosition(p: Vector,abc: Vector): Vector;
        getDirection(abc: Vector): Vector;
        getHeadABC(abc: Vector): Vector;
        getTableABC(abc: Vector): Vector;
        getHeadOrientation(abc: Vector): Matrix;
        getTableOrientation(abc: Vector): Matrix;
        getOrientation(abc: Vector): Matrix;
        getOrientationABC(abc: Vector): Matrix;
        getSpindleAxisABC(abc: Vector): Vector;
        getRemainingOrientation(abc: Vector,desired: Matrix): Matrix;
        getRemainingOrientationABC(abc: Vector,desired: Matrix): Matrix;
        getRetractPlane(): number;
        setRetractPlane(retractPlane: number): void;
        hasHomePositionX(): boolean;
        getHomePositionX(): number;
        setHomePositionX(x: number): void;
        hasHomePositionY(): boolean;
        getHomePositionY(): number;
        setHomePositionY(y: number): void;
        hasHomePositionZ(): boolean;
        getHomePositionZ(): number;
        setHomePositionZ(z: number): void;
        hasCenterPosition(): boolean;
        getCenterPositionX(): number;
        setCenterPositionX(x: number): void;
        getCenterPositionY(): number;
        setCenterPositionY(y: number): void;
        getCenterPositionZ(): number;
        setCenterPositionZ(z: number): void;
        hasParkPosition(): boolean;
        getParkPositionX(): number;
        setParkPositionX(x: number): void;
        getParkPositionY(): number;
        setParkPositionY(y: number): void;
        getParkPositionZ(): number;
        setParkPositionZ(z: number): void;
        getnumberExtruders(): number;
        setnumberExtruders(num: number): void;
        getExtruderOffsetX(extruderNo: number): number;
        setExtruderOffsetX(extruderNo: number,x: number): void;
        getExtruderOffsetY(extruderNo: number): number;
        setExtruderOffsetY(extruderNo: number,y: number): void;
        getExtruderOffsetZ(extruderNo: number): number;
        setExtruderOffsetZ(extruderNo: number,z: number): void;
        getModel(): string;
        setModel(model: string): void;
        getDescription(): string;
        setDescription(description: string): void;
        getVendor(): string;
        setVendor(vendor: string): void;
        getVendorUrl(): string;
        setVendorUrl(vendorUrl: string): void;
        getControl(): string;
        setControl(control: string): void;
        isCoolantSupported(coolant: number): boolean;
        setCoolantSupported(coolant: number,available: boolean): void;
        getRetractOnIndexing(): boolean;
        setRetractOnIndexing(retractOnIndexing: boolean): void;
        getShortestAngularRotation(): boolean;
        setShortestAngularRotation(shortestAngularRotation: boolean): void;
        isReceived(): boolean;
        setIsReceived(received: boolean): void;
    
        static getAsSpatial(text: string): number;
        static getAsSpatialFeedrate(text: string): number;
        static getAsAngularFeedrate(text: string): number;
        static getAsWeight(text: string): number;
        static getAsPower(text: string): number;
        static getAsAngular(text: string): number;
        static getAsTime(text: string): number;
        static createFromXML(xml: string): MachineConfiguration;
        static createFromPath(path: string): MachineConfiguration;
        static getStatusDescription(status: number): string;
}

declare function getMachineConfiguration(): MachineConfiguration;
declare function setMachineConfiguration(machine: MachineConfiguration): void;
declare function getMultiAxisMoveLength(x: number,y: number,z: number,a: number,b: number,c: number): MoveLength;
declare function optimizeMachineAngles(): void;
declare function optimizeMachineAngles2(optimizeType: r): void;
declare function optimizeMachineAnglesByMachine(machine: MachineConfiguration,optimizeType: number): void;
declare function isSectionSpecialCycle(uri: g): boolean;
declare function setSectionSpecialCycle(uri: string,specialCycle: boolean): void;
declare function getProduct(): string;
declare function getProductUri(): string;
declare function getProductUrl(): string;
declare function getVendor(): string;
declare function getVendorUrl(): string;
declare function getVersion(): string;
declare function openUrl(url: g): void;
declare function printDocument(path: g): boolean;
declare function printDocumentTo(path: string,printerName: string): boolean;
declare function createToolRenderer(): ToolRenderer;
declare function invokeOnRapid(x: number,y: number,z: number): boolean;
declare function invokeOnRapid5D(x: number,y: number,z: number,dx: number,dy: number,dz: number): boolean;
declare function invokeOnLinear(x: number,y: number,z: number,feedrate: number): boolean;
declare function invokeOnLinear5D(x: number,y: number,z: number,dx: number,dy: number,dz: number,feedrate: number): boolean;
declare function invokeOnCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,nx: number,ny: number,nz: number,feedrate: number): boolean;
declare function activatePolarMode(tolerance: number,currentAngle: number,polarDirection: Vector): VectorPair;
declare function deactivatePolarMode(): void;
declare function isPolarModeActive(): boolean;
declare function getPolarPosition(x: number,y: number,z: number): VectorPair;
declare function setCurrentPositionAndDirection(posDir: r): void;
declare function setExitCode(code: r): void;
declare function error(message: g): void;
declare function warning(message: g): void;
declare function warningOnce(message: string,id: number): void;
declare function log(message: g): void;
declare function getCurrentNCLocation(): string;
declare function getSystemUnit(): number;
declare function getPlatform(): string;
declare function hasSymbol(symbol: r): boolean;
declare function isTextSupported(text: g): boolean;
declare function getCodePage(): number;
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
declare function isSupportedText(message: string): boolean;
declare function localize(message: g): string;
declare function localize2(section: string,message: string): string;
declare function loadLocale(langId: g): boolean;
declare function include(path: g): void;
declare function findFile(path: g): string;
declare function getHeader(): string;
declare function getHeaderVersion(): string;
declare function getHeaderCommit(): string;
declare function getHeaderDate(): string;
declare function getHeaderDate2(): Date;
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
declare function getSecurityLevel(): number;
declare function exportNCAs(path: string,format: string): void;
declare function execute(path: string,arguments: string,hide: boolean,workingFolder: string): number;
declare function executeNoWait(path: string,arguments: string,hide: boolean,workingFolder: string): void;
declare function setEOL(eol: g): void;
declare function isRedirecting(): boolean;
declare function closeRedirection(): void;
declare function redirectToFile(path: g): void;
declare function redirectToBuffer(): void;
declare function getRedirectionBuffer(): string;
declare function getRedirectionBuffer2(clear: n): string;
declare function registerPostProcessing(path: g): void;
declare function getWorkpiece(): BoundingBox;
declare function getFixture(): BoundingBox;
declare function getMachineConfigurations(): string;
declare function getMachineConfigurationByName(name: g): MachineConfiguration;
declare function loadMachineConfiguration(path: g): MachineConfiguration;
declare function isInteractionAllowed(): boolean;
declare function alert(title: string,description: string): void;
declare function promptKey(title: string,description: string): string;
declare function promptKey2(title: string,description: string,accept: string): string;
declare function promptKey3(title: string,description: string,accept: string,keys: string): string;
declare function promptText(title: string,description: string): string;
declare function getAsInt(text: g): number;
declare function getAsFloat(text: g): number;
declare function isSafeText(text: string,permitted: string): boolean;
declare function filterText(text: string,keep: string): string;
declare function translateText(text: string,src: string,dest: string): string;
declare function loadText(url: string,encoding: string): string;
declare function getOutputUnit(): number;
declare function setOutputUnit(unit: r): void;
declare function getDogLeg(): boolean;
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
declare function getHighFeedMapping(): number;
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
declare function isClockwiseSpindleDirection(): boolean;
declare function isSpindleActive(): boolean;
declare function isCoolantActive(): boolean;
declare function isProbeOperation(section: n): boolean;
declare function isInspectionOperation(section: n): boolean;
declare function isDepositionOperation(section: n): boolean;
declare function isDrillingCycle(section: Section,checkBoringCycles: boolean): boolean;
declare function isTappingCycle(section: n): boolean;
declare function isAxialCenterDrilling(section: Section,checkLiveTool: boolean): boolean;
declare function isMillingCycle(section: Section,checkBoringCycles: boolean): boolean;
declare function isSpeedFeedSynchronizationActive(): boolean;
declare function is3D(): boolean;
declare function isMultiAxis(): boolean;
declare function isMultiChannelProgram(): boolean;
declare function getNumberOfChannels(): number;
declare function getCurrentChannel(): number;
declare function getNumberOfSyncGroups(channel: r): number;
declare function getCurrentSyncGroup(): number;
declare function getNumberOfRecords(): number;
declare function getRecord(id: r): Record;
declare function getCurrentSectionId(): number;
declare function getNumberOfSections(): number;
declare function getSection(index: r): Section;
declare function getPreviousSection(): Section;
declare function hasNextSection(): boolean;
declare function getNextSection(): Section;
declare function getToolTable(): ToolTable;
declare function writeToolTable(orderBy: r): void;
declare function getCurrentRecordId(): number;
declare function getMachiningDistance(tool: r): number;
declare function isExpanding(): boolean;
declare function getEnd(): Vector;
declare function getDirection(): Vector;
declare function getLength(): number;
declare function getCircularCenter(): Vector;
declare function getCircularStartRadius(): number;
declare function getCircularRadius(): number;
declare function getCircularSweep(): number;
declare function getCircularChordLength(): number;
declare function isClockwise(): boolean;
declare function isFullCircle(): boolean;
declare function isHelical(): boolean;
declare function isSpiral(): boolean;
declare function getCircularNormal(): Vector;
declare function getCircularPlane(): number;
declare function getHelicalOffset(): Vector;
declare function getHelicalDistance(): number;
declare function getHelicalPitch(): number;
declare function canLinearize(): boolean;
declare function linearize(tolerance: r): void;
declare function getNumberOfSegments(tolerance: r): number;
declare function getPositionU(u: r): Vector;
declare function getCircularMotion(): CircularMotion;
declare function getFeedrate(): number;
declare function getMovement(): number;
declare function getPower(): boolean;
declare function getSpindleSpeed(): number;
declare function isSpindleSpeedDifferent(section: n): boolean;
declare function getRadiusCompensation(): number;
declare function getCompensationOffset(): number;
declare function hasPreviousRecord(): boolean;
declare function getPreviousRecord(): Record;
declare function hasNextRecord(): boolean;
declare function getNextRecord(): Record;
declare function getFirstTool(): Tool;
declare function setWriteInvocations(writeInvocations: n): void;
declare function setWriteStack(writeStack: n): void;
declare function writeSectionNotes(): void;
declare function writeSetupNotes(): void;
declare function isFirstCyclePoint(): boolean;
declare function isLastCyclePoint(): boolean;
declare function getCyclePointId(): number;
declare function getNumberOfCyclePoints(): number;
declare function getCyclePoint(index: r): Vector;
declare function onImpliedCommand(command: number): void;
declare function hasGlobalParameter(name: g): boolean;
declare function getGlobalParameter(name: string,defaultValue: Value): Value;
declare function getProperty(property: ScriptObject,defaultValue: Value): Value;
declare function setProperty(property: ScriptObject,value: Value): void;
declare function hasParameter(name: g): boolean;
declare function getParameter(name: string,defaultValue?: Value): Value;
declare function registerTerminationHandler(func: n): void;
declare function toDeg(radians: r): number;
declare function toRad(degrees: r): number;
declare function parseSpatial(value: string): number;
declare function getPlane(direction: r): number;
declare function getISOPlane(plane: r): number;
declare function isSameDirection(a,b): boolean;
declare function getSectionsInChannel(channel: r): Array;
declare function validatePropertyDefinitions(): boolean;
declare function validateProperties(): boolean;
declare function getProgramNameAsInt(min: number,max: number): number;
declare function getProgramNameAsstring(charLimit: r): string;
declare function isToolChangeNeeded(section: Section,arguments: string): boolean;
declare function getNextTool(number: r): Tool;
declare function getNextTool(section: Section,firstTool: boolean,arguments: string): Tool;
declare function isNewWorkPlane(section: n): boolean;
declare function isNewWorkOffset(section: n): boolean;
declare function toolZRange(): RANGE;
declare function range(first: number,end: number,step: number): Array;
declare function interval(from: number,to: number): Array;
declare function flatten(array: y): Array;
declare function getQuadrant(angle: r): number;
declare function conditional(condition,value): string;
declare function validate(expression: Value,message: string): void;
declare function debug(message: g): void;
declare function spatial(value: number,unit: number): number;
declare function getInverseTime(distance: number,speed: number): number;
declare function cycleNotSupported(): void;
declare function isWorkpieceDefined(): boolean;
declare function isTurning(): boolean;
declare function isMilling(): boolean;
declare function isJet(): boolean;
declare function isFirstSection(): boolean;
declare function isLastSection(): boolean;
declare function onExpandedRapid(x: number,y: number,z: number): void;
declare function onExpandedLinear(x: number,y: number,z: number,feed: number): void;
declare function onExpandedSpindleSpeed(spindleSpeed: r): void;
declare function createMachineConfiguration(specifiers: p): MachineConfiguration;
declare function getMachineConfigurationAsText(machine: n): string;
declare function createAxis(specifiers: p): Axis;
declare function createFormat(specifiers: p): Formatnumber;
declare function createOutputVariable(specifiers: Specifier,format: Format): OutputVariable;
declare function createVariable(specifiers: {},format: Format): Variable;
declare function createIncrementalVariable(specifiers: Specifier,format: Format): IncrementalVariable;
declare function createReferenceVariable(specifiers: Specifier,format: Format): ReferenceVariable;
declare function createModal(specifiers: Specifier,format: Format): Modal;
declare function createModalGroup(specifiers: Specifier,groups: Array,format: Format): ModalGroup;
declare function repositionToCycleClearance(cycle: Map,x: number,y: number,z: number): void;
declare function expandCyclePoint(x: number,y: number,z: number): void;
declare function isWellKnownCycle(): boolean;
declare function isProbingCycle(uri: g): boolean;
declare function isSubSpindleCycle(uri: g): boolean;
declare function isWellKnownCommand(command: number): boolean;
declare function getCommandStringId(command: number): string;
declare function canIgnoreCommand(command: number): boolean;
declare function onUnsupportedCommand(command: number): void;
declare function expandManualNC(command: number,value: Value): void;
declare function onUnsupportedCoolant(coolant: number): void;
declare function getCoolantName(coolant: number): string;
declare function getMaterialName(material: r): string;
declare function getToolTypeName(tool): string;
declare function onMachine(): void;
declare function onOpen(): void;
declare function onCycle(): void;
declare function onCyclePoint(x: number,y: number,z: number): void;
declare function onCyclePath(): void;
declare function onCyclePathEnd(): void;
declare function onCycleEnd(): void;
declare function onParameter(name: string,value: Value): void;
declare function onPassThrough(value: e): void;
declare function onComment(comment: g): void;
declare function onRapid(x: number,y: number,z: number): void;
declare function onLinear(x: number,y: number,z: number,feed: number): void;
declare function onLinearExtrude(x: number,y: number,z: number,feed: number,extrusionLength: number): void;
declare function onCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number): void;
declare function onCircularExtrude(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number,extrusionLength: number): void;
declare function onRapid5D(x: number,y: number,z: number,dx: number,dy: number,dz: number): void;
declare function onLinear5D(x: number,y: number,z: number,dx: number,dy: number,dz: number,feed: number): void;
declare function onRewindMachine(a: number,b: number,c: number): void;
declare function onRewindMachineEntry(a: number,b: number,c: number): void;
declare function onMoveToSafeRetractPosition(): void;
declare function onReturnFromSafeRetractPosition(x: number,y: number,z: number): void;
declare function onRotateAxes(x: number,y: number,z: number,a: number,b: number,c: number): void;
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
declare function onExtruderTemp(temp: number,wait: boolean,extruderId: number): void;
declare function onBedTemp(temp: number,wait: boolean): void;
declare function onFanSpeed(speed: number,fanId: number): void;
declare function onMaxAcceleration(xAxis: number,yAxis: number,zAxis: number,eAxis: number): void;
declare function onAcceleration(travel: number,printing: number,retract: number): void;
declare function onJerk(xAxis: number,yAxis: number,zAxis: number,eAxis: number): void;
declare function onCommand(command: number): void;
declare function onOrientateSpindle(angle: r): void;
declare function onSectionEnd(): void;

declare var outputUnit: number; 
declare var currentSection: Section; 
declare var highFeedMapping: number; 
declare var highFeedrate: number; 
declare var linenumber: number; 
declare var initialCyclePosition: Vector; 
declare var abortOnDeprecation: boolean; 
declare var end: Vector; 
declare var length: number; 
declare var center: Vector;//The center of the current circular motion.
declare var normal: Vector;//The circular plane normal of the current circular motion.
declare var plane: number; 
declare var radius: number;//The radius of the current circular motion.
declare var sweep: number;//The sweep of the current circular motion.
declare var clockwise: boolean;//Specifies that the current cicular motion is clockwise.
declare var chordLength: number;//The chord length of the current circular motion(0 forcircles: full).
declare var fullCircle: boolean;//Specifies that the currect circular motion is a full circle.
declare var helical: boolean;//Specifies that the currect circular motion is helical.
declare var helicalOffset: Vector;//The helical offset for the current circular motion.
declare var helicalDistance: number;//The helical distance for the currect circular motion.
declare var movement: number; 
declare var radiusCompensation: number; 
declare var description: string; 
declare var vendor: string; 
declare var vendorUrl: string; 
declare var legal: string; 
declare var unit: number; 
declare var programName: string;
declare var programNameIsInteger: boolean;
declare var programComment: string | undefined;
declare var debugMode: boolean; 
declare var preventPost: boolean; 
declare var filename: string; 
declare var extension: string; 
declare var version: string; 
declare var certificationLevel: number; 
declare var revision: number; 
declare var minimumRevision: number; 
declare var deprecated: boolean; 
declare var capabilities: number; 
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
declare var allowedCircularPlanes: number | undefined; 
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
declare var PAH_SEPARATOR: string;//File path separator.
declare var tool: Tool; 
declare var spindleAxis: number; 
declare var feedrate: number; 
declare var spindleSpeed: number; 
declare var machineConfiguration: MachineConfiguration; 
declare var cycleType: string; 
declare var cycle: Map; 
declare var cycleExpanded: boolean