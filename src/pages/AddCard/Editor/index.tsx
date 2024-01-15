import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

import { CardEditor } from "components/Card/Editor";

import { Button } from "@components/Button";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useAddCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";

export function AddCardEditor() {
	const navigate = useNavigate();
	const addCard = useAddCard();

	const editorState = useCardEditor();

	const saveCard = () => {
		addCard(editorState.card);
		navigate("/");
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button label="Save" onClick={saveCard} />
			</PageContainer>
		</Fragment>
	);
}
