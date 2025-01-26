import { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { CreatePin } from "@pages/CreatePin";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { encryptAndAddOrUpdateCard } from "@data/card";
import { CardUnencrypted } from "@data/card/types.ts";

import { CardEditorState, useCardEditor } from "@hooks/card/editor.ts";

import { genId } from "@utils/id";

export function AddCardEditor() {
	const editorState = useCardEditor();
	return (
		<Routes>
			<Route index element={<AddCardEditorPage editorState={editorState} />} />
			<Route path="pin/create/*" element={<CreatePin />} />
		</Routes>
	);
}

function AddCardEditorPage({ editorState }: { editorState: CardEditorState }) {
	const navigate = useNavigate();

	const onAddCard = () => {
		editorState.onSubmit((data) => {
			const id = genId();
			const cardWithMeta: CardUnencrypted = { id, data, modifiedAt: Date.now() };

			encryptAndAddOrUpdateCard(cardWithMeta);
			navigate(`/home/cards/${id}`);
		});
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" actionLabel="Done" onAction={onAddCard} />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button title="Save" onClick={onAddCard} />
			</PageContainer>
		</Fragment>
	);
}
