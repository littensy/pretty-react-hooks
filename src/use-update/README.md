## 🪝 `useUpdate`

```ts
function useUpdate(): () => void;
```

Returns a function that can be called to force an update of the component.

### 📕 Parameters

### 📗 Returns

-   A function that can be called to force an update of the component.

### 📘 Example

```tsx
export default function Component() {
	const update = useUpdate();

	useEffect(() => {
		return setInterval(() => {
			update();
		}, 1);
	}, []);

	print("Rendered");

	return <frame />;
}
```
