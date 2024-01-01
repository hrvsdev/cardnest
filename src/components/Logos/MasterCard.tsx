export function MasterCard({ widthInRem = 2.5 }: { widthInRem?: number }) {
	const aspectRatio = 100 / 62.5;

	const width = `${widthInRem}rem`;
	const height = `${widthInRem / aspectRatio}rem`;

	return (
		<svg
			style={{ width, height }}
			viewBox="0 0 32 20"
			xmlns="http://www.w3.org/2000/svg"
			overflow="visible"
		>
			<g>
				<g>
					<circle cx="10" cy="10" r="10" className="fill-white/85" />
					<circle cx="22" cy="10" r="10" className="fill-white/65" />
				</g>
			</g>
		</svg>
	);
}
