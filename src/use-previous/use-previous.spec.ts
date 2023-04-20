/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/render-hook";
import { ShouldUpdate, usePrevious } from "./use-previous";

export = () => {
	const getHook = <T>(initialValue: T, shouldUpdate?: ShouldUpdate<T>) => {
		return renderHook(({ value, shouldUpdate }) => usePrevious(value, shouldUpdate), {
			initialProps: {
				value: initialValue,
				shouldUpdate,
			} as { value: T; shouldUpdate?: ShouldUpdate<T> },
		});
	};

	describe("usePrevious", () => {
		it("should return undefined on initial render", () => {
			const hook = getHook(0);
			expect(hook.result.current).to.equal(undefined);
		});

		it("should return the previous value on subsequent renders", () => {
			const hook = getHook(0);

			expect(hook.result.current).to.equal(undefined);

			hook.rerender({ value: 1 });
			expect(hook.result.current).to.equal(0);

			hook.rerender({ value: 2 });
			expect(hook.result.current).to.equal(1);

			hook.rerender({ value: 3 });
			expect(hook.result.current).to.equal(2);

			hook.rerender({ value: 4 });
			expect(hook.result.current).to.equal(3);

			hook.rerender({ value: 5 });
			expect(hook.result.current).to.equal(4);
		});

		it("should not update when shouldUpdate returns false", () => {
			const hook = getHook(0);
			expect(hook.result.current).to.equal(undefined);
			hook.rerender({ value: 1 });
			expect(hook.result.current).to.equal(0);
			hook.rerender({ value: 1 });
			expect(hook.result.current).to.equal(0);
		});

		it("should work with undefined values", () => {
			const hook = getHook<number | undefined>(undefined);

			expect(hook.result.current).to.equal(undefined);

			hook.rerender({ value: 1 });
			expect(hook.result.current).to.equal(undefined);

			hook.rerender({ value: undefined });
			expect(hook.result.current).to.equal(1);

			hook.rerender({ value: 2 });
			expect(hook.result.current).to.equal(undefined);
		});

		it("should receive a function that determines whether the value should be updated", () => {
			const hook = getHook<{ value: number }>({ value: 0 }, (a, b) => a?.value !== b.value);

			expect(hook.result.current).to.equal(undefined);

			hook.rerender({ value: { value: 0 } });
			expect(hook.result.current).to.be.ok();
			expect(hook.result.current!.value).to.equal(0);

			const value = { value: 1 };
			hook.rerender({ value: value });
			expect(hook.result.current).to.be.ok();
			expect(hook.result.current!.value).to.equal(0);

			hook.rerender({ value: { value: 1 } });
			expect(hook.result.current).to.equal(value);

			hook.rerender({ value: { value: 2 } });
			expect(hook.result.current).to.be.ok();
			expect(hook.result.current!.value).to.equal(1);
		});
	});
};
