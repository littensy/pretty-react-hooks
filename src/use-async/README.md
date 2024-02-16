## 🪝 `useAsync`

```ts
function useAsync<T>(
	callback: () => Promise<T>,
	deps: unknown[] = [],
): [result?: T, status?: Promise.Status, message?: unknown];
```

A hook that runs an async function and returns the result and status. Similar to `useAsyncCallback`, but the callback is run on mount and whenever the dependencies change.

Changing the dependencies will cancel any pending promises and start a new one.

> **Warning:**  
> Cancelling a promise that yielded using `await` does not prevent the thread from resuming.  
> Avoid pairing `await` with functions that update state, as it might resume after unmount:
>
> ```ts
> useAsync(async () => {
> 	await Promise.delay(5);
> 	setState("Hello World!"); // unsafe
> });
> ```

### 📕 Parameters

-   `callback` - The async function to run.
-   `deps` - The dependencies to watch for changes. Defaults to an empty array.

### 📗 Returns

-   The result if the promise resolved.
-   The status of the promise.
-   The error message if the promise rejected or cancelled.

### 📘 Example

```tsx
function BaseplatePortal(props: React.PropsWithChildren) {
	const [baseplate] = useAsync(async () => {
		return Workspace.WaitForChild("Baseplate");
	});

	if (!baseplate) {
		return undefined!;
	}

	return createPortal(props.children, baseplate);
}
```
