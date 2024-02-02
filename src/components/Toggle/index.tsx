import styles from "./styles.module.css";

type Props = {
	defaultChecked?: boolean;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
};

export function Toggle({ checked, defaultChecked, onChange }: Props) {
	return (
		<div className={styles.toggle}>
			<input
				type="checkbox"
				checked={checked}
				defaultChecked={defaultChecked}
				onChange={onChange && ((e) => onChange(e.target.checked))}
				className={styles.checkbox}
			/>
			<label className={styles.label} />
		</div>
	);
}
