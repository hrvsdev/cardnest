import { TH_WHITE } from "@theme/index";

export function MasterCard({ className }: { className?: string }) {
	return (
		<svg className={className} width="39" height="24" viewBox="0 0 39 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M27 24C33.6274 24 39 18.6274 39 12C39 5.37258 33.6274 0 27 0C20.3726 0 15 5.37258 15 12C15 18.6274 20.3726 24 27 24Z"
				fill={TH_WHITE}
				fillOpacity="0.65"
			/>
			<path
				d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
				fill={TH_WHITE}
				fillOpacity="0.85"
			/>
		</svg>
	);
}
