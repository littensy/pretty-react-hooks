/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useUpdateEffect } from "./use-update-effect";

export = () => {
	it("should call effect on update only", () => {
		let renders = 0;
		const { rerender } = renderHook(() =>
			useUpdateEffect(() => {
				renders += 1;
			}),
		);

		expect(renders).to.equal(0);

		rerender();
		expect(renders).to.equal(1);
	});

	it("should call effect with dependencies", () => {
		let renders = 0;
		const { rerender } = renderHook((value) =>
			useUpdateEffect(() => {
				renders += 1;
			}, [value]),
		);

		expect(renders).to.equal(0);

		rerender("test");
		expect(renders).to.equal(1);

		rerender("test");
		expect(renders).to.equal(1);

		rerender("test2");
		expect(renders).to.equal(2);
	});
};
