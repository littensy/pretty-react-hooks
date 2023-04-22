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
};
