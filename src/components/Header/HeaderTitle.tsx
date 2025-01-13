type TitleProps = {
	title: string;
};

export function HeaderTitle({ title }: TitleProps) {
	return <h1 className="font-bold text-th-white text-heading pt-8 pl-[1.125rem] pr-4">{title}</h1>;
}
