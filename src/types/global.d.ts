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
        grow(offset: number): void;
        reduce(offset: number): void;
        translate(offset: number): void;
        expandTo(value: number): void;
        expandToRange(value: RANGE): void;
        getU(value: number): number;
        isWithin(value: number): boolean;
        clamp(value: number): number;
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
declare class BoundingBox {
	lower: Vector;
	upper: Vector;

	constructor();
	constructor(a: Vector,b: Vector);

	expandTo(point: Vector): void;
	expandToBox(box: BoundingBox): void;
	getRayIntersection(origin: Vector,): VectorPair;
}
declare class Matrix {
	n1: number//The 1-norm.
	n2: number//The 2-norm.
	negated: Matrix//The negated matrix.
	transposed: Matrix//The transposed matrix(equal to the inverse rotations: for): void;.
	up: Vector//The up vector.
	right: Vector//The right vector.
	forward: Vector//The forward vector.
	eulerXZX: Vector//Euler angles in radians for XZX static/world convention.
	eulerYXY: Vector//Euler angles in radians for YXY static/world convention.
	eulerZYZ: Vector//Euler angles in radians for ZYZ static/world convention.
	eulerXZX_R: Vector//Euler angles in radians for XZX body convention.
	eulerYXY_R: Vector//Euler angles in radians for YXY body convention.
	eulerZYZ_R: Vector//Euler angles in radians for ZYZ body convention.
	eulerXZY: Vector//Euler angles in radians for XZY static/world convention.
	eulerYXZ: Vector//Euler angles in radians for YXZ static/world convention.
	eulerZYX: Vector//Euler angles in radians for ZYX static/world convention.
	eulerYZX_R: Vector//Euler angles in radians for YZX body convention.
	eulerZXY_R: Vector//Euler angles in radians for ZXY body convention.
	eulerXYZ_R: Vector//Euler angles in radians for XYZ body convention.
	eulerXYX: Vector//Euler angles in radians for XYX static/world convention.
	eulerYZY: Vector//Euler angles in radians for YZY static/world convention.
	eulerZXZ: Vector//Euler angles in radians for ZXZ static/world convention.
	eulerXYX_R: Vector//Euler angles in radians for XYX body convention.
	eulerYZY_R: Vector//Euler angles in radians for YZY body convention.
	eulerZXZ_R: Vector//Euler angles in radians for ZXZ body convention.
	eulerXYZ: Vector//Euler angles in radians for XYZ static/world convention.
	eulerYZX: Vector//Euler angles in radians for YZX static/world convention.
	eulerZXY: Vector//Euler angles in radians for ZXY static/world convention.
	eulerZYX_R: Vector//Euler angles in radians for ZYX body convention.
	eulerXZY_R: Vector//Euler angles in radians for XZY body convention.
	eulerYXZ_R: Vector//Euler angles in radians for YXZ body convention.
	
	constructor(scale: number);
	constructor(right: Vector, up: Vector, forward: Vector);
	constructor(m: number[]);
	constructor(axis: Vector, angle: number);
	
	static getAxisRotation(axis: Vector, angle: number): Matrix
	static getXRotation(angle: number): Matrix
	static getYRotation(angle: number): Matrix
	static getZRotation(angle: number): Matrix
	static getXYZRotation(abc: Vector): Matrix
	static getEulerRotation(convention: number, angles: Vector): Matrix
	static getEulerXZXRotation(angles: Vector): Matrix
	static getEulerYXYRotation(angles: Vector): Matrix
	static getEulerZYZRotation(angles: Vector): Matrix
	static getEulerXZYRotation(angles: Vector): Matrix
	static getEulerYXZRotation(angles: Vector): Matrix
	static getEulerZYXRotation(angles: Vector): Matrix
	static getEulerXYXRotation(angles: Vector): Matrix
	static getEulerYZYRotation(angles: Vector): Matrix
	static getEulerZXZRotation(angles: Vector): Matrix
	static getEulerXYZRotation(angles: Vector): Matrix
	static getEulerYZXRotation(angles: Vector): Matrix
	static getEulerZXYRotation(angles: Vector): Matrix
	static sum(left: Matrix, right: Matrix): Matrix
	static diff(left: Matrix, right: Matrix): Matrix

	rotateX(angle: number): void;
	rotateY(angle: number): void;
	rotateZ(angle: number): void;
	getElement (row: number, column: number): number;
	setElement (row: number, column: number, value: number): void;
	getRow(row: number): Vector;
	setRow (row: number, value: Vector): void;
	getColumn(column: number): Vector;
	setColumn (column: number, value: Vector): void;
	getForward(): Vector;
	setForward(value: Vector): void;
	getUp(): Vector;
	setUp(value: Vector): void;
	getRight(): Vector;
	setRight(value: Vector): void;
	getTiltAndTilt (primary: number, secondary: number): Vector;
	getTurnAndTilt (primary: number, secondary: number): Vector;
	getEuler(convention: number): Vector;
	getEuler2(convention: number): Vector;
	getEulerZXZ(): Vector;
	getEulerZYZ(): Vector;
	getEulerXYZ(): Vector;
	getEulerZYX(): Vector;
	clamp(epsilon: number): void;
	isZero(): boolean;
	isIdentity(): boolean;
	getN1(): number;
	getN2(): number;
	normalize(): void;
	add(right: Matrix): void;
	subtract(right: Matrix): void;
	negate(): void;
	getNegated(): Matrix;
	transpose(): void;
	getTransposed(): Matrix;
	multiply(right: number): Matrix;
	multiply(right: Matrix): Matrix;
	multiply(right: Vector): Vector;
	toString(): string;
}
declare interface Recorda {
	isValid(): boolean;
	getId(): number;
	getType(): number;
	getCategories(): number;
	isMotion(): boolean;
	isCycle(): boolean;
	getCycleType(): string;
	isParameter(): boolean;
	getParameterName(): string;
	getParameterValue(): Value;
}
declare interface Specifiers {
	decimals: number;
	trim: boolean;
	trimLeadZero: boolean;
	forceSign: boolean;
	forceDecimal: boolean;
	zeropad: boolean;
	width: number;
	seperator: string;
	cyclicLimit: number;
	cyclicSign: number;
	scale: number;
	offset: number;
	prefix: string;
	suffix: string;
	inherit: Format;
}
declare class Format {
	constructor(specifiers: Specifiers);

	format(value: number): String;
	getResultingValue(value: number): number;
	getError(value: number): number;
	isSignificant(value: number): boolean;
	areDifferent(a: number,b: number): boolean;
	getMinimumValue(): number;
}
declare class FormatNumber {
	constructor();

