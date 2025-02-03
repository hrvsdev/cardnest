import { ChangeEvent, PropsWithChildren, ReactNode, Ref, useEffect, useState } from "react";

import { IconEye, IconEyeOff, IconLockPassword, IconProps } from "@tabler/icons-react";

import { Input } from "@components/Input/index.tsx";
import { LoadingIcon } from "@components/Loader";

type Props = {
	ref: Ref<HTMLInputElement>;

	value: string;
	placeholder?: string;

	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;

	leftIcon?: (props: IconProps) => ReactNode;

	isLoading?: boolean;
	isDisabled?: boolean;
};

export function PasswordInput(props: Props) {
	const [isVisible, setIsVisible] = useState(false);

	const iconColorClassName = "text-th-white/60";

	const LeftIcon = () => {
		const I = props.leftIcon ?? IconLockPassword;
		return <Icon children={<I className={iconColorClassName} />} />;
	};

	const RightIcon = () => {
		if (props.isDisabled) return null;
		if (props.isLoading) return <Icon children={<LoadingIcon size={24} />} />;

		return (
			<Icon>
				<button type="button" className="active:translate-y-0.5" onClick={() => setIsVisible(!isVisible)}>
					{isVisible ? <IconEyeOff className={iconColorClassName} /> : <IconEye className={iconColorClassName} />}
				</button>
			</Icon>
		);
	};

	useEffect(() => {
		if (props.isLoading || props.isDisabled) setIsVisible(false);
	}, [props.isLoading, props.isDisabled]);

	return (
		<Input
			ref={props.ref}
			value={props.value}
			type={isVisible ? "text" : "password"}
			readOnly={props.isDisabled}
			placeholder={props.placeholder}
			onChange={props.onChange}
			onFocus={props.onFocus}
			onBlur={props.onBlur}
			leftIcon={<LeftIcon />}
			rightIcon={<RightIcon />}
		/>
	);
}

function Icon({ children }: PropsWithChildren) {
	return <div className="center size-12">{children}</div>;
}
