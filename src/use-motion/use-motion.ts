import type { Binding } from "@rbxts/react";
import { useBinding, useMemo } from "@rbxts/react";
import type { Motion, MotionGoal } from "@rbxts/ripple";
import { createMotion } from "@rbxts/ripple";
import { useEventListener } from "../use-event-listener";
import { RunService } from "@rbxts/services";

export function useMotion(initialValue: number): LuaTuple<[Binding<number>, Motion]>;
export function useMotion<T extends MotionGoal>(initialValue: T): LuaTuple<[Binding<T>, Motion<T>]>;
export function useMotion<T extends MotionGoal>(initialValue: T) {
	const motion = useMemo(() => {
		return createMotion(initialValue);
	}, []);

	const [binding, setValue] = useBinding(initialValue);

	useEventListener(RunService.Heartbeat, (delta) => {
		const value = motion.step(delta);

		if (value !== binding.getValue()) {
			setValue(value);
		}
	});

	return $tuple(binding, motion);
}
