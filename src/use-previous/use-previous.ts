import { useMemo, useMutable } from "@rbxts/roact-hooked";

export type Predicate<T> = (a: T | undefined, b: T) => boolean;

const isStrictEqual = (a: unknown, b: unknown) => a === b;

/**
 * Returns the most recent value from the previous render. Returns `undefined`
 * on the first render.
 *
 * Takes an optional `predicate` function as the second argument that receives
 * the previous and current value. If the predicate returns `true`, the newest
 * value will be returned on the next render.
 *
 * @param value The value to return on the next render if it changes.
 * @param predicate Optional function to determine whether the value changed.
 * Defaults to a strict equality check (`===`).
 * @returns The previous value.
 */
export function usePrevious<T>(value: T, predicate: Predicate<T> = isStrictEqual): T | undefined {
	const previousRef = useMutable<T>();
	const currentRef = useMutable<T>();

	useMemo(() => {
		if (!predicate(currentRef.current, value)) {
			previousRef.current = currentRef.current;
			currentRef.current = value;
		}
	}, [value]);

	return previousRef.current;
}
