/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useMotion } from "./use-motion";

export = () => {
	it("should return a motor", () => {
		const { result, unmount } = renderHook(() => {
			const [value, motion] = useMotion(0);
			return { value, motion };
		});

		expect(result.current.value.getValue()).to.be.a("number");
		expect(result.current.value.getValue()).to.equal(0);
		expect(result.current.motion).to.be.a("table");

		unmount();
	});
};
