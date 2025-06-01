import { useCallback, useEffect, useRef } from "@rbxts/react";
import { useLatestCallback } from "../use-latest-callback";
import { BindingOrValue, getBindingValue } from "../utils/binding";

export interface UseIntervalOptions {
	/**
	 * Whether the callback should run immediately when the interval is set.
	 * Defaults to `false`.
	 */
	immediate?: boolean;
}

/**
 * Sets an interval that runs the callback function every `delay` seconds. If
 * `delay` is `undefined`, the interval is cleared. If the delay changes, the
 * interval is reset.
 * @param callback The callback function to run.
 * @param delay The delay in seconds between each interval.
 * @param options The options for the interval.
 * @returns A function that clears the interval.
 */
export function useInterval(callback: () => void, delay?: BindingOrValue<number>, options: UseIntervalOptions = {}) {
	const { immediate = false } = options;

	const callbackMemo = useLatestCallback(callback);
	const cancel = useRef<thread>();

	const clear = useCallback(() => {
		if (!cancel.current) return;
		task.cancel(cancel.current);
	}, []);

	useEffect(() => {
		if (delay === undefined) {
			return;
		}
		if (immediate) {
			callbackMemo();
		}
		cancel.current = task.spawn(() => {
			while (true) {
				task.wait(getBindingValue(delay));
				callbackMemo();
			}
		})
		return clear;
	}, [delay]);

	return clear;
}
