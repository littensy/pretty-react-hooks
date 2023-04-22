## 🪝 `useUnmountEffect`

```ts
function useUnmountEffect(callback: () => void): void;
```

Calls the callback when the component unmounts. This is useful for cleaning up side effects.

### 📕 Parameters

-   `callback` - The callback to call when the component unmounts.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
export default function Component() {
	useUnmountEffect(() => {
		print("Unmounting...");
	});

	return <frame />;
}
```
