/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useAsync } from "./use-async";

export = () => {
	it("should run the promise on mount", () => {
		const { result } = renderHook(() => {
			const [value, status, message] = useAsync(() => Promise.resolve("foo"));
			return { value, status, message };
		});
		expect(result.current.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.value).to.be.equal("foo");
		expect(result.current.message).to.never.be.ok();
	});

	it("should run the promise when the dependencies change", () => {
		const { result, rerender } = renderHook(
			(deps: unknown[]) => {
				const [value, status, message] = useAsync(() => Promise.resolve(deps[0]), [deps]);
				return { value, status, message };
			},
			{ initialProps: [0] },
		);

		expect(result.current.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.value).to.be.equal(0);
		expect(result.current.message).to.never.be.ok();

		rerender([1]);
		expect(result.current.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.value).to.be.equal(1);
		expect(result.current.message).to.never.be.ok();
	});

	it("should cancel the previous promise", () => {
		let completions = 0;
		const { result, rerender } = renderHook(
			(deps: unknown[]) => {
				const [value, status, message] = useAsync(() => Promise.delay(0).then(() => ++completions), [deps]);
				return { value, status, message };
			},
			{ initialProps: [0] },
		);

		rerender([1]);
		rerender([2]);
		rerender([3]);

		expect(completions).to.be.equal(0);
		expect(result.current.status).to.be.equal(Promise.Status.Started);
		expect(result.current.value).to.never.be.ok();
		expect(result.current.message).to.never.be.ok();

		task.wait(0.04);
		expect(completions).to.be.equal(1);
		expect(result.current.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.value).to.be.equal(1);
		expect(result.current.message).to.never.be.ok();
	});

	it("should update the state when the promise resolves", () => {
		const { result } = renderHook(() => {
			const [value, status, message] = useAsync(() => Promise.delay(0).then(() => "foo"));
			return { value, status, message };
		});

		expect(result.current.status).to.be.equal(Promise.Status.Started);
		expect(result.current.value).to.never.be.ok();
		expect(result.current.message).to.never.be.ok();

		task.wait(0.04);
		expect(result.current.status).to.be.equal(Promise.Status.Resolved);
		expect(result.current.value).to.be.equal("foo");
		expect(result.current.message).to.never.be.ok();
	});

	it("should cancel the promise on unmount", () => {
		let completions = 0;
		const { unmount } = renderHook(() => {
			useAsync(() => Promise.delay(0).then(() => ++completions));
		});

		unmount();
		task.wait(0.04);
		expect(completions).to.be.equal(0);
	});
};
