export type AuthState = {
	dek: CryptoKey | null;
};

export type AuthData = {
	pin: PinData | null;
};

export type PinData = {
	salt: string;
	encryptedDek: EncryptedDataEncoded;
	modifiedAt: number;
};
