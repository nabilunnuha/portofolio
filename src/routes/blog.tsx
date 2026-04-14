import { Container, Text, Box, Flex, Skeleton, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconArrowRight } from '@tabler/icons-react';
import { useBlogPosts } from '../hooks/usePortfolio';
import AnimatedPage, { itemVariant } from '../components/AnimatedPage';
import SectionHeader from '../components/SectionHeader';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useProfile } from '../hooks/usePortfolio';

const BlogPage = () => {
  const { data: posts, isLoading, isError } = useBlogPosts();
  const { data: profile } = useProfile();

  useDocumentTitle(`Blog | ${profile?.name ?? 'nabilunnuha'}`);

  if (isError) {
    return (
      <Container size="md" mt={100}>
        <Text c="red" ff="monospace">
          Error: Failed to load blog posts.
        </Text>
      </Container>
    );
  }

  return (
    <AnimatedPage>
      <Container size="md" mt={60} mb={100}>
        <SectionHeader
          number="// 04. blog"
          title="Notes & Writings."
          subtitle="Documenting my thoughts, tutorials, and interesting things across web development and software engineering."
        />

        <Box style={{ borderTop: '1px solid var(--border-subtle)' }}>
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Box
                  key={i}
                  py="xl"
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <Skeleton height={14} width="15%" mb="sm" />
                  <Skeleton height={26} width="55%" mb="sm" />
                  <Skeleton height={16} width="85%" />
                </Box>
              ))
            : posts?.map((post, i) => (
                <motion.div key={post.id} variants={itemVariant} custom={i}>
                  <Box py="xl" className="blog-post">
                    <Flex
                      direction={{ base: 'column', sm: 'row' }}
                      gap={{ base: 'xs', sm: 'xl' }}
                      align="flex-start"
                    >
                      {/* Date */}
                      <Text
                        ff="monospace"
                        size="sm"
                        style={{
                          flexShrink: 0,
                          width: 120,
                          marginTop: 5,
                          color: 'var(--text-muted)',
                        }}
                      >
                        {post.date}
                      </Text>

                      {/* Content */}
                      <Box style={{ flexGrow: 1, cursor: 'pointer' }}>
                        <Title
                          order={3}
                          mb="xs"
                          className="blog-title"
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '1.3rem',
                            fontWeight: 600,
                          }}
                        >
                          {post.title}
                        </Title>

                        <Text
                          size="sm"
                          mb="md"
                          style={{
                            lineHeight: 1.7,
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {post.summary}
                        </Text>

                        <Box
                          className="read-more"
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 13,
                          }}
                        >
                          read article
                          <IconArrowRight size={14} />
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                </motion.div>
              ))}
        </Box>
      </Container>
    </AnimatedPage>
  );
};

export default BlogPage;