	getDecimalSymbol(): number;
	setDecimalSymbol(decimalSymbol: number): void;
	getZeroPad(): boolean;
	setZeroPad(zeroPad: boolean): void;
	getForceSign(): boolean;
	setForceSign(forceSign: boolean): void;
	getForceDecimal(): boolean;
	setForceDecimal(forceDecimal: boolean): void;
	getWidth(): number;
	setWidth(width: number): void;
	getNumberOfDecimals(): number;
	setNumberOfDecimals(numberOfDecimals: number): void;
	getTrimZeroDecimals(): boolean;
	setTrimZeroDecimals(trimZeroDecimals: boolean): void;
	getTrimLeadZero(): boolean;
	setTrimLeadZero(trimLeadZero: boolean): void;
	remap(value: number): number;
	unmap(value: number): number;
	getCyclicLimit(): number;
	getCyclicSign(): number;
	setCyclicMapping(limit: number, sign: number): void;
	getScale(): number;
	setScale(scale: number): void;
	getOffset(): number;
	setOffset(offset: number): void;
	getPrefix(): string;
	setPrefix(prefix: string): void;
	getSuffix(): string;
	setSuffix(suffix: string): void;
	getBase(): number;
	setBase(base: number): void;
	getMinimum(): number;
	setMinimum(value: number): void;
	getMaximum(): number;
	setMaximum(value: number): void;
	getMinDigitsLeft(): number;
	setMinDigitsLeft(value: number): void;
	getMinDigitsRight(): number;
	setMinDigitsRight(value: number): void;
	getType(): number;
	setType(type: number): void;
	format(value: number): string;
	isSignificant(value: number): boolean;
	areDifferent(a: number, b: number): boolean;
	getMinimumValue(): number;
	getResultingValue(value: number): number;
	getError(value: number): number;
}
declare class Modal {
	constructor(specifiers: Specifiers,format: Format);
	
	format(value: Value): string;
	getPrefix(): Value;
	setPrefix(prefix: Value): void;
	getSuffix(): Value;
	setSuffix(suffix: Value): void;
	reset(): void;
	getCurrent(): Value;
}
declare class Variable {
	constructor(specifiers: any,format: Format);

	format(value: number): string;
	getPrefix(): Value;
 	setPrefix(prefix: Value): void;
 	disable(): void;
 	reset(): void;
	getCurrent(): Value;
}
declare class IncrementalVariable {
	constructor(specifiers: any,format: Format);

	format(value: number): string;
	getPrefix(): Value;
 	setPrefix(prefix: Value): void;
 	disable(): void;
 	reset(): void;
	getCurrent(): Value;
}
declare class ModalGroup {	
	constructor();

	setStrict(strict: Boolean): void;
	setAutoReset(autoreset: Boolean): void;
	setLogUndefined(logundefined: Boolean): void;
	getNumberOfGroups(): number;
	getNumberOfCodes(): number;
	getNumberOfCodesInGroup(group: number): number;
	isCodeDefined(code: number): Boolean;
	isActiveCode(code: number): Boolean;
	makeActiveCode(code: number): void;
	getActiveCode(group: number): number;
	hasActiveCode(group: number): Boolean;
	reset(): void;
	resetGroup(group: number): number;
	createGroup(): number;
	removeCode(code: number): void;
	addCode (group: number, code: number): void;
	isGroup(group: number): Boolean;
	getGroup(code: number): number;
	inSameGroup(a: number, b: number): Boolean;
	isEnabled(): Boolean;
	enable(): void;
	disable(): void;
	setForce(force: Boolean): void;
	setFormatNumber(formatNumber: FormatNumber): void;
	setPrefix(prefix: String): void;
	setSuffix(suffix: String): void;
	format(code: number): String;
}
declare class OutputVariable {
	constructor(specifiers: Specifiers, format: Format)

	disable(): void;
	enable(): void;
	format(value: Number): String;
	getControl(): Value;
	getCurrent(): Value;
	getCyclicLimit(): Value;
	getCyclicSign(): Value;
	getFormat(): FormatNumber;
	getPrefix(): Value;
	getResultingValue(): Value;
	getSuffix(): Value;
	getTolerance(): Value;
	getType(): Value;
	isEnabled(): Boolean;
	setControl(control: Value): void;
	setCurrent(current: Value): void;
	setCyclicLimit(cyclicLimit: Value): void;
	setCyclicSign(cyclicLimit: Value): void;
	setFormat(format: Format): void;
	setPrefix(prefix: Value): void;
	setSuffix(suffix: Value): void;
	setTolerance(tolerance: Value): void;
	setType(type: Value): void;
	reset(): void;
	getDecimalSymbol(): String;
	setDecimalSymbol(decimalSymbol: String): void;
	getForceSign(): Boolean;
	setForceSign(forceSign: Boolean): void;
	getNumberOfDecimals(): Value;
	setNumberOfDecimals(numberOfDecimals: Value): void;
	getScale(): Value;
	setScale(scale: Value): void;
	getOffset(): Value;
	setOffset(offset: Value): void;
	getBase(): Value;
	setBase(base: Value): void;
	getMinimum(): Value;
	setMinimum(minimum: Value): void;
	getMaximum(): Value;
	setMaximum(maximum: Value): void;
	getMinDigitsLeft(): Value;
	setMinDigitsLeft(minDigitsLeft: Value): void;
	getMinDigitsRight(): Value;
	setMinDigitsRight(minDigitsRight: Value): void;
	getFormatType(): Value;
	setFormatType(type: Value): void;
}
declare class ReferenceVariable {
	constructor(specifiers: {
		prefix?: string,
		force?: boolean,
	}, format: Format);

	format (value: number,reference: number): string;
	getPrefix(): Value;
 	setPrefix(prefix: Value): void;
 	disable(): void;
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
        wcs: string;//The WCS.
        dynamicWorkOffset: number;//the display coordinates. More...
        axisSubstitution: boolean;//Specifies that the section uses axis substitution.
        axisSubstitutionRadius: number;//Specifies the nominal axis substitution radius.
        type: number;//Specifies the type of the section(TYPE_MILLING, TYPE_TURNING, TYPE_JET: or).
        quality: number;//Specifies the associated quality.
        tailstock: boolean;//Specifies that tailstock is used.
        partCatcher: boolean;//Specifies that part catcher should be activated if available.
        spindle: number;//Specifies the active spindle.
        properties: any;//The operation properties.
        strategy: string;//Specifies the strategy type of the section.

