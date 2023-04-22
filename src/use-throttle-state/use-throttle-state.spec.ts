/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useThrottleState } from "./use-throttle-state";

export = () => {
	it("should throttle the state", () => {
		const { result, unmount } = renderHook(() => {
			const [state, setState] = useThrottleState(0, { wait: 0.03 });
			return { state, setState };
		});

		result.current.setState(1);
		expect(result.current.state).to.equal(1);
		result.current.setState(1);
		result.current.setState(1);
		result.current.setState(1);
		expect(result.current.state).to.equal(1);

		task.wait(0.02);
		result.current.setState(2);
		expect(result.current.state).to.equal(1);

		task.wait(0.015);
		result.current.setState(2);
		expect(result.current.state).to.equal(2);
		result.current.setState(3);
		result.current.setState(3);

		task.wait(0.035);
		expect(result.current.state).to.equal(3);
		unmount();
	});
};
