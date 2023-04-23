## 🪝 `usePrevious`

```tsx
function usePrevious<T>(value: T, shouldUpdate?: (prev: T, next: T) => boolean): T | undefined;
```

Returns a reference to the value from the previous render, or `undefined` on the first render.

It takes an optional inequality function to determine whether the value should be updated.

### 📕 Parameters

-   `value` - The value to track.
-   `shouldUpdate?` - A function that determines whether the value should be updated. Defaults to an inequality check.

### 📗 Returns

-   The value from the previous render, or `undefined` on the first render.

### 📘 Example

```tsx
function ShowPrevious({ value }: Props) {
	const previousValue = usePrevious(value);

	return <textlabel Text={`${value} (previous: ${previousValue ?? "none"})`} />;
}
```
