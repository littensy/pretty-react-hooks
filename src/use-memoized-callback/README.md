## 🪝 `useMemoizedCallback`

```ts
function useMemoizedCallback<T extends Callback>(callback: T): T;
```

Returns a memoized callback. When passed a new callback, the memoized callback will not change, but calling it will invoke the new callback.

### 📕 Parameters

-   `callback` - The callback to memoize.

### 📗 Returns

-   The memoized callback.

### 📘 Example

```tsx
interface Props {
	onStep: () => void;
}

export default function Component({ onStep }: Props) {
	const onStepCallback = useMomoizedCallback(onStep);

	useEffect(() => {
		const connection = RunService.Heartbeat.Connect(onStepCallback);

		return () => {
			connection.Disconnect();
		};
	}, [onStepCallback]);

	return <frame />;
}
```
