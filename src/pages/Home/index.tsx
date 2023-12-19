import { IconSearch } from "@tabler/icons-react";

import { TabBar } from "./TabBar";

export function Home() {
	return (
		<main className="relative h-full w-full">
			<div className="pt-4 px-4">
				<h1 className="font-semibold text-3xl mb-4">Search</h1>
				<div className="flex items-center w-full relative">
					<IconSearch size={24} className="absolute text-th-white left-3 opacity-60" />
					<input
						className="w-full rounded-2xl h-12 py-3 pl-12 pr-4 text-th-white bg-th-white bg-opacity-10 focus:bg-opacity-5"
						placeholder="Enter card number, bank or network"
					/>
				</div>
			</div>
			<TabBar />
		</main>
	);
}

