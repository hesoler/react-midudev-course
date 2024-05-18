import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UserWithId extends User {
	id: string;
}
const DEFAULT_STATE = [
	{
		id: "1",
		name: "Héctor",
		email: "hector@gmail.com",
		github: "hesoler",
	},
	{
		id: "2",
		name: "Yazman Rodriguez",
		email: "yazmanito@gmail.com",
		github: "yazman",
	},
	{
		id: "3",
		name: "Jhon Doe",
		email: "jdoe@gmail.com",
		github: "jhondoe",
	},
	{
		id: "4",
		name: "Elcherino",
		email: "elcherino@gmail.com",
		github: "elcherino",
	},
];

const initialState: UserWithId[] = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			state.push({ id, ...action.payload });
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UserWithId>) => {
			const isUserAlreadyDefined = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyDefined) {
				state.push(action.payload);
			}
		},
	},
});

export default usersSlice.reducer;

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions;
