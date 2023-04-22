## 🪝 `useDebounceEffect`

```ts
function useDebounceEffect(
	effect: () => (() => void) | void,
	dependencies?: unknown[],
	options?: UseDebounceOptions,
): void;
```

Creates a debounced effect that delays invoking `effect` until after `wait` seconds have elapsed since the last time the debounced function was invoked.

See [lodash.debounce](https://lodash.com/docs/4.17.15#debounce) for the function this hook is based on.

### 📕 Parameters

-   `effect` - The effect to debounce.
-   `dependencies` - The dependencies array.
-   `options` - The options object.
    -   `wait` - The number of seconds to delay. Defaults to `0`.
    -   `leading` - Specify invoking on the leading edge of the timeout. Defaults to `false`.
    -   `trailing` - Specify invoking on the trailing edge of the timeout. Defaults to `true`.

### 📗 Returns

-   `void`

### 📘 Example

Update the query after the user stops typing for 1 second.

```tsx
export default function Component() {
	const [query, setQuery] = useState("");

	useDebounceEffect(
		() => {
			print(query);
		},
		[query],
		{ wait: 1 },
	);

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
