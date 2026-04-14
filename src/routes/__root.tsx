import { Outlet, Link, useRouterState } from "@tanstack/react-router";
import {
	Box,
	Group,
	Text,
	ActionIcon,
	useMantineColorScheme,
	useComputedColorScheme,
	Burger,
	Drawer,
	Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatePresence } from "framer-motion";
import {
	IconSun,
	IconMoon,
	IconBrandGithub,
	IconCode,
} from "@tabler/icons-react";

const navLinks = [
	{ num: "01.", label: "home", path: "/" },
	{ num: "02.", label: "about", path: "/about" },
	{ num: "03.", label: "projects", path: "/projects" },
	{ num: "04.", label: "blog", path: "/blog" },
	{ num: "05.", label: "contact", path: "/contact" },
];

const Root = () => {
	const router = useRouterState();
	const currentPath = router.location.pathname;

	const [opened, { toggle, close }] = useDisclosure(false);

	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("dark", {
		getInitialValueInEffect: true,
	});
	const isDark = computedColorScheme === "dark";

	return (
		<Box
			style={{
				background: "var(--bg-primary)",
				minHeight: "100vh",
				color: "var(--text-primary)",
				transition: "background-color 0.3s ease",
				overflowX: "hidden",
				position: "relative",
			}}
		>
			<Box
				aria-hidden
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 0,
					pointerEvents: "none",
					backgroundImage: `
						linear-gradient(rgba(129,140,248,0.025) 1px, transparent 1px),
						linear-gradient(90deg, rgba(129,140,248,0.025) 1px, transparent 1px)
					`,
					backgroundSize: "44px 44px",
				}}
			/>

			<Box
				aria-hidden
				style={{
					position: "fixed",
					inset: 0,
					zIndex: 0,
					pointerEvents: "none",
					overflow: "hidden",
				}}
			>
				<Box
					style={{
						position: "absolute",
						top: "10%",
						left: "5%",
						width: 500,
						height: 500,
						borderRadius: "50%",
						background:
							"radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
						animation: "float-slow 20s ease-in-out infinite",
						filter: "blur(40px)",
					}}
				/>
				<Box
					style={{
						position: "absolute",
						top: "40%",
						right: "5%",
						width: 400,
						height: 400,
						borderRadius: "50%",
						background:
							"radial-gradient(circle, rgba(192,132,252,0.06) 0%, transparent 70%)",
						animation: "float-slow 25s ease-in-out infinite reverse",
						filter: "blur(40px)",
					}}
				/>
				<Box
					style={{
						position: "absolute",
						bottom: "15%",
						left: "35%",
						width: 350,
						height: 350,
						borderRadius: "50%",
						background:
							"radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)",
						animation: "float-slow 18s ease-in-out infinite 5s",
						filter: "blur(40px)",
					}}
				/>
			</Box>

			{/* ── Navbar ── */}
			<Box
				component="nav"
				px={{ base: 20, md: 40 }}
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					right: 0,
					zIndex: 100,
					height: 64,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					background: isDark ? "rgba(10,11,16,0.85)" : "rgba(248,249,251,0.85)",
					backdropFilter: "blur(16px)",
					WebkitBackdropFilter: "blur(16px)",
					borderBottom: "1px solid var(--border-subtle)",
					transition: "all 0.3s ease",
				}}
			>
				{/* Logo */}
				<Link to="/" style={{ textDecoration: "none" }}>
					<Group
						gap={8}
						style={{
							fontFamily: "'JetBrains Mono', monospace",
							fontSize: 14,
						}}
					>
						<IconCode size={18} style={{ color: "var(--accent-indigo)" }} />
						<Text
							span
							style={{
								background: "var(--accent-gradient)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
								fontWeight: 700,
								letterSpacing: "-0.02em",
							}}
						>
							dev.portfolio
						</Text>
						<Box
							style={{
								width: 7,
								height: 15,
								background: "var(--accent-indigo)",
								borderRadius: 1,
								animation: "blink 1.1s step-end infinite",
								display: "inline-block",
							}}
						/>
					</Group>
				</Link>

				{/* Nav links — desktop only */}
				<Group
					visibleFrom="md"
					gap={4}
					component="ul"
					style={{ listStyle: "none", margin: 0, padding: 0 }}
				>
					{navLinks.map((link) => {
						const isActive = currentPath === link.path;
						return (
							<Box component="li" key={link.path}>
								<Link to={link.path} style={{ textDecoration: "none" }}>
									<Box
										style={{
											fontFamily: "'JetBrains Mono', monospace",
											fontSize: 12,
											letterSpacing: "0.04em",
											color: isActive
												? "var(--accent-indigo)"
												: "var(--text-muted)",
											padding: "6px 14px",
											borderRadius: 6,
											border: isActive
												? "1px solid var(--border-subtle)"
												: "1px solid transparent",
											background: isActive
												? "var(--glow-color)"
												: "transparent",
											display: "flex",
											alignItems: "center",
											gap: 6,
											transition: "all 0.2s ease",
											cursor: "pointer",
										}}
										onMouseEnter={(e) => {
											if (!isActive) {
												e.currentTarget.style.color = "var(--text-primary)";
											}
										}}
										onMouseLeave={(e) => {
											if (!isActive) {
												e.currentTarget.style.color = "var(--text-muted)";
											}
										}}
									>
										<Text
											span
											style={{
												color: "var(--accent-indigo)",
												fontSize: 10,
												opacity: 0.7,
											}}
										>
											{link.num}
										</Text>
										{link.label}
									</Box>
								</Link>
							</Box>
						);
					})}
				</Group>

				<Group gap={10}>
					<Group
						visibleFrom="sm"
						gap={6}
						style={{
							fontFamily: "'JetBrains Mono', monospace",
							fontSize: 11,
							color: "var(--accent-cyan)",
							padding: "4px 12px",
							border: "1px solid rgba(56,189,248,0.2)",
							borderRadius: 20,
							background: "rgba(56,189,248,0.04)",
						}}
					>
						<Box
							style={{
								width: 6,
								height: 6,
								borderRadius: "50%",
								background: "var(--accent-cyan)",
								animation: "pulse 2s ease infinite",
							}}
						/>
						<Link
							to="/contact"
							style={{ textDecoration: "none", color: "inherit" }}
						>
							open to work
						</Link>
					</Group>

					{/* GitHub link */}
					<ActionIcon
						component="a"
						href="https://github.com/nabilunnuha"
						target="_blank"
						rel="noreferrer"
						variant="subtle"
						color="gray"
						size="md"
						aria-label="GitHub"
					>
						<IconBrandGithub size={18} />
					</ActionIcon>

					{/* Dark/Light toggle */}
					<ActionIcon
						onClick={() => setColorScheme(isDark ? "light" : "dark")}
						variant="subtle"
						color="gray"
						size="md"
						aria-label="Toggle color scheme"
					>
						{isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
					</ActionIcon>

					{/* Burger — mobile only */}
					<Burger
						hiddenFrom="md"
						opened={opened}
						onClick={toggle}
						size="sm"
						color="var(--accent-indigo)"
					/>
				</Group>
			</Box>

			{/* ── Mobile Drawer ── */}
			<Drawer
				opened={opened}
				onClose={close}
				position="right"
				size="xs"
				title={
					<Group
						gap={8}
						style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}
					>
						<IconCode size={16} style={{ color: "var(--accent-indigo)" }} />
						<Text
							span
							style={{
								background: "var(--accent-gradient)",
								WebkitBackgroundClip: "text",
								WebkitTextFillColor: "transparent",
								backgroundClip: "text",
							}}
						>
							menu
						</Text>
					</Group>
				}
				styles={{
					content: { background: "var(--bg-secondary)" },
					header: {
						background: "var(--bg-secondary)",
						borderBottom: "1px solid var(--border-subtle)",
					},
					close: { color: "var(--accent-indigo)" },
				}}
			>
				<Stack gap={4} mt="md">
					{navLinks.map((link) => {
						const isActive = currentPath === link.path;
						return (
							<Link
								to={link.path}
								key={link.path}
								style={{ textDecoration: "none" }}
								onClick={close}
							>
								<Box
									style={{
										fontFamily: "'JetBrains Mono', monospace",
										fontSize: 14,
										color: isActive
											? "var(--accent-indigo)"
											: "var(--text-primary)",
										padding: "12px 16px",
										borderRadius: 8,
										background: isActive ? "var(--glow-color)" : "transparent",
										border: isActive
											? "1px solid var(--border-subtle)"
											: "1px solid transparent",
										display: "flex",
										alignItems: "center",
										gap: 12,
										transition: "all 0.2s ease",
									}}
								>
									<Text
										span
										style={{
											color: "var(--accent-indigo)",
											fontSize: 12,
											opacity: 0.7,
										}}
									>
										{link.num}
									</Text>
									{link.label}
								</Box>
							</Link>
						);
					})}
				</Stack>
			</Drawer>

			{/* ── Page content (native scroll) ── */}
			<Box
				style={{
					position: "relative",
					zIndex: 1,
					paddingTop: 64,
					paddingBottom: 48,
					minHeight: "100vh",
				}}
			>
				<AnimatePresence mode="wait">
					<Outlet />
				</AnimatePresence>
			</Box>

			{/* ── Footer strip ── */}
			<Box
				component="footer"
				px={{ base: 16, md: 40 }}
				style={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					height: 40,
					background: isDark ? "rgba(10,11,16,0.9)" : "rgba(248,249,251,0.9)",
					backdropFilter: "blur(12px)",
					borderTop: "1px solid var(--border-subtle)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 16,
					zIndex: 100,
					fontFamily: "'JetBrains Mono', monospace",
					fontSize: 11,
					color: "var(--text-muted)",
					transition: "all 0.3s ease",
					flexWrap: "nowrap",
					overflow: "hidden",
				}}
			>
				{[
					{ label: "React", accent: "+ Vite", hide: false },
					{ label: "TypeScript", accent: "5.x", hide: true },
					{ label: "TanStack", accent: "Router", hide: true },
					{ label: "Deployed on", accent: "Vercel", hide: false },
				].map((item, i) => (
					<Group
						key={i}
						gap={5}
						display={{ base: item.hide ? "none" : "flex", sm: "flex" }}
						style={{ flexShrink: 0 }}
					>
						{i > 0 && <Text style={{ color: "var(--border-subtle)" }}>·</Text>}
						<Text>
							{item.label}{" "}
							<Text span style={{ color: "var(--accent-indigo)" }}>
								{item.accent}
							</Text>
						</Text>
					</Group>
				))}
			</Box>
		</Box>
	);
};

export default Root;
