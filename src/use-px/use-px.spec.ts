/// <reference types="@rbxts/testez/globals" />

import { renderHook } from "../utils/testez";
import { usePx } from "./use-px";

export = () => {
	it("should return functions", () => {
		const { result, unmount } = renderHook(() => usePx());

		expect(result.current(0)).to.be.a("number");
		expect(result.current.ceil).to.be.a("function");
		expect(result.current.even).to.be.a("function");
		expect(result.current.floor).to.be.a("function");
		expect(result.current.scale).to.be.a("function");

		unmount();
	});

	it("should all return numbers", () => {
		const { result, unmount } = renderHook(() => usePx());

		expect(result.current(1)).to.be.a("number");
		expect(result.current.ceil(1)).to.be.a("number");
		expect(result.current.even(1)).to.be.a("number");
		expect(result.current.floor(1)).to.be.a("number");
		expect(result.current.scale(1)).to.be.a("number");

		unmount();
	});
};
