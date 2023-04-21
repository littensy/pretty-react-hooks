/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testing";
import { usePrevious } from "./use-previous";

export = () => {
	it("should return undefined on the first render", () => {
		const { result } = renderHook(() => usePrevious(0));
		expect(result.current).to.equal(undefined);
	});

	it("should return the previous value on rerender", () => {
		const { result, rerender } = renderHook(({ state }) => usePrevious(state), {
			initialProps: { state: 0 },
		});

		expect(result.current).to.equal(undefined);

		rerender({ state: 1 });
		expect(result.current).to.equal(0);

		rerender({ state: 2 });
		expect(result.current).to.equal(1);

		rerender({ state: 3 });
		expect(result.current).to.equal(2);
	});

	it("should work with undefined values", () => {
		const { result, rerender } = renderHook(({ state }) => usePrevious(state), {
			initialProps: { state: undefined as number | undefined },
		});

		expect(result.current).to.equal(undefined);

		rerender({ state: undefined });
		expect(result.current).to.equal(undefined);

		rerender({ state: 0 });
		expect(result.current).to.equal(undefined);

		rerender({ state: undefined });
		expect(result.current).to.equal(0);
	});

	it("should receive a function that determines whether the value should be updated", () => {
		const value0 = { value: 0 };
		const value1 = { value: 1 };
		const value2 = { value: 2 };

		const { result, rerender } = renderHook(({ state }) => usePrevious(state, (a, b) => a?.value !== b.value), {
			initialProps: { state: value0 },
		});

		expect(result.current).to.equal(undefined);

		rerender({ state: { ...value0 } });
		expect(result.current).to.equal(value0);

		rerender({ state: value1 });
		expect(result.current).to.equal(value0);

		rerender({ state: value2 });
		expect(result.current).to.equal(value1);

		rerender({ state: value1 });
		expect(result.current).to.equal(value2);
	});
};
