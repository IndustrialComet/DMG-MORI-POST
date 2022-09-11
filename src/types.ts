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
        toString(): string | undefined;
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
        toString(): string | undefined;
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
	toString(): string | undefined;
}
declare interface Recorda {
	isValid(): boolean;
	getId(): number;
	getType(): number;
	getCategories(): number;
	isMotion(): boolean;
	isCycle(): boolean;
	getCycleType(): string | undefined;
	isParameter(): boolean;
	getParameterName(): string | undefined;
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
	seperator: string | undefined;
	cyclicLimit: number;
	cyclicSign: number;
	scale: number;
	offset: number;
	prefix: string | undefined;
	suffix: string | undefined;
	inherit: Format;
}
declare class Format {
	constructor(specifiers: Specifiers);

	format(value: number): string | undefined;
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
	getPrefix(): string | undefined;
	setPrefix(prefix: string): void;
	getSuffix(): string | undefined;
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
	format(value: number): string | undefined;
	isSignificant(value: number): boolean;
	areDifferent(a: number, b: number): boolean;
	getMinimumValue(): number;
	getResultingValue(value: number): number;
	getError(value: number): number;
}
declare class Modal {
	constructor(specifiers: Specifiers,format: Format);
	
	format(value: Value): string | undefined;
	getPrefix(): Value;
	setPrefix(prefix: Value): void;
	getSuffix(): Value;
	setSuffix(suffix: Value): void;
	reset(): void;
	getCurrent(): Value;
}
declare class Variable {
	constructor(specifiers: any,format: Format);

	format(value: number): string | undefined;
	getPrefix(): Value;
 	setPrefix(prefix: Value): void;
 	disable(): void;
 	reset(): void;
	getCurrent(): Value;
}
declare class IncrementalVariable {
	constructor(specifiers: any,format: Format);

	format(value: number): string | undefined;
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
	setPrefix(prefix: string): void;
	setSuffix(suffix: string): void;
	format(code: number): string | undefined;
}
declare class OutputVariable {
	constructor(specifiers: Specifiers, format: Format)

	disable(): void;
	enable(): void;
	format(value: Number): string | undefined;
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
	getDecimalSymbol(): string | undefined;
	setDecimalSymbol(decimalSymbol: string): void;
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

	format (value: number,reference: number): string | undefined;
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
        wcs: string | undefined;//The WCS.
        dynamicWorkOffset: number;//the display coordinates. More...
        axisSubstitution: boolean;//Specifies that the section uses axis substitution.
        axisSubstitutionRadius: number;//Specifies the nominal axis substitution radius.
        type: number;//Specifies the type of the section(TYPE_MILLING, TYPE_TURNING, TYPE_JET: or).
        quality: number;//Specifies the associated quality.
        tailstock: boolean;//Specifies that tailstock is used.
        partCatcher: boolean;//Specifies that part catcher should be activated if available.
        spindle: number;//Specifies the active spindle.
        properties: any;//The operation properties.
        strategy: string | undefined;//Specifies the strategy type of the section.

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
        getWCS(): string | undefined;
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
        getCycleId(index: number): string | undefined;
        getFirstCycle(): string | undefined;
        getLastCycle(): string | undefined;
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
// 	model: string | undefined;//Specifies the machine model.
// 	description: ;//Describes the machine configuration.
// 	vendor: string | undefined;//Specifies the machine vendor.
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
        static getStatusDescription(status: number): string | undefined;

        getXML(): string | undefined;
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
        getSpindleDescription(): string | undefined;
        setSpindleDescription(spindleDescription: string): void;
        getMaximumSpindlePower(): number;
        setMaximumSpindlePower(maximumSpindlePower: number): void;
        getMaximumSpindleSpeed(): number;
        setMaximumSpindleSpeed(maximumSpindleSpeed: number): void;
        getCollectChuck(): string | undefined;
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
        getModel(): string | undefined;
        setModel(model: string): void;
        getDescription(): string | undefined;
        setDescription(description: string): void;
        getVendor(): string | undefined;
        setVendor(vendor: string): void;
        getVendorUrl(): string | undefined;
        setVendorUrl(vendorUrl: string): void;
        getControl(): string | undefined;
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
	
