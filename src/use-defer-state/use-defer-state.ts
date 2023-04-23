import { Dispatch, SetStateAction, useMutable, useState } from "@rbxts/roact-hooked";
import { setTimeout } from "@rbxts/set-timeout";
import { useLatest } from "../use-latest";
import { useUnmountEffect } from "../use-unmount-effect";

const resolve = <T>(value: T | ((state: T) => T), state: T): T => {
	return typeIs(value, "function") ? value(state) : value;
};

/**
 * Like `useState`, but `setState` will defer the update until the next frame.
 * Only the latest update in a frame will run.
 *
 * This is useful for improving performance when updating state in response to
 * events that fire rapidly in succession.
 *
 * @param initialState Optional initial state
 * @returns A tuple containing the state and a function to update it
 */
export function useDeferState<T>(
	initialState: T | (() => T),
): LuaTuple<[state: T, setState: Dispatch<SetStateAction<T>>]>;

export function useDeferState<T = undefined>(
	initialState?: void,
): LuaTuple<[state: T | undefined, setState: Dispatch<SetStateAction<T | undefined>>]>;

export function useDeferState<T>(
	initialState: T | (() => T),
): LuaTuple<[state: T, setState: Dispatch<SetStateAction<T>>]> {
	const [state, setState] = useState<T>(initialState);

	const stateRef = useLatest(state);
	const cancelRef = useMutable<() => void>();

	const deferState = (newState: T | ((state: T) => T)) => {
		// Allow multiple state updates to change the state before the next frame
		stateRef.current = resolve(newState, stateRef.current);

		cancelRef.current?.();
		cancelRef.current = setTimeout(() => {
			cancelRef.current = undefined;
			setState(stateRef.current);
		}, 0);
	};

	useUnmountEffect(() => {
		cancelRef.current?.();
	});

	return $tuple(state, deferState);
}
