/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useThrottleEffect } from "./use-throttle-effect";

export = () => {
	it("should throttle the effect", () => {
		let count = 0;
		const { rerender, unmount } = renderHook(
			({ input }) =>
				useThrottleEffect(
					() => {
						count += 1;
					},
					[input],
					{ wait: 0.06 },
				),
			{ initialProps: { input: 0 } },
		);

		rerender({ input: 1 });
		expect(count).to.equal(1);
		rerender({ input: 1 });
		rerender({ input: 1 });
		rerender({ input: 1 });
		expect(count).to.equal(1);

		task.wait(0.04);
		rerender({ input: 2 });
		expect(count).to.equal(1);

		task.wait(0.03);
		rerender({ input: 2 });
		expect(count).to.equal(2);
		rerender({ input: 3 });
		rerender({ input: 3 });

		task.wait(0.065);
		expect(count).to.equal(3);
		unmount();
	});
};
