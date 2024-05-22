import { useState, useCallback, useEffect } from "@rbxts/react";
import { useEventListener } from "../use-event-listener";
import { CollectionService } from "@rbxts/services";

/**
 * Wrapper around `CollectionService` that provides a list of `Instance` under the given `tag`.
 *
 * This list is updated as `Instance` are added and removed. You can also cast the `Instance` to the expected type.
 *
 * ```ts
 * const zombies = useCollectionService<ZombieModel>("zombie");
 * ```
 *
 * @param tag The `CollectionService` tag name to filter against.
 * @type T An optional subtype of `Instance` to cast the tagged children to.
 * @returns A stateful list of `Instance` matching the provided `tag`.
 */
export function useCollectionService<T extends Instance>(tag: string) {
	const [instances, setInstances] = useState<ReadonlyArray<T>>([]);

	const addInstance = useCallback((...newInstances: Instance[]) => {
		setInstances((prevInstances) => {
			const updatedInstances = new Set(prevInstances);
			newInstances.forEach((it) => updatedInstances.add(it as T));
			return [...updatedInstances];
		});
	}, []);

	const removeInstance = useCallback((instance: Instance) => {
		setInstances((prevInstances) => {
			const updatedInstances = new Set(prevInstances);
			updatedInstances.delete(instance as T);
			return [...updatedInstances];
		});
	}, []);

	useEventListener(CollectionService.GetInstanceRemovedSignal(tag), removeInstance);
	useEventListener(CollectionService.GetInstanceAddedSignal(tag), addInstance);

	useEffect(() => addInstance(...CollectionService.GetTagged(tag)), [addInstance, tag]);

	return instances;
}
