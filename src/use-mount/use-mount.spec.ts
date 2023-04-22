/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useMount } from "./use-mount";

export = () => {
	it("should run callback on mount", () => {
		let renders = 0;
		let mounted = false;

		const { rerender } = renderHook(() => {
			useMount(() => {
				mounted = !mounted;
			});

			renders += 1;
		});

		expect(renders).to.equal(1);
		expect(mounted).to.equal(true);

		rerender();
		expect(renders).to.equal(2);
		expect(mounted).to.equal(true);
	});
};
