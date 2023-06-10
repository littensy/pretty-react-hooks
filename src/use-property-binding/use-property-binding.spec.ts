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

	it("should return bindings and events object", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("Size");
			return { binding, events };
		});

		expect(result.current.binding).to.be.a("table");
		expect(result.current.events).to.be.a("table");
		expect(result.current.events.Size).to.be.a("function");
	});

	it("should set the property", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("Size");
			return { binding, events };
		});

		expect(result.current.binding.getValue()).to.equal(undefined);

		result.current.events.Size(frame);
		expect(result.current.binding.getValue()).to.equal(frame.Size);
	});

	it("should set the property to the correct value", () => {
		const { result } = renderHook(() => {
			const [binding, events] = usePropertyBinding("Size");
			return { binding, events };
		});

		expect(result.current.binding.getValue()).to.equal(undefined);

		result.current.events.Size(frame);
		expect(result.current.binding.getValue()).to.equal(frame.Size);

		frame.Size = new UDim2(1, 0, 1, 0);
		result.current.events.Size(frame);
		expect(result.current.binding.getValue()).to.equal(frame.Size);
	});

	it("should receive more than one property", () => {
		const { result } = renderHook(() => {
			const [size, position, events] = usePropertyBinding("Size", "Position");
			return { size, position, events };
		});

		expect(result.current.size.getValue()).to.equal(undefined);
		expect(result.current.position.getValue()).to.equal(undefined);

		result.current.events.Size(frame);
		result.current.events.Position(frame);
		expect(result.current.size.getValue()).to.equal(frame.Size);
		expect(result.current.position.getValue()).to.equal(frame.Position);

		frame.Size = new UDim2(1, 0, 1, 0);
		frame.Position = new UDim2(1, 0, 1, 0);
		result.current.events.Size(frame);
		result.current.events.Position(frame);
		expect(result.current.size.getValue()).to.equal(frame.Size);
		expect(result.current.position.getValue()).to.equal(frame.Position);
	});

	it("should support undefined properties", () => {
		const { result } = renderHook(() => {
			const [parent, size, events] = usePropertyBinding("Parent", "Size");
			return { parent, size, events };
		});

		expect(result.current.parent.getValue()).to.equal(undefined);
		expect(result.current.size.getValue()).to.equal(undefined);

		result.current.events.Parent(frame);
		result.current.events.Size(frame);
		expect(result.current.parent.getValue()).to.equal(undefined);
		expect(result.current.size.getValue()).to.equal(frame.Size);

		frame.Parent = game;
		result.current.events.Parent(frame);
		expect(result.current.parent.getValue()).to.equal(game);
		expect(result.current.size.getValue()).to.equal(frame.Size);
	});

	it("should memoize the bindings and events", () => {
		const { result, rerender } = renderHook((props: { name?: "Size" | "Position" }) => {
			const [binding, events] = usePropertyBinding(props.name || "Size");
			return { binding, events };
		});

		const binding = result.current.binding;
		const events = result.current.events;

		rerender();
		expect(result.current.binding).to.equal(binding);
		expect(result.current.events).to.equal(events);

		rerender({ name: "Position" });
		expect(result.current.binding).to.never.equal(binding);
		expect(result.current.events).to.never.equal(events);
	});
};
