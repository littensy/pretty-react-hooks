/// <reference types="@rbxts/testez/globals" />

import { RunService } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useDeferCallback } from "./use-defer-callback";

export = () => {
	const wait = () => {
		RunService.Heartbeat.Wait();
		RunService.Heartbeat.Wait();
	};

	it("should return a callback and a cancel function", () => {
		const { result } = renderHook(() => {
			const [callback, cancel] = useDeferCallback(() => {});
			return { callback, cancel };
		});

		expect(result.current.callback).to.be.a("function");
		expect(result.current.cancel).to.be.a("function");
	});

	it("should execute the callback on the next heartbeat", () => {
		let calls = 0;

		const { result } = renderHook(() => {
			const [callback] = useDeferCallback(() => calls++);
			return { callback };
		});

		result.current.callback();
		expect(calls).to.equal(0);

		wait();
		expect(calls).to.equal(1);
	});

	it("should return a function that cancels the callback", () => {
		let calls = 0;

		const { result } = renderHook(() => {
			const [callback, cancel] = useDeferCallback(() => calls++);
			return { callback, cancel };
		});

		result.current.callback();
		expect(calls).to.equal(0);

		result.current.cancel();
		wait();
		expect(calls).to.equal(0);
	});

	it("should cancel the previous callback when called again", () => {
		let calls = 0;

		const { result } = renderHook(() => {
			const [callback] = useDeferCallback(() => calls++);
			return { callback };
		});

		result.current.callback();
		result.current.callback();
		result.current.callback();
		expect(calls).to.equal(0);

		wait();
		expect(calls).to.equal(1);
	});

	it("should execute the callback with the latest arguments", () => {
		let calls = 0;

		const { result } = renderHook(() => {
			const [callback] = useDeferCallback((value: number) => (calls += value));
			return { callback };
		});

		result.current.callback(1);
		result.current.callback(2);
		result.current.callback(3);
		expect(calls).to.equal(0);

		wait();
		expect(calls).to.equal(3);
	});
};
