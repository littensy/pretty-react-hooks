import { useCallback, useMemo, useState } from "@rbxts/roact-hooked";

/**
 * Maps JSX intrinsic element names to their corresponding Instance types.
 */
export type JsxInstances = {
	[K in keyof JSX.IntrinsicElements]: JSX.IntrinsicElements[K] extends JSX.IntrinsicElement<infer T extends Instance>
		? T
		: never;
};

export type Properties<T extends keyof JsxInstances, U extends InstancePropertyNames<JsxInstances[T]>[]> = {
	[K in keyof U]?: JsxInstances[T][U[K]];
};

export type ChangeEvents<T extends keyof JsxInstances, U extends InstancePropertyNames<JsxInstances[T]>[]> = {
	[K in U[number]]: ChangeEvent<JsxInstances[T]>;
};

export type ChangeEvent<T extends Instance> = (rbx: T) => void;

/**
 * Tracks the state of multiple properties on an Instance. Returns the values and
 * a Change object that can be spread into the `Change` property of an element.
 * @param className The name of the class to track the property on.
 * @param propertyNames The names of the properties to track.
 * @returns A tuple containing the values of the properties and a ref callback.
 */
export function useProperty<T extends keyof JsxInstances, U extends InstancePropertyNames<JsxInstances[T]>[]>(
	className: T,
	...propertyNames: U
): [...Properties<T, U>, ChangeEvents<T, U>] {
	type Rbx = JsxInstances[T];
	type PropertyName = U[number];
	type PropertyValues = Properties<T, U>;

	const [values, setValues] = useState([] as PropertyValues);

	const setValue = useCallback((rbx: Rbx, property: U[number], index: number) => {
		setValues((values) => {
			const newValues = table.clone<PropertyValues>(values);
			newValues[index] = rbx[property];
			return newValues;
		});
	}, []);

	const events = useMemo(() => {
		const events = {} as ChangeEvents<T, U>;

		propertyNames.forEach((name, index) => {
			events[name] = (rbx: Rbx) => setValue(rbx, name, index);
		});

		return events;
	}, []);

	return useMemo(() => {
		const valueCount = propertyNames.size();
		const results = [] as PropertyValues | Record<PropertyName, ChangeEvent<Rbx>>[];

		propertyNames.forEach((name, index) => {
			results[index] = values[index];
		});

		results[valueCount] = events;

		return results as [...PropertyValues, Record<PropertyName, ChangeEvent<Rbx>>];
	}, [values, events]);
}
