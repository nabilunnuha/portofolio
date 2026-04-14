import { Button, Center, Stack, Text, Title } from "@mantine/core";
import { IconError404, IconHome } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

export default function NotFoundPage() {
	const navigate = useNavigate();

	return (
		<Center h="calc(100vh - 112px)">
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Stack align="center" gap="md">
					<IconError404 size={80} stroke={1.2} color="gray" />
					<Title order={2}>Page Not Found</Title>
					<Text c="dimmed" ta="center">
						The page you are looking for does not exist or has been moved.
					</Text>
					<Button
						leftSection={<IconHome size={16} />}
						onClick={() => navigate({ to: "/" })}
					>
						Return to main page
					</Button>
				</Stack>
			</motion.div>
		</Center>
	);
}
