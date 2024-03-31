import { useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { SubPageRoot } from "@components/Containers";

import { useCard, useUpdateCard } from "@libs/hooks/src/card/data.ts";
import { useCardEditor } from "@libs/hooks/src/card/editor.ts";

export default function UpdateCardEditorPage() {
	const router = useRouter();
	const params = useLocalSearchParams<{ cardId: string }>();

	const card = useCard(params.cardId);
	const updateCard = useUpdateCard();

	useEffect(() => {
		if (!card) router.navigate("/home");
	}, [card]);

	if (!card) return null;

	const editorState = useCardEditor(card.data);

	const update = editorState.onSubmit(async (data) => {
		await updateCard({ id: card.id, data });
		router.navigate(`/home/cards/${card.id}`);
	});

	return (
		<SubPageRoot gap={32} title="Edit Card" rightButtonLabel="Done" onRightButtonPress={update}>
			<CardEditor state={editorState} />
			<Button title="Update" onPress={update} />
		</SubPageRoot>
	);
}
