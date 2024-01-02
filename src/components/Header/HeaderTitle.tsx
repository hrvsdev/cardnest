import { Fragment, useState, useEffect } from "react";

type TitleProps = {
	title: string;
};

const OFFSET = 28;

export function HeaderTitle({ title }: TitleProps) {
	const [isOpaque, setIsOpaque] = useState(false);

	const onScroll = () => {
		if (!isOpaque && window.scrollY > OFFSET) {
			setIsOpaque(true);
		} else if (isOpaque && window.scrollY <= OFFSET) {
			setIsOpaque(false);
		}
	};

	useEffect(() => {
		onScroll();

		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	
	return (
		<Fragment>
			<h1 className="sticky top-0 bg-th-black font-semibold h-10 text-center py-2 px-4">
				{isOpaque && title}
			</h1>
			<h1 className="font-semibold text-heading p-4 pt-0">
				{title}
			</h1>
		</Fragment>
	);
}
