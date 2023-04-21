import { GroupMotor, SingleMotor } from "@rbxts/flipper";

export interface MotorState {
	complete: boolean;
	value: number;
	velocity?: number;
}

export interface SingleMotorExtended extends SingleMotor {
	_state: MotorState;
}

export interface GroupMotorExtended<T> extends GroupMotor<T> {
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
 * Gets the state of every key in the group motor.
 * @param motor The group motor to get the state of
 * @returns The group motor's state
 */
export function groupMotorGetState<T extends { [key: string]: unknown }>(groupMotor: GroupMotor<T>) {
	const state = {} as { [K in keyof T]: SingleMotorExtended["_state"] };
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
export function groupMotorSetState<T extends { [key: string]: unknown }>(
	groupMotor: GroupMotor<T>,
	states: { [K in keyof T]?: Partial<MotorState> },
) {
	for (const [key, state] of pairs(states)) {
		const motor = (groupMotor as GroupMotorExtended<T>)._motors.get(key as keyof T);
		if (motor) {
			motorSetState(motor, state);
		}
	}
}
