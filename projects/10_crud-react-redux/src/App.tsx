import "./App.css";
import { CreateNewUser } from "./components/CreateNewUser.tsx";
import { ListOfUsers } from "./components/ListOfUsers.tsx";
import { Toaster } from "sonner";

function App() {
	return (
		<>
			<ListOfUsers />
			<CreateNewUser />
			<Toaster richColors />
		</>
	);
}

export default App;
