import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { IconArrowUpRight, IconChevronRight, IconLoader2, IconProps } from "@tabler/icons-react";

import { c } from "@utils/styles.ts";

type SettingsItemWrapperProps = {
	isDanger?: boolean;
	isDisabled?: boolean;
	isInteractive?: boolean;
	children: ReactNode;
};

type SettingsItemContentProps = {
	title: string;
	Icon: (props: IconProps) => ReactNode;
	rightContent?: ReactNode;
};

type SettingsButtonProps = {
	title: string;
	Icon: (props: IconProps) => ReactNode;
	isDanger?: boolean;
	isLoading?: boolean;
	onClick: () => void;
};

type SettingsLinkProps = {
	title: string;
	Icon: (props: IconProps) => ReactNode;
	to: string;
	isDanger?: boolean;
	isExternalLink?: boolean;
};

export function SettingsButton(props: SettingsButtonProps) {
	let iconColorClassName = "";

	if (props.isDanger) {
		iconColorClassName = props.isLoading ? "text-th-red/50" : "text-th-red/60";
	} else {
		iconColorClassName = props.isLoading ? "text-th-white/50" : "text-th-white/60";
	}

	const RightIcon = () => {
		if (props.isLoading) {
			return <IconLoader2 size={20} className={c("animate-spin", iconColorClassName)} />;
		} else {
			return <IconChevronRight size={20} className={iconColorClassName} />;
		}
	};

	return (
		<SettingsItemWrapper isDanger={props.isDanger} isDisabled={props.isLoading} isInteractive>
			<button onClick={props.onClick} disabled={props.isLoading} className="w-full">
				<SettingsItemContent title={props.title} Icon={props.Icon} rightContent={<RightIcon />} />
			</button>
		</SettingsItemWrapper>
	);
}

export function SettingsLink(props: SettingsLinkProps) {
	const iconColorClassName = props.isDanger ? "text-th-red/60" : "text-th-white/60";

	const RightIcon = () => {
		if (props.isExternalLink) {
			return <IconArrowUpRight size={20} className={iconColorClassName} />;
		} else {
			return <IconChevronRight size={20} className={iconColorClassName} />;
		}
	};

	return (
		<SettingsItemWrapper isDanger={props.isDanger} isInteractive>
			<Link to={props.to} target={props.isExternalLink ? "_blank" : undefined} className="w-full">
				<SettingsItemContent title={props.title} Icon={props.Icon} rightContent={<RightIcon />} />
			</Link>
		</SettingsItemWrapper>
	);
}

export function SettingsItemWrapper(props: SettingsItemWrapperProps) {
	let colorClassName: string;
	let bgColorClassName: string;

	if (props.isDanger) {
		colorClassName = props.isDisabled ? "text-th-red/70" : "text-th-red";
		bgColorClassName = props.isDisabled ? "bg-th-red/07" : "bg-th-red/10 hover:bg-th-red/15";
	} else {
		colorClassName = props.isDisabled ? "text-th-white/60" : "text-th-white";
		bgColorClassName = props.isDisabled ? "bg-th-white/5" : "bg-th-white/07 hover:bg-th-white/10";
	}

	return (
		<div
			children={props.children}
			className={c(
				"rounded-sm first:rounded-t-xl last:rounded-b-xl",
				props.isDisabled ? "cursor-not-allowed" : props.isInteractive && "hover:brightness-110 active:scale-98",
				colorClassName,
				bgColorClassName
			)}
		/>
	);
}

export function SettingsItemContent(props: SettingsItemContentProps) {
	return (
		<div className="flex items-center gap-2 w-full h-11 px-3">
			<props.Icon size={20} />
			<p className="mr-auto">{props.title}</p>

			{props.rightContent}
		</div>
	);
}
