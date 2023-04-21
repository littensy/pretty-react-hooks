/// <reference types="@rbxts/testez/globals" />

import { createBinding } from "@rbxts/roact";
import { renderHook } from "../utils/testez";
import { useBindingEffect } from "./use-binding-effect";

export = () => {
	it("should call effect on mount", () => {
		const [binding] = createBinding(0);
		let result: number | undefined;

		renderHook(({ effect }) => useBindingEffect(binding, effect), {
			initialProps: { effect: (value: number) => (result = value) },
		});

		expect(result).to.equal(0);
	});

	it("should call effect when the binding updates", () => {
		const [binding, setBinding] = createBinding(0);
		let result: number | undefined;

		const { rerender } = renderHook(({ effect }) => useBindingEffect(binding, effect), {
			initialProps: { effect: (value: number) => (result = value) },
		});

		expect(result).to.equal(0);

		setBinding(1);
		rerender();
		expect(result).to.equal(1);
	});

	it("should not call effect after unrelated rerender", () => {
		const [binding] = createBinding(0);

		const { rerender } = renderHook(({ effect }) => useBindingEffect(binding, effect), {
			initialProps: { effect: () => {} },
		});

		rerender({
			effect: () => {
				throw "Effect was called when the binding did not update";
			},
		});

		rerender();
	});

	it("should not call effect if the effect changes", () => {
		const [binding] = createBinding(0);

		const { rerender } = renderHook(({ effect }) => useBindingEffect(binding, effect), {
			initialProps: { effect: () => {} },
		});

		rerender({
			effect: () => {
				throw "Effect was called when the effect changed";
			},
		});

		rerender();
	});

	it("should call effect if the passed binding changes", () => {
		const [bindingA] = createBinding(0);
		const [bindingB] = createBinding(1);
		let result: number | undefined;

		const { rerender } = renderHook(
			({ binding }) => useBindingEffect(binding, (value: number) => (result = value)),
			{ initialProps: { binding: bindingA } },
		);

		expect(result).to.equal(0);

		rerender({ binding: bindingB });
		expect(result).to.equal(1);
	});

	it("should call effect if passed value changes", () => {
		let result: number | undefined;

		const { rerender } = renderHook(({ value }) => useBindingEffect(value, (value: number) => (result = value)), {
			initialProps: { value: 0 },
		});

		expect(result).to.equal(0);

		rerender({ value: 1 });
		expect(result).to.equal(1);
	});
};
