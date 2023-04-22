import { useEffect, useState } from "@rbxts/roact-hooked";
import { UseDebounceOptions, useDebounceCallback } from "../use-debounce-callback";

/**
 * Delays updating `value` until after `wait` seconds have elapsed since the
 * last time the debounced function was invoked. Set to the most recently passed
 * `value` after the delay.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @param value The value to debounce.
 * @param options The options object.
 * @returns The debounced value.
 */
export function useDebounce<T>(value: T, options?: UseDebounceOptions): T {
	const [debounced, setDebounced] = useState(value);

	const { run } = useDebounceCallback(() => {
		setDebounced(value);
	}, options);

	useEffect(() => {
		run();
	}, [value]);

	return debounced;
}
