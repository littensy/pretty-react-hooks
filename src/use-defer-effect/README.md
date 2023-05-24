## 🪝 `useDeferEffect`

```ts
function useDeferEffect(callback: () => void, deps?: unknown[]): void;
```

Like `useEffect`, but the callback will defer the update until the next Heartbeat frame. If multiple updates are scheduled, only the most recent will be applied.

### 📕 Parameters

-   `callback` - A function to run after the component renders.
-   `deps` - An array of values that the effect depends on. If any of the values change, the effect will run again.

### 📘 Example

```tsx
function Counter() {
	const [count, setCount] = useState(0);

	useDeferEffect(() => {
		print(count);
	}, [count]);

	return (
		<textbutton
			Text={`Count: ${count}`}
			Event={{
				Activated: () => setCount((count) => count + 1),
			}}
		/>
	);
}
```
