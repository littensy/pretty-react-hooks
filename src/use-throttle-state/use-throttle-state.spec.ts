/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { useThrottleState } from "./use-throttle-state";

export = () => {
	it("should throttle the state", () => {
		const { result, unmount } = renderHook(() => {
			const [state, setState] = useThrottleState(0, { wait: 0.06 });
			return { state, setState };
		});

		result.current.setState(1);
		expect(result.current.state).to.equal(1);
		result.current.setState(1);
		result.current.setState(1);
		result.current.setState(1);
		expect(result.current.state).to.equal(1);

		task.wait(0.04);
		result.current.setState(2);
		expect(result.current.state).to.equal(1);

		task.wait(0.03);
		result.current.setState(2);
		expect(result.current.state).to.equal(2);
		result.current.setState(3);
		result.current.setState(3);

		task.wait(0.065);
		expect(result.current.state).to.equal(3);
		unmount();
	});
};
