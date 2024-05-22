## 🪝 `useTagged`

```ts
function useTagged<T extends Instance>(tag: string): readonly T[];
```

Tracks and returns all instances assigned to the given [`CollectionService`](https://create.roblox.com/docs/reference/engine/classes/CollectionService) tag. Re-renders the component when tagged instances are added or removed from the data model.

### 📕 Parameters

-   `tag` - The [tag](https://create.roblox.com/docs/studio/properties#instance-tags) to filter instances for.

### 📗 Returns

-   A list of instances with the given tag.

### 📘 Example

Get all instances with the tag `"Zombie"`:

```tsx
function ZombieHealth() {
	const zombies = useTagged("Zombie");

	return (
		<>
			{zombies.map((zombie) => (
				<ZombieHealthbar model={zombie} />
			))}
		</>
	);
}
```

Get all instances with the tag `"Zombie"` and cast them to a custom `ZombieModel` type:

```tsx
interface ZombieModel extends Model {
	Health: NumberValue;
}

function ZombieHealth() {
	const zombies = useTagged<ZombieModel>("Zombie");

	return (
		<>
			{zombies.map((zombie) => (
				<ZombieHealthbar model={zombie} />
			))}
		</>
	);
}
```
