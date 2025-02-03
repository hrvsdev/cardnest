import { Observable, observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { synced } from "@legendapp/state/sync";

import { CardData, CardEncrypted, CardEncryptedRecords, CardRecords, CardUnencrypted, CardUnencryptedRecords } from "./types.ts";

import { DataSnapshot, get, IteratedDataSnapshot, onValue, remove, set } from "@firebase/database";
import { getReference } from "@firebase/index.ts";

import { isSignedIn, userState } from "@data/user";

import { checkNotNull } from "@utils/conditions.ts";
import { ExtendedError, InvalidArgumentError } from "@utils/error.ts";

export const cardRecordsState = observable<CardRecords>(
	synced({
		initial: CardUnencryptedRecords(),
		persist: { name: "cardnest/cards", plugin: ObservablePersistLocalStorage }
	})
);

export async function getRemoteCards() {
	const ref = getReference(getUid(), "cards");
	return getCardRecordsFromSnapshot(await get(ref));
}

export function onRemoteCardsChange(onChange: (cards: CardEncryptedRecords) => void) {
	const ref = getReference(getUid(), "cards");
	return onValue(ref, (snapshot) => onChange(getCardRecordsFromSnapshot(snapshot)));
}

export async function setCards(cards: CardRecords) {
	if (isSignedIn.get()) {
		await setRemoteCards(cards);
	} else {
		setLocalCards(cards);
	}
}

export function setLocalCards(cards: CardRecords) {
	cardRecordsState.set(cards);
}

export async function setRemoteCards(cards: CardRecords) {
	if (cards.type === "ENCRYPTED") {
		try {
			const ref = getReference(getUid(), "cards");
			await set(ref, cards.cards);
		} catch (e) {
			throw new ExtendedError("Failed to set cards on server", e);
		}
	} else {
		throw new InvalidArgumentError("Unencrypted cards can't be saved on server");
	}
}

export async function addOrUpdateCard(card: CardData) {
	if (isSignedIn.get()) {
		await addOrUpdateRemoteCard(card);
	} else {
		addOrUpdateLocalCard(card);
	}
}

export function addOrUpdateLocalCard(card: CardData) {
	const cardRecords = cardRecordsState.get();

	if (cardRecords.type === "ENCRYPTED") {
		if (card.type === "ENCRYPTED") (cardRecordsState.cards[card.data.id] as Observable<CardEncrypted>).set(card.data);
		else throw new Error("Unencrypted card can't be saved in encrypted data");
	} else {
		if (card.type === "UNENCRYPTED") (cardRecordsState.cards[card.data.id] as Observable<CardUnencrypted>).set(card.data);
		else throw new Error("Encrypted card can't be saved in unencrypted data");
	}
}

export async function addOrUpdateRemoteCard(card: CardData) {
	if (card.type === "ENCRYPTED") {
		try {
			const ref = getReference(getUid(), "cards", card.data.id);
			await set(ref, card.data);
		} catch (e) {
			throw new ExtendedError("Failed to add or update card on server", e);
		}
	} else {
		throw new InvalidArgumentError("Unencrypted card can't be saved on server");
	}
}

export async function deleteCard(id: string) {
	if (isSignedIn.get()) {
		await deleteRemoteCard(id);
	} else {
		deleteLocalCard(id);
	}
}

export function deleteLocalCard(id: string) {
	cardRecordsState.cards[id].delete();
}

export async function deleteRemoteCard(id: string) {
	try {
		const ref = getReference(getUid(), "cards", id);
		await remove(ref);
	} catch (e) {
		throw new ExtendedError("Failed to delete card from server", e);
	}
}

function getCardRecordsFromSnapshot(snapshot: DataSnapshot): CardEncryptedRecords {
	const cards: Record<string, CardEncrypted> = {};

	snapshot.forEach((child: IteratedDataSnapshot) => {
		const card = child.val() as CardEncrypted;
		cards[card.id] = card;
	});

	return CardEncryptedRecords(cards);
}

function getUid() {
	return checkNotNull(userState.uid.get(), "User must be signed in to perform auth operations");
}
