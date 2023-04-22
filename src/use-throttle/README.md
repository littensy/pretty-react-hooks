## 🪝 `useThrottle`

```ts
function useThrottle<T>(value: T, options?: UseThrottleOptions): T;
```

Creates a throttled value that only updates at most once per every `wait` seconds. Set to the most recently passed `value` after each interval.

See [lodash.throttle](https://lodash.com/docs/4.17.15#throttle) for the function this hook is based on.

### 📕 Parameters

-   `value` - The value to throttle.
-   `options` - The options object.
    -   `wait` - The number of seconds to throttle. Defaults to `0`.
    -   `leading` - Specify invoking on the leading edge of the timeout. Defaults to `true`.
    -   `trailing` - Specify invoking on the trailing edge of the timeout. Defaults to `true`.

### 📗 Returns

-   The throttled value.

### 📘 Example

Throttle viewport size updates to once per second.

```tsx
export default function Component() {
	const camera = useCamera();
	const [viewportSize, setViewportSize] = useState(camera.ViewportSize);
	const throttledViewportSize = useThrottle(viewportSize, 1);

	useEventListener(camera.GetPropertyChangedSignal("ViewportSize"), () => {
		setViewportSize(camera.ViewportSize);
	});

	return <ViewportSize.Provider value={throttledViewportSize} />;
}
```
