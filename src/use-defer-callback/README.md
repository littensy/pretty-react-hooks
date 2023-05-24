## 🪝 `useDeferCallback`

```ts
function useDeferCallback<T extends unknown[]>(
	callback: (...args: T) => void,
): [execute: (...args: T) => void, cleanup: () => void];
```

Defers a callback until the next Heartbeat frame. Consecutive calls to the returned `execute` function will cancel the previous call.

### 📕 Parameters

-   `callback` - The function to defer.

### 📗 Returns

-   `execute` - The deferred function.
-   `cleanup` - A function that will cancel a scheduled update.

### 📘 Example

```tsx
function Counter() {
	const [count, setCount] = useState(0);

	const [deferredSetCount, cancel] = useDeferCallback(setCount);

	useEventListener(UserInputService.InputBegan, (input) => {
		if (input.KeyCode === Enum.KeyCode.E) {
			deferredSetCount(count + 1);
		}
	});

	useUnmountEffect(cancel);

	return <textbutton Text={`Count: ${count}`} />;
}
```
