## 🪝 `useMotor`

```ts
function useMotor(
	initialValue: number,
	useImplicitConnections = true,
): [value: Binding<number>, setGoal: (goal: MotorGoal) => void, api: SingleMotorApi];

function useMotor<T>(
	initialValue: T,
	useImplicitConnections = true,
): [value: Binding<T>, setGoal: (goal: GroupMotorGoal<T>) => void, api: GroupMotorApi<T>];
```

Creates a motor and returns a binding, a function to set the goal, and a motor API. Whether it creates a `SingleMotor` or a `GroupMotor` depends on the type of `initialValue`.

If `useImplicitConnections` is `true`, the motor will be connected to RenderStepped implicitly. Otherwise, you will need to call `step` on the motor manually.

The motor API contains the motor and functions to modify the internal state of the motor. New states will be deeply merged into the motor's state.

### 📕 Parameters

-   `initialValue` - The initial value of the motor. If this is an object, the motor will be a `GroupMotor`.
-   `useImplicitConnections` - Whether to connect the motor to RenderStepped.

### 📗 Returns

-   A binding for the motor's value.
-   A function to set the motor's goal.
-   The motor API.
    -   `motor` - The original motor.
    -   `getState` - Gets the mutable state of the motor.
    -   `setState` - Deeply merge a new state with the motor's state.
    -   `impulse` - Apply an impulse to the motor's velocity.

### 📘 Example

A button that fades in and out when hovered.

```tsx
function Button() {
	const [hover, setHover] = useMotor(0);

	return (
		<textbutton
			Event={{
				MouseEnter: () => setHover(new Spring(1)),
				MouseLeave: () => setHover(new Spring(0)),
			}}
			Size={new UDim2(0, 100, 0, 100)}
			BackgroundTransparency={hover.map((t) => lerp(0.8, 0.5, t))}
		/>
	);
}
```

A button that bounces in a random direction when clicked.

```tsx
function Bounce() {
	const [offset, setOffset, api] = useMotor({ x: 0, y: 0 });

	const bounce = () => {
		setOffset({
			x: new Spring(0, { dampingRatio: 0.4 }),
			y: new Spring(0, { dampingRatio: 0.4 }),
		});
		api.impulse({
			x: math.random(-50, 50),
			y: math.random(-50, 50),
		});
	};

	return (
		<textbutton
			Event={{
				Activated: bounce,
			}}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(0, 100, 0, 100)}
			Position={offset.map((p) => new UDim2(0.5, p.x, 0.5, p.y))}
		/>
	);
}
```
