## 🪝 `useMemoizedCallback`

```ts
function useMemoizedCallback<T extends Callback>(callback: T): T;
```

Returns a memoized callback that always points to the latest version of the callback.

When passed a new callback, the return value will not change, but calling it will invoke the new callback.

### 📕 Parameters

-   `callback` - The callback to memoize.

### 📗 Returns

-   The memoized callback.

### 📘 Example

```tsx
interface Props {
	onStep: () => void;
}

function Stepper({ onStep }: Props) {
	const onStepCallback = useMomoizedCallback(onStep);

	useEffect(() => {
		// Will always call the latest version of `onStep`
		const connection = RunService.Heartbeat.Connect(onStepCallback);

		return () => {
			connection.Disconnect();
		};
	}, []);

	return undefined!;
}
```
