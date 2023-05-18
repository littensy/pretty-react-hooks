## 🪝 `useLatest`

```ts
function useLatest<T>(value: T, isEqual?: (previous?: T, current: T) => boolean): { current: T };
```

Returns a ref object whose `current` property points to the latest version of the value.

It takes an optional equality function to determine whether the values are equal. If false, the value will be updated.

### 📕 Parameters

-   `value` - The value to wrap in a ref.
-   `isEqual?` - An equality function. Defaults to a strict equality check (`===`).

### 📗 Returns

-   A ref object.

### 📘 Example

```tsx
function Counter() {
	const [value, setValue] = useState(0);
	const latestValue = useLatest(value);

	useEventListener(RunService.Heartbeat, () => {
		print(latestValue.current);
	});

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
