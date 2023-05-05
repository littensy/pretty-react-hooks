/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useKeyPress } from "./use-key-press";

export = () => {
	it("should return a boolean", () => {
		const { result, unmount } = renderHook(() => useKeyPress(["W", "B"]));
		expect(result.current).to.be.a("boolean");
		expect(result.current).to.equal(false);
		unmount();
	});

	// itFOCUS("should return true when pressed", () => {
	// 	let value = false;
	// 	const { result, unmount } = renderHook(() => {
	// 		value = useKeyPress(["W", "LeftShift+B"]) || value;
	// 	});
	// 	task.wait(2);
	// 	unmount();
	// 	expect(value).to.be.a("boolean");
	// 	expect(value).to.equal(true);
	// });
};
