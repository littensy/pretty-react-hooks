import { Binding } from "@rbxts/roact";

interface BindingApi<T> {
	subscribe: (callback: (newValue: T) => void) => () => void;
	update: (newValue: T) => void;
}

/**
 * Gets the internal API of a binding. This is a hacky way to get access to the
 * `BindingInternalApi` object of a binding, which is not exposed by Roact.
 * @param binding The binding to get the internal API of.
 * @returns The binding's API.
 */
export function getBindingApi<T>(binding: Binding<T>) {
	for (const [k, v] of pairs(binding)) {
		if (tostring(k) === "Symbol(BindingImpl)") {
			return v as unknown as BindingApi<T>;
		}
	}
}
