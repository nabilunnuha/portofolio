import { useState } from "react";
import {
	Container,
	Text,
	Box,
	Group,
	Skeleton,
	SimpleGrid,
	Flex,
	Title,
} from "@mantine/core";
import { motion } from "framer-motion";
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react";
import { useProjects } from "../hooks/usePortfolio";
import AnimatedPage, { itemVariant } from "../components/AnimatedPage";
import SectionHeader from "../components/SectionHeader";
import TechBadge from "../components/TechBadge";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useProfile } from "../hooks/usePortfolio";
import GalleryModal from "../components/GaleryModal";

interface DemoButtonProps {
	demo: string | string[] | undefined | null;
	projectTitle?: string;
}

const DemoButton = ({ demo, projectTitle }: DemoButtonProps) => {
	const [opened, setOpened] = useState(false);

	if (!demo) {
		return (
			<Group gap={4} style={{ opacity: 0.3, cursor: "not-allowed" }}>
				<IconExternalLink size={15} />
				<Text ff="monospace" size="sm" c="dimmed">
					demo
				</Text>
			</Group>
		);
	}

	if (Array.isArray(demo)) {
		return (
			<>
				<Group
					gap={4}
					className="project-link"
					style={{ cursor: "pointer" }}
					onClick={() => setOpened(true)}
					role="button"
					aria-label="View demo screenshots"
				>
					<IconExternalLink size={15} />
					<Text ff="monospace" size="xs" span>
						demo
					</Text>
					{demo.length > 1 && (
						<Text
							ff="monospace"
							size="10px"
							c="dimmed"
							span
							style={{
								background: "rgba(255,255,255,0.08)",
								borderRadius: 4,
								padding: "1px 5px",
							}}
						>
							{demo.length}
						</Text>
					)}
				</Group>

				<GalleryModal
					images={demo}
					opened={opened}
					onClose={() => setOpened(false)}
					title={projectTitle}
				/>
			</>
		);
	}

	return (
		<a
			href={demo}
			target="_blank"
			rel="noreferrer"
			className="project-link"
			aria-label="View live demo"
		>
			<IconExternalLink size={15} />
			<Text ff="monospace" size="xs" span>
				demo
			</Text>
		</a>
	);
};

const ProjectsPage = () => {
	const { data: projects, isLoading, isError } = useProjects();
	const { data: profile } = useProfile();
	useDocumentTitle(`Projects | ${profile?.name ?? "nabilunnuha"}`);

	if (isError) {
		return (
			<Container size="md" mt={100}>
				<Text c="red" ff="monospace">
					Error: Failed to load projects data.
				</Text>
			</Container>
		);
	}

	return (
		<AnimatedPage>
			<Container size="md" mt={60} mb={100}>
				<SectionHeader
					number="// 03. projects"
					title="Work & Explorations."
					subtitle="A collection of projects I've built — focused on clean code, great UX, and solid architecture."
				/>

				<SimpleGrid cols={{ base: 1, sm: 2 }} spacing={24}>
					{isLoading
						? Array.from({ length: 4 }).map((_, i) => (
								<Skeleton key={i} height={220} radius="md" />
							))
						: projects?.map((project, i) => (
								<motion.div
									key={project.id}
									variants={itemVariant}
									custom={i}
									whileHover={{ y: -4 }}
									transition={{ duration: 0.25 }}
								>
									<Box className="project-card" style={{ height: "100%" }}>
										<Flex
											direction="column"
											style={{ height: "100%", minHeight: 200 }}
										>
											{/* Header */}
											<Group justify="space-between" align="flex-start" mb="sm">
												<Title
													order={3}
													style={{
														fontFamily: "'Fira Code', monospace",
														fontSize: "1.1rem",
														fontWeight: 600,
														color: "var(--text-primary)",
													}}
												>
													{project.title}
												</Title>

												<Group gap={12}>
													{project.github ? (
														<a
															href={project.github}
															target="_blank"
															rel="noreferrer"
															className="project-link"
															aria-label="View source on GitHub"
														>
															<IconBrandGithub size={17} />
															<Text ff="monospace" size="xs" span>
																src
															</Text>
														</a>
													) : (
														<Group
															gap={4}
															style={{ opacity: 0.3, cursor: "not-allowed" }}
														>
															<IconBrandGithub size={17} />
															<Text ff="monospace" size="sm" c="dimmed">
																src
															</Text>
														</Group>
													)}

													{/* Demo: handles string | string[] */}
													<DemoButton
														demo={project.demo}
														projectTitle={project.title}
													/>
												</Group>
											</Group>

											{/* Description */}
											<Text
												c="dimmed"
												size="sm"
												style={{
													lineHeight: 1.7,
													flexGrow: 1,
													marginBottom: 20,
												}}
											>
												{project.description}
											</Text>

											{/* Tech Stack */}
											<Group gap={8} mt="auto" wrap="wrap">
												{project.tech.map((t) => (
													<TechBadge key={t} label={t} />
												))}
											</Group>
										</Flex>
									</Box>
								</motion.div>
							))}
				</SimpleGrid>
			</Container>
		</AnimatedPage>
	);
};

export default ProjectsPage;
