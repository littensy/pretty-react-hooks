/**
 * Compares two objects to see if they are shallowly equal.
 * @param objectA The first object to compare.
 * @param objectB The second object to compare.
 * @returns Whether or not the two objects are shallowly equal.
 */
export function shallowEqual(objectA?: object, objectB?: object): boolean {
	if (objectA === objectB) {
		return true;
	}

	if (objectA === undefined || objectB === undefined) {
		return false;
	}

	for (const [key, value] of pairs(objectA)) {
		if (objectB[key as never] !== value) {
			return false;
		}
	}

	for (const [key, value] of pairs(objectB)) {
		if (objectA[key as never] !== value) {
			return false;
		}
	}

	return true;
}
