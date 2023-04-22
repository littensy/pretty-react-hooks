import { useEffect, useState } from "@rbxts/roact-hooked";
import { Workspace } from "@rbxts/services";

/**
 * Returns the current camera. Updates when the current camera changes.
 * @returns A camera instance.
 */
export function useCamera() {
	const [camera, setCamera] = useState(Workspace.CurrentCamera!);

	useEffect(() => {
		const connection = Workspace.GetPropertyChangedSignal("CurrentCamera").Connect(() => {
			if (Workspace.CurrentCamera) {
				setCamera(Workspace.CurrentCamera);
			}
		});

		return () => connection.Disconnect();
	}, []);

	return camera;
}
