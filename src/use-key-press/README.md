## 🪝 `useKeyPress`

```ts
function useKeyPress(keyCodes: KeyCodes[], options?: KeyPressOptions): boolean;
```

Returns `true` if any of the given keys or shortcuts are pressed. The hook expects one or more key codes, which can be:

-   A single key, like `"Space"`
-   A combination of keys, like `"Space+W"`
-   An array of keys, like `["Space", "W"]`

Each combination is treated as its own shortcut. If passed more than one key combination, the hook will return `true` if any of the combinations are pressed.

### 📕 Parameters

-   `keyCodes` - One or more key codes.
-   `options` - Optional options object.
    -   `bindAction` - Whether to bind a ContextActionService action to the key press. Defaults to `false`.
    -   `actionName` - The name of the action to bind. Defaults to a random string.
    -   `actionPriority` - The priority of the action to bind. Defaults to `Enum.ContextActionPriority.High.Value`.
    -   `actionInputTypes` - The input types of the action to bind. Defaults to Keyboard and Gamepad1.

### 📗 Returns

-   Whether any of the given keys or shortcuts are pressed.

### 📘 Example

```tsx
function Keyboard() {
	const spacePressed = useKeyPress(["Space"]);
	const ctrlAPressed = useKeyPress(["LeftControl+A", "RightControl+A"]);

	useEffect(() => {
		print(`Space pressed: ${spacePressed}`);
	}, [spacePressed]);

	useEffect(() => {
		print(`Ctrl+A pressed: ${ctrlAPressed}`);
	}, [ctrlAPressed]);

	return undefined!;
}
```
