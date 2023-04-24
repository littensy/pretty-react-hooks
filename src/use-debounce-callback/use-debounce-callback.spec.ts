/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useDebounceCallback } from "./use-debounce-callback";

export = () => {
	it("should return run, cancel, and flush", () => {
		let count = 0;
		const { result } = renderHook(() => useDebounceCallback((amount: number) => (count += amount), { wait: 0.02 }));

		result.current.run(1);
		result.current.run(1);
		result.current.run(4);
		result.current.run(2);
		expect(count).to.equal(0);

		task.wait(0.04);
		expect(count).to.equal(2);
		result.current.run(4);
		expect(count).to.equal(2);

		task.wait(0.04);
		expect(count).to.equal(6);
		result.current.run(4);
		expect(count).to.equal(6);
		result.current.cancel();
		expect(count).to.equal(6);

		task.wait(0.04);
		expect(count).to.equal(6);
		result.current.run(1);
		expect(count).to.equal(6);
		result.current.flush();
		expect(count).to.equal(7);
		task.wait(0.04);
		expect(count).to.equal(7);
	});
};
