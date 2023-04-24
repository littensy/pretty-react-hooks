/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useDebounceEffect } from "./use-debounce-effect";

export = () => {
	it("should debounce the effect", () => {
		let count = 0;
		const { rerender, unmount } = renderHook(
			({ input }) =>
				useDebounceEffect(
					() => {
						count += 1;
					},
					[input],
					{ wait: 0.02 },
				),
			{ initialProps: { input: 0 } },
		);

		rerender({ input: 0 });
		rerender({ input: 1 });
		rerender({ input: 0 });
		rerender({ input: 1 });
		expect(count).to.equal(0);

		task.wait(0.04);
		expect(count).to.equal(1);
		rerender({ input: 2 });
		expect(count).to.equal(1);

		task.wait(0.04);
		expect(count).to.equal(2);
		rerender({ input: 2 });
		expect(count).to.equal(2);

		task.wait(0.04);
		expect(count).to.equal(2);
		rerender({ input: 3 });
		expect(count).to.equal(2);
		rerender({ input: 4 });
		expect(count).to.equal(2);

		task.wait(0.04);
		expect(count).to.equal(3);

		unmount();
	});
};
