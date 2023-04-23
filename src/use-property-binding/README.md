## 🪝 `usePropertyBinding`

```ts
function usePropertyBinding<T extends keyof JsxInstances, U extends string[]>(
	className: T,
	...propertyNames: U
): [Roact.Binding<Properties<T, U>>, ChangeEvents<T, U>];
```

Tracks the state of one or more properties for a given instance class. Returns a binding containing an array of the properties in order, and an event container.

The last return value should be passed or spread into the `Change` prop of a component.

### 📕 Parameters

-   `className` - The name of the class to track properties for.
-   `...propertyNames` - The names of the properties to track.

### 📗 Returns

-   A binding containing the properties in order. Contains empty array on the first render.
-   An event container, which should be passed to the `Change` prop of a component.

### 📘 Example

```tsx
export default function Component() {
	const [binding, change] = useProperty("frame", "AbsoluteSize", "AbsolutePosition");

	return (
		<>
			<frame
				Change={change}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={UDim2.fromScale(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
			/>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				Size={binding.map(([size]) => UDim2.fromOffset(size.X, size.Y))}
				Position={binding.map(([, position]) => UDim2.fromOffset(position.X, position.Y))}
			/>
		</>
	);
}
```
