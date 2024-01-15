import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useCard, useUpdateCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";

export function UpdateCardEditor() {
	const navigate = useNavigate();

	const card = useCard("6l4p9CbV");
	const updateCard = useUpdateCard();

	const editorState = useCardEditor(card.data);

	const update = () => {
		updateCard({ id: card.id, data: editorState.card });
		navigate("/");
	};

	return (
		<Fragment>
			<SubPageHeader title="Edit Card" />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button label="Update" onClick={update} />
			</PageContainer>
		</Fragment>
	);
}
