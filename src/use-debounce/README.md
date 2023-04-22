## 🪝 `useDebounce`

```ts
function useDebounce<T>(value: T, options?: UseDebounceOptions): T;
```

Delays updating `value` until after `wait` seconds have elapsed since the last time the debounced function was invoked. Set to the most recently passed `value` after the delay.

See [lodash.debounce](https://lodash.com/docs/4.17.15#debounce) for the function this hook is based on.

### 📕 Parameters

-   `value` - The value to debounce.
-   `options` - The options object.
    -   `wait` - The number of seconds to delay. Defaults to `0`.
    -   `leading` - Specify invoking on the leading edge of the timeout. Defaults to `false`.
    -   `trailing` - Specify invoking on the trailing edge of the timeout. Defaults to `true`.

### 📗 Returns

-   The debounced value.

### 📘 Example

Update the query after the user stops typing for 1 second.

```tsx
export default function Component() {
	const [query, setQuery] = useState("");
	const debouncedQuery = useDebounce(query, 1);

	useEffect(() => {
		print(debouncedQuery);
	}, [debouncedQuery]);

	return (
		<textbox
			Size={new UDim2(1, 0, 0, 30)}
			Change={{
				Text: (rbx) => setQuery(rbx.Text),
			}}
		/>
	);
}
```
