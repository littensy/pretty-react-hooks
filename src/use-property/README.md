## 🪝 `useProperty`

```ts
function useProperty<T extends JsxInstancePropertyName[]>(
	...propertyNames: T
): [...JsxInstanceProperties<T>, JsxInstanceChangeEvents<T>];
```

Tracks the state of one or more properties for a given instance class. Returns the current values of the properties, and an event container.

The last return value should be passed or spread into the `Change` prop of an element.

### 📕 Parameters

-   `...propertyNames` - The names of the properties to track.

### 📗 Returns

-   An array of the current values of the properties. Will be `undefined` on the first render.
-   An event container, which should be passed to the `Change` prop of an element.

### 📘 Example

```tsx
function FrameWatcher() {
	const [size = Vector2.one, position = Vector2.one, change] = useProperty("AbsoluteSize", "AbsolutePosition");

	useEffect(() => {
		print(`New size: ${size}`);
		print(`New position: ${position}`);
	}, [size, position]);

	return (
		<frame
			Change={change}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={UDim2.fromScale(0.5, 0.5)}
			Position={UDim2.fromScale(0.5, 0.5)}
		/>
	);
}
```
