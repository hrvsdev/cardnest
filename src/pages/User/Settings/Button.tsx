import { ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";

import { IconChevronRight, TablerIconsProps } from "@tabler/icons-react";

import { c } from "@utils/styles.ts";

type ContentProps = {
	Icon: (props: TablerIconsProps) => ReactElement;
	title: string;
	isDanger?: boolean;
};

type WrapperProps = {
	isDanger?: boolean;
	children: ReactNode;
};

type SettingsButtonProps = ContentProps & {
	onClick: () => void;
};

type SettingsLinkProps = ContentProps & {
	to: string;
};

export function SettingsButton({ onClick, ...props }: SettingsButtonProps) {
	return (
		<Wrapper isDanger={props.isDanger}>
			<button className="w-full" onClick={onClick}>
				<Content {...props} />
			</button>
		</Wrapper>
	);
}

export function SettingsLink({ to, ...props }: SettingsLinkProps) {
	return (
		<Wrapper isDanger={props.isDanger}>
			<Link to={to} className="w-full">
				<Content {...props} />
			</Link>
		</Wrapper>
	);
}

function Content({ title, Icon, isDanger }: ContentProps) {
	return (
		<div className="flex items-center justify-between px-3 py-2.5">
			<span className="flex items-center gap-2">
				<Icon size={20} />
				<p>{title}</p>
			</span>
			<span className="flex items-center gap-2">
				<IconChevronRight
					size={20}
					className={c("ml-auto", isDanger ? "text-th-red/50" : "text-th-white/40")}
				/>
			</span>
		</div>
	);
}

function Wrapper({ isDanger, children }: WrapperProps) {
	return (
		<div
			className={c(
				"flex items-center w-full rounded-sm first:rounded-t-xl last:rounded-b-xl",
				isDanger ? "bg-th-red/10 text-th-red" : "bg-th-white/5"
			)}
		>
			{children}
		</div>
	);
}
