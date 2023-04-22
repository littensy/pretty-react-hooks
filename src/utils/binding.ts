import { Binding, createBinding, joinBindings } from "@rbxts/roact";

/**
 * @see https://github.com/Roblox/roact/blob/master/src/Binding.lua
 */
interface BindingApi<T> {
	subscribe: (callback: (newValue: T) => void) => () => void;
	update: (newValue: T) => void;
	getValue: () => T;
}

/**
 * Returns whether the given value is a binding.
 * @param value The value to check.
 * @returns Whether the value is a binding.
 */
export function isBinding<T>(value: T | Binding<T>): value is Binding<T>;
export function isBinding<T = unknown>(value: unknown): value is Binding<T>;
export function isBinding(value: unknown): value is Binding<unknown> {
	return typeIs(value, "table") && "getValue" in value && "map" in value;
}

/**
 * Returns the value of a binding. If the given value is not a binding, it will
 * be returned as-is.
 * @param binding The binding to get the value of.
 * @returns The value of the binding.
 */
export function getBindingValue<T>(binding: T | Binding<T>): T {
	if (isBinding(binding)) {
		return binding.getValue();
	} else {
		return binding;
	}
}

/**
 * Maps a binding to a new binding. If the given value is not a binding, it will
 * be passed to the mapper function and returned as a new binding.
 * @param binding The binding to map.
 * @param callback The mapper function.
 * @returns The mapped binding.
 */
export function mapBinding<T, U>(binding: T | Binding<T>, callback: (value: T) => U): Binding<U> {
	if (isBinding(binding)) {
		return binding.map(callback);
	} else {
		const [result] = createBinding(callback(binding as T));
		return result;
	}
}

/**
 * Joins a map of bindings into a single binding. If any of the given values
 * are not bindings, they will be wrapped in a new binding.
 * @param bindings The bindings to join.
 * @returns The joined binding.
 */
export function joinAnyBindings<T extends Readonly<Record<string, unknown>>>(
	bindings: T,
): Binding<{ [K in keyof T]: T[K] extends Binding<infer U> ? U : T[K] }>;
export function joinAnyBindings<T extends readonly unknown[]>(
	bindings: T,
): Binding<{ [K in keyof T]: T[K] extends Binding<infer U> ? U : T[K] }>;
export function joinAnyBindings(bindings: Record<string | number, unknown>): Binding<unknown> {
	const bindingsToMap = {} as Record<string | number, Binding<unknown>>;

	for (const [k, v] of pairs(bindings)) {
		if (!isBinding(v)) {
			bindingsToMap[k] = createBinding(v)[0];
		} else {
			bindingsToMap[k] = v;
		}
	}

	return joinBindings(bindingsToMap);
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
