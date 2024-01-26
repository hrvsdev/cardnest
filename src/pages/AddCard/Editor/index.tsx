import { Fragment, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CardEditor } from "components/Card/Editor";

import { PinCreateDialog } from "@pages/AddCard/PinCreateDialog";

import { Button } from "@components/Button";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";

import { useSetAfterPinCreated } from "@hooks/actions";
import { useHasCreatedPin } from "@hooks/auth";
import { useAddCard } from "@hooks/card/data.ts";
import { useCardEditor } from "@hooks/card/editor.ts";
import { useHasSkippedPinCreation } from "@hooks/preferences/interactions.ts";

import { CardFullProfile } from "@t/card.ts";

export function AddCardEditor() {
	const navigate = useNavigate();
	const location = useLocation();

	const addCard = useAddCard();
	const hasCreatedPin = useHasCreatedPin();
	const setAfterPinCreated = useSetAfterPinCreated();

	const [hasSkippedPinCreation, setHasSkippedPinCreation] = useHasSkippedPinCreation();
	const [showDialog, setShowDialog] = useState(false);

	const editorState = useCardEditor(location.state?.card);

	const onSaveClick = editorState.onSubmit(async (card) => {
		if (!hasCreatedPin && !hasSkippedPinCreation) {
			setShowDialog(true);
			return;
		}

		await saveCard(card);
	});

	const saveCard = async (card: CardFullProfile) => {
		const id = await addCard(card);
		if (id) navigate(`/home/cards/${id}`);
	};

	const onCreatePinSkip = async () => {
		setHasSkippedPinCreation(true);
		await saveCard(editorState.data);
	};

	const onCreatePinConfirm = () => {
		setAfterPinCreated(() => saveCard(editorState.data));
		navigate("/pin/create", { state: { navigateBackTo: location.pathname } });
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
