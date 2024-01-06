import { Fragment } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { AddCardEditor } from "@pages/AddCard/Editor";

import { PageContainer } from "@components/Containers";
import { HeaderTitle } from "@components/Header/HeaderTitle.tsx";

export function AddCard() {
	return (
		<Routes>
			<Route index element={<AddCardPage />} />
			<Route path="editor" element={<AddCardEditor />} />
		</Routes>
	);
}

export function AddCardPage() {
	return (
		<Fragment>
			<HeaderTitle title="Add Card" />
			<PageContainer className="flex flex-col justify-center items-center">
				<div className="my-auto">
					<PlusCircleIcon className="size-28 text-gray-400 mb-4 mx-auto" strokeWidth={1} />
					<p className="text-center text-th-white/70">
						Add a new card to add to your collection. <br />
						On our website, you can't scan cards yet but you can add them manually.
					</p>
				</div>
				<Link to="editor" className="w-full">
					<button className="bg-th-sky w-full h-12.5 text-md rounded-xl">Add Card</button>
				</Link>
			</PageContainer>
		</Fragment>
	);
}
