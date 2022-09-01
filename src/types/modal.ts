type Value = boolean | number | string;

export declare interface Modal {
	constructor(specifiers: Specifiers,format: Format);
	format(value: Value): string;
	getPrefix(): Value;
	setPrefix(prefix: Value): void;
	getSuffix(): Value;
	setSuffix(suffix: Value): void;
	reset(): void;
	getCurrent(): Value;
}
 
