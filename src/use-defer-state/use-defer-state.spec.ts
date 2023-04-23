/// <reference types="@rbxts/testez/globals" />

import { RunService } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useDeferState } from "./use-defer-state";

export = () => {
	const wait = () => {
		RunService.Heartbeat.Wait();
		RunService.Heartbeat.Wait();
	};

	it("should return the state and a setter", () => {
		const { result } = renderHook(() => {
			const [state, setState] = useDeferState(0);
			return { state, setState };
		});

		expect(result.current.state).to.equal(0);
		expect(result.current.setState).to.be.a("function");
	});

	it("should update the state on heartbeat", () => {
		const { result } = renderHook(() => {
			const [state, setState] = useDeferState(0);
			return { state, setState };
		});

		result.current.setState(1);
		expect(result.current.state).to.equal(0);

		wait();
		expect(result.current.state).to.equal(1);
	});

	it("should only update the state once per frame", () => {
		const { result } = renderHook(() => {
			const [state, setState] = useDeferState(0);
			return { state, setState };
		});

		result.current.setState(1);
		result.current.setState(2);
		result.current.setState(3);
		expect(result.current.state).to.equal(0);

		wait();
		expect(result.current.state).to.equal(3);
	});

	it("should receive a function to update state", () => {
		const { result } = renderHook(() => {
			const [state, setState] = useDeferState(0);
			return { state, setState };
		});

		result.current.setState((state) => state + 1);
		result.current.setState((state) => state + 1);
		result.current.setState((state) => state + 1);
		expect(result.current.state).to.equal(0);

		wait();
		expect(result.current.state).to.equal(3);
	});

	it("should only rerender once per frame", () => {
		let renderCount = 0;
		const { result } = renderHook(() => {
			const [state, setState] = useDeferState(0);
			renderCount++;
			return { state, setState };
		});

		expect(renderCount).to.equal(1);

		result.current.setState((state) => state + 1);
		result.current.setState((state) => state + 1);
		result.current.setState((state) => state + 1);
		expect(renderCount).to.equal(1);

		wait();
		expect(renderCount).to.equal(2);
	});

	it("should cancel the update on unmount", () => {
		const { result, unmount } = renderHook(() => {
			const [state, setState] = useDeferState(0);
			return { state, setState };
		});

		result.current.setState(1);
		expect(result.current.state).to.equal(0);

		unmount();
		wait();
		expect(result.current.state).to.equal(0);
	});
};
