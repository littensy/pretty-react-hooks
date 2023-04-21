import Roact from "@rbxts/roact";
import { useEffect, withHookDetection } from "@rbxts/roact-hooked";

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

	function TestComponent({ initialProps = {} as Props }: { initialProps?: Props }) {
		const pendingResult = render(initialProps);

		useEffect(() => {
			result.current = pendingResult;
		});

		return undefined!;
	}

	withHookDetection(Roact);

	const handle = Roact.mount(<TestComponent initialProps={options.initialProps} />, options.container);

	const rerender = (props?: Props) => {
		Roact.update(handle, <TestComponent initialProps={props} />);
	};

	const unmount = () => {
		Roact.unmount(handle);
	};

	return { rerender, result, unmount };
}
