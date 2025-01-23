import { observable } from "@legendapp/state";
import { useObserve } from "@legendapp/state/react";

import { addOrUpdateCard, cardRecordsState } from "@data/card/core.ts";
import { CardData, CardUnencrypted } from "@data/card/types.ts";

export const cardsState = observable<Record<string, CardUnencrypted>>({});

export function useDecryptAndCollectCards() {
	useObserve(cardRecordsState, (it) => {
		const cardRecords = it.value;

		if (cardRecords == null) return;
		if (cardRecords.type === "UNENCRYPTED") {
			Object.values(cardRecords.cards).forEach((it) => cardsState[it.id].set(it));
		} else {
			Object.values(cardRecords.cards).forEach(() => {
				// TODO: Decrypt and add to updatedCards
			});
		}
	});
}

export function encryptAndAddOrUpdateCard(cardUnencrypted: CardUnencrypted) {
	// @ts-ignore
	const hasEnabledAuth = false; // TODO: Check if encryption is enabled

	const cardData: CardData = {
		type: "UNENCRYPTED", // TODO: Add type according to encryption
		data: cardUnencrypted // TODO: Encrypt card data if encryption is enabled
	};

	addOrUpdateCard(cardData);
}
