## 🪝 `usePrevious`

```tsx
function usePrevious<T>(value: T, isEqual?: (previous?: T, current: T) => boolean): T | undefined;
```

Returns a reference to the value from the previous render, or `undefined` on the first render.

It takes an optional equality function to determine whether the values are equal. If false, the value will be updated.

### 📕 Parameters

-   `value` - The value to track.
-   `isEqual?` - An equality function. Defaults to a strict equality check (`===`).

### 📗 Returns

-   The value from the previous render, or `undefined` on the first render.

### 📘 Example

```tsx
function ShowPrevious({ value }: Props) {
	const previousValue = usePrevious(value);

	return <textlabel Text={`${value} (previous: ${previousValue ?? "none"})`} />;
}
```
