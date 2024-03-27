import { useRouter } from "expo-router";

import { Button } from "@components/Button";
import { CardEditor } from "@components/Card/Editor";
import { SubPageRoot } from "@components/Containers";

import { useHasCreatedPin } from "@libs/hooks/src/auth";
import { useAddCard } from "@libs/hooks/src/card/data.ts";
import { useCardEditor } from "@libs/hooks/src/card/editor.ts";

export default function AddCardEditorPage() {
	const router = useRouter();

	const addCard = useAddCard();
	const hasCreatedPin = useHasCreatedPin();
	// const setAfterPinCreated = useSetAfterPinCreated();

	const editorState = useCardEditor();

	// const [hasSkippedPinCreation, setHasSkippedPinCreation] = useHasSkippedPinCreation();

	const onSaveClick = editorState.onSubmit(async () => {
		const hasSkippedPinCreation = false; // Temporary
		if (!hasCreatedPin && !hasSkippedPinCreation) {
			router.navigate("/add/editor/pin-create");
			return;
		}

		await saveCard();
	});

	const saveCard = async () => {
		const id = await addCard(editorState.data);
		router.navigate(`/home/card`);
	};

	const onCreatePinSkip = async () => {
		// setHasSkippedPinCreation(true);
		await saveCard();
	};

	const onCreatePinConfirm = () => {
		// setAfterPinCreated(() => saveCard);
		// navigate("pin/create");
	};

	return (
		<SubPageRoot gap={32} title="New Card" rightButtonLabel="Done" onRightButtonPress={onSaveClick}>
			<CardEditor state={editorState} />
			<Button title="Save" onPress={onSaveClick} />
		</SubPageRoot>
	);
}
