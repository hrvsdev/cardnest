import { Observable, observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { synced } from "@legendapp/state/sync";

import { CardData, CardEncrypted, CardRecords, CardUnencrypted, CardUnencryptedRecords } from "./types.ts";

export const cardRecordsState = observable<CardRecords>(
	synced({
		initial: CardUnencryptedRecords(),
		persist: { name: "cardnest/cards", plugin: ObservablePersistLocalStorage }
	})
);

export function setCards(cards: CardRecords) {
	cardRecordsState.set(cards);
}

export function addOrUpdateCard(card: CardData) {
	const cardRecords = cardRecordsState.get();

	if (cardRecords.type === "ENCRYPTED") {
		if (card.type === "ENCRYPTED") (cardRecordsState.cards[card.data.id] as Observable<CardEncrypted>).set(card.data);
		else throw new Error("Unencrypted card can't be saved in encrypted data");
	} else {
		if (card.type === "UNENCRYPTED") (cardRecordsState.cards[card.data.id] as Observable<CardUnencrypted>).set(card.data);
		else throw new Error("Encrypted card can't be saved in unencrypted data");
	}
}

export function deleteCard(id: string) {
	cardRecordsState.cards[id].delete();
}
