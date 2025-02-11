export type AuthState = {
	dek: CryptoKey | null;
	isPasswordStale?: boolean;
};

export type AuthData = {
	password: PasswordData | null;
	pin: PinData | null;
};

export type PasswordData = {
	salt: string;
	encryptedDek: EncryptedDataEncoded;
	modifiedAt: number;
};

export type PinData = {
	salt: string;
	encryptedDek: EncryptedDataEncoded;
	modifiedAt: number;
};

export type RemoteAuthData = {
	password: PasswordData;
};
