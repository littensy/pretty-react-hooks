/// <reference types="@rbxts/testez/globals" />

import { RunService, Workspace } from "@rbxts/services";
import { renderHook } from "../utils/testez";
import { useCollectionService } from "./use-collection-service";

const TEST_TAG = "TEST_TAG";

function AddTaggedInstance<T extends keyof CreatableInstances>(instanceType: T, tag: string) {
	const newInstance = new Instance(instanceType, Workspace);
	newInstance.AddTag(tag);

	RunService.Heartbeat.Wait();

	return newInstance;
}

export = () => {
	const existingChildren: Instance[] = [];

	beforeAll(() => {
		Workspace.GetChildren().forEach((it) => existingChildren.push(it));
	});

	afterEach(() => {
		const addedChildren = Workspace.GetChildren().filter((it) => !existingChildren.includes(it));
		addedChildren.forEach((it) => it.Destroy());
	});

	it("should include existing instances", () => {
		const addedInstance = AddTaggedInstance("Model", TEST_TAG);

		const { result, unmount } = renderHook(() => useCollectionService(TEST_TAG));

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});

	it("should add new instances", () => {
		const { result, unmount } = renderHook(() => useCollectionService(TEST_TAG));

		const addedInstance = AddTaggedInstance("Model", TEST_TAG);

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});

	it("should delete removed instances", () => {
		const { result, unmount } = renderHook(() => useCollectionService(TEST_TAG));

		const addedInstance = AddTaggedInstance("Model", TEST_TAG);

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);

		addedInstance.Destroy();
		RunService.Heartbeat.Wait();

		expect(result.current.size()).to.equal(0);

		unmount();
	});

	it("should ONLY include instances of the provided tag", () => {
		const { result, unmount } = renderHook(() => useCollectionService(TEST_TAG));

		const addedInstance = AddTaggedInstance("Model", TEST_TAG);
		AddTaggedInstance("Model", `NOT_${TEST_TAG}`);

		expect(result.current.size()).to.equal(1);
		expect(result.current[0]).to.equal(addedInstance);
		unmount();
	});
};
