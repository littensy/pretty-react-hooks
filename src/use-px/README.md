## 🪝 `usePx`

```ts
function usePx(baseResolution: Vector2 = new Vector2(1280, 832)): ScaleFunction
```

Creates a set of functions that can be used for scaling UI up to a resolution.

### 📕 Parameters

-   `baseResolution` - The resolution the UI was designed at.

### 📗 Returns

-   Functions to call for scaling

```ts
interface ScaleFunction {
	/**
	 * Scales `pixels` based on the current viewport size and rounds the result.
	 */
	(pixels: number): number;
	/**
	 * Scales `pixels` and rounds the result to the nearest even number.
	 */
	even: (pixels: number) => number;
	/**
	 * Scales a number based on the current viewport size without rounding.
	 */
	scale: (percent: number) => number;
	/**
	 * Scales `pixels` and rounds the result down.
	 */
	floor: (pixels: number) => number;
	/**
	 * Scales `pixels` and rounds the result up.
	 */
	ceil: (pixels: number) => number;
}
```

### 📘 Example

A button that counts how many times it has been clicked.

```tsx
function Counter() {
	const px = usePx();
	const [count, setCount] = useState(0);

	return (
		<Button
			onClick={() => setCount(count + 1)}
			font={fonts.inter.medium}
			text={`👆 Clicked ${count} times`}
			textSize={px(32)}
			textColor={palette.white}
			size={new UDim2(0, px(320), 0, px(128))}
			position={new UDim2(0.5, 0, 0.5, 0)}
			anchorPoint={new Vector2(0.5, 0.5)}
		/>
	);
}
```
