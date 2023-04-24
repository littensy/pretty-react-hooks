/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useInterval } from "./use-interval";

export = () => {
	it("should run the callback after the delay", () => {
		let count = 0;
		const { unmount } = renderHook(() => {
			useInterval(() => count++, 0.03);
		});

		expect(count).to.equal(0);

		task.wait(0.04);
		expect(count).to.equal(1);

		task.wait(0.04);
		expect(count).to.equal(2);
		unmount();
	});

	it("should clear when delay is undefined", () => {
		let count = 0;
		const { rerender, unmount } = renderHook(
			({ delay }) => {
				useInterval(() => count++, delay);
			},
			{ initialProps: { delay: 0.03 as number | undefined } },
		);

		expect(count).to.equal(0);

		task.wait(0.01);
		expect(count).to.equal(0);
		rerender({ delay: undefined });

		task.wait(0.04);
		expect(count).to.equal(0);
		unmount();
	});

	it("should clear on unmount", () => {
		let count = 0;
		const { unmount } = renderHook(() => {
			useInterval(() => count++, 0.03);
		});

		expect(count).to.equal(0);

		task.wait(0.01);
		expect(count).to.equal(0);
		unmount();

		task.wait(0.04);
		expect(count).to.equal(0);
	});

	it("should reset when delay updates", () => {
		let count = 0;
		const { rerender, unmount } = renderHook(
			({ delay }) => {
				useInterval(() => count++, delay);
			},
			{ initialProps: { delay: 0.03 as number | undefined } },
		);

		expect(count).to.equal(0);

		task.wait(0.01);
		expect(count).to.equal(0);
		rerender({ delay: 0.05 });

		task.wait(0.04);
		expect(count).to.equal(0);

		task.wait(0.04);
		expect(count).to.equal(1);
		unmount();
	});

	it("should return a clear function", () => {
		let count = 0;
		const { result, unmount } = renderHook(() => {
			return useInterval(() => count++, 0.03);
		});

		expect(count).to.equal(0);

		task.wait(0.01);
		expect(count).to.equal(0);
		result.current();

		task.wait(0.04);
		expect(count).to.equal(0);
		unmount();
	});
};
