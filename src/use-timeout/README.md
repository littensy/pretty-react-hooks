## 🪝 `useTimeout`

```ts
function useTimeout(callback: () => void, delay?: number): () => void;
```

Sets a timeout that runs the callback after `delay` seconds. Returns a function that clears the timeout.

If `delay` is `undefined`, the timeout is cleared. If the delay updates, the timeout is reset.

The callback is memoized for you and will not reset the timeout if it changes.

### 📕 Parameters

-   `callback` - The function to run after `delay` seconds.
-   `delay` - The number of seconds to wait before calling `callback`. If `undefined`, the timeout is cleared.

### 📗 Returns

-   A function that clears the timeout.

### 📘 Example

A text label that displays the number `1` after one second.

```tsx
export default function Component() {
	const [count, setCount] = useState(0);

	useTimeout(() => {
		setCount(count + 1);
	}, 1);

	return <textlabel Text={`Count: ${count}`} />;
}
```
