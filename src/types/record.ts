export declare interface Record {
	isValid(): boolean;
	getId(): Integer;
	getType(): Integer;
	getCategories(): Integer;
	isMotion(): boolean;
	isCycle(): boolean;
	getCycleType(): String;
	isParameter(): boolean;
	getParameterName(): String;
	getParameterValue(): Value;
}

// const get_string = (content: HTMLElement,split: HTMLElement): string => {
// 	let text = "declare class CLASS {\n";
// 	for(var index = 0;index < content.children.length;index++) {
// 		let child = content.children[index];
// 		if(child.className === "memtitle" && child.tagName === "div") {
// 			let name = child.children[0].children[0].children[0].children[0].children[0].children[0].innerHTML;
// 			text += `${}()`;
// 		}
// 	}
// 	return text;
	
// }