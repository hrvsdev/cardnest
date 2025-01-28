export function Spacer({ size, className }: { size?: number; className?: string }) {
	return <div style={{ width: size, height: size }} className={className} />;
}

