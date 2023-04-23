## 🪝 `useAsyncCallback`

```ts
export function useAsyncCallback<T, U extends unknown[]>(
	callback: AsyncCallback<T, U>,
): LuaTuple<[AsyncState<T>, AsyncCallback<T, U>]>;
```

A hook that wraps an async function and returns the current state and an executor.

Calling the executor will cancel any pending promises and start a new one.

If you want the callback to run on mount or with dependencies, see [`useAsync`](../use-async).

> **Warning:**  
> Cancelling a promise that yielded using `await` does not prevent the thread from resuming.  
> Avoid pairing `await` with functions that update state, as it might resume after unmount:
>
> ```ts
> useAsyncCallback(async () => {
> 	await Promise.delay(5);
> 	setState("Hello World!"); // unsafe
> });
> ```

### 📕 Parameters

-   `callback` - The async function to call.

### 📗 Returns

-   The current state of the async function.
    -   `status` - The status of the last promise.
    -   `value` - The value if the promise resolved.
    -   `message` - The error message if the promise rejected.
-   A function that calls the async function.

### 📘 Example

```tsx
function GetBaseplate() {
	const [state, getBaseplate] = useAsyncCallback(async () => {
		return Workspace.WaitForChild("Baseplate");
	});

	useEffect(() => {
		print("Baseplate", state.status, state.value);
	}, [state]);

	return (
		<textbutton
			Text={`Baseplate status: ${state.status}`}
			Event={{
				Activated: () => getBaseplate(),
			}}
		/>
	);
}
```
