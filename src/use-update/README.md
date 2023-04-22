## 🪝 `useUpdate`

```ts
function useUpdate(): () => void;
```

Returns a function that can be called to force an update of the component.

The function returned by `useUpdate` is recreated when it causes an update, making it useful to track re-renders caused by this hook.

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

	useEffect(() => {
		print("Rendered because of useUpdate");
	}, [update]);

	print("Rendered");

	return <frame />;
}
```
