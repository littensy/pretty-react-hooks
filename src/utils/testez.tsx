import React, { useRef } from "@rbxts/react";
import { act, createLegacyRoot } from "@rbxts/react-roblox";

export interface RenderHookResult<Result, Props> {
	/**
	 * Triggers a re-render. The props will be passed to your renderHook callback.
	 */
	rerender: (props?: Props) => void;
	/**
	 * A stable reference to the latest value returned by your renderHook callback.
	 */
	result: {
		/**
		 * The value returned by your renderHook callback.
		 */
		current: Result;
	};
	/**
	 * Unmounts the test component. This is useful for when you need to test any
	 * cleanup your useEffects have.
	 */
	unmount: () => void;
}

export interface RenderHookOptions<Props> {
	/**
	 * The container to render into. Defaults to nil, which means the component
	 * will not be mounted to a Roblox instance.
	 */
	container?: Instance;
	/**
	 * The argument passed to the renderHook callback. Can be useful if you plan
	 * to use the rerender utility to change the values passed to your hook.
	 */
	initialProps?: Props;
}

/**
 * Allows you to render a hook within a test React component without having to
 * create that component yourself.
 * @see https://github.com/testing-library/react-testing-library
 */
export function renderHook<Result, Props>(
	render: (initialProps: Props) => Result,
	options: RenderHookOptions<Props> = {},
): RenderHookResult<Result, Props> {
	const result = { current: undefined as Result };

	function TestComponent({ initialProps }: { initialProps?: Props }) {
		const previousProps = useRef(initialProps);
		const pendingResult = render(initialProps ?? previousProps.current ?? ({} as Props));

		previousProps.current = initialProps;
		result.current = pendingResult;

		return undefined!;
	}

	const root = createLegacyRoot(options.container || new Instance("Folder"));

	act(() => {
		root.render(<TestComponent initialProps={options.initialProps} />);
	});

	const rerender = (props?: Props) => {
		act(() => {
			root.render(<TestComponent initialProps={props} />);
		});
	};

	const unmount = () => {
		act(() => root.unmount());
	};

	return { rerender, result, unmount };
}
