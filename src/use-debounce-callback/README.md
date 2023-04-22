## 🪝 `useDebounceCallback`

```ts
function useDebounceCallback<T extends Callback>(callback: T, options?: UseDebounceOptions): UseDebounceResult<T>;
```

Creates a debounced function that delays invoking `callback` until after `wait` seconds have elapsed since the last time the debounced function was invoked.

The callback is invoked with the last arguments provided to the debounced function. Subsequent calls to the debounced function return the result of the last `callback` invocation.

See [lodash.debounce](https://lodash.com/docs/4.17.15#debounce) for the function this hook is based on.

### 📕 Parameters

-   `callback` - The function to debounce.
-   `options` - The options object.
    -   `wait` - The number of seconds to delay. Defaults to `0`.
    -   `leading` - Specify invoking on the leading edge of the timeout. Defaults to `false`.
    -   `trailing` - Specify invoking on the trailing edge of the timeout. Defaults to `true`.
    -   `maxWait` - The maximum time `state` is allowed to be delayed before invoking.

### 📗 Returns

-   A `UseDebounceResult` object.
    -   `run` - The debounced function.
    -   `cancel` - Cancels any pending invocation.
    -   `flush` - Immediately invokes a pending invocation.
    -   `pending` - Whether there is a pending invocation.

### 📘 Example

Update the query after the user stops typing for 1 second.

```tsx
export default function Component() {
	const [query, setQuery] = useState("");

	const debounced = useDebounceCallback((value: string) => {
		setQuery(value);
	}, 1);

	return (
		<textbox
			Size={new UDim2(1, 0, 0, 30)}
			Change={{
				Text: (rbx) => debounced.run(rbx.Text),
			}}
		/>
	);
}
```
