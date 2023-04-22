import { useMutable } from "@rbxts/roact-hooked";

/**
 * Returns a mutable ref that always points to the latest value of the input.
 * @param value The value to track.
 * @returns A mutable reference to the value.
 */
export function useLatest<T>(value: T) {
	const ref = useMutable(value);
	ref.current = value;
	return ref;
}
