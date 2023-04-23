/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { usePropertyBinding } from "./use-property-binding";

export = () => {
	let frame = new Instance("Frame");

	beforeEach(() => {
		frame.Destroy();
		frame = new Instance("Frame");
	});

	afterAll(() => {
		frame.Destroy();
	});

	it("should return a binding and events object", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("frame", "Size");
			return { binding, events };
		});

		expect(result.current.binding).to.be.a("table");
		expect(result.current.events).to.be.a("table");
		expect(result.current.events.Size).to.be.a("function");
	});

	it("should set the property", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("frame", "Size");
			return { binding, events };
		});

		expect(result.current.binding.getValue()[0]).to.equal(undefined);
		result.current.events.Size(frame);
		expect(result.current.binding.getValue()[0]).to.equal(frame.Size);
	});

	it("should set the property to the correct value", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("frame", "Size");
			return { binding, events };
		});

		expect(result.current.binding.getValue()[0]).to.equal(undefined);
		result.current.events.Size(frame);
		expect(result.current.binding.getValue()[0]).to.equal(frame.Size);
		frame.Size = new UDim2(1, 0, 1, 0);
		result.current.events.Size(frame);
		expect(result.current.binding.getValue()[0]).to.equal(frame.Size);
	});

	it("should receive more than one property", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("frame", "Size", "Position");
			return { binding, events };
		});

		expect(result.current.binding.getValue()[0]).to.equal(undefined);
		expect(result.current.binding.getValue()[1]).to.equal(undefined);
		result.current.events.Size(frame);
		result.current.events.Position(frame);
		expect(result.current.binding.getValue()[0]).to.equal(frame.Size);
		expect(result.current.binding.getValue()[1]).to.equal(frame.Position);

		frame.Size = new UDim2(1, 0, 1, 0);
		frame.Position = new UDim2(1, 0, 1, 0);
		result.current.events.Size(frame);
		result.current.events.Position(frame);
		expect(result.current.binding.getValue()[0]).to.equal(frame.Size);
		expect(result.current.binding.getValue()[1]).to.equal(frame.Position);
	});

	it("should support undefined properties", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("frame", "Parent", "Size");
			return { binding, events };
		});

		expect(result.current.binding.getValue()[0]).to.equal(undefined);
		expect(result.current.binding.getValue()[1]).to.equal(undefined);
		result.current.events.Parent(frame);
		result.current.events.Size(frame);
		expect(result.current.binding.getValue()[0]).to.equal(undefined);
		expect(result.current.binding.getValue()[1]).to.equal(frame.Size);
		frame.Parent = game;
		result.current.events.Parent(frame);
		expect(result.current.binding.getValue()[0]).to.equal(game);
		expect(result.current.binding.getValue()[1]).to.equal(frame.Size);
	});
};
