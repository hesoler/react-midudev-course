import usersReducer, { UserWithId, rollbackUser } from "./users/slice";
import { type Middleware, configureStore } from "@reduxjs/toolkit";
import { toast } from "sonner";

const persistanteLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		next(action);
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDataBaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();
		next(action);

		if (type === "users/deleteUserById") {
			const userIdToRemove = payload;
			const userToRemove = previousState.users.find(
				(user: UserWithId) => user.id === userIdToRemove,
			);

			fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
				method: "DELETE",
			})
				.then((result) => {
					if (result.ok) toast.success(`User ${payload} deleted successfully.`);
					else throw new Error("Error when deleting user");
				})
				.catch((err) => {
					if (userToRemove) store.dispatch(rollbackUser(userToRemove));
					console.log(err);
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersReducer,
	},
	middleware: () => [
		persistanteLocalStorageMiddleware,
		syncWithDataBaseMiddleware,
	],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
