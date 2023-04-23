## 🪝 `useEventListener`

```ts
function useEventListener<T extends EventLike>(
	event?: T,
	listener?: T extends EventLike<infer U> ? U : never,
	options: EventListenerOptions = {},
): void;
```

Connects an event listener to the given event. The event can be any object with a `Connect` method that returns a Connection object or a cleanup function.

If the event or the listener is `undefined`, the previous listener will be disconnected.

The `listener` parameter is memoized for you, and will not cause a reconnect if it changes.

### ⚙️ Options

-   `connected` - Whether the listener should be connected. Defaults to `true`.
-   `once` - Whether the listener should be disconnected after the first time it is called. Defaults to `false`.

### 📕 Parameters

-   `event` - The event to listen to.
-   `listener` - The listener to call when the event fires.
-   `options` - Optional config for the listener.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
export default function Component() {
	useEventListener(Players.PlayerAdded, (player) => {
		print(`${player.DisplayName} joined!`);
	});

	return <frame />;
}
```
