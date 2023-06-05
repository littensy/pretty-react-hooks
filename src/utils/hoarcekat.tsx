import Roact from "@rbxts/roact";
import { HookDetectionOptions, withHookDetection } from "@rbxts/roact-hooked";

/**
 * Returns a function that can be used as a Hoarcekat story. This function will
 * mount the given component to the target instance and unmount it when the
 * story is unmounted.
 * @param TestComponent The component to mount.
 * @param options Optional options to pass to `withHookDetection`.
 * @returns A Hoarcekat story.
 */
export function hoarcekat(TestComponent: Roact.FunctionComponent, options?: HookDetectionOptions) {
	return (target: Instance) => {
		withHookDetection(Roact, options);

		const handle = Roact.mount(<TestComponent />, target);

		return () => {
			Roact.unmount(handle);
		};
	};
}
