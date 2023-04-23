/**
 * Linearly interpolates between two numbers.
 * @param a The first number.
 * @param b The second number.
 * @param alpha The alpha value to use.
 * @returns The interpolated number.
 */
export function lerp(a: number, b: number, alpha: number) {
	return a + (b - a) * alpha;
}

/**
 * Maps a value from one range to another.
 * @param value The value to map.
 * @param fromMin The minimum of the input range.
 * @param fromMax The maximum of the input range.
 * @param toMin The minimum of the output range.
 * @param toMax The maximum of the output range.
 * @returns The mapped value.
 */
export function map(value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) {
	return ((value - fromMin) * (toMax - toMin)) / (fromMax - fromMin) + toMin;
}

/**
 * Multiplies transparency values together. Normally, multiplying transparency
 * values requires inverting them (to get opacity), multiplying them, and then
 * inverting them again. This function does that for you.
 * @param transparencies The transparencies to multiply.
 * @returns The multiplied transparency.
 */
export function blend(...transparencies: number[]) {
	let result = 1;

	for (const transparency of transparencies) {
		result *= 1 - transparency;
	}

	return 1 - result;
}
