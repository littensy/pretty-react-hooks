/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useAsyncCallback } from "./use-async-callback";

export = () => {
	it("should return the current state and a callback", () => {
		const { result } = renderHook(() => {
			const [state, callback] = useAsyncCallback(() => Promise.resolve("foo"));
			return { state, callback };
		});

		expect(result.current.state.status).to.be.equal(Promise.Status.Started);
		expect(result.current.state.value).to.never.be.ok();
		expect(result.current.state.message).to.never.be.ok();
		expect(result.current.callback).to.be.a("function");
	});

	it("should update the state when the promise resolves", () => {
		const { result } = renderHook(() => {
			const [state, callback] = useAsyncCallback(() => Promise.resolve("foo"));
			return { state, callback };
		});

		result.current.callback();
		expect(result.current.state.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.state.value).to.be.equal("foo");
		expect(result.current.state.message).to.never.be.ok();
	});

	it("should update the state when the promise rejects", () => {
		const { result } = renderHook(() => {
			const [state, callback] = useAsyncCallback(() => Promise.reject("foo"));
			return { state, callback };
		});

		result.current.callback();
		expect(result.current.state.status).to.be.equal(Promise.Status.Rejected);
		expect(result.current.state.value).to.never.be.ok();
		expect(result.current.state.message).to.be.equal("foo");
	});

	it("should cancel the previous promise", () => {
		let completions = 0;
		const { result } = renderHook(() => {
			const [state, callback] = useAsyncCallback(() => Promise.delay(0).then(() => ++completions));
			return { state, callback };
		});

		result.current.callback();
		result.current.callback();
		result.current.callback();

		expect(completions).to.be.equal(0);
		expect(result.current.state.status).to.be.equal(Promise.Status.Started);
		expect(result.current.state.value).to.never.be.ok();
		expect(result.current.state.message).to.never.be.ok();

		task.wait(0.04);
		expect(completions).to.be.equal(1);
		expect(result.current.state.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.state.value).to.be.equal(1);
		expect(result.current.state.message).to.never.be.ok();
	});

	it("should cancel when unmounting", () => {
		let completions = 0;
		const { result, unmount } = renderHook(() => {
			const [state, callback] = useAsyncCallback(() => Promise.delay(0).then(() => ++completions));
			return { state, callback };
		});

		result.current.callback();
		unmount();
		task.wait(0.04);
		expect(completions).to.be.equal(0);
	});
};
