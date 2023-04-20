import { useMutable } from "@rbxts/roact-hooked";

export type ShouldUpdate<T> = (a: T | undefined, b: T) => boolean;

const defaultShouldUpdate = <T>(a: T | undefined, b: T) => a !== b;

/**
 * Returns the value from the previous render, which is undefined during the
 * first render. Takes an optional function that determines whether the value
 * should be updated.
 * @param value The value to track.
 * @param shouldUpdate A function that determines whether the value should be updated.
 * @returns The value from the previous render.
 */
export function usePrevious<T>(value: T, shouldUpdate: ShouldUpdate<T> = defaultShouldUpdate): T | undefined {
	const current = useMutable<T>();
	const previous = useMutable<T>();

	if (shouldUpdate(current.current, value)) {
		previous.current = current.current;
		current.current = value;
	}

	return previous.current;
}
