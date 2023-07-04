## 🪝 `useTimer`

```ts
function useTimer(initialValue?: number): Timer;
```

Returns a timer whose `value` field is a binding that will update every frame on Heartbeat. The timer's `value` field will start at `initialValue` if provided, or `0` otherwise.

By default, the timer will start when the component mounts. If you want to start or stop the timer later, you can use the `start` and `stop` methods.

### 📕 Parameters

-   `initialValue` - An optional initial value for the timer. Defaults to `0`.

### 📗 Returns

-   A `Timer` object:
    -   `value` - A binding that will update every frame.
    -   `start()` - Starts the timer if it is not already running.
    -   `stop()` - Stops the timer if it is running.
    -   `reset()` - Resets the value to `0`.
    -   `set(value)` - Sets the value to a new value.

### 📘 Example

```tsx
function Blink() {
	const timer = useTimer();
	const transparency = timer.value.map((t) => math.sin(t) * 0.5 + 0.5);

	return (
		<textbutton
			BackgroundTransparency={transparency}
			Event={{
				Activated: () => timer.reset(),
			}}
		/>
	);
}
```
