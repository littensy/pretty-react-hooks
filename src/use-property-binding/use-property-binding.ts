import Roact from "@rbxts/roact";
import { useBinding, useCallback, useMemo } from "@rbxts/roact-hooked";
import { ChangeEvents, JsxInstances, Properties } from "../use-property";

/**
 * Tracks the state of multiple properties on an Instance. Returns the values and
 * a Change object that can be spread into the `Change` property of an element.
 * @param className The name of the class to track the property on.
 * @param propertyNames The names of the properties to track.
 * @returns A tuple containing the values of the properties and a ref callback.
 */
export function usePropertyBinding<T extends keyof JsxInstances, U extends InstancePropertyNames<JsxInstances[T]>[]>(
	className: T,
	...propertyNames: U
): LuaTuple<[Roact.Binding<Properties<T, U>>, ChangeEvents<T, U>]> {
	type Rbx = JsxInstances[T];
	type PropertyValues = Properties<T, U>;

	const [values, setValues] = useBinding([] as PropertyValues);

	const setValue = useCallback((rbx: Rbx, property: U[number], index: number) => {
		const newValues = table.clone<PropertyValues>(values.getValue());
		newValues[index] = rbx[property];
		setValues(newValues);
	}, []);

	const events = useMemo(() => {
		const events = {} as ChangeEvents<T, U>;

		propertyNames.forEach((name, index) => {
			events[name] = (rbx: Rbx) => setValue(rbx, name, index);
		});

		return events;
	}, []);

	return $tuple(values, events);
}
