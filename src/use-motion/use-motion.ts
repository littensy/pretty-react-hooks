import type { Binding } from "@rbxts/react";
import { useBinding, useEffect, useMemo } from "@rbxts/react";
import type { Motion, MotionGoal } from "@rbxts/ripple";
import { createMotion } from "@rbxts/ripple";
import { RunService } from "@rbxts/services";

const callbacks = new Set<(dt: number) => void>();
let connection: RBXScriptConnection | undefined;

function connect(callback: (dt: number) => void) {
	callbacks.add(callback);

	if (!connection) {
		connection = RunService.Heartbeat.Connect((dt) => {
			for (const callback of callbacks) {
				callback(dt);
			}
		});
	}
}

function disconnect(callback: (dt: number) => void) {
	callbacks.delete(callback);

	if (callbacks.isEmpty()) {
		connection?.Disconnect();
		connection = undefined;
	}
}

export function useMotion(initialValue: number): LuaTuple<[Binding<number>, Motion]>;
export function useMotion<T extends MotionGoal>(initialValue: T): LuaTuple<[Binding<T>, Motion<T>]>;
export function useMotion<T extends MotionGoal>(initialValue: T) {
	const motion = useMemo(() => {
		return createMotion(initialValue);
	}, []);

	const [binding, setValue] = useBinding(initialValue);

	useEffect(() => {
		const callback = (delta: number) => {
			const value = motion.step(delta);

			if (value !== binding.getValue()) {
				setValue(value);
			}
		};

		connect(callback);

		return () => disconnect(callback);
	}, []);

	return $tuple(binding, motion);
}
