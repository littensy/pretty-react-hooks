import Roact from "@rbxts/roact";
import { withHookDetection } from "@rbxts/roact-hooked";

/**
 * Returns a function that can be used as a Hoarcekat story. This function will
 * mount the given component to the target instance and unmount it when the
 * story is unmounted.
 * @param TestComponent The component to mount.
 * @returns A Hoarcekat story.
 */
export function hoarcekat(TestComponent: Roact.FunctionComponent) {
	return (target: Instance) => {
		withHookDetection(Roact);

		const handle = Roact.mount(<TestComponent />, target);

		return () => {
			Roact.unmount(handle);
		};
	};
}
