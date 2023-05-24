## 🪝 `useDeferState`

```ts
function useDeferState<T>(initialState: T | (() => T)): [state: T, setState: Dispatch<SetStateAction<T>>];

function useDeferState<T = undefined>(
	initialState?: void,
): [state: T | undefined, setState: Dispatch<SetStateAction<T | undefined>>];
```

Like `useState`, but the updater function will defer the update until the next Heartbeat frame. Only the result of the most recent state update will be applied.

When passing a function to `setState`, it will receive the most recent value passed to `setState`, so they can be chained.

This is useful for improving performance when updating state in response to events that fire rapidly in succession.

### 📕 Parameters

-   `initialState` - State used during the initial render.

### 📗 Returns

-   A stateful value.
-   A function which schedules a state update.

### 📘 Example

```tsx
function Counter() {
	const [keysDown, setKeysDown] = useDeferState<string[]>([]);

	useEventListener(UserInputService.InputBegan, (input) => {
		setKeysDown((keysDown) => [...keysDown, input.KeyCode.Name]);
	});

	useEventListener(UserInputService.InputEnded, (input) => {
		setKeysDown((keysDown) => keysDown.filter((key) => key !== input.KeyCode.Name));
	});

	useEffect(() => {
		print(keysDown);
	}, [keysDown]);

	return <textlabel Text={`Keys down: ${keysDown.join(", ")}`} />;
}
```
