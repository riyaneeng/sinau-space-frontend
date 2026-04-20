import { createFileRoute } from '@tanstack/react-router'
import {
    Grid,
    Paper,
    Text,
    Group,
    Title,
    Stack,
    RingProgress,
    ThemeIcon,
    SimpleGrid,
    Box,
    Badge,
    Divider,
    Alert
} from '@mantine/core';
import {
    TrendingUp,
    Users,
    Clock,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Smile
} from 'lucide-react';

export const Route = createFileRoute('/_mentor/$projectId/analytics')({
    component: RouteComponent,
})


function RouteComponent() {
    const stats = [
        { label: 'Total Active Students', value: '124', icon: Users, color: 'blue', diff: 12 },
        { label: 'Avg. Completion Rate', value: '68%', icon: TrendingUp, color: 'teal', diff: -3 },
        { label: 'Avg. Time per Milestone', value: '4.2 Days', icon: Clock, color: 'indigo', diff: 5 },
    ];

    return (
        <>
            <Stack gap="xl">
                <header>
                    <Title order={2}>Class Performance Analytics</Title>
                    <Text c="dimmed">Data statistik dari batch Startup Accelerator - April 2026</Text>
                </header>

                {/* 1. TOP STATS CARDS */}
                <SimpleGrid cols={{ base: 1, sm: 3 }}>
                    {stats.map((stat) => (
                        <Paper withBorder p="md" radius="md" key={stat.label}>
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed" fw={700} tt="uppercase">{stat.label}</Text>
                                <ThemeIcon color="gray" variant="light" radius="md">
                                    <stat.icon size={18} />
                                </ThemeIcon>
                            </Group>

                            <Group align="flex-end" gap="xs" mt="md">
                                <Text size="xl" fw={700}>{stat.value}</Text>
                                <Text c={stat.diff > 0 ? 'teal' : 'red'} size="sm" fw={500} style={{ display: 'flex', alignItems: 'center' }}>
                                    <span>{stat.diff}%</span>
                                    {stat.diff > 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                </Text>
                            </Group>
                            <Text size="xs" c="dimmed" mt={7}>Dibandingkan bulan lalu</Text>
                        </Paper>
                    ))}
                </SimpleGrid>

                <Grid gap="md">
                    {/* 2. COMPLETION FUNNEL (Visualisasi Progres Milestone) */}
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper withBorder p="xl" radius="md">
                            <Title order={4} mb="xl">Student Drop-off Funnel</Title>
                            <Stack gap="sm">
                                {[
                                    { label: 'Milestone 1: Foundation', value: 100, color: 'indigo.4' },
                                    { label: 'Milestone 2: Validation', value: 85, color: 'indigo.5' },
                                    { label: 'Milestone 3: MVP Strategy', value: 60, color: 'indigo.6' },
                                    { label: 'Milestone 4: Final Pitch', value: 45, color: 'indigo.8' },
                                ].map((item) => (
                                    <Box key={item.label}>
                                        <Group justify="space-between" mb={5}>
                                            <Text size="sm" fw={500}>{item.label}</Text>
                                            <Text size="sm" fw={700}>{item.value}%</Text>
                                        </Group>
                                        <Box h={12} bg="gray.1" style={{ overflow: 'hidden' }}>
                                            <Box h="100%" w={`${item.value}%`} bg={item.color} style={{ transition: 'width 1s ease' }} />
                                        </Box>
                                    </Box>
                                ))}
                                <Alert color="yellow" icon={<AlertTriangle size={16} />} mt="lg">
                                    <Text size="xs"><strong>Insight:</strong> Terjadi penurunan 25% siswa saat memasuki Milestone 3. AI mendeteksi materi "MVP Strategy" mungkin terlalu teknis.</Text>
                                </Alert>
                            </Stack>
                        </Paper>
                    </Grid.Col>

                    {/* 3. AI SENTIMENT ANALYSIS */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper withBorder p="xl" radius="md" h="100%">
                            <Title order={4} mb="md">Class Sentiment</Title>
                            <Stack align="center" py="xl">
                                <RingProgress
                                    size={160}
                                    roundCaps
                                    thickness={14}
                                    sections={[
                                        { value: 70, color: 'teal', tooltip: 'Positive' },
                                        { value: 20, color: 'yellow', tooltip: 'Neutral' },
                                        { value: 10, color: 'red', tooltip: 'Confused/Frustrated' },
                                    ]}
                                    label={
                                        <Stack gap={0} align="center">
                                            <Smile size={30} color="var(--mantine-color-teal-6)" />
                                            <Text fw={700} size="xl">70%</Text>
                                        </Stack>
                                    }
                                />
                                <Text size="xs" c="dimmed" >
                                    Berdasarkan analisis AI terhadap interaksi chat di AI Project Mentor.
                                </Text>
                            </Stack>
                            <Divider my="sm" />
                            <Stack gap="xs">
                                <Badge color="green" variant="dot">Positive: Mastery of topic</Badge>
                                <Badge color="red" variant="dot">Frustrated: Budgeting Tool</Badge>
                            </Stack>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Stack>
        </>
    );
}
