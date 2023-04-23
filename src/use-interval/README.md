## 🪝 `useInterval`

```ts
function useInterval(callback: () => void, delay?: number, options: UseIntervalOptions): () => void;
```

Sets an interval that runs a callback function every `delay` seconds. Returns a function that clears the interval.

If `delay` is `undefined`, the interval is cleared. If the delay updates, the interval is reset.

The callback is memoized for you and will not reset the interval if it changes.

### 📕 Parameters

-   `callback` - The function to run every `delay` seconds.
-   `delay` - The number of seconds to wait between each call to `callback`. If `undefined`, the interval is cleared.
-   `options` - Options for the interval.
    -   `immediate` - If `true`, the callback is called immediately when the interval is set. Defaults to `false`.

### 📗 Returns

-   A function that clears the interval.

### 📘 Example

```tsx
function Interval() {
	const [count, setCount] = useState(0);

	useInterval(() => {
		setCount(count + 1);
	}, 1);

	return <textlabel Text={`Count: ${count}`} />;
}
```
