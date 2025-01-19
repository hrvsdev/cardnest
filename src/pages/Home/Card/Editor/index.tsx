import { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useCard, useUpdateCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";

export function UpdateCardEditor() {
	const navigate = useNavigate();
	const params = useParams();

	const card = useCard(params.cardId);
	const updateCard = useUpdateCard();

	if (!card) return null;

	const editorState = useCardEditor(card.data);

	const update = editorState.onSubmit(async (data) => {
		await updateCard({ id: card.id, data });
		navigate(`/home/cards/${card.id}`);
	});

	useEffect(() => {
		if (!card) navigate("/");
	}, [card]);

	return (
		<Fragment>
			<SubPageHeader title="Edit Card" actionLabel="Done" onAction={update} />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button title="Update" onClick={update} />
			</PageContainer>
		</Fragment>
	);
}
