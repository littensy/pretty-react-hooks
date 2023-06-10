import { Binding } from "@rbxts/roact";

type JsxInstances = {
	[K in keyof JSX.IntrinsicElements]: JSX.IntrinsicElements[K] extends JSX.IntrinsicElement<infer T extends Instance>
		? T
		: never;
};

export type JsxInstanceIntersection = {
	[K in keyof JsxInstances]: (x: JsxInstances[K]) => void;
}[keyof JsxInstances] extends (x: infer T) => void
	? T
	: never;

export type JsxInstancePropertyName = InstancePropertyNames<JsxInstanceIntersection>;

export type JsxAnyInstanceProperties<T extends InstancePropertyNames<JsxInstanceIntersection>[]> = {
	[K in keyof T]?: JsxInstanceIntersection[T[K]];
};

export type JsxAnyInstancePropertyBindings<T extends InstancePropertyNames<JsxInstanceIntersection>[]> = {
	[K in keyof T]: Binding<JsxInstanceIntersection[T[K]] | undefined>;
};

export type JsxAnyInstanceChangeEvents<T extends InstancePropertyNames<JsxInstanceIntersection>[]> =
	T extends (infer U extends string)[]
		? {
				[K in U]: (rbx: Instance) => void;
		  }
		: never;
