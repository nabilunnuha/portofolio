import { Box } from '@mantine/core';
import type { ReactNode, CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  p?: number | string;
  style?: CSSProperties;
  className?: string;
  hoverable?: boolean;
}

const GlassCard = ({
  children,
  p = 24,
  style,
  className = '',
  hoverable = true,
}: GlassCardProps) => {
  return (
    <Box
      className={`glass-card ${hoverable ? '' : 'no-hover'} ${className}`}
      style={{
        padding: typeof p === 'number' ? p : undefined,
        ...style,
      }}
      p={typeof p === 'string' ? p : undefined}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
