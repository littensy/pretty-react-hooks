import { InferEnumNames } from "@rbxts/roact";
import { useMemo, useState } from "@rbxts/roact-hooked";
import { UserInputService } from "@rbxts/services";
import { useEventListener } from "../use-event-listener";

/**
 * A single key code name.
 */
export type KeyCode = InferEnumNames<Enum.KeyCode>;

/**
 * A single key code or a combination of key codes.
 */
export type KeyCodes = KeyCode | `${KeyCode}+${string}` | KeyCode[];

/**
 * Returns whether the passed key or shortcut is pressed. The hook expects one
 * or more key code, which can be:
 *
 * - A single key code `"W"`
 * - A combination of key codes `"W+Space"`
 * - An array of key codes `["W", "Space"]`
 *
 * Each combination is treated as its own shortcut. If passed more than one
 * combination, the hook will return `true` if any of the combinations are
 * pressed.
 *
 * @param keyCodeCombos The key code or combination of key codes to listen for.
 * @returns Whether the key or combination of keys is pressed.
 */
export function useKeyPress(...keyCodeCombos: KeyCodes[]) {
	const [pressed, setPressed] = useState(false);

	const keyCombos = useMemo(() => {
		return keyCodeCombos.map((keyCodes): KeyCode[] => {
			if (typeIs(keyCodes, "string")) {
				return keyCodes.split("+") as KeyCode[];
			} else {
				return keyCodes;
			}
		});
	}, keyCodeCombos);

	const keySet = useMemo(() => {
		const keySet = new Set<KeyCode>();

		for (const keys of keyCombos) {
			for (const key of keys) {
				keySet.add(key);
			}
		}

		return keySet;
	}, keyCombos);

	const keysDown = useMemo(() => {
		return new Set<KeyCode>();
	}, keyCodeCombos);

	const updatePressed = () => {
		setPressed(keyCombos.some((keys) => keys.every((key) => keysDown.has(key))));
	};

	useEventListener(UserInputService.InputBegan, (input, gameProcessed) => {
		if (!gameProcessed && keySet.has(input.KeyCode.Name)) {
			keysDown.add(input.KeyCode.Name);
			updatePressed();
		}
	});

	useEventListener(UserInputService.InputEnded, (input) => {
		if (keySet.has(input.KeyCode.Name)) {
			keysDown.delete(input.KeyCode.Name);
			updatePressed();
		}
	});

	return pressed;
}
