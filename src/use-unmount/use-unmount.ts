import { useEffect } from "@rbxts/roact-hooked";
import { useLatest } from "../use-latest";

/**
 * Calls the callback when the component unmounts.
 * @param callback The callback to call.
 */
export function useUnmount(callback: () => void) {
	const callbackRef = useLatest(callback);

	useEffect(() => {
		return () => {
			callbackRef.current();
		};
	}, []);
}
