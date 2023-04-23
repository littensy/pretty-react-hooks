import { useBinding } from "@rbxts/roact-hooked";
import { RunService } from "@rbxts/services";
import { useEventListener } from "../use-event-listener";

/**
 * Returns the lifetime of the component in seconds. Updates every frame on
 * the Heartbeat event.
 * @returns A binding of the component's lifetime.
 */
export function useLifetime() {
	const [lifetime, setLifetime] = useBinding(0);

	useEventListener(RunService.Heartbeat, (deltaTime) => {
		setLifetime(lifetime.getValue() + deltaTime);
	});

	return lifetime;
}
