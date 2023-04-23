## 🪝 `useLifetime`

```ts
function useLifetime(): Roact.Binding<number>;
```

Returns the amount of time that has passed since the component mounted. The binding is updated every frame on Heartbeat.

Useful for mapping time to procedural animations and other time-based effects.

### 📕 Parameters

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
