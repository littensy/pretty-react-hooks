/// <reference types="@rbxts/testez/globals" />

import { UserInputService } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useMouse } from "./use-mouse";

export = () => {
	it("should return a binding to the mouse position", () => {
		const { result, unmount } = renderHook(() => useMouse());

		expect(result.current).to.be.a("table");
		expect(result.current.getValue()).to.be.a("userdata");
		expect(result.current.getValue()).to.equal(UserInputService.GetMouseLocation());
		unmount();
	});

	it("should receive an optional listener", () => {
		let mouse = new Vector2(-1, -1);
		const { unmount } = renderHook(() => useMouse((m) => (mouse = m)));

		expect(mouse).never.to.equal(new Vector2(-1, -1));
		expect(mouse).to.equal(UserInputService.GetMouseLocation());
		unmount();
	});
};
