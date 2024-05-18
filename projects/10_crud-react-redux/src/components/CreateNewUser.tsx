import { useUserActions } from "../hooks/useUserActions";
import { Badge, Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";

export function CreateNewUser() {
	const { addUser } = useUserActions();
	const [result, setResult] = useState<"ok" | "ko" | null>(null);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setResult(null);

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const github = formData.get("github") as string;

		if (!name || !email || !github) {
			return setResult("ko");
		}
		addUser({ name, email, github });
		setResult("ok");
		form.reset();
	};

	return (
		<Card style={{ marginTop: "2em" }}>
			<Title>Create New User</Title>

			<form onSubmit={handleSubmit}>
				<TextInput name="name" placeholder="Name" />
				<TextInput name="email" placeholder="Email" />
				<TextInput name="github" placeholder="GitHub user" />

				<div>
					<Button type="submit" style={{ marginTop: "16px" }}>
						Create user
					</Button>
					{result === "ok" && <Badge color="green">Saved successfully</Badge>}
					{result === "ko" && <Badge color="red">Invalid fields</Badge>}
				</div>
			</form>
		</Card>
	);
}
