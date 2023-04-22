/// <reference types="@rbxts/testez/globals" />

import { useEffect } from "@rbxts/roact-hooked";
import { renderHook } from "../utils/testez";
import { useUpdate } from "./use-update";

export = () => {
	it("should cause a rerender", () => {
		let renders = 0;

		renderHook(() => {
			const rerender = useUpdate();

			useEffect(() => {
				rerender();
			}, []);

			renders += 1;
		});

		expect(renders).to.equal(2);
	});
};
