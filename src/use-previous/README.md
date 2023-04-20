## 🪝 `usePrevious`

Returns a reference to the value from the previous render, or `undefined` on the first render.

It takes an optional inequality function to determine whether the value should be updated.

### ⚙️ Parameters

-   `value` - The value to track.
-   `shouldUpdate?` - A function that determines whether the value should be updated. Defaults to an inequality check.

### 📚 Example

```tsx
function Counter() {
	const [count, setCount] = useState(0);
	const previousCount = usePrevious(count);

	return (
		<textbutton
			Text={`${previousCount} -> ${count}`}
			Event={{
				Activated: () => setCount(count + 1),
			}}
		/>
	);
}
```
