export function isBetween(n: number, a: number, b: number) {
	if (n > a && n < b) return true;
	return false;
}

export function difference<T>(setA: Set<T>, setB: Set<T>) {
	const _difference = new Set(setA);
	for (const elem of setB) {
		_difference.delete(elem);
	}
	return _difference;
}

export function setsAreEqual<T>(a: Set<T>, b: Set<T>) {
	if (a.size !== b.size) {
		return false;
	}

	return Array.from(a).every((element) => {
		return b.has(element);
	});
}
