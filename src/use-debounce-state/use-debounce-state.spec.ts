/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useDebounceState } from "./use-debounce-state";

export = () => {
	it("should debounce the state", () => {
		const { result, unmount } = renderHook(() => {
			const [state, setState] = useDebounceState(0, { wait: 0.02 });
			return { state, setState };
		});

		expect(result.current.state).to.equal(0);
		result.current.setState(0);
		result.current.setState(1);
		result.current.setState(0);
		result.current.setState(1);
		expect(result.current.state).to.equal(0);

		task.wait(0.03);
		expect(result.current.state).to.equal(1);
		result.current.setState(2);
		expect(result.current.state).to.equal(1);

		task.wait(0.03);
		expect(result.current.state).to.equal(2);
		result.current.setState(2);
		expect(result.current.state).to.equal(2);

		task.wait(0.03);
		expect(result.current.state).to.equal(2);
		result.current.setState(3);
		expect(result.current.state).to.equal(2);
		result.current.setState(4);
		expect(result.current.state).to.equal(2);

		task.wait(0.03);
		expect(result.current.state).to.equal(4);

		unmount();
	});
};
