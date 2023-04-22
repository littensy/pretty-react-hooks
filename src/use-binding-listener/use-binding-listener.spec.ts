/// <reference types="@rbxts/testez/globals" />

import { createBinding } from "@rbxts/roact";
import { renderHook } from "../utils/testez";
import { useBindingListener } from "./use-binding-listener";

export = () => {
	it("should call listener on mount", () => {
		const [binding] = createBinding(0);
		let result: number | undefined;

		renderHook(({ listener }) => useBindingListener(binding, listener), {
			initialProps: { listener: (value: number) => (result = value) },
		});

		expect(result).to.equal(0);
	});

	it("should call listener when the binding updates", () => {
		const [binding, setBinding] = createBinding(0);
		let result: number | undefined;

		const { rerender } = renderHook(({ listener }) => useBindingListener(binding, listener), {
			initialProps: { listener: (value: number) => (result = value) },
		});

		expect(result).to.equal(0);

		setBinding(1);
		rerender();
		expect(result).to.equal(1);
	});

	it("should not call listener after unrelated rerender", () => {
		const [binding] = createBinding(0);

		const { rerender } = renderHook(({ listener }) => useBindingListener(binding, listener), {
			initialProps: { listener: () => {} },
		});

		rerender({
			listener: () => {
				throw "listener was called when the binding did not update";
			},
		});

		rerender();
	});

	it("should not call listener if the listener changes", () => {
		const [binding] = createBinding(0);

		const { rerender } = renderHook(({ listener }) => useBindingListener(binding, listener), {
			initialProps: { listener: () => {} },
		});

		rerender({
			listener: () => {
				throw "listener was called when the listener changed";
			},
		});

		rerender();
	});

	it("should call listener if the passed binding changes", () => {
		const [bindingA] = createBinding(0);
		const [bindingB] = createBinding(1);
		let result: number | undefined;

		const { rerender } = renderHook(
			({ binding }) => useBindingListener(binding, (value: number) => (result = value)),
			{ initialProps: { binding: bindingA } },
		);

		expect(result).to.equal(0);

		rerender({ binding: bindingB });
		expect(result).to.equal(1);
	});

	it("should call listener if passed value changes", () => {
		let result: number | undefined;

		const { rerender } = renderHook(({ value }) => useBindingListener(value, (value: number) => (result = value)), {
			initialProps: { value: 0 },
		});

		expect(result).to.equal(0);

		rerender({ value: 1 });
		expect(result).to.equal(1);
	});
};
