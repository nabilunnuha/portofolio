import { Box, Container, Title, Text, Group, Skeleton } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { IconArrowRight, IconFolderCode } from "@tabler/icons-react";
import { useProfile } from "../hooks/usePortfolio";
import AnimatedPage, { itemVariant } from "../components/AnimatedPage";
import TypewriterText from "../components/TypewriterText";
import useDocumentTitle from "../hooks/useDocumentTitle";

interface CodeSnippetProps {
	name?: string;
	role?: string;
	coffee?: boolean;
	stacks?: string[];
}

const CodeSnippet = ({ name, role, coffee, stacks }: CodeSnippetProps) => {
	const stack = stacks ?? ["React", "TypeScript", "Node.js"];

	return (
		<motion.div
			initial={{ opacity: 0, x: 40 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.4, 0.25, 1] }}
			style={{
				position: "absolute",
				right: 0,
				top: "50%",
				transform: "translateY(-50%)",
				width: "clamp(260px, 30vw, 360px)",
				animation: "float 8s ease-in-out infinite",
			}}
		>
			<Box
				style={{
					background: "rgba(15,17,23,0.7)",
					backdropFilter: "blur(16px)",
					border: "1px solid var(--border-subtle)",
					borderRadius: "var(--radius-lg)",
					overflow: "hidden",
					boxShadow:
						"0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(129,140,248,0.06)",
				}}
			>
				<Box
					style={{
						display: "flex",
						alignItems: "center",
						gap: 6,
						padding: "10px 16px",
						borderBottom: "1px solid var(--border-subtle)",
					}}
				>
					{["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
						<Box
							key={i}
							style={{
								width: 10,
								height: 10,
								borderRadius: "50%",
								background: c,
								opacity: 0.8,
							}}
						/>
					))}
					<Text
						ff="monospace"
						size="xs"
						ml={8}
						style={{ color: "var(--text-muted)" }}
					>
						developer.ts
					</Text>
				</Box>
				<Box
					p={20}
					style={{
						fontFamily: "'JetBrains Mono', monospace",
						fontSize: 13,
						lineHeight: 1.8,
					}}
				>
					<Text size="sm" style={{ color: "#818cf8" }}>
						const{" "}
						<Text span style={{ color: "#38bdf8" }}>
							developer
						</Text>{" "}
						= {"{"}
					</Text>
					<Box pl={16}>
						<Text size="sm">
							<Text span style={{ color: "#94a3b8" }}>
								name:
							</Text>{" "}
							<Text span style={{ color: "#a3e635" }}>
								"{name || "nabilunnuha"}"
							</Text>
							,
						</Text>
						<Text size="sm">
							<Text span style={{ color: "#94a3b8" }}>
								role:
							</Text>{" "}
							<Text span style={{ color: "#a3e635" }}>
								"{role || "Full Stack Dev"}"
							</Text>
							,
						</Text>
						<Text size="sm">
							<Text span style={{ color: "#94a3b8" }}>
								coffee:
							</Text>{" "}
							<Text span style={{ color: "#fb923c" }}>
								{JSON.stringify(coffee || true)}
							</Text>
							,
						</Text>
						<Text size="sm" style={{ color: "#94a3b8" }}>
							stack: [
						</Text>
						<Box pl={16}>
							<Text size="sm">
								{stack?.map((s, i, a) => (
									<Text key={s} span style={{ color: "#a3e635" }}>
										"{s}"{i < a.length - 1 ? ", " : ""}
									</Text>
								))}
							</Text>
						</Box>
						<Text size="sm" style={{ color: "#94a3b8" }}>
							],
						</Text>
					</Box>
					<Text size="sm" style={{ color: "#818cf8" }}>
						{"}"}
					</Text>
					<Text mt={8} size="sm" style={{ color: "#475569" }}>
						{"// Available for opportunities"}
					</Text>
				</Box>
			</Box>
		</motion.div>
	);
};
const appName = import.meta.env.VITE_APP_NAME;

const IndexPage = () => {
	const { data: profile, isLoading, isError } = useProfile();
	useDocumentTitle(`${appName}`);

	if (isError) {
		return (
			<Container size="lg" mt={80}>
				<Text c="red" ff="monospace">
					Error: Failed to load profile data.
				</Text>
			</Container>
		);
	}

	return (
		<AnimatedPage>
			<Container
				size="lg"
				style={{
					minHeight: "calc(100vh - 112px)",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Box style={{ width: "100%", position: "relative" }}>
					<Box style={{ maxWidth: 680, position: "relative", zIndex: 1 }}>
						<motion.div variants={itemVariant}>
							<TypewriterText
								text="> hello, my name is"
								speed={55}
								delay={200}
							/>
						</motion.div>

						<motion.div variants={itemVariant}>
							{isLoading ? (
								<Skeleton height={72} width="70%" mt={12} mb={8} radius="sm" />
							) : (
								<Title
									order={1}
									mt={12}
									style={{
										fontFamily: "'Fira Code', monospace",
										fontSize: "clamp(2.8rem, 6vw, 5rem)",
										fontWeight: 700,
										lineHeight: 1.05,
										letterSpacing: "-0.03em",
										background: "var(--accent-gradient)",
										WebkitBackgroundClip: "text",
										WebkitTextFillColor: "transparent",
										backgroundClip: "text",
									}}
								>
									{profile?.name ?? "nabilunnuha"}
								</Title>
							)}
						</motion.div>

						<motion.div variants={itemVariant}>
							{isLoading ? (
								<Skeleton height={44} width="50%" mt={8} mb={16} radius="sm" />
							) : (
								<Title
									order={2}
									mt={8}
									style={{
										fontSize: "clamp(1.2rem, 2vw, 2rem)",
										fontWeight: 600,
										color: "var(--text-secondary)",
										letterSpacing: "-0.01em",
									}}
								>
									{profile?.role ?? "Full Stack Developer"}
								</Title>
							)}
						</motion.div>

						{/* Bio */}
						<motion.div variants={itemVariant}>
							{isLoading ? (
								<Box mt={24}>
									<Skeleton height={18} width="90%" mt={8} radius="sm" />
									<Skeleton height={18} width="75%" mt={8} radius="sm" />
									<Skeleton height={18} width="60%" mt={8} radius="sm" />
								</Box>
							) : (
								<Text
									mt={24}
									mb="xl"
									style={{
										maxWidth: 520,
										lineHeight: 1.75,
										color: "var(--text-secondary)",
										fontSize: "0.9rem",
									}}
								>
									{profile?.bio}
								</Text>
							)}
						</motion.div>

						<motion.div variants={itemVariant}>
							<Group mt={40} gap="md">
								<Link to="/projects" style={{ textDecoration: "none" }}>
									<Box
										className="cta-button"
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: 8,
										}}
									>
										<IconFolderCode size={16} />
										View Projects
										<IconArrowRight size={14} />
									</Box>
								</Link>

								<Link to="/about" style={{ textDecoration: "none" }}>
									<Box className="cta-button cta-button-ghost">about me →</Box>
								</Link>
							</Group>
						</motion.div>
					</Box>

					<Box visibleFrom="lg">
						<CodeSnippet
							name={profile?.name}
							role={profile?.role}
							stacks={profile?.skills?.slice(0, 4)}
						/>
					</Box>
				</Box>
			</Container>
		</AnimatedPage>
	);
};

export default IndexPage;
