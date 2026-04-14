import { useState, useRef, useEffect, useCallback } from "react";
import { Modal, Flex, Text, ActionIcon, Box, Image } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

const SWIPE_THRESHOLD = 50;

const slideVariants = {
	enter: (dir: number) => ({ x: dir > 0 ? "60%" : "-60%", opacity: 0 }),
	center: { x: 0, opacity: 1 },
	exit: (dir: number) => ({ x: dir > 0 ? "-60%" : "60%", opacity: 0 }),
};

const slideTransition = { duration: 0.3, ease: [0.32, 0.72, 0, 1] as const };

export interface GalleryModalProps {
	images: string[];
	opened: boolean;
	onClose: () => void;
	title?: string;
}

const GalleryModal = ({
	images,
	opened,
	onClose,
	title,
}: GalleryModalProps) => {
	const [current, setCurrent] = useState(0);
	const [direction, setDirection] = useState<1 | -1>(1);
	const pointerStartX = useRef(0);

	const hasMultiple = images.length > 1;

	useEffect(() => {
		if (opened) setCurrent(0);
	}, [opened]);

	const navigate = useCallback(
		(dir: 1 | -1) => {
			setDirection(dir);
			setCurrent((c) => (c + dir + images.length) % images.length);
		},
		[images.length],
	);

	useEffect(() => {
		if (!opened) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") navigate(-1);
			else if (e.key === "ArrowRight") navigate(1);
			else if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [opened, navigate, onClose]);

	const handlePointerDown = (e: React.PointerEvent) => {
		pointerStartX.current = e.clientX;
	};
	const handlePointerUp = (e: React.PointerEvent) => {
		const delta = e.clientX - pointerStartX.current;
		if (Math.abs(delta) > SWIPE_THRESHOLD) navigate(delta < 0 ? 1 : -1);
	};

	const goTo = useCallback(
		(i: number) => {
			setDirection(i > current ? 1 : -1);
			setCurrent(i);
		},
		[current],
	);

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			centered
			size="xl"
			padding={0}
			withCloseButton={false}
			radius="md"
			overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
			styles={{
				content: {
					overflow: "hidden",
				},
			}}
		>
			{/* Header */}
			<Flex
				align="center"
				justify="space-between"
				px={20}
				py={14}
				style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
			>
				<Text
					ff="monospace"
					size="sm"
					c="dimmed"
					style={{ letterSpacing: "0.03em" }}
				>
					{title ?? "demo"}{" "}
					<Text span c="var(--text-primary, #e2e8f0)" fw={600}>
						{current + 1}
					</Text>{" "}
					/ {images.length}
				</Text>

				<ActionIcon
					variant="subtle"
					color="gray"
					size="sm"
					onClick={onClose}
					aria-label="Close gallery"
				>
					<IconX size={16} />
				</ActionIcon>
			</Flex>

			{/* Image area */}
			<Box
				style={{
					position: "relative",
					width: "100%",
					minHeight: 420,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					cursor: "grab",
					userSelect: "none",
					background: "rgba(0,0,0,0.25)",
				}}
				onPointerDown={handlePointerDown}
				onPointerUp={handlePointerUp}
			>
				<AnimatePresence initial={false} custom={direction} mode="popLayout">
					<motion.div
						key={current}
						custom={direction}
						variants={slideVariants}
						initial="enter"
						animate="center"
						exit="exit"
						transition={slideTransition}
						style={{
							position: "absolute",
							width: "100%",
							display: "flex",
							justifyContent: "center",
							padding: "24px 60px",
						}}
					>
						<Image
							src={images[current]}
							alt={`Screenshot ${current + 1}`}
							fit="contain"
							mah={480}
							radius="sm"
							style={{ pointerEvents: "none", maxWidth: "100%" }}
						/>
					</motion.div>
				</AnimatePresence>

				{hasMultiple && (
					<>
						<NavButton side="left" onClick={() => navigate(-1)} />
						<NavButton side="right" onClick={() => navigate(1)} />
					</>
				)}
			</Box>

			{/* Dot indicators */}
			{hasMultiple && (
				<Flex justify="center" gap={6} py={16}>
					{images.map((_, i) => (
						<Box
							key={i}
							component="button"
							onClick={() => goTo(i)}
							aria-label={`Go to image ${i + 1}`}
							style={{
								width: i === current ? 20 : 6,
								height: 6,
								borderRadius: 99,
								background:
									i === current
										? "var(--mantine-color-blue-4, #74c0fc)"
										: "rgba(255,255,255,0.2)",
								border: "none",
								padding: 0,
								cursor: "pointer",
								transition: "width 0.25s ease, background 0.2s ease",
							}}
						/>
					))}
				</Flex>
			)}
		</Modal>
	);
};

const NAV_STYLE: Record<"left" | "right", React.CSSProperties> = {
	left: {
		position: "absolute",
		left: 12,
		zIndex: 10,
		opacity: 0.85,
		border: "1px solid rgba(255,255,255,0.1)",
	},
	right: {
		position: "absolute",
		right: 12,
		zIndex: 10,
		opacity: 0.85,
		border: "1px solid rgba(255,255,255,0.1)",
	},
};

const NavButton = ({
	side,
	onClick,
}: {
	side: "left" | "right";
	onClick: () => void;
}) => (
	<ActionIcon
		variant="filled"
		color="dark"
		radius="xl"
		size="lg"
		onClick={onClick}
		aria-label={side === "left" ? "Previous image" : "Next image"}
		style={NAV_STYLE[side]}
	>
		{side === "left" ? (
			<IconChevronLeft size={18} />
		) : (
			<IconChevronRight size={18} />
		)}
	</ActionIcon>
);

export default GalleryModal;
