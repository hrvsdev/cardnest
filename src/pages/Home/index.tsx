import { Header } from "./Header";
import { TabBar } from "./TabBar";

export function Home() {
	return (
		<main className="flex flex-col justify-between relative h-full w-full">
			<Header />
			<div className="overflow-y-scroll grow">

			</div>
			<TabBar />
		</main>
	);
}
