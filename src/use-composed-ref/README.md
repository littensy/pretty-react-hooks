## 🪝 `useComposedRef`

```ts
function useComposedRef<T>(...refs: (RefFunction<T> | undefined)[]): RefFunction<T>;
```

Combines multiple ref functions into a single ref function and memoizes the result.

To prevent excess ref calls, the composed ref is only created once on mount. It will call the latest refs passed, though, so it is safe to pass in refs that might change.

### 📕 Parameters

-   `refs` - An array of ref functions.

### 📗 Returns

-   A ref function that calls all of the given ref functions.

### 📘 Example

```tsx
interface Props {
	ref?: RefFunction<Frame>;
}

function DraggableFrame({ ref }: Props) {
	const [frame, setFrame] = useState<Frame>();
	const composedRef = useComposedRef(ref, setFrame);

	useEffect(() => {
		const handle = makeDraggable(frame);

		return () => {
			handle.disconnect();
		};
	}, [frame]);

	return <frame Ref={composedRef} />;
}
```
