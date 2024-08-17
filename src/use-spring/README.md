## 🪝 `useSpring`

```ts
function useSpring<T extends MotionGoal>(goal: T | Binding<T>, options?: SpringOptions): Binding<T>
```

Applies spring animations to the given value, and updates the goal with the latest value on every re-render. Returns a binding that updates with the Motion.

### 📕 Parameters

-   `goal` - The goal of the motor.
-   `options` - Options for the spring (or a spring config).

### 📗 Returns

-   A binding of the motor's value.

### 📘 Example

A button that fades in and out when hovered.

```tsx
function Button() {
	const [springValue, setSpringValue] = useBinding(0)
	const hover = useSpring(springValue, config.spring.stiff);

	return (
		<textbutton
			Event={{
				MouseEnter: () => setSpringValue(1),
				MouseLeave: () => setSpringValue(0),
			}}
			Size={new UDim2(0, 100, 0, 100)}
			BackgroundTransparency={hover.map((t) => lerp(0.8, 0.5, t))}
		/>
	);
}
```
