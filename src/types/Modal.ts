type Value = boolean | number | string;

declare class Modal {
	constructor(specifiers: Specifiers,format: Format);
	format(value: Value): String;
	getPrefix(): Value;
	setPrefix(prefix: Value): void;
	getSuffix(): Value;
	setSuffix(suffix: Value): void;
	reset(): void;
	getCurrent(): Value;
}
 
