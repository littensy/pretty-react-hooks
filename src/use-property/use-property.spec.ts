/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useProperty } from "./use-property";

export = () => {
	let frame = new Instance("Frame");

	beforeEach(() => {
		frame.Destroy();
		frame = new Instance("Frame");
	});

	afterAll(() => {
		frame.Destroy();
	});

	it("should return an events object", () => {
		const { result } = renderHook(() => {
			const [size, events] = useProperty("frame", "Size");
			return { size, events };
		});

		expect(result.current.events).to.be.a("table");
		expect(result.current.events.Size).to.be.a("function");
	});

	it("should set the property", () => {
		const { result } = renderHook(() => {
			const [size, events] = useProperty("frame", "Size");
			return { size, events };
		});

		expect(result.current.size).to.equal(undefined);
		result.current.events.Size(frame);
		expect(result.current.size).to.equal(frame.Size);
	});

	it("should set the property to the correct value", () => {
		const { result } = renderHook(() => {
			const [size, events] = useProperty("frame", "Size");
			return { size, events };
		});

		expect(result.current.size).to.equal(undefined);
		result.current.events.Size(frame);
		expect(result.current.size).to.equal(frame.Size);
		frame.Size = new UDim2(1, 0, 1, 0);
		result.current.events.Size(frame);
		expect(result.current.size).to.equal(frame.Size);
	});

	it("should receive more than one property", () => {
		const { result } = renderHook(() => {
			const [size, position, events] = useProperty("frame", "Size", "Position");
			return { size, position, events };
		});

		expect(result.current.size).to.equal(undefined);
		expect(result.current.position).to.equal(undefined);
		result.current.events.Size(frame);
		result.current.events.Position(frame);
		expect(result.current.size).to.equal(frame.Size);
		expect(result.current.position).to.equal(frame.Position);

		frame.Size = new UDim2(1, 0, 1, 0);
		frame.Position = new UDim2(1, 0, 1, 0);
		result.current.events.Size(frame);
		result.current.events.Position(frame);
		expect(result.current.size).to.equal(frame.Size);
		expect(result.current.position).to.equal(frame.Position);
	});

	it("should support undefined properties", () => {
		const { result } = renderHook(() => {
			const [parent, size, events] = useProperty("frame", "Parent", "Size");
			return { parent, size, events };
		});

		expect(result.current.parent).to.equal(undefined);
		expect(result.current.size).to.equal(undefined);
		result.current.events.Parent(frame);
		result.current.events.Size(frame);
		expect(result.current.parent).to.equal(undefined);
		expect(result.current.size).to.equal(frame.Size);
		frame.Parent = game;
		result.current.events.Parent(frame);
		expect(result.current.parent).to.equal(game);
		expect(result.current.size).to.equal(frame.Size);
	});
};
