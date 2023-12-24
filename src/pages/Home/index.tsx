import { Header } from "@components/Header";
import { TabBar } from "@components/TabBar";

export function Home() {
	return (
		<main className="flex flex-col justify-between relative h-full w-full">
			<Header />
			<div className="overflow-y-auto grow"></div>
			<TabBar />
		</main>
	);
}
