## 🪝 `useCollectionService`

```ts
function useCollectionService<T extends Instance>(tag: string);
```

Uses [Collection Service](https://create.roblox.com/docs/reference/engine/classes/CollectionService) to keep track of instances
added and removed under a given tag.

### 📕 Parameters

-   `tag` - The [tag](https://create.roblox.com/docs/studio/properties#instance-tags) to filter instances for.

### 📗 Returns

-   A list of `Instance` with the given tag. This list is stateful; so it is updated when `Instance` are added and removed.

### 📘 Example

Get all `Instance` with the tag `"Zombie"`:

```tsx
function ZombieHealth() {
	const zombies = useCollectionService("Zombie")

	return (
		{
            zombies.map((zombie) =>
                <ZombieHealthbar model={zombie} />
            )
        }
	);
}
```

Get all `Instance` with the tag `"Zombie"` and cast them to the custom `ZombieModel` type:

```tsx
interface ZombieModel extends Model {
    Health: NumberValue;
}

function ZombieHealth() {
	const zombies = useCollectionService<ZombieModel>("Zombie")

	return (
		{
            zombies.map((zombie) =>
                <ZombieHealthbar model={zombie} />
            )
        }
	);
}
```
