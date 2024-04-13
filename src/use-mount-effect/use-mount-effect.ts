import React, { useEffect } from "@rbxts/react";

/**
 * Runs a callback when the component is mounted.
 * @param callback The callback to run.
 */
export function useMountEffect(callback: React.EffectCallback) {
	useEffect(callback, []);
}
