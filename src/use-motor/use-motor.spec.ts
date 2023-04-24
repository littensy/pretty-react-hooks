/// <reference types="@rbxts/testez/globals" />

import { Instant, Linear } from "@rbxts/flipper";
import { renderHook } from "../utils/testez";
import { useMotor } from "./use-motor";

export = () => {
	it("should create a SingleMotor", () => {
		const { result } = renderHook(() => {
			const [value, setGoal, api] = useMotor(0, false);
			return { value, setGoal, api };
		});

		expect(result.current.value).to.be.a("table");
		expect(result.current.value.getValue()).to.equal(0);
		expect(result.current.setGoal).to.be.a("function");
		expect(result.current.api).to.be.a("table");
		expect(result.current.api.getState).to.be.a("function");
		expect(result.current.api.setState).to.be.a("function");
		expect(result.current.api.impulse).to.be.a("function");
		expect(result.current.api.motor).to.be.a("table");
	});

	it("should create a GroupMotor", () => {
		const { result } = renderHook(() => {
			const [value, setGoal, api] = useMotor({ x: 0, y: 0 }, false);
			return { value, setGoal, api };
		});

		expect(result.current.value).to.be.a("table");
		expect(result.current.value.getValue().x).to.equal(0);
		expect(result.current.value.getValue().y).to.equal(0);
		expect(result.current.setGoal).to.be.a("function");
		expect(result.current.api).to.be.a("table");
		expect(result.current.api.getState).to.be.a("function");
		expect(result.current.api.setState).to.be.a("function");
		expect(result.current.api.motor).to.be.a("table");
	});

	it("should update the binding on step", () => {
		const { result } = renderHook(() => {
			const [value, setGoal, api] = useMotor(0, false);
			return { value, setGoal, api };
		});

		expect(result.current.value.getValue()).to.equal(0);
		result.current.setGoal(new Instant(1));
		result.current.api.motor.step(1);
		expect(result.current.value.getValue()).to.equal(1);
	});

	it("should update the binding on setState", () => {
		const { result } = renderHook(() => {
			const [value, setGoal, api] = useMotor(0, false);
			return { value, setGoal, api };
		});

		result.current.setGoal(new Linear(1, { velocity: 0 }));
		result.current.api.motor.step(0);

		expect(result.current.value.getValue()).to.equal(0);
		result.current.api.setState({ value: 1 });
		result.current.api.motor.step(0);
		expect(result.current.value.getValue()).to.equal(1);
	});

	it("should return a SingleMotor impulse api", () => {
		const { result } = renderHook(() => {
			const [value, setGoal, api] = useMotor(0, false);
			return { value, setGoal, api };
		});

		result.current.setGoal(new Linear(1, { velocity: 0 }));
		result.current.api.motor.step(0);

		expect(result.current.api.getState().velocity).to.equal(0);
		result.current.api.impulse(1);
		expect(result.current.api.getState().velocity).to.equal(1);
	});

	it("should return a GroupMotor impulse api", () => {
		const { result } = renderHook(() => {
			const [value, setGoal, api] = useMotor({ x: 0, y: 0, z: 0 }, false);
			return { value, setGoal, api };
		});

		result.current.setGoal({
			x: new Linear(1, { velocity: 0 }),
			y: new Linear(2, { velocity: 0 }),
			z: new Linear(3, { velocity: 0 }),
		});
		result.current.api.motor.step(0);

		expect(result.current.api.getState().x.velocity).to.equal(0);
		expect(result.current.api.getState().y.velocity).to.equal(0);
		expect(result.current.api.getState().z.velocity).to.equal(0);

		result.current.api.impulse({ x: 1, y: 2 });
		expect(result.current.api.getState().x.velocity).to.equal(1);
		expect(result.current.api.getState().y.velocity).to.equal(2);
		expect(result.current.api.getState().z.velocity).to.equal(0);
	});

	it("should destroy the motor on unmount", () => {
		const { result, unmount } = renderHook(() => {
			const [value, setGoal, api] = useMotor(0, true);
			return { value, setGoal, api };
		});

		result.current.setGoal(new Linear(1, { velocity: 1 }));
		result.current.api.motor.step(0);

		expect(result.current.api.motor.getValue()).to.equal(0);

		task.wait(0.04);
		const value = result.current.api.motor.getValue();
		expect(value).never.to.equal(0);
		unmount();

		task.wait(0.04);
		expect(result.current.api.motor.getValue()).to.equal(value);
	});
};
