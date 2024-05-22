/// <reference types="@rbxts/testez/globals" />

import { Lighting } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useTagged } from "./use-tagged";

const TEST_TAG = "TEST_TAG";

export = () => {
	const testInstances: Instance[] = [];

	function addTaggedInstance<T extends keyof CreatableInstances>(instanceType: T, tag: string) {
		const newInstance = new Instance(instanceType);
		newInstance.AddTag(tag);
		newInstance.Parent = Lighting;
		testInstances.push(newInstance);
		task.wait();
		return newInstance;
	}

	afterEach(() => {
		for (const instance of testInstances) {
			instance.Destroy();
		}
	});

	it("should include existing instances", () => {
		const addedInstance = addTaggedInstance("Model", TEST_TAG);

		const { result, unmount } = renderHook(() => useTagged(TEST_TAG));

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});

	it("should add new instances", () => {
		const { result, unmount } = renderHook(() => useTagged(TEST_TAG));

		const addedInstance = addTaggedInstance("Model", TEST_TAG);

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});

	it("should delete removed instances", () => {
		const { result, unmount } = renderHook(() => useTagged(TEST_TAG));

		const addedInstance = addTaggedInstance("Model", TEST_TAG);

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);

		addedInstance.Destroy();
		task.wait();

		expect(result.current.size()).to.equal(0);

		unmount();
	});

	it("should ONLY include instances of the provided tag", () => {
		const { result, unmount } = renderHook(() => useTagged(TEST_TAG));

		const addedInstance = addTaggedInstance("Model", TEST_TAG);
		addTaggedInstance("Model", `NOT_${TEST_TAG}`);

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});

	it("should not duplicate instances", () => {
		const addedInstance = addTaggedInstance("Model", TEST_TAG);
		const { result, unmount } = renderHook(() => useTagged(TEST_TAG));

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});
};
