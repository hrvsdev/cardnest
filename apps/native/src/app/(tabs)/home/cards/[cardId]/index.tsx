import { Fragment, useEffect, useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { IconPencil } from "tabler-icons-react-native";

import CardDeleteDialog from "./delete.tsx";

import { Button } from "@components/Button";
import { CopyButton } from "@components/Button/CopyButton.tsx";
import { CardPreview } from "@components/Card/Preview/Preview.tsx";
import { SubPageRoot } from "@components/Containers";
import { Input } from "@components/Input";

import { useCard, useDeleteCard } from "@libs/hooks/src/card/data.ts";

import { addSpaces } from "@libs/utils/src/card.ts";

export default function CardViewPage() {
	const router = useRouter();
	const params = useLocalSearchParams<{ cardId: string }>();

	const card = useCard(params.cardId);
	const deleteCard = useDeleteCard();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	useEffect(() => {
		if (!card) router.replace("/home");
	}, [card]);

	if (!card) return null;

	const edit = () => {
		router.navigate(`/home/cards/${card.id}/edit`);
	};

	const del = async () => {
		await deleteCard(card.id);
		router.replace("/home");
	};

	return (
		<Fragment>
			<SubPageRoot
				title="Card"
				rightButtonLabel="Edit"
				onRightButtonPress={edit}
				rightButtonIcon={IconPencil}
				gap={32}
			>
				<CardPreview card={card.data} />
				<View style={{ flex: 1, gap: 24 }}>
					<Input
						readOnly
						label="Card number"
						value={addSpaces(card.data.number)}
						rightIcon={<CopyButton text={card.data.number} />}
					/>
					<Input
						readOnly
						label="Expriy date"
						value={card.data.expiry}
						rightIcon={<CopyButton text={card.data.expiry} />}
					/>
					<Input
						readOnly
						label="Cardholder"
						value={card.data.cardholder}
						rightIcon={<CopyButton text={card.data.cardholder} />}
					/>
					<Input
						readOnly
						label="Card issuer/bank"
						value={card.data.issuer}
						rightIcon={<CopyButton text={card.data.issuer} />}
					/>
				</View>

				<Button title="Delete" theme="danger" onPress={() => setShowDeleteDialog(true)} />
			</SubPageRoot>

			<CardDeleteDialog
				show={showDeleteDialog}
				onConfirm={del}
				onClose={() => setShowDeleteDialog(false)}
			/>
		</Fragment>
	);
}
