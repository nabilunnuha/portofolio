import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { motion } from "framer-motion";

interface TypewriterTextProps {
	text: string;
	speed?: number;
	delay?: number;
	className?: string;
}

const TypewriterText = ({
	text,
	speed = 50,
	delay = 300,
	className,
}: TypewriterTextProps) => {
	const [displayedText, setDisplayedText] = useState("");
	const [showCursor, setShowCursor] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			let index = 0;
			const interval = setInterval(() => {
				setDisplayedText(text.slice(0, index + 1));
				index++;
				if (index >= text.length) {
					clearInterval(interval);
					setTimeout(() => setShowCursor(false), 2000);
				}
			}, speed);

			return () => clearInterval(interval);
		}, delay);

		return () => clearTimeout(timeout);
	}, [text, speed, delay]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<Text
				ff="monospace"
				fz="sm"
				className={className}
				style={{
					color: "var(--accent-indigo)",
					letterSpacing: "0.05em",
				}}
			>
				{displayedText}
				{showCursor && (
					<span
						style={{
							display: "inline-block",
							width: 8,
							height: 16,
							background: "var(--accent-indigo)",
							marginLeft: 2,
							borderRadius: 1,
							animation: "blink 1.1s step-end infinite",
							verticalAlign: "text-bottom",
						}}
					/>
				)}
			</Text>
		</motion.div>
	);
};

export default TypewriterText;