        getId(): number;
        //PostPropertyMap::getOperationProperties(): PropertyMap;
        //optional< string >getStrategy: ; ()
        getNumberOfRecords(): number;
        getRecord(id: number): Recorda;
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
declare interface Shaft {
	length: number;
	maximumDiameter: number;

	hasSections(): boolean;
	getNumberOfSections(): number;
	getMaximumDiameter(): number;
	getTotalLength(): number;
	getDiameter (index: number): number ;
	getLength (index: number): number ;
}
declare interface Holder {
	length: number;
	maximumDiameter: number;

	hasSections(): boolean;
	getNumberOfSections(): number;
	getMaximumDiameter(): number;
	getTotalLength(): number;
	getDiameter (index: number): number ;
	getLength (index: number): number ;
}
// declare interface MachineConfigurationSpecifier {
// 	model: string;//Specifies the machine model.
// 	description: ;//Describes the machine configuration.
// 	vendor: string;//Specifies the machine vendor.
// 	vendorUrl: ;//Specifies the machine vendor link.
// 	width: number;//Specifies the width of the machine.
// 	depth: number;//Specifies the depth of the machine.
// 	height: number;//Specifies the height of the machine.
// 	weight: number;//Specifies the weight of the machine.
// 	weightCapacity: number;//Specifies the weight capacity of the machine.
// 	spindleAxis: number;//Specifies the spindle axis.
// 	maximumSpindlePower: ;//Specifies the maximum spindle power.
// 	maximumSpindleSpeed: ;//Specifies the maximum spindle speed.
// 	collectChuck: ;//Specifies the collect chuck. Tool-holder interface.
// 	x: ;//Specifies the X axis.
// 	y: ;//Specifies the Y axis.
// 	z: ;//Specifies the Z axis.
// 	u: ;//Specifies the U axis.
// 	v: ;//Specifies the V axis.
// 	w: ;//Specifies the W axis.
// }
declare class MachineConfiguration {


        constructor();
        constructor(u: Axis);
        constructor(u: Axis,v: Axis);
        constructor(u: Axis,v: Axis,w: Axis);
    
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
        getIndexOfAxisById(id: number): number;
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
}
declare class Axis {
	constructor()
	constructor(_table: boolean, _axis: Vector, _offset: Vector, _coordinate: number);
	constructor(_table: boolean, _axis: Vector, _offset: Vector, _coordinate: number, _range: Range);
	
	getName(): string;
	setName(name: string): void;
	getActuator(): number;
	setActuator(actuator: number): void;
	isLinear(): boolean;
	isRotational(): boolean;
	isAggregate(): boolean;
	getResolution(): number;
	setResolution(resolution: number): void;
	clampToResolution(_value: number): number;
	getResolutionError(_value: number): number;
	getMaximumFeed(): number;
	setMaximumFeed(_maximumFeed: number): void;
	getRapidFeed(): number;
	setRapidFeed(_rapidFeed: number): void;
	getPreference(): number;
	setPreference(preference: number): void;
	getReset(): number;
	setReset(reset: number): void;
	isEnabled(): boolean;
	isHead(): boolean;
	isTable(): boolean;
	getEffectiveAxis(): Vector;
	getAxis(): Vector;
	getOffset(): Vector;
	getHomePosition(): number;
	getDisplacement(): number;
	isCyclic(): boolean;
	isTCPEnabled(): boolean;
	getRange(): Range;
	getCoordinate(): number;
	isSupported(value: number): boolean;
	clamp(value: number): number;
	reduce(value: number): number;
	remapToRange(angle: number): number;
	remapToRange2 (angle: number, current: number): number;
	getAxisRotation(position: number): Matrix;
}
declare class Tool {
	number: number;//The tool number.
	turret: number;//The turret.
	diameterOffset: number;//The diameter offset (used milling: for).
	lengthOffset: number;//The length offset (used milling: for).
	compensationOffset: number;//The compensation offset (used turning: for).
	manualToolChange: boolean;//True if tool must be manually changed.
	breakControl: boolean;//True if break control is enabled.
	liveTool: boolean;//True if the tool is live - otherwise it is static.
	holdernumber: number;//number identifying the holder.
	spindleMode: number;//The spindle mode.
	spindleRPM: number;//The spindle speed in RPM. Positive for clockwise direction.
	rampingSpindleRPM: number;//The spindle speed in RPM for ramping. Positive for clockwise direction.
	surfaceSpeed: number;//The surface speed(CSS): void;.
	maximumSpindleSpeed: number;//The maximum spindle speed(RPM): void; when using surface speed(CSS): void;.
	numberOfFlutes: number;//The number of flutes.
	threadPitch: number;//The number of thread per unit of length.
	coolant: number;//The coolant.
	material: number;//The material.
	comment: string | undefined;//The Comment.
	desciption: string | undefined;//The Description.
	vendor: string;//The vendor.
	productId: string;//The product id.
	unit: number;//The unit.
	type: number;//The tool type.
	diameter: number;//The diameter.
	cornerRadius: number;//The corner radius.
	taperAngle: number;//The taper angle.
	fluteLength: number;//The flute length.
	shoulderLength: number;//The shoulder length.
	shaftDiameter: number;//The shaft diameter.
	bodyLength: number;//The body length.
	overallLength: number;//The entire length of the tool.
	shaft: Shaft;//The tool shaft.
	holderTipDiameter: number;//The holder tip diameter.
	holderDiameter: number;//The holder diameter.
	holderLength: number;//The holder length.
	holder: Holder;//The tool holder.
	boringBarOrientation: number;//The boring bar orientation in radians.
	inscribedCircleDiameter: number;//The inscribed circle diameter for turning tool.
	edgeLength: number;//The edge length for turning tool.
	noseRadius: number;//The nose radius for turning tools.
	reliefAngle: number;//The relief angle in degrees.
	thickness: number;//The turning tool thickness;.
	grooveWidth: number;//The groove tool width.
	crossSection: string;//The cross section type for turning tools.
	tolerance: string;//The tolerance for turning tools.
	pitch: number;//The thread pitch for turning tools.
	hand: string;//The holder hand. Left, Right, or Neutral.
	clamping: string;//Clamping for turning tools.
	jetDistance: number;//The jet distance. More...
	jetDiameter: number;//The jet diameter.
	kerfWidth: number;//The kerf width.
	machineQualityControl: string;//The machine quality control.
	cutHeight: number;//The cut height.
	pierceHeight: number;//The pierce height.
	pressure: number;//The pressure.
	pierceTime: number;//The pierce time.
	abrasiveFlowRate: number;//The abrasive flow rate.
	piercePower: number;//The pierce power.
	cutPower: number;//The cut power.
	assistGas: string;//The assist gas.
	
