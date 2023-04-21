import { Binding } from "@rbxts/roact";
import { useEffect, useMemo, useMutable } from "@rbxts/roact-hooked";
import { getBindingApi, isBinding } from "../utils/binding";

/**
 * Subscribes to a binding and calls the given effect when the binding updates.
 * If the given binding is not a binding, the effect will be called when the
 * value changes, and acts like `useEffect`.
 *
 * The `effect` function is safe to not be memoized, as it will only be called
 * when the binding updates.
 *
 * @param binding The binding to subscribe to.
 * @param effect The effect to call when the binding updates.
 */
export function useBindingEffect<T>(binding: T | Binding<T>, effect: (value: T) => void) {
	const api = useMemo(() => {
		return isBinding<T>(binding) ? getBindingApi(binding) : undefined;
	}, [binding]);

	const effectRef = useMutable(effect);

	useEffect(() => {
		if (api) {
			effectRef.current(api.getValue());
			return api.subscribe((value) => effectRef.current(value));
		} else {
			effectRef.current(binding as T);
		}
	}, [binding]);
}
