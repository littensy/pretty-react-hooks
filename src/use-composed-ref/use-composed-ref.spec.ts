/// <reference types="@rbxts/testez/globals" />

import { shallowEqual } from "../utils/shallow-equal";
import { renderHook } from "../utils/testez";
import { RefFunction, useComposedRef } from "./use-composed-ref";

export = () => {
	it("should call all refs passed in", () => {
		const results: string[] = [];

		const { rerender, result } = renderHook(() => {
			const ref = useComposedRef<string>(
				(value = "") => (results[0] = value),
				(value = "") => (results[1] = value),
				(value = "") => (results[2] = value),
			);

			return ref;
		});

		expect(shallowEqual(results, [])).to.equal(true);

		rerender();
		expect(shallowEqual(results, [])).to.equal(true);

		result.current("foo");
		expect(shallowEqual(results, ["foo", "foo", "foo"])).to.equal(true);
	});

	it("should skip refs that are undefined", () => {
		const results: (string | undefined)[] = [];

		const { rerender, result } = renderHook(() => {
			return useComposedRef<string>(
				(value) => (results[0] = value),
				undefined,
				(value) => (results[1] = value),
				undefined,
				(value) => (results[2] = value),
			);
		});

		expect(shallowEqual(results, [])).to.equal(true);

		rerender();
		expect(shallowEqual(results, [])).to.equal(true);

		result.current("foo");
		expect(shallowEqual(results, ["foo", "foo", "foo"])).to.equal(true);
	});

	it("should call the latest refs", () => {
		const calls = { a: 0, b: 0 };

		const { rerender, result } = renderHook(
			(refs) => {
				return useComposedRef(...refs);
			},
			{ initialProps: [] as RefFunction<keyof typeof calls>[] },
		);

		rerender([(key = "a") => calls[key]++, (key = "a") => calls[key]++]);
		result.current("a");
		expect(calls.a).to.equal(2);
		expect(calls.b).to.equal(0);

		rerender([(key = "b") => calls[key]++, (key = "b") => calls[key]++]);
		result.current("b");
		expect(calls.a).to.equal(2);
		expect(calls.b).to.equal(2);
	});
};