	getToolId(): string;
	getnumber(): number;
	getDiameterOffset(): number;
	getLengthOffset(): number;
	getSecondaryLengthOffset(): number;
	isTurningTool(): boolean;
	isJetTool(): boolean;
	getHoldernumber(): number;
	getSpindleMode(): number;
	getSpindleRPM(): number;
	getRampingSpindleRPM(): number;
	isClockwise(): boolean;
	getSurfaceSpeed(): number;
	getMaximumSpindleSpeed(): number;
	getnumberOfFlutes(): number;
	getThreadPitch(): number;
	getTappingFeedrate(): number;
	isDrill(): boolean;
	getCoolant(): number;
	getMaterial(): number;
	getDescription(): string;
	getComment(): string;
	getVendor(): string;
	getProductId(): string;
	getHolderDescription(): string;
	getHolderComment(): string;
	getHolderVendor(): string;
	getHolderProductId(): string;
	getAggregateId(): string;
	getUnit(): number;
	getType(): number;
	getDiameter(): number;
	getTipDiameter(): number;
	getCornerRadius(): number;
	getTaperAngle(): number;
	getFluteLength(): number;
	getShoulderLength(): number;
	getShaftDiameter(): number;
	getBodyLength(): number;
	getOverallLength(): number;
	getShaft(): Shaft;
	getJetDistance(): number;
	getJetDiameter(): number;
	getKerfWidth(): number;
	getMachineQualityControl(): string;
	getCutHeight(): number;
	getPierceHeight(): number;
	getPressure(): number;
	getPierceTime(): number;
	getAbrasiveFlowRate(): number;
	getPiercePower(): number;
	getCutPower(): number;
	getAssistGas(): string;
	getHolderTipDiameter(): number;
	getHolderDiameter(): number;
	getHolderLength(): number;
	getHolder(): Holder;
	getBoringBarOrientation(): number;
	getCompensationOffset(): number;
	getSecondaryCompensationOffset(): number;
	getManualToolChange(): boolean;
	getBreakControl(): boolean;
	isLiveTool(): boolean;
	getTurret(): number;
	getInsertType(): number;
	getHolderType(): number;
	getCompensationMode(): number;
	getCompensationDisplacement(): Vector;
	getExtent(includeHolder: boolean): BoundingBox;
	getCutterProfile(): Curve;
	getHolderProfile(): Curve;
	getCutterProfileAsSVGPath(): string;
	getHolderProfileAsSVGPath(): string;
	//getCutterAsMesh(tolerance: number): Mesh;
	//getHolderAsMesh(tolerance: number): Mesh;
}
declare interface MachineParameters {
	spindleOrientation: number;
	chipBreakingDistance: number;
	drillingSafeDistance: number;
	spindleSpeedDwell: number;
}
declare class CircularMotion {
	getPositionU(u: number): Vector;
	getOffset(): number;
}
declare class CurveEntity {
	arc: boolean;
	clockwise: boolean;
	start: Vector;
	center: Vector;
	end: Vector;

	constructor();

	static getLine(start: Vector,end: Vector): CurveEntity;
	static getArc(start: Vector,end: Vector,center: Vector,clockwise: boolean): CurveEntity;

	getLength(): number;
	getRadius(): number;
	isBigArc(): boolean;
	getSweep(): number;
	reverse(): void;
	translate(offset: Vector): void;
}
declare interface Curve {
	getNumberOfEntities(): number;
	getEntity(index: number): CurveEntity;
	isClosed(): boolean;
	hasArcs(): boolean;
	getLength(): number;
	getExtent(): BoundingBox;
	getLinearize(tolerance: number): Curve;
}
declare interface ToolTable {
	getNumberOfTools(): number,
	getTool(index: number): Tool,	
}
declare interface MoveLength {
	linear: number;
	radial: number;
	radialToolTip: number;

