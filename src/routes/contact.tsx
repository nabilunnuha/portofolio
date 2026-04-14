import {
	Container,
	Title,
	Text,
	Group,
	Skeleton,
	Flex,
	CopyButton,
	Tooltip,
	Box,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
	IconMail,
	IconBrandGithub,
	IconBrandLinkedin,
	IconCopy,
	IconCheck,
	IconSend,
} from "@tabler/icons-react";
import { useProfile } from "../hooks/usePortfolio";
import AnimatedPage, { itemVariant } from "../components/AnimatedPage";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ContactPage = () => {
	const { data: profile, isLoading, isError } = useProfile();

	useDocumentTitle(`Contact | ${profile?.name ?? "nabilunnuha"}`);

	if (isError) {
		return (
			<Container size="md" mt={100}>
				<Text c="red" ff="monospace">
					Error: Failed to load profile data.
				</Text>
			</Container>
		);
	}

	return (
		<AnimatedPage>
			<Container
				size="md"
				style={{
					minHeight: "calc(100vh - 112px)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Flex
					direction="column"
					align="center"
					ta="center"
					style={{ maxWidth: 580 }}
				>
					<motion.div variants={itemVariant}>
						<Text
							ff="monospace"
							size="sm"
							mb={10}
							style={{
								color: "var(--accent-indigo)",
								letterSpacing: "0.05em",
							}}
						>
							// 05. contact
						</Text>
					</motion.div>

					<motion.div variants={itemVariant}>
						<Title
							order={1}
							style={{
								fontFamily: "'Fira Code', monospace",
								fontSize: "clamp(2rem, 5vw, 3.2rem)",
								fontWeight: 700,
								background: "var(--accent-gradient)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
								marginBottom: 8,
							}}
						>
							Let's Collaborate.
						</Title>
					</motion.div>

					<motion.div variants={itemVariant}>
						{isLoading ? (
							<Skeleton height={60} width="80%" radius="sm" mt="md" />
						) : (
							<Text
								c="dimmed"
								size="lg"
								mt="md"
								mb={40}
								style={{ lineHeight: 1.7 }}
							>
								I'm currently open to new job opportunities and projects.
								Whether you have a question, a collaboration idea, or just want
								to say hi — my inbox is always open and I'll get back to you as
								soon as possible!
							</Text>
						)}
					</motion.div>

					<motion.div variants={itemVariant}>
						<Group gap="md" justify="center" wrap="wrap">
							{/* Send Email button */}
							<a
								href={`mailto:${profile?.email}`}
								style={{ textDecoration: "none" }}
							>
								<Box
									className="cta-button"
									style={{
										display: "inline-flex",
										alignItems: "center",
										gap: 8,
									}}
								>
									<IconSend size={16} />
									Send a Message
								</Box>
							</a>

							{/* Copy Email button */}
							{profile?.email && (
								<CopyButton value={profile.email} timeout={2000}>
									{({ copied, copy }) => (
										<Tooltip
											label={copied ? "Copied!" : "Copy email to clipboard"}
											withArrow
											position="right"
										>
											<Box
												className="cta-button cta-button-ghost"
												onClick={copy}
												style={{
													display: "inline-flex",
													alignItems: "center",
													gap: 8,
													cursor: "pointer",
													fontFamily: "var(--font-mono)",
													color: copied ? "var(--accent-cyan)" : undefined,
													borderColor: copied
														? "rgba(56,189,248,0.3)"
														: undefined,
												}}
											>
												{copied ? (
													<IconCheck size={16} />
												) : (
													<IconCopy size={16} />
												)}
												{copied ? "[copied!]" : "[copy_email]"}
											</Box>
										</Tooltip>
									)}
								</CopyButton>
							)}
						</Group>
					</motion.div>

					{/* Social links */}
					<motion.div variants={itemVariant}>
						<Group gap="md" mt={60} justify="center">
							{profile?.github && (
								<a
									href={profile.github}
									target="_blank"
									rel="noreferrer"
									className="social-link"
								>
									<IconBrandGithub size={18} />
									<Text ff="monospace" size="sm" span>
										github
									</Text>
								</a>
							)}
							{profile?.linkedin && (
								<a
									href={profile.linkedin}
									target="_blank"
									rel="noreferrer"
									className="social-link"
								>
									<IconBrandLinkedin size={18} />
									<Text ff="monospace" size="sm" span>
										linkedin
									</Text>
								</a>
							)}
							{profile?.email && (
								<a href={`mailto:${profile.email}`} className="social-link">
									<IconMail size={18} />
									<Text ff="monospace" size="sm" span>
										email
									</Text>
								</a>
							)}
						</Group>
					</motion.div>
				</Flex>
			</Container>
		</AnimatedPage>
	);
};

export default ContactPage;
