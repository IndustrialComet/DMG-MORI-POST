export declare interface Format {
	constructor(specifiers: Map)
	format(value: number): String;
	getResultingValue(value: number): number;
	getError(value: number): number;
	isSignificant(value: number): boolean;
	areDifferent(a: number,b: number): boolean;
	getMinimumValue(): number;
}