	getLinearMoveLength(): number;
	getRadialMoveLength(): number;
	getRadialToolTipMoveLength(): number;
}

declare function getMachineConfiguration(): MachineConfiguration;
declare function setMachineConfiguration(machine: MachineConfiguration): void;
declare function getMultiAxisMoveLength(x: number,y: number,z: number,a: number,b: number,c: number): MoveLength;
declare function optimizeMachineAngles(): void;
declare function optimizeMachineAngles2(optimizeType: number): void;
declare function optimizeMachineAnglesByMachine(machine: MachineConfiguration,optimizeType: number): void;
declare function isSectionSpecialCycle(uri: string): boolean;
declare function setSectionSpecialCycle(uri: string,specialCycle: boolean): void;
declare function getProduct(): string;
declare function getProductUri(): string;
declare function getProductUrl(): string;
declare function getVendor(): string;
declare function getVendorUrl(): string;
declare function getVersion(): string;
declare function openUrl(url: string): void;
declare function printDocument(path: string): boolean;
declare function printDocumentTo(path: string,printerName: string): boolean;
//declare function createToolRenderer(): ToolRenderer;
declare function invokeOnRapid(x: number,y: number,z: number): boolean;
declare function invokeOnRapid5D(x: number,y: number,z: number,dx: number,dy: number,dz: number): boolean;
declare function invokeOnLinear(x: number,y: number,z: number,feedrate: number): boolean;
declare function invokeOnLinear5D(x: number,y: number,z: number,dx: number,dy: number,dz: number,feedrate: number): boolean;
declare function invokeOnCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,nx: number,ny: number,nz: number,feedrate: number): boolean;
declare function activatePolarMode(tolerance: number,currentAngle: number,polarDirection: Vector): VectorPair;
declare function deactivatePolarMode(): void;
declare function isPolarModeActive(): boolean;
declare function getPolarPosition(x: number,y: number,z: number): VectorPair;
declare function setCurrentPositionAndDirection(posDir: VectorPair): void;
declare function setExitCode(code: number): void;
declare function error(message: string): void;
declare function warning(message: string): void;
declare function warningOnce(message: string,id: number): void;
declare function log(message: string): void;
declare function getCurrentNCLocation(): string;
declare function getSystemUnit(): number;
declare function getPlatform(): string;
declare function hasSymbol(symbol: number): boolean;
declare function isTextSupported(text: string): boolean;
declare function getCodePage(): number;
declare function setCodePage(name: string): void;
declare function write(message: string): void;
declare function writeln(message: string): void;
declare function getWordSeparator(): string;
declare function setWordSeparator(message: string): void;
declare function writeWords(strings: string[]): void;
declare function writeWords2(message: string,strings: string[]): void;
declare function formatWords(strings: string[]): string;
declare function subst(...strings: string[]): string;
declare function getLangId(): string;
declare function isSupportedText(message: string): boolean;
declare function localize(message: string): string;
declare function localize2(section: string,message: string): string;
declare function loadLocale(langId: string): boolean;
declare function include(path: string): void;
declare function findFile(path: string): string;
declare function getHeader(): string;
declare function getHeaderVersion(): string;
declare function getHeaderCommit(): string;
declare function getHeaderDate(): string;
declare function getHeaderDate2(): Date;
declare function getHeaderSnippet(keyword: string): string;
declare function getIntermediatePath(): string;
declare function getOutputPath(): string;
declare function getSimulationStreamPath(): string;
declare function getConfigurationFolder(): string;
declare function getConfigurationPath(): string;
declare function getPostProcessorFolder(): string;
declare function getPostProcessorPath(): string;
declare function getCascadingPath(): string;
declare function setCascadingPath(path: string): void;
declare function getSecurityLevel(): number;
declare function exportNCAs(path: string,format: string): void;
declare function execute(path: string,arguments: string,hide: boolean,workingFolder: string): number;
declare function executeNoWait(path: string,arguments: string,hide: boolean,workingFolder: string): void;
declare function setEOL(eol: string): void;
declare function isRedirecting(): boolean;
declare function closeRedirection(): void;
declare function redirectToFile(path: string): void;
declare function redirectToBuffer(): void;
declare function getRedirectionBuffer(): string;
declare function getRedirectionBuffer2(clear: boolean): string;
declare function registerPostProcessing(path: string): void;
declare function getWorkpiece(): BoundingBox;
declare function getFixture(): BoundingBox;
declare function getMachineConfigurations(): string;
declare function getMachineConfigurationByName(name: string): MachineConfiguration;
declare function loadMachineConfiguration(path: string): MachineConfiguration;
declare function isInteractionAllowed(): boolean;
declare function alert(title: string,description: string): void;
declare function promptKey(title: string,description: string): string;
declare function promptKey2(title: string,description: string,accept: string): string;
declare function promptKey3(title: string,description: string,accept: string,keys: string): string;
declare function promptText(title: string,description: string): string;
declare function getAsInt(text: string): number;
declare function getAsFloat(text: string): number;
declare function isSafeText(text: string,permitted: string): boolean;
declare function filterText(text: string,keep: string): string;
declare function translateText(text: string,src: string,dest: string): string;
declare function loadText(url: string,encoding: string): string;
declare function getOutputUnit(): number;
declare function setOutputUnit(unit: number): void;
declare function getDogLeg(): boolean;
declare function setDogLeg(dogLeg: boolean): void;
declare function getRotation(): Matrix;
declare function setRotation(rotation: Matrix): void;
declare function cancelRotation(): void;
declare function getTranslation(): Vector;
declare function cancelTransformation(): void;
declare function setTranslation(translation: Vector): void;
declare function cancelTranslation(): void;
declare function getFramePosition(position: Vector): Vector;
declare function getFrameDirection(direction: Vector): Vector;
declare function getSectionFramePosition(framePosition: Vector): Vector;
declare function getSectionFrameDirection(frameDirection: Vector): Vector;
declare function getHighFeedMapping(): number;
declare function setHighFeedMapping(mode: number): void;
declare function getHighFeedrate(): number;
declare function setHighFeedrate(feedrate: number): void;
declare function getGlobalPosition(p: Vector): Vector;
declare function getWCSPosition(p: Vector): Vector;
declare function getSectionPosition(p: Vector): Vector;
declare function getCurrentGlobalPosition(): Vector;
declare function getCurrentPosition(): Vector;
declare function setCurrentPosition(currentPosition: Vector): void;
declare function setCurrentPositionX(x: number): void;
declare function setCurrentPositionY(y: number): void;
declare function setCurrentPositionZ(z: number): void;
declare function getCurrentDirection(): Vector;
declare function setCurrentDirection(currentDirection: Vector): void;
declare function getCurrentSpindleSpeed(): number;
declare function setCurrentSpindleSpeed(spindleSpeed: number): void;
declare function setCurrentABC(abc: Vector): void;
declare function skipRemainingSection(): void;
declare function isClockwiseSpindleDirection(): boolean;
declare function isSpindleActive(): boolean;
declare function isCoolantActive(): boolean;
declare function isProbeOperation(section: Section): boolean;
declare function isInspectionOperation(section: Section): boolean;
declare function isDepositionOperation(section: Section): boolean;
declare function isDrillingCycle(section: Section,checkBoringCycles: boolean): boolean;
declare function isTappingCycle(section: Section): boolean;
declare function isAxialCenterDrilling(section: Section,checkLiveTool: boolean): boolean;
declare function isMillingCycle(section: Section,checkBoringCycles: boolean): boolean;
declare function isSpeedFeedSynchronizationActive(): boolean;
declare function is3D(): boolean;
declare function isMultiAxis(): boolean;
declare function isMultiChannelProgram(): boolean;
declare function getNumberOfChannels(): number;
declare function getCurrentChannel(): number;
declare function getNumberOfSyncGroups(channel: number): number;
declare function getCurrentSyncGroup(): number;
declare function getNumberOfRecords(): number;
declare function getRecord(id: number): Recorda;
declare function getCurrentSectionId(): number;
declare function getNumberOfSections(): number;
declare function getSection(index: number): Section;
declare function getPreviousSection(): Section;
declare function hasNextSection(): boolean;
declare function getNextSection(): Section;
declare function getToolTable(): ToolTable;
declare function writeToolTable(orderBy: number): void;
declare function getCurrentRecordId(): number;
declare function getMachiningDistance(tool: number): number;
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
declare function linearize(tolerance: number): void;
declare function getNumberOfSegments(tolerance: number): number;
declare function getPositionU(u: number): Vector;
declare function getCircularMotion(): CircularMotion;
declare function getFeedrate(): number;
declare function getMovement(): number;
declare function getPower(): boolean;
declare function getSpindleSpeed(): number;
declare function isSpindleSpeedDifferent(section: Section): boolean;
declare function getRadiusCompensation(): number;
declare function getCompensationOffset(): number;
declare function hasPreviousRecord(): boolean;
declare function getPreviousRecord(): Recorda;
declare function hasNextRecord(): boolean;
declare function getNextRecord(): Recorda;
declare function getFirstTool(): Tool;
declare function setWriteInvocations(writeInvocations: boolean): void;
declare function setWriteStack(writeStack: boolean): void;
declare function writeSectionNotes(): void;
declare function writeSetupNotes(): void;
declare function isFirstCyclePoint(): boolean;
declare function isLastCyclePoint(): boolean;
declare function getCyclePointId(): number;
declare function getNumberOfCyclePoints(): number;
declare function getCyclePoint(index: number): Vector;
declare function onImpliedCommand(command: number): void;
declare function hasGlobalParameter(name: string): boolean;
declare function getGlobalParameter(name: string,defaultValue: Value): Value;
declare function getProperty(property: string,defaultValue?: Value): Value;
declare function setProperty(property: string,value: Value): void;
declare function hasParameter(name: string): boolean;
declare function getParameter(name: string,defaultValue?: Value): Value;
declare function registerTerminationHandler(func: Function): void;
declare function toDeg(radians: number): number;
declare function toRad(degrees: number): number;
declare function parseSpatial (value: string): number;
declare function getPlane(direction: Vector): number;
declare function getISOPlane(plane: number): number;
declare function isSameDirection(a: Vector,b: Vector): boolean;
declare function getSectionsInChannel(channel: number): Section[];
declare function validatePropertyDefinitions(): boolean;
declare function validateProperties(): boolean;
declare function getProgramNameAsInt(min: number,max: number): number;
declare function getProgramNameAsString(charLimit: number): string;
declare function isToolChangeNeeded(section: Section,arguments: string): boolean;
declare function getNextTool(number: number): Tool | undefined;
declare function getNextTool(section: Section,firstTool: boolean,arguments: string): Tool;
declare function isNewWorkPlane(section: Section): boolean;
declare function isNewWorkOffset(section: Section): boolean;
declare function toolZRange(): Range;
declare function range(first: number,end: number,step: number): number[];
declare function interval(from: number,to: number): number[];
//declare function flatten(array: Array): Array;
declare function getQuadrant(angle: number): number;
declare function conditional(condition: boolean,value: string): string;
declare function validate(expression: Value,message: string): void;
declare function debug(message: string): void;
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
declare function onExpandedSpindleSpeed(spindleSpeed: number): void;
declare function createMachineConfiguration(specifiers: any): MachineConfiguration;
declare function getMachineConfigurationAsText(machine: MachineConfiguration): string;
declare function createAxis(specifiers: any): Axis;
declare function createFormat(specifiers: any): FormatNumber;
declare function createOutputVariable(specifiers: any,format: Format): OutputVariable;
declare function createVariable(specifiers: any,format: Format): Variable;
declare function createIncrementalVariable(specifiers: any,format: Format): IncrementalVariable;
declare function createReferenceVariable(specifiers: {prefix?: string,force?: boolean,},format: Format): ReferenceVariable;
declare function createModal(specifiers: any,format: Format): Modal;
declare function createModalGroup(specifiers: any,groups: number[],format: Format): ModalGroup;
declare function repositionToCycleClearance(cycle: any,x: number,y: number,z: number): void;
declare function expandCyclePoint(x: number,y: number,z: number): void;
declare function isWellKnownCycle(): boolean;
declare function isProbingCycle(uri: string): boolean;
declare function isSubSpindleCycle(uri: string): boolean;
declare function isWellKnownCommand(command: number): boolean;
declare function getCommandStringId(command: number): string;
declare function canIgnoreCommand(command: number): boolean;
declare function onUnsupportedCommand(command: number): void;
declare function expandManualNC(command: number,value: Value): void;
declare function onUnsupportedCoolant(coolant: number): void;
declare function getCoolantName(coolant: number): string;
declare function getMaterialName(material: number): string;
declare function getToolTypeName(tool: Tool): string;
//declare function onMachine(): void;
//declare function onOpen(): void;
//declare function onCycle(): void;
//declare function onCyclePoint(x: number,y: number,z: number): void;
//declare function onCyclePath(): void;
//declare function onCyclePathEnd(): void;
//declare function onCycleEnd(): void;
//declare function onParameter(name: string,value: Value): void;
//declare function onPassThrough(value: Value): void;
//declare function onComment(comment: string): void;
//declare function onRapid(x: number,y: number,z: number): void;
//declare function onLinear(x: number,y: number,z: number,feed: number): void;
//declare function onLinearExtrude(x: number,y: number,z: number,feed: number,extrusionLength: number): void;
//declare function onCircular(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number): void;
//declare function onCircularExtrude(clockwise: boolean,cx: number,cy: number,cz: number,x: number,y: number,z: number,feed: number,extrusionLength: number): void;
//declare function onRapid5D(x: number,y: number,z: number,dx: number,dy: number,dz: number): void;
//declare function onLinear5D(x: number,y: number,z: number,dx: number,dy: number,dz: number,feed: number): void;
//declare function onRewindMachine(a: number,b: number,c: number): void;
//declare function onRewindMachineEntry(a: number,b: number,c: number): void;
//declare function onMoveToSafeRetractPosition(): void;
//declare function onReturnFromSafeRetractPosition(x: number,y: number,z: number): void;
//declare function onRotateAxes(x: number,y: number,z: number,a: number,b: number,c: number): void;
//declare function onMovement(movement: number): void;
//declare function onPower(power: boolean): void;
//declare function onRadiusCompensation(): void;
//declare function onToolCompensation(compensation: number): void;
//declare function onDwell(time: number): void;
//declare function onSpindleSpeed(spindleSpeed: number): void;
//declare function onLayer(layerNumber: number): void;
//declare function onLayerEnd(layerNumber: number): void;
//declare function onExtrusionReset(length: number): void;
//declare function onExtruderChange(extruderId: number): void;
//declare function onExtruderTemp(temp: number,wait: boolean,extruderId: number): void;
//declare function onBedTemp(temp: number,wait: boolean): void;
//declare function onFanSpeed(speed: number,fanId: number): void;
//declare function onMaxAcceleration(xAxis: number,yAxis: number,zAxis: number,eAxis: number): void;
//declare function onAcceleration(travel: number,printing: number,retract: number): void;
//declare function onJerk(xAxis: number,yAxis: number,zAxis: number,eAxis: number): void;
//declare function onCommand(command: number): void;
//declare function onOrientateSpindle(angle: number): void;
//declare function onSectionEnd(): void;
//declare function onClose(): void;

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
declare var properties: any;///////////////////////////////////////CHANGE THIS; 
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
declare var cycle: {
	[key: string]: any,
}; 
declare var cycleExpanded: boolean

