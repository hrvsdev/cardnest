import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { IconPencil } from "@tabler/icons-react";

import { CardDeleteDialog } from "@pages/Home/Card/CardDeleteDialog";
import { UpdateCardEditor } from "@pages/Home/Card/Editor";

import { Button } from "@components/Button";
import { CopyButton } from "@components/Button/CopyButton.tsx";
import { CardPreview } from "@components/Card/Preview";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Input } from "@components/Input";
import { Show } from "@components/Show";

import { useCard, useDeleteCard } from "@hooks/card/data.ts";

import { addSpaces } from "@utils/card.ts";

export function CardView() {
	return (
		<Routes>
			<Route index element={<CardViewPage />} />
			<Route path="edit" element={<UpdateCardEditor />} />
		</Routes>
	);
}

function CardViewPage() {
	const navigate = useNavigate();
	const params = useParams();

	const card = useCard(params.cardId);
	const deleteCard = useDeleteCard();

	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	useEffect(() => {
		if (!card) navigate("/");
	}, [card]);

	if (!card) return null;

	const edit = () => {
		navigate("edit");
	};

	const del = () => {
		deleteCard(card.id);
		navigate("/");
	};

	return (
		<Fragment>
			<SubPageHeader
				title="Card"
				onAction={edit}
				actionLabel="Edit"
				actionIcon={<IconPencil size={18} />}
			/>
			<PageContainer className="relative space-y-8">
				<CardPreview card={card.data} />
				<div className="space-y-6">
					<Input
						readOnly
						label="Card number"
						value={addSpaces(card.data.number)}
						rightIcon={<CopyButton text={card.data.number} />}
					/>
					<Input
						readOnly
						label="Expiry date"
						value={card.data.expiry}
						rightIcon={<CopyButton text={card.data.expiry} />}
					/>
					<Input
						readOnly
						label="Cardholder"
						value={card.data.cardholder}
						rightIcon={<CopyButton text={card.data.cardholder} />}
					/>
					<Show when={card.data.issuer.trim().length > 0}>
						<Input
							readOnly
							label="Card issuer/bank"
							value={card.data.issuer}
							rightIcon={<CopyButton text={card.data.issuer} />}
						/>
					</Show>
				</div>
				<Button title="Delete" theme="danger" onClick={() => setShowDeleteDialog(true)} />
			</PageContainer>
			<CardDeleteDialog
				show={showDeleteDialog}
				onConfirm={del}
				onClose={() => setShowDeleteDialog(false)}
			/>
		</Fragment>
	);
}
