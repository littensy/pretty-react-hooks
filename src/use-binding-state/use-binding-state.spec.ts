/// <reference types="@rbxts/testez/globals" />

import { createBinding } from "@rbxts/roact";
import { renderHook } from "../utils/testez";
import { useBindingState } from "./use-binding-state";

export = () => {
	it("should return the current value", () => {
		const [binding] = createBinding(0);
		const { result } = renderHook(() => useBindingState(binding));
		expect(result.current).to.equal(0);
	});

	it("should update the value when the binding updates", () => {
		const [binding, setBinding] = createBinding(0);
		const { result } = renderHook(() => useBindingState(binding));
		expect(result.current).to.equal(0);
		setBinding(1);
		expect(result.current).to.equal(1);
	});

	it("should not update the value after unrelated rerender", () => {
		const [binding] = createBinding(0);
		const { result, rerender } = renderHook(() => useBindingState(binding));
		expect(result.current).to.equal(0);
		rerender();
		expect(result.current).to.equal(0);
	});

	it("should not update the value if the binding changes", () => {
		const [binding] = createBinding(0);
		const { result, rerender } = renderHook(({ binding }) => useBindingState(binding), {
			initialProps: { binding },
		});
		expect(result.current).to.equal(0);
		rerender({ binding: createBinding(1)[0] });
		expect(result.current).to.equal(0);
	});
};
