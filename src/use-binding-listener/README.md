## 🪝 `useBindingListener`

```ts
function useBindingListener<T>(binding: T | Roact.Binding<T>, listener: (value: T) => void): void;
```

Subscribes the given listener to binding updates. The listener will be called with the current value of the binding when the component is mounted, and then again whenever the binding updates.

If not passed a valid binding, the listener will be called with the value passed to the hook.

The `listener` parameter is memoized for you, and will only be called when the binding updates.

### 📕 Parameters

-   `binding` - The binding to subscribe to.
-   `listener` - The listener to call when the binding updates.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
interface Props {
	transparency: number | Roact.Binding<number>;
}

export default function Component({ transparency }: Props) {
	useBindingListener(transparency, (value) => {
		print("Binding updated to", value);
	});

	return <textbutton BackgroundTransparency={transparency} />;
}
```
