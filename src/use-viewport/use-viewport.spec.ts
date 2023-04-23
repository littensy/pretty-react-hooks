/// <reference types="@rbxts/testez/globals" />

import { Workspace } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useViewport } from "./use-viewport";

export = () => {
	it("should return a binding to the viewport size", () => {
		const { result, unmount } = renderHook(() => useViewport());

		expect(result.current).to.be.a("table");
		expect(result.current.getValue()).to.be.a("userdata");
		expect(result.current.getValue()).to.equal(Workspace.CurrentCamera!.ViewportSize);
		unmount();
	});

	it("should receive an optional listener", () => {
		let viewport = new Vector2(-1, -1);
		const { unmount } = renderHook(() => useViewport((v) => (viewport = v)));

		expect(viewport).never.to.equal(new Vector2(-1, -1));
		expect(viewport).to.equal(Workspace.CurrentCamera!.ViewportSize);
		unmount();
	});
};
