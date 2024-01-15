import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { IconPencil } from "@tabler/icons-react";

import { UpdateCardEditor } from "@pages/Home/Card/Editor";

import { CopyButton } from "@components/Button/CopyButton.tsx";
import { CardPreview } from "@components/Card/Preview";
import { PageContainer } from "@components/Containers";
import { SubPageHeader } from "@components/Header/SubPageHeader.tsx";
import { Input } from "@components/Input";

import { useCard } from "@hooks/card/data.ts";
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

	const edit = () => navigate("edit");

	useEffect(() => {
		if (!card) navigate("/");
	}, [card]);

	if (!card) return null;

	return (
		<Fragment>
			<SubPageHeader
				title="Card"
				onRightButtonClick={edit}
				rightButtonLabel="Edit"
				rightButtonIcon={<IconPencil size={18} />}
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
				</div>
			</PageContainer>
		</Fragment>
	);
}
