/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useAsyncEffect } from "./use-async-effect";

export = () => {
	it("should run the effect", () => {
		let calls = 0;
		renderHook(() => useAsyncEffect(async () => calls++, []));
		expect(calls).to.equal(1);
	});

	it("should run the effect when the dependencies change", () => {
		let calls = 0;
		const { rerender } = renderHook((deps: unknown[]) => useAsyncEffect(async () => calls++, deps), {
			initialProps: [0],
		});

		expect(calls).to.equal(1);
		rerender([1]);
		expect(calls).to.equal(2);
	});

	it("should cancel the effect when unmounting", () => {
		let calls = 0;
		const { unmount } = renderHook(() => {
			useAsyncEffect(async () => {
				calls++;
				return Promise.delay(0).then(() => {
					calls++;
				});
			}, []);
		});

		expect(calls).to.equal(1);
		unmount();
		expect(calls).to.equal(1);
	});

	it("should allow promises to complete", () => {
		let calls = 0;
		renderHook(() => {
			useAsyncEffect(async () => {
				calls++;
				return Promise.delay(0).then(() => {
					calls++;
				});
			}, []);
		});

		expect(calls).to.equal(1);
		task.wait(0.04);
		expect(calls).to.equal(2);
	});
};
