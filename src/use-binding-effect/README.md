## 🪝 useBindingEffect

```ts
function useBindingEffect<T>(binding: T | Roact.Binding<T>, effect: (value: T) => void): void;
```

Subscribes the given effect to binding updates. The effect will be called with the current value of the binding when the component is mounted, and then again whenever the binding updates.

If not passed a valid binding, the effect will be called with the value passed to the hook. In other words, it acts as a `useEffect` hook if passed a non-binding value.

The `effect` parameter is safe to not memoize, and will only be called when the binding updates.

### 📕 Parameters

-   `binding` - The binding to subscribe to.
-   `effect` - The effect to call when the binding updates.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
interface Props {
	transparency: number | Roact.Binding<number>;
}

function Example({ transparency }: Props) {
	useBindingEffect(transparency, (value) => {
		print("Binding updated to", value);
	});

	return <textbutton BackgroundTransparency={transparency} />;
}
```
