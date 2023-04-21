/// <reference types="@rbxts/testez/globals" />

import { Workspace } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useCamera } from "./use-camera";

export = () => {
	it("should return current camera", () => {
		const { result } = renderHook(() => useCamera());
		expect(result.current).to.equal(Workspace.CurrentCamera);
	});

	it("should update when current camera changes", () => {
		const { result, rerender } = renderHook(() => useCamera());
		expect(result.current).to.equal(Workspace.CurrentCamera);
		Workspace.CurrentCamera?.Destroy();
		rerender();
		expect(result.current).to.equal(Workspace.CurrentCamera);
	});
};
