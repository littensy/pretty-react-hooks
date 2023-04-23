/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useKeyPress } from "./use-key-press";

export = () => {
	it("should return a boolean", () => {
		const { result, unmount } = renderHook(() => useKeyPress("W"));
		expect(result.current).to.be.a("boolean");
		expect(result.current).to.equal(false);
		unmount();
	});
};
