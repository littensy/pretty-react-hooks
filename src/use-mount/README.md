## 🪝 `useMount`

```ts
function useMount(callback: () => void): void;
```

Runs a callback when the component mounts.

### 📕 Parameters

-   `callback` - The callback to run on mount.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
export default function Component() {
	useMount(() => {
		print("Mounted");
	});

	return <frame />;
}
```
