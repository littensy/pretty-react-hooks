/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useUnmountEffect } from "./use-unmount-effect";

export = () => {
	it("should call when component unmounts", () => {
		let called = false;
		const { unmount } = renderHook(() => useUnmountEffect(() => (called = true)));
		expect(called).to.equal(false);
		unmount();
		expect(called).to.equal(true);
	});

	it("should not call on rerender", () => {
		let called = false;
		const { rerender } = renderHook(() => useUnmountEffect(() => (called = true)));
		expect(called).to.equal(false);
		rerender();
		expect(called).to.equal(false);
	});

	it("should call the last callback on unmount", () => {
		let called = 0;
		const { rerender, unmount } = renderHook((callback: () => void) => useUnmountEffect(callback), {
			initialProps: () => (called = 0),
		});
		rerender(() => (called += 1));
		unmount();
		expect(called).to.equal(1);
	});
};
