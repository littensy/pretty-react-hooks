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

A button changes to the colour of its props.

```tsx
function Button({ color }: Props) {
	const color = useSpring(color, config.spring.stiff);

	return (
		<textbutton Size={new UDim2(0, 100, 0, 100)} BackgroundColor3={color} />
	);
}
```
