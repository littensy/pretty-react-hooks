## 🪝 `useUpdateEffect`

```ts
function useUpdateEffect(callback: () => void | (() => void), dependencies?: DependencyList): void;
```

Runs a callback when the component updates. Does not run on mount.

### 📕 Parameters

-   `callback` - The callback to run on update. Supports returning a cleanup function.
-   `dependencies` - Optional dependencies to watch for changes.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
function RenderLogger() {
	const [state, setState] = useState(0);

	useUpdateEffect(() => {
		print("Updated");
	});

	return (
		<textbutton
			Text={`Pressed ${state} times`}
			Event={{
				Activated: () => setState(state + 1),
			}}
		/>
	);
}
```
