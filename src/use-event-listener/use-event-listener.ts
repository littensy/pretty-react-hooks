import { useEffect } from "@rbxts/roact-hooked";
import { useLatest } from "../use-latest";

interface EventListenerOptions {
	/**
	 * Whether the event should be connected or not. Defaults to `true`.
	 */
	connected?: boolean;
	/**
	 * Whether the event should be disconnected after the first invocation.
	 * Defaults to `false`.
	 */
	once?: boolean;
}

type EventLike<T extends Callback = Callback> =
	| { Connect(callback: T): ConnectionLike }
	| { connect(callback: T): ConnectionLike }
	| { subscribe(callback: T): ConnectionLike };

type ConnectionLike = { Disconnect(): void } | { disconnect(): void } | (() => void);

const connect = (event: EventLike, callback: Callback): ConnectionLike => {
	if (typeIs(event, "RBXScriptSignal") || "Connect" in event) {
		return event.Connect(callback);
	} else if ("connect" in event) {
		return event.connect(callback);
	} else if ("subscribe" in event) {
		return event.subscribe(callback);
	} else {
		throw "Event-like object does not have a supported connect method.";
	}
};

const disconnect = (connection: ConnectionLike) => {
	if (typeIs(connection, "function")) {
		connection();
	} else if (typeIs(connection, "RBXScriptConnection") || "Disconnect" in connection) {
		connection.Disconnect();
	} else if ("disconnect" in connection) {
		connection.disconnect();
	} else {
		throw "Connection-like object does not have a supported disconnect method.";
	}
};

/**
 * Subscribes to an event-like object. The subscription is automatically
 * disconnected when the component unmounts.
 *
 * If the listener is `undefined`, the event will not be subscribed to, and the
 * subscription will be disconnected if it was previously connected.
 *
 * The listener is memoized, so it is safe to pass a callback that is recreated
 * on every render.
 *
 * @param event The event-like object to subscribe to.
 * @param listener The listener to subscribe with.
 * @param options Options for the subscription.
 */
export function useEventListener<T extends EventLike>(
	event: T,
	listener?: T extends EventLike<infer U> ? U : never,
	options: EventListenerOptions = {},
) {
	const listenerRef = useLatest(listener);

	useEffect(() => {
		if (!listener || !options.connected) {
			return;
		}

		let connected = true;

		const connection = connect(event, (...args: unknown[]) => {
			if (options.once) {
				disconnect(connection);
				connected = false;
			}
			listenerRef.current?.(...args);
		});

		return () => {
			if (connected) {
				disconnect(connection);
			}
		};
	}, [event, options.connected ?? true, listener !== undefined]);
}
