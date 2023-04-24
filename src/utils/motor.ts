import { GroupMotor, SingleMotor } from "@rbxts/flipper";

export type GroupMotorValue = { [key: string]: number };

export type MapValues<T extends GroupMotorValue, U> = { [K in keyof T]: U };

export interface MotorState {
	complete: boolean;
	value: number;
	velocity?: number;
}

interface SingleMotorExtended extends SingleMotor {
	_state: MotorState;
}

interface GroupMotorExtended<T> extends GroupMotor<T> {
	_motors: Map<keyof T, SingleMotorExtended>;
}

/**
 * Gets the internal state of the motor.
 * @param motor The motor to get the state of
 * @returns The motor's state
 */
export function motorGetState(motor: SingleMotor) {
	return (motor as SingleMotorExtended)._state;
}

/**
 * Sets the internal state of the motor.
 * @param motor The motor to set the value of
 * @param state The state to set
 */
export function motorSetState(motor: SingleMotor, state: Partial<MotorState>) {
	const currentState = (motor as SingleMotorExtended)._state;

	for (const [key, value] of pairs(state)) {
		currentState[key] = value as never;
	}
}

/**
 * Applies an impulse to the motor's velocity.
 * @param motor The motor to apply the impulse to
 * @param impulse The impulse to apply
 */
export function motorImpulse(motor: SingleMotor, impulse: number) {
	const currentState = (motor as SingleMotorExtended)._state;

	currentState.velocity = (currentState.velocity ?? 0) + impulse;
}

/**
 * Gets the state of every key in the group motor.
 * @param motor The group motor to get the state of
 * @returns The group motor's state
 */
export function groupMotorGetState<T extends GroupMotorValue>(groupMotor: GroupMotor<T>) {
	const state = {} as MapValues<T, MotorState>;

	for (const [key, motor] of (groupMotor as GroupMotorExtended<T>)._motors) {
		state[key] = motor._state;
	}

	return state;
}

/**
 * Sets the state with the given keys in the group motor.
 * @param motor The group motor to set the state of
 * @param state The state to set
 */
export function groupMotorSetState<T extends GroupMotorValue>(
	groupMotor: GroupMotor<T>,
	states: Partial<MapValues<T, Partial<MotorState>>>,
) {
	for (const [key, state] of pairs(states)) {
		const motor = (groupMotor as GroupMotorExtended<T>)._motors.get(key as keyof T);

		if (motor) {
			motorSetState(motor, state as never);
		}
	}
}

/**
 * Applies impulses to the motor's velocity.
 * @param motor The group motor to apply the impulses to
 * @param impulses The impulses to apply
 */
export function groupMotorImpulse<T extends GroupMotorValue>(
	groupMotor: GroupMotor<T>,
	impulses: { [K in keyof T]?: number },
) {
	for (const [key, state] of pairs(impulses)) {
		const motor = (groupMotor as GroupMotorExtended<T>)._motors.get(key as keyof T);

		if (motor) {
			motor._state.velocity = (motor._state.velocity ?? 0) + (state as number);
		}
	}
}
