## 🪝 `useCamera`

```tsx
function useCamera(): Camera;
```

Returns the value of `Workspace.CurrentCamera`. If the current camera changes, it will trigger a re-render.

### 📕 Parameters

### 📗 Returns

-   A camera instance.

### 📘 Example

```tsx
function CameraPortal() {
	const camera = useCamera();

	return createPortal(<textlabel Text="Hello, World!" />, camera);
}
```
