import { useEffect, useState } from "@rbxts/roact-hooked";
import { UseThrottleOptions, useThrottleCallback } from "../use-throttle-callback";

/**
 * Creates a throttled value that only updates at most once per every `wait`
 * seconds. Set to the most recently passed `value` after each interval.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `debounce` and `throttle`.
 *
 * @param value The value to throttle.
 * @param options The options object.
 * @returns The throttled value.
 */
export function useThrottle<T>(value: T, options?: UseThrottleOptions): T {
	const [throttled, setThrottled] = useState(value);

	const { run } = useThrottleCallback(() => {
		setThrottled(value);
	}, options);

	useEffect(() => {
		run();
	}, [value]);

	return throttled;
}
