import { useCallback, useState } from "@rbxts/roact-hooked";

/**
 * Returns a function that can be used to force a component to update.
 * @returns A function that forces a rerender.
 */
export function useUpdate() {
	const [, setState] = useState({});

	return useCallback(() => {
		setState({});
	}, []);
}
