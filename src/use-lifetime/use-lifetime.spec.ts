/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useLifetime } from "./use-lifetime";

export = () => {
	it("should return the lifetime of the component", () => {
		const { result, unmount } = renderHook(() => useLifetime());

		expect(result.current.getValue()).to.equal(0);
		const timePassed = task.wait(0.1);
		expect(result.current.getValue()).to.be.near(timePassed, 0.03);
		unmount();
	});
};
