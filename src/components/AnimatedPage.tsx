import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedPageProps {
	children: ReactNode;
}

const pageVariants = {
	initial: {
		opacity: 0,
		y: 20,
	},
	animate: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: "easeOut" as const,
			staggerChildren: 0.1,
		},
	},
	exit: {
		opacity: 0,
		y: -10,
		transition: {
			duration: 0.3,
		},
	},
};

const AnimatedPage = ({ children }: AnimatedPageProps) => {
	return (
		<motion.div
			variants={pageVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{children}
		</motion.div>
	);
};

export default AnimatedPage;

export const itemVariant = {
	initial: { opacity: 0, y: 20 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" as const },
	},
};
