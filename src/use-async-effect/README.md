## 🪝 `useAsyncEffect`

```ts
function useAsyncEffect(effect: () => Promise<unknown>, deps?: unknown[]): void;
```

Runs an async effect and cancels the promise when unmounting the effect.

If you want to use the result or status of the callback, see [`useAsync`](../use-async).

> **Warning:**  
> Cancelling a promise that yielded using `await` does not prevent the thread from resuming.  
> Avoid pairing `await` with functions that update state, as it might resume after unmount:
>
> ```ts
> useAsyncEffect(async () => {
> 	await Promise.delay(5);
> 	setState("Hello World!"); // unsafe
> }, []);
> ```

### 📕 Parameters

-   `effect` - The async effect to run.
-   `deps` - The dependencies to watch for changes.

### 📗 Returns

-   `void`

### 📘 Example

```tsx
function Countdown() {
	const [counter, setCounter] = useState(0);

	useAsyncEffect(async () => {
		return setCountdown((countdown) => {
			setCounter(countdown);
		}, 10);
	}, []);

	return <textlabel Text={`Countdown: ${counter}`} />;
}
```
