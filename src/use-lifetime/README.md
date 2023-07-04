## 🪝 `useLifetime`

```ts
function useLifetime(dependencies?: unknown[]): Roact.Binding<number>;
```

Returns the amount of time that has passed since the component mounted. The binding is updated every frame on Heartbeat.

If dependencies are provided, the binding will reset to `0` whenever any of the dependencies change.

Useful for mapping time to procedural animations and other time-based effects.

### 📕 Parameters

-   `dependencies` - An optional array of dependencies. If provided, the binding will reset to `0` whenever any of the dependencies change.

### 📗 Returns

-   A binding that will update with the amount of time that has passed since the component mounted.

### 📘 Example

```tsx
function Blink() {
	const lifetime = useLifetime();
	const transparency = lifetime.map((t) => math.sin(t) * 0.5 + 0.5);

	return <frame BackgroundTransparency={transparency} />;
}
```
