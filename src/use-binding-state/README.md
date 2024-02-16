## 🪝 `useBindingState`

```ts
function useBindingState<T>(binding: T | Binding<T>): T;
```

Returns the value of the given binding. When the binding updates, the component will be re-rendered with the new value.

If not passed a valid binding, the value passed to the hook will be returned.

### 📕 Parameters

-   `binding` - The binding to subscribe to.

### 📗 Returns

-   The value of the binding.

### 📘 Example

```tsx
interface Props {
	visible: boolean | Binding<boolean>;
}

function ToggleFrame({ visible }: Props) {
	const isVisible = useBindingState(visible);

	useEffect(() => {
		print("Visible changed to", isVisible);
	}, [isVisible]);

	return <frame Visible={visible} />;
}
```