	getName(): string | undefined;
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
	longDescription: string | undefined;//The Long Description
	vendor: string | undefined;//The vendor.
	productId: string | undefined;//The product id.
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
	crossSection: string | undefined;//The cross section type for turning tools.
	tolerance: string | undefined;//The tolerance for turning tools.
	pitch: number;//The thread pitch for turning tools.
	hand: string | undefined;//The holder hand. Left, Right, or Neutral.
	clamping: string | undefined;//Clamping for turning tools.
	jetDistance: number;//The jet distance. More...
	jetDiameter: number;//The jet diameter.
	kerfWidth: number;//The kerf width.
	machineQualityControl: string | undefined;//The machine quality control.
	cutHeight: number;//The cut height.
	pierceHeight: number;//The pierce height.
	pressure: number;//The pressure.
	pierceTime: number;//The pierce time.
	abrasiveFlowRate: number;//The abrasive flow rate.
	piercePower: number;//The pierce power.
	cutPower: number;//The cut power.
	assistGas: string | undefined;//The assist gas.
	
	getToolId(): string | undefined;
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
	getDescription(): string | undefined;
	getComment(): string | undefined;
	getVendor(): string | undefined;
	getProductId(): string | undefined;
	getHolderDescription(): string | undefined;
	getHolderComment(): string | undefined;
	getHolderVendor(): string | undefined;
	getHolderProductId(): string | undefined;
	getAggregateId(): string | undefined;
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
	getMachineQualityControl(): string | undefined;
	getCutHeight(): number;
	getPierceHeight(): number;
	getPressure(): number;
	getPierceTime(): number;
	getAbrasiveFlowRate(): number;
	getPiercePower(): number;
	getCutPower(): number;
	getAssistGas(): string | undefined;
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
	getCutterProfileAsSVGPath(): string | undefined;
	getHolderProfileAsSVGPath(): string | undefined;
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
declare function getProduct(): string | undefined;
declare function getProductUri(): string | undefined;
declare function getProductUrl(): string | undefined;
declare function getVendor(): string | undefined;
declare function getVendorUrl(): string | undefined;
declare function getVersion(): string | undefined;
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
declare function getCurrentNCLocation(): string | undefined;
declare function getSystemUnit(): number;
declare function getPlatform(): string | undefined;
declare function hasSymbol(symbol: number): boolean;
declare function isTextSupported(text: string): boolean;
declare function getCodePage(): number;
declare function setCodePage(name: string): void;
declare function write(message: string): void;
declare function writeln(message: string): void;
declare function getWordSeparator(): string | undefined;
declare function setWordSeparator(message: string): void;
declare function writeWords(strings: (string | undefined)[]): void;
declare function writeWords2(message: string,strings: (string | undefined)[]): void;
declare function formatWords(strings: string[]): string | undefined;
declare function subst(...strings: string[]): string | undefined;
declare function getLangId(): string | undefined;
declare function isSupportedText(message: string): boolean;
declare function localize(message: string): string;
declare function localize2(section: string,message: string): string;
declare function loadLocale(langId: string): boolean;
declare function include(path: string): void;
declare function findFile(path: string): string | undefined;
declare function getHeader(): string | undefined;
declare function getHeaderVersion(): string | undefined;
declare function getHeaderCommit(): string | undefined;
declare function getHeaderDate(): string | undefined;
declare function getHeaderDate2(): Date;
declare function getHeaderSnippet(keyword: string): string | undefined;
declare function getIntermediatePath(): string | undefined;
declare function getOutputPath(): string | undefined;
declare function getSimulationStreamPath(): string | undefined;
declare function getConfigurationFolder(): string | undefined;
declare function getConfigurationPath(): string | undefined;
declare function getPostProcessorFolder(): string | undefined;
declare function getPostProcessorPath(): string | undefined;
declare function getCascadingPath(): string | undefined;
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
declare function getRedirectionBuffer(): string | undefined;
declare function getRedirectionBuffer2(clear: boolean): string | undefined;
declare function registerPostProcessing(path: string): void;
declare function getWorkpiece(): BoundingBox;
declare function getFixture(): BoundingBox;
declare function getMachineConfigurations(): string | undefined;
declare function getMachineConfigurationByName(name: string): MachineConfiguration;
declare function loadMachineConfiguration(path: string): MachineConfiguration;
declare function isInteractionAllowed(): boolean;
declare function alert(title: string,description: string): void;
declare function promptKey(title: string,description: string): string | undefined;
declare function promptKey2(title: string,description: string,accept: string): string | undefined;
declare function promptKey3(title: string,description: string,accept: string,keys: string): string | undefined;
declare function promptText(title: string,description: string): string | undefined;
declare function getAsInt(text: string): number;
declare function getAsFloat(text: string): number;
declare function isSafeText(text: string,permitted: string): boolean;
declare function filterText(text: string,keep: string): string | undefined;
declare function translateText(text: string,src: string,dest: string): string | undefined;
declare function loadText(url: string,encoding: string): string | undefined;
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
declare function isProbeOperation(section?: Section): boolean;
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
declare function getProgramNameAsstring(charLimit: number): string | undefined;
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
declare function conditional(condition: boolean,value: string | undefined): string | undefined;
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
declare function getMachineConfigurationAsText(machine: MachineConfiguration): string | undefined;
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
declare function getCommandStringId(command: number): string | undefined;
declare function canIgnoreCommand(command: number): boolean;
declare function onUnsupportedCommand(command: number): void;
declare function expandManualNC(command: number,value: Value): void;
declare function onUnsupportedCoolant(coolant: number): void;
declare function getCoolantName(coolant: number): string | undefined;
declare function getMaterialName(material: number): string | undefined;
declare function getToolTypeName(tool: Tool): string | undefined;

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
declare var description: string | undefined; 
declare var vendor: string | undefined; 
declare var vendorUrl: string | undefined; 
declare var legal: string | undefined; 
declare var unit: number; 
declare var programName: string | undefined;
declare var programNameIsInteger: boolean;
declare var programComment: string | undefined;
declare var debugMode: boolean; 
declare var preventPost: boolean; 
declare var filename: string | undefined; 
declare var extension: string | undefined; 
declare var version: string | undefined; 
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
declare var NUL: string | undefined;//NUL ASCII control code.
declare var SOH: string | undefined;//SOH ASCII control code.
declare var STX: string | undefined;//STX ASCII control code.
declare var ETX: string | undefined;//ETX ASCII control code.
declare var EOT: string | undefined;//EOT ASCII control code.
declare var ENQ: string | undefined;//ENQ ASCII control code.
declare var ACK: string | undefined;//ACK ASCII control code.
declare var BEL: string | undefined;//BEL ASCII control code.
declare var BS: string | undefined;//BS ASCII control code.
declare var TAB: string | undefined;//TAB ASCII control code.
declare var LF: string | undefined;//LF ASCII control code.
declare var VT: string | undefined;//VT ASCII control code.
declare var FF: string | undefined;//FF ASCII control code.
declare var CR: string | undefined;//CR ASCII control code.
declare var SO: string | undefined;//SO ASCII control code.
declare var SI: string | undefined;//SI ASCII control code.
declare var DLE: string | undefined;//DLE ASCII control code.
declare var DC1: string | undefined;//DC1 ASCII control code.
declare var DC2: string | undefined;//DC2 ASCII control code.
declare var DC3: string | undefined;//DC3 ASCII control code.
declare var DC4: string | undefined;//DC4 ASCII control code.
declare var NAK: string | undefined;//NAK ASCII control code.
declare var SYN: string | undefined;//SYN ASCII control code.
declare var ETB: string | undefined;//ETB ASCII control code.
declare var CAN: string | undefined;//CAN ASCII control code.
declare var EM: string | undefined;//EM ASCII control code.
declare var SUB: string | undefined;//SUB ASCII control code.
declare var ESC: string | undefined;//ESC ASCII control code.
declare var FS: string | undefined;//FS ASCII control code.
declare var GS: string | undefined;//GS ASCII control code.
declare var RS: string | undefined;//RS ASCII control code.
declare var US: string | undefined;//US ASCII control code.
declare var EOL: string | undefined;//The default end-of-line marker.
declare var SP: string | undefined;//Space string.
declare var PAH_SEPARATOR: string | undefined;//File path separator.
declare var tool: Tool; 
declare var spindleAxis: number; 
declare var feedrate: number; 
declare var spindleSpeed: number; 
declare var machineConfiguration: MachineConfiguration; 
declare var cycleType: string | undefined; 
declare var cycle: {
	clearance: number;//The clearance plane (absolute coordinate).
	retract: number;//The retract plane (absolute coordinate). Rapid motion is allowed from the clearance plane and down to the retract plane). The retract plane defaults to the clearance plane. The retract plane can be ignored if not supported by the control.
	stock: number;//The stock plane (absolute coordinate).
	depth: number;//The depth below the stock plane. The depth is positive for points below the stock plane.
	bottom: number;//The bottom plane (stock - depth).
	pitch: number;//The helical pitch (incremental depth per turn).
	feedrate: number;//The primary feedrate. Usually specifies the plunging feedrate.
	retractFeedrate: number;//The retraction feedrate. Defaults to the primary feedrate if not specified.
	plungeFeedrate: number;//The plunge feedrate. Defaults to the primary feedrate if not specified. Note that the primary feedrate (feedrate) is the plunge feedrate for drilling cycles.
	stopSpindle: boolean;//Stop spindle during positioning/retracting.
	positioningFeedrate: number;//The positioning feedrate.
	positioningSpindleSpeed: number;//The positioning spindle speed.
	dwellDepth: number;//The dwelling depth.
	dwell: number;//The dwelling time in seconds.
	incrementalDepth: number;//The incremental/pecking depth.
	incrementalDepthReduction: number;//The incremental/pecking depth reduction per plunge. Defaults to 0.
	minimumIncrementalDepth: number;//The minimum incremental/pecking depth per plunge. Defaults to incrementalDepth.
	accumulatedDepth: number;//Specifies the total plunging depth before forcing full retract to the retract plane.
	plungesPerRetract: number;//Specifies the number of plunges per retract (derived from accumulatedDepth and incrementalDepth).
	chipBreakDistance: number | undefined;//Specifies the distance to retract to break the chip. Undefined by default.
	shift: number;//Specifies the shifting distance away from the boring wall.
	shiftOrientation: number;//Specifies the orientation of the cutter in radians when shifting. Defaults to machineParameters.spindleOrientation.
	compensatedShiftOrientation: number;//Specifies the orientation of the spindle in radians when shifting (shiftOrientation - tool.boringBarOrientation).
	shiftDirection: number;//Specifies the shift direction in radians when shifting (pi + shiftOrientation).
	backBoreDistance: number;//Specifies the back boring distance.
	diameter: number;//Specifies the diameter of the hole.
	stepover: number;//The maximum stepover between passes.
	numberOfSteps: number;//Specifies the number of passes/steps.
	threading: number;//Specifies left/right handed thread.
	direction: number;//Specifies climb/conventional milling.
	repeatPass: boolean;//Specifies that the final pass should be repeated.
	compensation: "computer" | "control" | "wear" | "inverseWear";//Specifies that the compensation type. That valid types are computer, control, wear, and inverseWear.
	incrementalX: number;//Specifies the incremental distance along X.
	incrementalZ: number;//Specifies the incremental distance along Z.
	//PROBING
	angleAskewAction: undefined | "stopmessage";//This parameter will only be defined with an angular probing cycle when the Askew box is checked. The only valid setting when it is defined is the string stop-message.
	approach1: string;//The direction the probe moves at it approaches the part. It is a string variable and can be either positive or negative.
	approach2: string;//The direction the probe moves as it approaches the part for the second face of a multi-face operation. It is a string variable and can be either positive or negative.
	hasPositionalTolerance: number;//Set to 1 if a positional tolerance is specified. The positional tolerance is stored in the tolerancePosition parameter.
	hasSizeTolerance: number;//Set to 1 if a size tolerance is specified. The size tolerance is stored in the toleranceSize parameter.
	incrementComponent: number;//Set to 1 if the Increment Component box is checked under Print Results.
	outOfPositionAction: undefined | "stopmessage";//This parameter will only be defined when the Out of Position box is checked. The only valid setting when it is defined is the string stopmessage.
	printResults: number;//Set to 1 when the Print Results box is checked in the probing operation.
	probeClearance: number;//The approach distance in the direction of the probing operation. The probe will be positioned at this clearance distance prior to approaching the part.
	probeOvertravel: number;//The maximum distance the probe can move beyond the expected contact point and still record a measurement.
	probeSpacing: number;//The probe spacing between points on the selected face for Angle style probing.
	toleranceAngle: number;//The acceptable angular deviation of the geometric feature.
	tolerancePosition: number;//The acceptable positional deviation of the geometric feature.
	toleranceSize: number;//The acceptable size deviation of the geometric feature.
	width1: number;//The width of the boss or hole being probed. 
	width2: number;//The width of the secondary walls (Y-axis) of a rectangular boss or hole being probed.
	wrongSizeAction: undefined | "stopmessage";//This parameter will only be defined when probing a feature that defines a fixed size and the Wrong Size box is checked. The only valid setting when it is defined is the string stop-message.
}; 
declare var cycleExpanded: boolean

declare const DEG: number;