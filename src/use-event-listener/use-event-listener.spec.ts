/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useEventListener } from "./use-event-listener";

function createSignal<T extends unknown[] = []>() {
	const listeners = new Set<(...args: T) => void>();

	return {
		listeners() {
			return listeners;
		},

		connect(listener: (...args: T) => void) {
			listeners.add(listener);
			return () => listeners.delete(listener);
		},

		fire(...args: T) {
			for (const listener of listeners) {
				listener(...args);
			}
		},
	};
}

export = () => {
	it("should connect on mount", () => {
		const signal = createSignal();
		const { unmount } = renderHook(() => useEventListener(signal, () => {}));

		expect(signal.listeners().size()).to.equal(1);
		unmount();
	});

	it("should disconnect on unmount", () => {
		const signal = createSignal();
		const { unmount } = renderHook(() => useEventListener(signal, () => {}));

		unmount();
		expect(signal.listeners().size()).to.equal(0);
	});

	it("should clean up old connections", () => {
		const signalA = createSignal();
		const signalB = createSignal();
		const { rerender, unmount } = renderHook(
			({ signal }: { signal: ReturnType<typeof createSignal> }) => useEventListener(signal, () => {}),
			{ initialProps: { signal: signalA } },
		);

		rerender({ signal: signalB });
		expect(signalA.listeners().size()).to.equal(0);
		expect(signalB.listeners().size()).to.equal(1);

		rerender({ signal: signalA });
		expect(signalA.listeners().size()).to.equal(1);
		expect(signalB.listeners().size()).to.equal(0);

		unmount();
		expect(signalA.listeners().size()).to.equal(0);
		expect(signalB.listeners().size()).to.equal(0);
	});

	it("should call listener on event", () => {
		const signal = createSignal<[number]>();
		let result: number | undefined;

		const { unmount } = renderHook(() => useEventListener(signal, (value) => (result = value)));

		signal.fire(0);
		expect(result).to.equal(0);

		signal.fire(1);
		expect(result).to.equal(1);

		unmount();
	});

	it("should receive a 'once' option", () => {
		const signal = createSignal();
		let calls = 0;

		const { rerender, unmount } = renderHook(() => useEventListener(signal, () => calls++, { once: true }));

		signal.fire();
		rerender();
		signal.fire();
		rerender();
		signal.fire();
		expect(calls).to.equal(1);
		unmount();
	});

	it("should receive a 'connected' option", () => {
		const signal = createSignal();
		let calls = 0;

		const { rerender, unmount } = renderHook(
			({ connected }) => useEventListener(signal, () => calls++, { connected }),
			{ initialProps: { connected: true } },
		);

		signal.fire();
		rerender({ connected: false });
		signal.fire();
		rerender({ connected: true });
		signal.fire();
		expect(calls).to.equal(2);
		unmount();
	});
};
