import { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "@legendapp/state/react";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { cardsState, encryptAndAddOrUpdateCard } from "@data/card";
import { CardUnencrypted } from "@data/card/types.ts";

import { useCardEditor } from "@hooks/card/editor.ts";

function useCard(id: string | undefined) {
	if (!id) return null;
	return useSelector(cardsState[id]);
}

export function UpdateCardEditor() {
	const navigate = useNavigate();
	const params = useParams();

	const cardWithMeta = useCard(params.cardId);

	useEffect(() => {
		if (!cardWithMeta) navigate("/");
	}, [cardWithMeta]);

	if (!cardWithMeta) return null;

	const editorState = useCardEditor(cardWithMeta.data);

	const onUpdate = () => {
		editorState.onSubmit((data) => {
			const updatedCardWithMeta: CardUnencrypted = { id: cardWithMeta.id, data, modifiedAt: Date.now() };

			encryptAndAddOrUpdateCard(updatedCardWithMeta);
			navigate(-1);
		});
	};

	return (
		<Fragment>
			<SubPageHeader title="Edit Card" actionLabel="Done" onAction={onUpdate} />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button title="Update" onClick={onUpdate} />
			</PageContainer>
		</Fragment>
	);
}
