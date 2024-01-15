import { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

import { UpdateCardEditor } from "@pages/Home/Card/Editor";

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
			<Route path="update" element={<UpdateCardEditor />} />
		</Routes>
	);
}

function CardViewPage() {
	const navigate = useNavigate();
	const params = useParams();

	const card = useCard(params.cardId);

	useEffect(() => {
		if (!card) navigate("/");
	}, [card]);

	if (!card) return null;

	return (
		<Fragment>
			<SubPageHeader title="Card" />
			<PageContainer className="relative space-y-8">
				<CardPreview card={card.data} />
				<div className="space-y-6">
					<Input readOnly label="Card number" value={addSpaces(card.data.number)} />
					<Input readOnly label="Expiry date" value={card.data.expiry} />
					<Input readOnly label="Cardholder" value={card.data.cardholder} />
				</div>
			</PageContainer>
		</Fragment>
	);
}
