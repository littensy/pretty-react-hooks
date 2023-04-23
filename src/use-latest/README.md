## 🪝 `useLatest`

```ts
function useLatest<T>(value: T): { current: T };
```

Returns a ref object whose `current` property always points to the latest version of the value.

### 📕 Parameters

-   `value` - The value to wrap in a ref.

### 📗 Returns

-   A ref object.

### 📘 Example

```tsx
function Counter() {
	const [value, setValue] = useState(0);
	const latestValue = useLatest(value);

	useEffect(() => {
		const connection = RunService.Heartbeat.Connect(() => {
			print(latestValue.current);
		});

		return () => {
			connection.Disconnect();
		};
	}, []);

	return (
		<textbutton
			Text={`Count: ${value}`}
			Event={{
				Activated: () => setValue(value + 1),
			}}
		/>
	);
}
```
