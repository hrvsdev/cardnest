import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CardEditor } from "components/Card/Editor";

import { PinCreateDialog } from "@pages/AddCard/PinCreateDialog";

import { Button } from "@components/Button";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useHasCreatedPinValue } from "@hooks/auth";
import { useAddCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";

import { CardFullProfile } from "@t/card.ts";

export function AddCardEditor() {
	const navigate = useNavigate();
	const addCard = useAddCard();
	const hasCreatedPin = useHasCreatedPinValue();

	const editorState = useCardEditor();

	const [showDialog, setShowDialog] = useState(false);

	const onSaveClick = editorState.onSubmit(async (card) => {
		if (!hasCreatedPin) {
			setShowDialog(true);
			return;
		}

		await saveCard(card);
	});

	const saveCard = async (card: CardFullProfile) => {
		await addCard(card);
		navigate("/cards");
	};

	const onCreatePinSkip = async () => {
		await saveCard(editorState.data);
	};

	const onCreatePinConfirm = () => {
		navigate("/pin/create", { state: { card: editorState.data } });
	};

	return (
		<Fragment>
			<SubPageHeader title="New Card" rightButtonLabel="Done" onRightButtonClick={onSaveClick} />
			<PageContainer className="relative space-y-8">
				<CardEditor state={editorState} />
				<Button label="Save" onClick={onSaveClick} />
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
