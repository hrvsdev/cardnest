import { Fragment, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { PinCreateDialog } from "@pages/AddCard/PinCreateDialog";
import { CreatePin } from "@pages/CreatePin";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useSetAfterPinCreated } from "@hooks/actions";
import { useHasCreatedPin } from "@hooks/auth";
import { useAddCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";
import { useHasSkippedPinCreation } from "@hooks/preferences";

import { CardEditorState } from "@t/card";

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

	const addCard = useAddCard();
	const hasCreatedPin = useHasCreatedPin();
	const setAfterPinCreated = useSetAfterPinCreated();

	const [hasSkippedPinCreation, setHasSkippedPinCreation] = useHasSkippedPinCreation();
	const [showDialog, setShowDialog] = useState(false);

	const onSaveClick = editorState.onSubmit(async () => {
		if (!hasCreatedPin && !hasSkippedPinCreation) {
			setShowDialog(true);
			return;
		}

		await saveCard();
	});

	const saveCard = async () => {
		const id = await addCard(editorState.data);
		navigate(`/home/cards/${id}`);
	};

	const onCreatePinSkip = async () => {
		setHasSkippedPinCreation(true);
		await saveCard();
	};

	const onCreatePinConfirm = () => {
		setAfterPinCreated(() => saveCard);
		navigate("pin/create");
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" rightButtonLabel="Done" onRightButtonClick={onSaveClick} />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button title="Save" onClick={onSaveClick} />
			</PageContainer>
			<PinCreateDialog
				show={showDialog}
				onConfirm={onCreatePinConfirm}
				onSkip={onCreatePinSkip}
				onClose={() => setShowDialog(false)}
			/>
		</Fragment>
	);
}
