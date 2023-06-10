## 🪝 `usePropertyBinding`

```ts
function usePropertyBinding<T extends JsxInstancePropertyName[]>(
	...propertyNames: T
): [...JsxInstancePropertyBindings<T>, JsxInstanceChangeEvents<T>];
```

Tracks the state of one or more properties for a given instance class. Returns a binding containing an array of the properties in order, and an event container.

The last return value should be passed or spread into the `Change` prop of an element.

### 📕 Parameters

-   `...propertyNames` - The names of the properties to track.

### 📗 Returns

-   An array of bindings for each property. Binding values will initialize as `undefined`.
-   An event container, which should be passed to the `Change` prop of an element.

### 📘 Example

```tsx
function FrameFollower() {
	const [size, position, change] = useProperty("AbsoluteSize", "AbsolutePosition");

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
				Size={size.map((value = Vector2.one) => UDim2.fromOffset(value.X, value.Y))}
				Position={position.map((value = Vector2.one) => UDim2.fromOffset(value.X, value.Y))}
			/>
		</>
	);
}
```
