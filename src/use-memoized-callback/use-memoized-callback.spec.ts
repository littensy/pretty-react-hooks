/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useMemoizedCallback } from "./use-memoized-callback";

export = () => {
	it("should memoize the callback on mount", () => {
		const callback = () => {};
		const { result } = renderHook(() => useMemoizedCallback(callback));
		expect(result.current).to.be.a("function");
		expect(result.current).never.to.equal(callback);
	});

	it("should return memoized callback after unrelated rerender", () => {
		const { result, rerender } = renderHook(() => useMemoizedCallback(() => {}));
		const memoizedCallback = result.current;
		rerender();
		expect(result.current).to.equal(memoizedCallback);
	});

	it("should return memoized callback after passed callback changes", () => {
		const { result, rerender } = renderHook(({ callback }) => useMemoizedCallback(callback), {
			initialProps: { callback: () => {} },
		});
		const memoizedCallback = result.current;
		rerender({ callback: () => {} });
		expect(result.current).to.equal(memoizedCallback);
		rerender({ callback: () => {} });
		expect(result.current).to.equal(memoizedCallback);
	});

	it("should memoize the passed callback", () => {
		const { result, rerender } = renderHook(({ callback }) => useMemoizedCallback(callback), {
			initialProps: {
				callback: (a: number, b: number) => a + b,
			},
		});
		const memoizedCallback = result.current;
		expect(memoizedCallback(1, 2)).to.equal(3);
		rerender({ callback: (a: number, b: number) => a - b });
		expect(memoizedCallback(1, 2)).to.equal(-1);
	});
};
