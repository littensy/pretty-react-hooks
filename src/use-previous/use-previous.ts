import { useEffect, useMutable } from "@rbxts/roact-hooked";

export type ShouldUpdate<T> = (a: T | undefined, b: T) => boolean;

const defaultShouldUpdate = <T>(a: T | undefined, b: T) => a !== b;

/**
 * Returns the value from the previous render. Returns `undefined` on the first
 * render. Takes an optional function that determines whether the value should
 * be updated.
 * @param value The value to track.
 * @param shouldUpdate A function that determines whether the value should be updated.
 * @returns The value from the previous render.
 */
export function usePrevious<T>(value: T, shouldUpdate: ShouldUpdate<T> = defaultShouldUpdate): T | undefined {
	const prev = useMutable<T>();

	useEffect(() => {
		if (shouldUpdate(prev.current, value)) {
			prev.current = value;
		}
	});

	return prev.current;
}
