import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { useSelector } from "@legendapp/state/react";
import { IconPencil } from "@tabler/icons-react";

import { DeleteCardBottomSheet } from "@pages/Home/Card/CardDeleteDialog";
import { UpdateCardEditor } from "@pages/Home/Card/Editor";

import { openBottomSheet } from "@components/BottomSheet/state.ts";
import { Button } from "@components/Button";
import { CopyButton } from "@components/Button/CopyButton.tsx";
import { CardPreview } from "@components/Card/Preview";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Input } from "@components/Input";
import { Show } from "@components/Show";

import { cardsState } from "@data/card";
import { deleteCard } from "@data/card/core.ts";

import { addSpaces } from "@utils/card.ts";

export function CardView() {
	return (
		<Routes>
			<Route index element={<CardViewPage />} />
			<Route path="edit" element={<UpdateCardEditor />} />
		</Routes>
	);
}

function useCard(id: string | undefined) {
	if (!id) return null;
	return useSelector(cardsState[id]);
}

function CardViewPage() {
	const navigate = useNavigate();
	const params = useParams();

	const cardWithMeta = useCard(params.cardId);

	useEffect(() => {
		if (!cardWithMeta) navigate("/");
	}, [cardWithMeta]);

	if (!cardWithMeta) return null;

	const card = cardWithMeta.data;

	const onEdit = () => {
		navigate("edit");
	};

	const onDelete = () => {
		openBottomSheet(<DeleteCardBottomSheet />, () => {
			deleteCard(cardWithMeta.id);
			navigate(-1);
		});
	};

	return (
		<Fragment>
			<SubPageHeader title="Card" onAction={onEdit} actionLabel="Edit" actionIcon={<IconPencil size={18} />} />

			<PageContainer className="relative space-y-8">
				<CardPreview card={card} />

				<div className="space-y-6">
					<Input readOnly label="Card number" value={addSpaces(card.number)} rightIcon={<CopyButton text={card.number} />} />
					<Input readOnly label="Expiry date" value={card.expiry} rightIcon={<CopyButton text={card.expiry} />} />
					<Input readOnly label="Cardholder" value={card.cardholder} rightIcon={<CopyButton text={card.cardholder} />} />

					<Show when={card.issuer.trim().length > 0}>
						<Input readOnly label="Card issuer/bank" value={card.issuer} rightIcon={<CopyButton text={card.issuer} />} />
					</Show>
				</div>

				<Button title="Delete" theme="danger" onClick={onDelete} />
			</PageContainer>
		</Fragment>
	);
}
