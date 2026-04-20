import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    Container,
    Grid,
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    TextInput,
    Stack,
    ActionIcon,
    Title,
    Box,
    rem,
    Avatar,
    Divider,
    Tabs,
    Center,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Search, Filter, Rocket, Clock, Users, Sparkles } from 'lucide-react';
export const Route = createFileRoute('/_student_v2/project-hub')({
    component: RouteComponent,
})

const TOPICS = ['Tech', 'Design', 'Business', 'Finance', 'Education'];
const DUMMY_PROJECTS = Array.from({ length: 30 }).map((_, i) => ({
    id: `proj-${i + 1}`,
    title: [
        'AI Health Diagnostic', 'SaaS Financial Tracker', 'UX Case Study: E-Commerce',
        'Blockchain Voting System', 'EdTech Mobile App', 'Smart City Dashboard',
        'Green Energy Monitoring', 'LegalTech Document Automator'
    ][i % 8] + ` #${i + 1}`,
    topic: TOPICS[i % TOPICS.length],
    mentor: {
        name: ['Sarah Chen', 'Aris Wijaya', 'James Stark', 'Jessica Valentine'][i % 4],
        avatar: null
    },
    description: 'Membangun solusi inovatif menggunakan teknologi terbaru dengan bimbingan intensif dari mentor berpengalaman.',
    applicants: Math.floor(Math.random() * 50),
    isNew: i < 5, // 5 Project pertama dianggap terbaru
    createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    image: `https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-${(i % 5) + 1}.png`
}));

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState<string | null>('all');
    const [visibleCount, setVisibleCount] = useState(9); // Load awal 9 card
    const [loading, setLoading] = useState(false);

    // 2. FILTER LOGIC
    const filteredProjects = useMemo(() => {
        return DUMMY_PROJECTS.filter((p) => {
            const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
            const matchTab = activeTab === 'all' || p.topic.toLowerCase() === activeTab;
            const matchNew = activeTab === 'new' ? p.isNew : true;
            return matchSearch && matchTab && matchNew;
        });
    }, [search, activeTab]);

    const handleLoadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((prev) => prev + 6);
            setLoading(false);
        }, 8000); // Simulasi delay loading
    };

    return (
        <Box p={isMobile ? "md" : "xl"} style={{ minHeight: '100%' }}>
            {/* HEADER SECTION */}
            <Box bg="white" pt={rem(60)} pb={rem(40)} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Container size="lg">
                    <Stack align="center" gap="xs" ta="center" mb="xl">
                        <Badge variant="light" color="indigo" size="lg">Explore Opportunities</Badge>
                        <Title order={1} style={{ fontSize: rem(42), fontWeight: 900, letterSpacing: '-1.5px' }}>
                            Project Hub <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Mentorship.</span>
                        </Title>
                        <Text c="dimmed" size="lg" style={{ maxWidth: 600 }}>
                            Temukan proyek public yang dikurasi oleh mentor terbaik dan ajukan diri Anda untuk bergabung dalam akselerasi.
                        </Text>
                    </Stack>

                    {/* SEARCH & FILTERS */}
                    <Group justify="center" mt={40}>
                        <TextInput
                            placeholder="Cari judul proyek atau teknologi..."
                            leftSection={<Search size={18} />}
                            size="md"
                            radius="md"
                            w={{ base: '100%', sm: 400 }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <ActionIcon variant="light" color="indigo" size="input-md" radius="md">
                            <Filter size={20} />
                        </ActionIcon>
                    </Group>
                </Container>
            </Box>

            {/* TABS FILTER */}
            <Container size="lg" mt="xl">
                <Tabs value={activeTab} onChange={setActiveTab} color="indigo" variant="pills" radius="xl">
                    <Tabs.List justify="center">
                        <Tabs.Tab value="all">Semua Project</Tabs.Tab>
                        <Tabs.Tab value="new" leftSection={<Sparkles size={14} color="orange" />}>Terbaru</Tabs.Tab>
                        <Tabs.Tab value="tech">Technology</Tabs.Tab>
                        <Tabs.Tab value="design">Design</Tabs.Tab>
                        <Tabs.Tab value="business">Business</Tabs.Tab>
                    </Tabs.List>
                </Tabs>

                {/* PROJECT GRID */}
                <Grid gap="xl" mt={40}>
                    {filteredProjects.slice(0, visibleCount).map((project) => (
                        <Grid.Col key={project.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <ProjectCard project={project} />
                        </Grid.Col>
                    ))}
                </Grid>

                {/* LOAD MORE */}
                {visibleCount < filteredProjects.length && (
                    <Center mt={50}>
                        <Button
                            variant="white"
                            color="indigo"
                            size="lg"
                            radius="md"
                            onClick={handleLoadMore}
                            loading={loading}
                            style={{ border: '1px solid var(--mantine-color-indigo-2)' }}
                        >
                            Lihat Lebih Banyak Proyek
                        </Button>
                    </Center>
                )}
            </Container>
        </Box>
    );
}

// 3. SUB-COMPONENT: PROJECT CARD
function ProjectCard({ project }: { project: any }) {
    return (
        <Card shadow="sm" padding="lg" radius="lg" withBorder style={{ transition: 'transform 0.2s ease' }}>
            <Card.Section pos="relative">
                <Image src={project.image} height={160} alt={project.title} />
                {project.isNew && (
                    <Badge color="orange" variant="filled" pos="absolute" top={10} left={10} >
                        Terbaru
                    </Badge>
                )}
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Badge variant="light" color="indigo">{project.topic}</Badge>
                <Group gap={4}>
                    <Users size={14} color="gray" />
                    <Text size="xs" c="dimmed">{project.applicants} Pelamar</Text>
                </Group>
            </Group>

            <Title order={4} mb="sm" lineClamp={1}>{project.title}</Title>

            <Text size="sm" c="dimmed" lineClamp={2} mb="lg">
                {project.description}
            </Text>

            <Divider variant="dashed" mb="md" />

            <Group justify="space-between">
                <Group gap="xs">
                    <Avatar size="sm" radius="xl" color="indigo">{project.mentor.name.charAt(0)}</Avatar>
                    <Box>
                        <Text size="xs" fw={700}>{project.mentor.name}</Text>
                        <Text size="10px" c="dimmed">Mentor</Text>
                    </Box>
                </Group>
                <Group gap={4}>
                    <Clock size={12} color="gray" />
                    <Text size="10px" c="dimmed">{project.createdAt}</Text>
                </Group>
            </Group>

            <Button
                fullWidth
                color="indigo"
                mt="xl"
                radius="md"
                variant="light"
                rightSection={<Rocket size={16} />}
            >
                Apply Project
            </Button>
        </Card>
    );
}