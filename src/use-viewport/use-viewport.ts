import { useBinding, useEffect } from "@rbxts/react";
import { useCamera } from "../use-camera";

/**
 * Returns the current viewport size of the camera.
 * @param listener Optional listener to be called when the viewport changes.
 * @returns A binding to the viewport size.
 */
export function useViewport(listener?: (viewport: Vector2) => void) {
	const camera = useCamera();
	const [viewport, setViewport] = useBinding(camera.ViewportSize);

	useEffect(() => {
		const connection = camera.GetPropertyChangedSignal("ViewportSize").Connect(() => {
			setViewport(camera.ViewportSize);
			listener?.(camera.ViewportSize);
		});

		setViewport(camera.ViewportSize);
		listener?.(camera.ViewportSize);

		return () => {
			connection.Disconnect();
		};
	}, [camera]);

	return viewport;
}
