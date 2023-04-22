## 🪝 `useThrottleState`

```ts
function useThrottleState<T>(initialState: T, options?: UseThrottleOptions): T;
```

Creates a throttled state that only updates at most once per every `wait` seconds. Set to the most recently passed `state` after each interval.

See [lodash.throttle](https://lodash.com/docs/4.17.15#throttle) for the function this hook is based on.

### 📕 Parameters

-   `initialState` - The initial state.
-   `options` - The options object.
    -   `wait` - The number of seconds to throttle. Defaults to `0`.
    -   `leading` - Specify invoking on the leading edge of the timeout. Defaults to `true`.
    -   `trailing` - Specify invoking on the trailing edge of the timeout. Defaults to `true`.

### 📗 Returns

-   The throttled state.
-   A function to update the throttled state.

### 📘 Example

Throttle viewport size updates to once per second.

```tsx
export default function Component() {
	const camera = useCamera();
	const [viewportSize, setViewportSize] = useThrottleState(camera.ViewportSize, { time: 1 });

	useEventListener(camera.GetPropertyChangedSignal("ViewportSize"), () => {
		setViewportSize(camera.ViewportSize);
	});

	return <ViewportSize.Provider value={viewportSize} />;
}
```
