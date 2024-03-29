import { createRoot } from "@rbxts/react-roblox";
import React, { StrictMode } from "@rbxts/react";

/**
 * Returns a function that can be used as a Hoarcekat story. This function will
 * mount the given component to the target instance and unmount it when the
 * story is unmounted.
 * @param TestComponent The component to mount.
 * @param options Optional options to pass to `withHookDetection`.
 * @returns A Hoarcekat story.
 */
export function hoarcekat(TestComponent: React.FunctionComponent) {
	return (target: Instance) => {
		const root = createRoot(target);

		root.render(
			<StrictMode>
				<TestComponent />
			</StrictMode>,
		);

		return () => {
			root.unmount();
		};
	};
}
