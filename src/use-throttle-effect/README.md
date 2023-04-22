## 🪝 `useThrottleEffect`

```ts
function useThrottleEffect(
	effect: () => (() => void) | void,
	dependencies?: unknown[],
	options?: UseThrottleOptions,
): void;
```

Creates a throttled effect that only runs at most once per every `wait` seconds.

See [lodash.throttle](https://lodash.com/docs/4.17.15#throttle) for the function this hook is based on.

### 📕 Parameters

-   `effect` - The effect to throttle.
-   `dependencies` - The dependencies array.
-   `options` - The options object.
    -   `wait` - The number of seconds to throttle. Defaults to `0`.
    -   `leading` - Specify invoking on the leading edge of the timeout. Defaults to `true`.
    -   `trailing` - Specify invoking on the trailing edge of the timeout. Defaults to `true`.

### 📗 Returns

-   `void`

### 📘 Example

Throttle viewport size updates to once per second.

```tsx
export default function Component() {
	const camera = useCamera();
	const [viewportSize, setViewportSize] = useState(camera.ViewportSize);

	useEventListener(camera.GetPropertyChangedSignal("ViewportSize"), () => {
		setViewportSize(camera.ViewportSize);
	});

	useThrottleEffect(
		() => {
			print("Viewport size updated:", viewportSize);
		},
		[viewportSize],
		{ time: 1 },
	);

	return <frame />;
}
```
