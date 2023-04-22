import { useCallback, useMutable } from "@rbxts/roact-hooked";

export function useMemoizedCallback<T extends Callback>(callback: T): T;
export function useMemoizedCallback(callback: Callback): Callback {
	const callbackRef = useMutable(callback);
	callbackRef.current = callback;

	return useCallback((...args) => {
		return callbackRef.current(...args);
	}, []);
}
