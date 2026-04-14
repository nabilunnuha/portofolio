import { Box, Text } from '@mantine/core';

interface TechBadgeProps {
  label: string;
}

const TechBadge = ({ label }: TechBadgeProps) => {
  return (
    <Box
      style={{
        border: '1px solid var(--border-subtle)',
        padding: '5px 14px',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--glow-color)',
        transition: 'all var(--transition-fast)',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.boxShadow = '0 0 12px var(--glow-color)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-subtle)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Text
        ff="monospace"
        size="xs"
        style={{
          letterSpacing: '0.04em',
          color: 'var(--accent-indigo)',
        }}
      >
        {label}
      </Text>
    </Box>
  );
};

export default TechBadge;
