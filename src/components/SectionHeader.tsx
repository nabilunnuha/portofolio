import { Box, Title, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { itemVariant } from './AnimatedPage';

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
}

const SectionHeader = ({ number, title, subtitle }: SectionHeaderProps) => {
  return (
    <Box mb={50}>
      <motion.div variants={itemVariant}>
        <Text
          ff="monospace"
          size="sm"
          mb={10}
          style={{
            color: 'var(--accent-indigo)',
            letterSpacing: '0.05em',
          }}
        >
          {number}
        </Text>
      </motion.div>

      <motion.div variants={itemVariant}>
        <Title
          order={1}
          style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            fontWeight: 700,
          }}
        >
          {title}
        </Title>
      </motion.div>

      {subtitle && (
        <motion.div variants={itemVariant}>
          <Text c="dimmed" mt="md" style={{ maxWidth: 600, lineHeight: 1.6 }}>
            {subtitle}
          </Text>
        </motion.div>
      )}
    </Box>
  );
};

export default SectionHeader;