declare const DEG: number;

// declare const CAPABILITY_MILLING: number;
// declare const CAPABILITY_TURNING: number;
// declare const CAPABILITY_JET: number;
// declare const CAPABILITY_SETUP_SHEET: number;
// declare const CAPABILITY_INTERMEDIATE: number;
// declare const IN: number;//Inch unit.
// declare const MM: number;//Millimeters unit.
// declare const PLANE_XY: number;//Circular XY plane.
// declare const PLANE_XZ: number;//Circular XZ plane. Deprecated use PLANE_ZX instead.
// declare const PLANE_ZX: number;//Circular ZX plane.
// declare const PLANE_YZ: number;//Circular YZ plane.
// declare const X: number;//X coordinate index.
// declare const Y: number;//Y coordinate index.
// declare const Z: number;//Z coordinate index.
// declare const A: number;//A rotary index.
// declare const B: number;//B rotary index.
// declare const C: number;//C rotary index.
// declare const ABC: number;//All rotaries index.
// declare const TOOL_AXIS_X: number;//YZ-plane.
// declare const TOOL_AXIS_Y: number;//ZX-plane.
// declare const TOOL_AXIS_Z: number;//XY-plane.
// declare const HAS_PARAMETER: number;//Has parameter flag.
// declare const HAS_RAPID: number;//Has rapid flag.
// declare const HAS_LINEAR: number;//Has linear flag.
// declare const HAS_DWELL: number;//Has dwell flag.
// declare const HAS_CIRCULAR: number;//Has circular flag.
// declare const HAS_CYCLE: number;//Has cycle flag.
// declare const HAS_WELL_KNOWN_COMMAND: number;//Has well-known COMMAND flag.
// declare const HAS_COMMENT: number;//Has comment flag.
// declare const SINGULARITY_LINEARIZE_OFF: number;//Don't linearize moves around multi-axis singularities. More...
// declare const SINGULARITY_LINEARIZE_LINEAR: number;
// declare const SINGULARITY_LINEARIZE_ROTARY: number;//Keep rotary axes in line during multi-axis singularity linearization. More...
// declare const RADIUS_COMPENSATION_OFF: number;//Center radius compensation.
// declare const RADIUS_COMPENSATION_LEFT: number;//Left radius compensation.
// declare const RADIUS_COMPENSATION_RIGHT: number;//Right radius compensation.
// declare const RECORD_INVALID: number;//Invalid record type.
// declare const RECORD_WELL_KNOWN_COMMAND: number;//Well-known COMMAND.
// declare const RECORD_PARAMETER: number;//Parameter.
// declare const RECORD_LINEAR: number;//Linear motion.
// declare const RECORD_LINEAR_5D: number;//Linear 5-axis motion.
// declare const RECORD_LINEAR_ZXN: number;//Linear 5-axis motion.
// declare const RECORD_LINEAR_EXTRUDE: number;//Linear motion with extrude.
// declare const RECORD_CIRCULAR: number;//Circular motion.
// declare const RECORD_DWELL: number;//Dwell.
// declare const RECORD_CYCLE: number;//Cycle.
// declare const RECORD_CYCLE_OFF: number;//End of cycle.
// declare const RECORD_COMMENT: number;//Comment.
// declare const RECORD_WIDE_COMMENT: number;//Comment.
// declare const RECORD_CIRCULAR_EXTRUDE: number;//Circular motion with extrude.
// declare const COMMAND_INVALID: number;//Invalid (well-known COMMAND).
// declare const COMMAND_STOP: number;//Program stop (well-known number;M00).
// declare const COMMAND_OPTIONAL_STOP: number;//Optional program stop (well-known number;M01).
// declare const COMMAND_END: number;//Program end (well-known number;M02).
// declare const COMMAND_SPINDLE_CLOCKWISE: number;//Clockwise spindle direction (well-known number;M03).
// declare const COMMAND_SPINDLE_COUNTERCLOCKWISE: number;//Counterclockwise spidle direction (well-known number;M04).
// declare const COMMAND_START_SPINDLE: number;
// declare const COMMAND_STOP_SPINDLE: number;//Spindle stop (well-known number;M05).
// declare const COMMAND_ORIENTATE_SPINDLE: number;
// declare const COMMAND_LOAD_TOOL: number;//Tool change (M06).
// declare const COMMAND_COOLANT_ON: number;//Coolant on (M08).
// declare const COMMAND_COOLANT_OFF: number;//Coolant off (M09).
// declare const COMMAND_ACTIVATE_SPEED_FEED_SYNCHRONIZATION: number;//Activate speed-feed synchronization (well-known COMMAND).
// declare const COMMAND_DEACTIVATE_SPEED_FEED_SYNCHRONIZATION: number;//Deactivate speed-feed synchronization (well-known COMMAND).
// declare const COMMAND_LOCK_MULTI_AXIS: number;//Locks the 4th and 5th axes. This number;is optional.
// declare const COMMAND_UNLOCK_MULTI_AXIS: number;//Unlocks the 4th and 5th axes. This number;is optional.
// declare const COMMAND_EXACT_STOP: number;//Exact stop. This number;is optional.
// declare const COMMAND_START_CHIP_TRANSPORT: number;//Close chip transport.
// declare const COMMAND_STOP_CHIP_TRANSPORT: number;//Stop chip transport.
// declare const COMMAND_OPEN_DOOR: number;//Open primary door.
// declare const COMMAND_CLOSE_DOOR: number;//Close primary door.
// declare const COMMAND_BREAK_CONTROL: number;//Break control.
// declare const COMMAND_TOOL_MEASURE: number;//Measure tool.
// declare const COMMAND_CALIBRATE: number;//Run calibration cycle.
// declare const COMMAND_VERIFY: number;//Verify part/tool/machine integrity.
// declare const COMMAND_CLEAN: number;//Run cleaning cycle.
// declare const COMMAND_ALARM: number;//Alarm.
// declare const COMMAND_ALERT: number;//Alert.
// declare const COMMAND_CHANGE_PALLET: number;//Change pallet.
// declare const COMMAND_POWER_ON: number;//Power on.
// declare const COMMAND_POWER_OFF: number;//Power off.
// declare const COMMAND_MAIN_CHUCK_OPEN: number;//Open main chuck. More...
// declare const COMMAND_MAIN_CHUCK_CLOSE: number;//Close main chuck. More...
// declare const COMMAND_SECONDARY_CHUCK_OPEN: number;//Open secondary chuck. More...
// declare const COMMAND_SECONDARY_CHUCK_CLOSE: number;//Close secondary chuck. More...
// declare const COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_ACTIVATE: number;//Activate spindle synchronization. More...
// declare const COMMAND_SECONDARY_SPINDLE_SYNCHRONIZATION_DEACTIVATE: number;//Deactivate spindle synchronization. More...
// declare const COMMAND_SYNC_CHANNELS: number;//Sync channels.
// declare const COMMAND_PROBE_ON: number;//Probe on.
// declare const COMMAND_PROBE_OFF: number;//Probe off.
// declare const COOLANT_DISABLED: number;//Coolant disabled.
// declare const COOLANT_FLOOD: number;//Flood coolant mode.
// declare const COOLANT_MIST: number;//Mist coolant mode.
// declare const COOLANT_TOOL: number;//Coolant through tool mode. Deprecated use COOLANT_THROUGH_TOOL instead.
// declare const COOLANT_THROUGH_TOOL: number;//Coolant through tool mode.
// declare const COOLANT_AIR: number;//Air mode.
// declare const COOLANT_AIR_THROUGH_TOOL: number;//Air through tool mode.
// declare const COOLANT_SUCTION: number;//Suction mode.
// declare const COOLANT_FLOOD_MIST: number;//Flood and mist coolant mode.
// declare const COOLANT_FLOOD_THROUGH_TOOL: number;//Flood and through tool coolant mode.
// declare const MATERIAL_UNSPECIFIED: number;//Unspecified material.
// declare const MATERIAL_HSS: number;//High-speed steel material.
// declare const MATERIAL_TI_COATED: number;//TI coated material.
// declare const MATERIAL_CARBIDE: number;//Carbide material.
// declare const MATERIAL_CERAMICS: number;//Ceramics material.
// declare const TOOL_UNSPECIFIED: number;//Unspecified tool.
// declare const TOOL_DRILL: number;//Drill.
// declare const TOOL_DRILL_CENTER: number;//Center drill.
// declare const TOOL_DRILL_SPOT: number;//Spot drill.
// declare const TOOL_DRILL_BLOCK: number;//Block drill.
// declare const TOOL_MILLING_END_FLAT: number;//Flat end-mill.
// declare const TOOL_MILLING_END_BALL: number;//Ball end-mill.
// declare const TOOL_MILLING_END_BULLNOSE: number;//Bullnose mill.
// declare const TOOL_MILLING_CHAMFER: number;//Chamfer mill.
// declare const TOOL_MILLING_FACE: number;//Face mill.
// declare const TOOL_MILLING_SLOT: number;//Slot mill.
// declare const TOOL_MILLING_RADIUS: number;//Radius mill.
// declare const TOOL_MILLING_DOVETAIL: number;//Dovetail mill.
// declare const TOOL_MILLING_TAPERED: number;//Tapered mill.
// declare const TOOL_MILLING_LOLLIPOP: number;//Lollipop mill.
// declare const TOOL_TAP_RIGHT_HAND: number;//Right tap tool.
// declare const TOOL_TAP_LEFT_HAND: number;//Left tap tool.
// declare const TOOL_REAMER: number;//Reamer tool.
// declare const TOOL_BORING_BAR: number;//Boring bar tool.
// declare const TOOL_COUNTER_BORE: number;//Counterbore tool.
// declare const TOOL_COUNTER_SINK: number;//Countersink tool.
// declare const TOOL_HOLDER_ONLY: number;//Holder.
// declare const TOOL_TURNING_GENERAL: number;//General turning tool.
// declare const TOOL_TURNING_THREADING: number;//Thread turning tool.
// declare const TOOL_TURNING_GROOVING: number;//Groove turning tool.
// declare const TOOL_TURNING_BORING: number;//Boring turning tool.
// declare const TOOL_TURNING_CUSTOM: number;//Custom turning tool.
// declare const TOOL_PROBE: number;//Probe.
// declare const TOOL_WIRE: number;//Wire.
// declare const TOOL_WATER_JET: number;//Water jet.
// declare const TOOL_LASER_CUTTER: number;//Laser cutter.
// declare const TOOL_WELDER: number;//Welder.
// declare const TOOL_GRINDER: number;//Grinder.
// declare const TOOL_MILLING_FORM: number;//Form mill.
// declare const TOOL_PLASMA_CUTTER: number;//Plasma cutter.
// declare const TOOL_MARKER: number;//Marker tool.
// declare const TOOL_MILLING_THREAD: number;//Thread mill.
// declare const TOOL_COMPENSATION_INSERT_CENTER: number;//Turning tool compensation.
// declare const TOOL_COMPENSATION_TIP: number;//Turning tool compensation.
// declare const TOOL_COMPENSATION_TIP_CENTER: number;//Turning tool compensation.
// declare const TOOL_COMPENSATION_TIP_TANGENT: number;//Turning tool compensation.
// declare const MOVEMENT_RAPID: number;//Rapid movement type.
// declare const MOVEMENT_LEAD_IN: number;//Lead-in movement type.
// declare const MOVEMENT_CUTTING: number;//Cutting movement type.
// declare const MOVEMENT_LEAD_OUT: number;//Lead-out movement type.
// declare const MOVEMENT_LINK_TRANSITION: number;//Transition linking movement type.
// declare const MOVEMENT_LINK_DIRECT: number;//Drection linking movement type.
// declare const MOVEMENT_RAMP_HELIX: number;//Helical ramp movement type.
// declare const MOVEMENT_RAMP_PROFILE: number;//Profile ramp movement type.
// declare const MOVEMENT_RAMP_ZIG_ZAG: number;//Zig-zag ramp movement type.
// declare const MOVEMENT_RAMP: number;//Ramp movement type.
// declare const MOVEMENT_PLUNGE: number;//Plunge movement type.
// declare const MOVEMENT_PREDRILL: number;//Predrill movement type.
// declare const MOVEMENT_EXTENDED: number;//Extended movement type.
// declare const MOVEMENT_REDUCED: number;//Reduced cutting feed movement type.
// declare const MOVEMENT_FINISH_CUTTING: number;//Finish cutting movement type.
// declare const MOVEMENT_HIGH_FEED: number;//High feed movement type.
// declare const HIGH_FEED_NO_MAPPING: number;//Do not map rapid traveerrorsal to high feed.
// declare const HIGH_FEED_MAP_MULTI: number;//Map rapid travesal along more than one axis to high feed.
// declare const HIGH_FEED_MAP_XY_Z: number;
// declare const HIGH_FEED_MAP_ANY: number;//Map all rapid travesals to high feed.