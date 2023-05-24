/// <reference types="@rbxts/testez/globals" />

import { RunService } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useDeferEffect } from "./use-defer-effect";

export = () => {
	const wait = () => {
		RunService.Heartbeat.Wait();
		RunService.Heartbeat.Wait();
	};

	it("should run the effect on the next heartbeat", () => {
		let calls = 0;

		const { rerender, unmount } = renderHook(() => {
			useDeferEffect(() => calls++);
		});

		expect(calls).to.equal(0);

		wait();
		expect(calls).to.equal(1);

		wait();
		expect(calls).to.equal(1);

		rerender();
		expect(calls).to.equal(1);

		wait();
		expect(calls).to.equal(2);

		unmount();
	});

	it("should run the effect on dependency change", () => {
		let calls = 0;

		const { unmount, rerender } = renderHook(
			(value: number) => {
				useDeferEffect(() => calls++, [value]);
			},
			{ initialProps: 0 },
		);

		expect(calls).to.equal(0);

		wait();
		expect(calls).to.equal(1);

		rerender(1);
		expect(calls).to.equal(1);

		wait();
		expect(calls).to.equal(2);

		unmount();
	});

	it("should cancel the effect on unmount", () => {
		let calls = 0;

		const { unmount, rerender } = renderHook(() => {
			useDeferEffect(() => calls++);
		});

		expect(calls).to.equal(0);

		wait();
		expect(calls).to.equal(1);

		rerender();
		unmount();

		wait();
		expect(calls).to.equal(1);
	});
};
