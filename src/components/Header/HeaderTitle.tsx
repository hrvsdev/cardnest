type TitleProps = {
	title: string;
};

export function HeaderTitle({ title }: TitleProps) {
	return <h1 className="font-semibold text-heading pl-0.5 pt-8 mx-4">{title}</h1>;
}
