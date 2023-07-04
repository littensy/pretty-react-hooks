/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useLifetime } from "./use-lifetime";

export = () => {
	it("should return the lifetime of the component", () => {
		const { result, unmount } = renderHook(() => useLifetime());

		expect(result.current.getValue()).to.equal(0);

		const timePassed = task.wait(0.1);
		expect(result.current.getValue()).to.be.near(timePassed, 0.05);

		unmount();
	});

	it("should reset when dependencies change", () => {
		const { result, rerender, unmount } = renderHook((props: { value: number }) => useLifetime([props.value]), {
			initialProps: { value: 0 },
		});

		expect(result.current.getValue()).to.equal(0);

		const timePassed = task.wait(0.1);
		rerender({ value: 0 });
		expect(result.current.getValue()).to.be.near(timePassed, 0.05);

		rerender({ value: 1 });
		expect(result.current.getValue()).to.equal(0);

		unmount();
	});
};
