/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useLatest } from "./use-latest";

export = () => {
	it("should return a mutable ref", () => {
		const { result } = renderHook(() => useLatest(0));
		expect(result.current.current).to.equal(0);
	});

	it("should update the ref when the value changes", () => {
		const { result, rerender } = renderHook((props: { value: number }) => useLatest(props.value), {
			initialProps: { value: 0 },
		});

		expect(result.current.current).to.equal(0);
		rerender({ value: 1 });
		expect(result.current.current).to.equal(1);
	});

	it("should receive a function that determines whether the value should be updated", () => {
		const value0 = { value: 0 };
		const value1 = { value: 0 };
		const value2 = { value: 1 };

		const { result, rerender } = renderHook(({ state }) => useLatest(state, (a, b) => a?.value === b.value), {
			initialProps: { state: value0 },
		});

		expect(result.current.current).to.equal(value0);
		rerender({ state: value1 });
		expect(result.current.current).to.equal(value0);
		rerender({ state: value2 });
		expect(result.current.current).to.equal(value2);
	});
};
