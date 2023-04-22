/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useThrottleCallback } from "./use-throttle-callback";

export = () => {
	it("should return run, cancel, and flush", () => {
		let count = 0;
		const { result } = renderHook(() => useThrottleCallback((amount: number) => (count += amount), { wait: 0.03 }));

		result.current.run(1);
		expect(count).to.equal(1);
		result.current.run(1);
		result.current.run(1);
		result.current.run(1);
		expect(count).to.equal(1);

		task.wait(0.02);
		result.current.run(2);
		expect(count).to.equal(1);

		task.wait(0.015);
		result.current.run(2);
		expect(count).to.equal(3);
		result.current.run(3);
		result.current.run(3);

		task.wait(0.035);
		expect(count).to.equal(6);
		result.current.run(1);
		result.current.run(4);
		result.current.cancel();

		task.wait(0.035);
		expect(count).to.equal(7);
		result.current.run(1);
		result.current.run(1);
		expect(count).to.equal(8);
		result.current.flush();
		expect(count).to.equal(9);

		task.wait(0.035);
		expect(count).to.equal(9);
	});
};
