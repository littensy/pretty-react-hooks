/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useSpring } from "./use-spring";

export = () => {
	it("should return a binding", () => {
		const { result, unmount } = renderHook(() => useSpring(0));

		expect(result.current.getValue()).to.be.a("number");
		expect(result.current.getValue()).to.equal(0);

		unmount();
	});
};
