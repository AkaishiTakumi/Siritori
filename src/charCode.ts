export function StringToCharCode(string: string): number[] {
	const charCodes: number[] = [];
	for (let i = 0; i < string.length; i++) {
		const char = string[i];
		const charCode = char.charCodeAt(0);

		charCodes.push(charCode);
	}
	return charCodes;
}

function CharCodeToString(charCodes: number[]): string {
	let string: string = "";
	for (const charCode of charCodes) {
		string += String.fromCharCode(charCode);
	}
	return string;
}

function CompareString(a: string, b: string): number {
	const aCodes = StringToCharCode(a);
	const bCodes = StringToCharCode(b);

	const len = Math.min(aCodes.length, bCodes.length);

	for (let i = 0; i < len; i++) {
		if (aCodes[i] < bCodes[i]) return -1; // a < b
		if (aCodes[i] > bCodes[i]) return 1; // a > b
	}
	if (aCodes.length < bCodes.length) return -1;
	if (aCodes.length > bCodes.length) return 1;
	return 0; // 完全一致
}

export function CompareCharCode(a: number[], b: number[]): number {
	const len = Math.min(a.length, b.length);

	for (let i = 0; i < len; i++) {
		if (a[i] < b[i]) return -1; // a < b
		if (a[i] > b[i]) return 1; // a > b
	}
	if (a.length < b.length) return -1;
	if (a.length > b.length) return 1;
	return 0; // 完全一致
}
