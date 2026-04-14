import {
	Container,
	Text,
	Box,
	Group,
	Skeleton,
	Divider,
	Flex,
	type MantineStyleProp,
} from "@mantine/core";
import { motion } from "framer-motion";
import {
	IconBrandGithub,
	IconBrandLinkedin,
	IconMail,
	IconArrowUpRight,
} from "@tabler/icons-react";
import { useProfile } from "../hooks/usePortfolio";
import AnimatedPage, { itemVariant } from "../components/AnimatedPage";
import GlassCard from "../components/GlassCard";
import SectionHeader from "../components/SectionHeader";
import TechBadge from "../components/TechBadge";
import useDocumentTitle from "../hooks/useDocumentTitle";

const socialLinks = [
	{
		key: "github" as const,
		label: "GitHub",
		icon: IconBrandGithub,
		prefix: "github.com/",
		display: "nabilunnuha",
	},
	{
		key: "linkedin" as const,
		label: "LinkedIn",
		icon: IconBrandLinkedin,
		prefix: "linkedin.com/in/",
		display: "nabilunnuha",
	},
	{
		key: "email" as const,
		label: "Email",
		icon: IconMail,
		href: (val: string) => `mailto:${val}`,
		display: "nabilunnuha@gmail.com",
	},
];

const descStyle: MantineStyleProp = {
	color: "var(--text-secondary)",
	lineHeight: 1.75,
	fontSize: "0.9rem",
};

const AboutPage = () => {
	const { data: profile, isLoading, isError } = useProfile();

	useDocumentTitle(`About | ${profile?.name ?? "nabilunnuha"}`);

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
			<Container size="md" mt={50} mb={80}>
				<SectionHeader
					number="// 02. about"
					title="About Me."
					subtitle="Passionate developer focused on building modern, accessible, and user-centered web experiences."
				/>

				<Flex
					direction={{ base: "column", md: "row" }}
					gap={40}
					align="flex-start"
				>
					<Box style={{ flex: "1 1 58%" }}>
						<motion.div variants={itemVariant}>
							{isLoading ? (
								<Box>
									<Skeleton height={16} mt={10} radius="sm" />
									<Skeleton height={16} mt={10} radius="sm" />
									<Skeleton height={16} mt={10} width="80%" radius="sm" />
									<Skeleton height={16} mt={20} radius="sm" />
									<Skeleton height={16} mt={10} width="70%" radius="sm" />
								</Box>
							) : (
								<Box>
									<Text size="lg" style={descStyle}>
										{profile?.bio}
									</Text>
									<Text mt="lg" size="lg" style={descStyle}>
										Currently, I focus on building modern interactive web
										interfaces that are accessible, performance-driven, and
										centered around the user experience. I enjoy working close
										to the full stack — from crafting pixel-perfect UIs to
										designing efficient backend APIs.
									</Text>
									<Text mt="lg" size="lg" style={descStyle}>
										When I'm not coding, I'm reading about system design,
										exploring new frameworks, or writing about things I've
										learned along the way.
									</Text>
								</Box>
							)}
						</motion.div>
					</Box>

					<Box style={{ flex: "1 1 38%" }}>
						<motion.div variants={itemVariant}>
							{isLoading ? (
								<Skeleton height={240} radius="md" />
							) : (
								<GlassCard>
									<Text
										ff="monospace"
										size="xs"
										mb="sm"
										style={{
											textTransform: "uppercase",
											letterSpacing: "0.08em",
											color: "var(--accent-indigo)",
										}}
									>
										Current Stack
									</Text>

									<Group gap={8} mb="xl" wrap="wrap">
										{profile?.skills.map((skill) => (
											<TechBadge key={skill} label={skill} />
										))}
									</Group>

									<Divider
										mb="lg"
										style={{ borderColor: "var(--border-subtle)" }}
									/>

									<Text
										ff="monospace"
										size="xs"
										mb="sm"
										style={{
											textTransform: "uppercase",
											letterSpacing: "0.08em",
											color: "var(--accent-indigo)",
										}}
									>
										Connect
									</Text>

									<Box
										style={{
											display: "flex",
											flexDirection: "column",
											gap: 4,
										}}
									>
										{socialLinks.map(({ key, label, icon: Icon, display }) => {
											const href =
												key === "email"
													? `mailto:${profile?.email}`
													: profile?.[key as keyof typeof profile];

											if (!href) return null;

											return (
												<a
													key={key}
													href={href as string}
													target={key !== "email" ? "_blank" : undefined}
													rel="noreferrer"
													className="social-link"
												>
													<Icon size={16} />
													<Text
														span
														ff="monospace"
														size="sm"
														style={{ color: "var(--text-secondary)" }}
													>
														{label}
													</Text>
													<Text
														span
														ff="monospace"
														size="xs"
														style={{ color: "var(--text-muted)" }}
													>
														/
													</Text>
													<Text span ff="monospace" size="sm">
														{display}
													</Text>
													<IconArrowUpRight
														size={13}
														style={{
															color: "var(--accent-indigo)",
															marginLeft: "auto",
														}}
													/>
												</a>
											);
										})}
									</Box>
								</GlassCard>
							)}
						</motion.div>
					</Box>
				</Flex>
			</Container>
		</AnimatedPage>
	);
};

export default AboutPage;
