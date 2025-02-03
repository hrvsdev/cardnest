export type User = {
	uid: string;
	name: string;
	fullName: string;
}

export type SignInResult = "CREATE_PASSWORD" | "ENTER_PASSWORD"
