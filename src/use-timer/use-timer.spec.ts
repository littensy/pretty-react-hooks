/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useTimer } from "./use-timer";

export = () => {
	it("should start the timer on mount", () => {
		const { result, unmount } = renderHook(() => useTimer());

		expect(result.current.value.getValue()).to.equal(0);

		const timePassed = task.wait(0.2);
		expect(result.current.value.getValue()).to.be.near(timePassed, 0.08);

		unmount();
	});

	it("should return functions to start and stop the timer", () => {
		const { result, unmount } = renderHook(() => useTimer());

		expect(result.current.value.getValue()).to.equal(0);

		const timePassed = task.wait(0.2);
		const timerValue = result.current.value.getValue();
		expect(timerValue).to.be.near(timePassed, 0.08);

		result.current.stop();

		task.wait(0.2);
		expect(result.current.value.getValue()).to.equal(timerValue);

		result.current.start();

		const timePassedAfterStart = task.wait(0.2);
		expect(result.current.value.getValue()).to.be.near(timePassed + timePassedAfterStart, 0.08);

		unmount();
	});

	it("should return a function to set the timer", () => {
		const { result, unmount } = renderHook(() => useTimer());

		expect(result.current.value.getValue()).to.equal(0);

		const timePassed = task.wait(0.2);
		expect(result.current.value.getValue()).to.be.near(timePassed, 0.08);

		result.current.reset();
		expect(result.current.value.getValue()).to.equal(0);

		result.current.set(1);
		expect(result.current.value.getValue()).to.equal(1);

		const timePassedAfterSet = task.wait(0.2);
		expect(result.current.value.getValue()).to.be.near(timePassedAfterSet + 1, 0.08);

		unmount();
	});
};
