export declare interface Vector {
	x: number;//The X coordinate.
	y: number;//The Y coordinate.
	z: number;//The Z coordinate.
	length: number;//The length of the vector.
	length2: number;//The square of the length of the vector.
	negated: Vector;//The negated vector.
	abs: Vector;//The vector with the absolute coordinates.
	normalized: Vector;//The vector normalized to length 1.
	getX(): number;
	setX(x: number): void;
	getY(): number;
	setY(y: number): void;
	getZ(): number;
	setZ(z: number): void;
	getCoordinate(coordinate: Integer): number;
	setCoordinate(coordinate: Integer,value: number): void;
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
	toString(): String;
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