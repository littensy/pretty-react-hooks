## 🪝 `useMotion`

```ts
function useMotion<T extends MotionGoal>(initialValue: T): LuaTuple<[value: Binding<T>, motor: Motion<T>]>
```

Creates a memoized Motion object set to the given initial value. Returns a binding that updates with the Motion, along with the Motion object.

### 📕 Parameters

-   `initialValue` - The initial value of the motor.

### 📗 Returns

-   A binding for the motor's value.
-   The motion object. See the [Ripple Repo](https://github.com/littensy/ripple) for the docs.

### 📘 Example

A button that fades in and out when hovered.

```tsx
function Button() {
	const [hover, hoverMotor] = useMotion(0);

	return (
		<textbutton
			Event={{
				MouseEnter: () => motion.spring(1, config.spring.stiff),
				MouseLeave: () => motion.spring(0, config.spring.stiff),
			}}
			Size={new UDim2(0, 100, 0, 100)}
			BackgroundTransparency={hover.map((t) => lerp(0.8, 0.5, t))}
		/>
	);
}
```
