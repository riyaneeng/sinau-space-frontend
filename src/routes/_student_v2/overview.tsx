import { createFileRoute, Link } from '@tanstack/react-router'
import {
    Grid,
    Text,
    Title,
    Stack,
    Group,
    Paper,
    Badge,
    ThemeIcon,
    Avatar,
    Button,
    Progress,
    Box,
    rem,
    SimpleGrid,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
    Rocket,
    Clock,
    Zap,
    Trophy,
    ArrowUpRight,
    MessageCircle,
    CheckCircle2,
    Medal
} from 'lucide-react';

export const Route = createFileRoute('/_student_v2/overview')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    return (
        <Box p={isMobile ? "md" : "xl"} style={{ minHeight: '100%' }}>
            {/* 1. WELCOME HEADER */}
            <Stack gap={4} mb="xl">
                <Group justify="space-between" align="flex-end">
                    <Box>
                        <Text c="dimmed" fw={600} size="sm">Saturday, 14 October</Text>
                        <Title order={2} lts={-1} fw={900}>
                            Welcome back, <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Dafara!</span> 👋
                        </Title>
                        <Text c="dimmed" size="sm">You have 2 projects due this week. Stay focused!</Text>
                    </Box>
                    <Button
                        component={Link}
                        to="/project-hub"
                        leftSection={<Rocket size={16} />}
                        radius="md"
                        color="indigo"
                        variant="light"
                    >
                        Start New Mission
                    </Button>
                </Group>
            </Stack>

            {/* 2. STATS QUICK CARDS */}
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mb="xl">
                <StatsCard label="Project Radar" value="88%" desc="Average Performance" icon={Zap} color="orange" />
                <StatsCard label="Completed" value="12" desc="Courses & Workshops" icon={CheckCircle2} color="green" />
                {/* <StatsCard label="Global Rank" value="#42" desc="Top 5% of Students" icon={Trophy} color="yellow" /> */}
                <StatsCard label="Total Badges" value="08" desc="Earned Achievements" icon={Medal} color="indigo" />
            </SimpleGrid>

            <Grid gap="md">
                {/* 3. CURRENT ACTIVE PROJECT (LEFT COLUMN) */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Paper withBorder p="xl" radius="lg" mb="md">
                        <Group justify="space-between" mb="xl">
                            <Box>
                                <Title order={4}>Current Focus</Title>
                                <Text size="xs" c="dimmed">Your most active project currently</Text>
                            </Box>
                            <Button variant="subtle" size="xs" rightSection={<ArrowUpRight size={14} />}>Open Project Hub</Button>
                        </Group>

                        <Paper bg="gray.0" p="md" radius="md">
                            <Group wrap="nowrap" align="flex-start">
                                <Avatar size={60} radius="md" color="indigo" src={null}>FI</Avatar>
                                <Box style={{ flex: 1 }}>
                                    <Group justify="space-between" mb={4}>
                                        <Text fw={700}>Fintech Innovation Lab v2</Text>
                                        <Badge color="orange" variant="light">High Priority</Badge>
                                    </Group>
                                    <Text size="xs" c="dimmed" mb="md">Mentor: James Stark • Sprint 3: API Integration</Text>

                                    <Group justify="space-between" mb={8}>
                                        <Text size="xs" fw={700}>Progress Milestone</Text>
                                        <Text size="xs" fw={700}>75%</Text>
                                    </Group>
                                    <Progress value={75} size="sm" radius="xl" color="indigo" animated />
                                </Box>
                            </Group>
                        </Paper>
                    </Paper>

                    {/* 4. UPCOMING SESSIONS / TASKS */}
                    <Paper withBorder p="xl" radius="lg">
                        <Title order={4} mb="lg">Upcoming Mentorship</Title>
                        <Stack gap="sm">
                            <SessionItem
                                title="Weekly Sync: UI Feedback"
                                time="Today, 04:00 PM"
                                mentor="Aris Wijaya"
                                type="Video Call"
                            />
                            <SessionItem
                                title="Design System Review"
                                time="Tomorrow, 10:00 AM"
                                mentor="Sarah Chen"
                                type="Offline Meeting"
                            />
                        </Stack>
                    </Paper>
                </Grid.Col>

                {/* 5. SIDEBAR OVERVIEW (RIGHT COLUMN) */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    {/* BADGE SHOWCASE */}
                    <Paper withBorder p="xl" radius="lg" mb="md" bg="indigo.0" style={{ borderColor: 'var(--mantine-color-indigo-2)' }}>
                        <Group justify="space-between" mb="md">
                            <Title order={4} c="indigo.9">Recent Badges</Title>
                            <Trophy size={20} color="var(--mantine-color-indigo-6)" />
                        </Group>
                        <Group gap="xs">
                            <Tooltip label="Code Master">
                                <Avatar radius="xl" size="md" color="indigo" variant="filled"><Zap size={16} /></Avatar>
                            </Tooltip>
                            <Tooltip label="Top Contributor">
                                <Avatar radius="xl" size="md" color="grape" variant="filled"><MessageCircle size={16} /></Avatar>
                            </Tooltip>
                            <Avatar radius="xl" size="md" color="gray.3" variant="outline" style={{ borderStyle: 'dashed' }}>
                                <Text size="xs">+5</Text>
                            </Avatar>
                        </Group>
                        <Button fullWidth mt="xl" size="xs" variant="white" color="indigo" radius="md">
                            View Achievement Vault
                        </Button>
                    </Paper>

                    {/* ACTIVITY FEED */}
                    <Paper withBorder p="xl" radius="lg">
                        <Title order={4} mb="md">Activity Feed</Title>
                        <Stack gap="lg">
                            <ActivityItem text="You applied to 'AI Health Project'" time="2h ago" icon={Rocket} />
                            <ActivityItem text="James Stark left a feedback" time="5h ago" icon={MessageCircle} />
                            <ActivityItem text="Completed 'Advanced CSS' badge" time="1d ago" icon={CheckCircle2} />
                        </Stack>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

// --- SUB-COMPONENTS ---

function StatsCard({ label, value, desc, icon: Icon, color }: any) {
    return (
        <Paper withBorder p="md" radius="lg">
            <Group justify="space-between">
                <Box>
                    <Text size="xs" c="dimmed" fw={700} tt="uppercase">{label}</Text>
                    <Text size="xl" fw={900}>{value}</Text>
                </Box>
                <ThemeIcon size="lg" radius="md" variant="light" color={color}>
                    <Icon size={20} />
                </ThemeIcon>
            </Group>
            <Text size="10px" c="dimmed" mt="xs">{desc}</Text>
        </Paper>
    );
}

function SessionItem({ title, time, mentor, type }: any) {
    return (
        <Group justify="space-between" p="sm" style={{ borderRadius: rem(8), border: '1px solid var(--mantine-color-gray-1)' }}>
            <Group gap="sm">
                <ThemeIcon variant="light" color="indigo" size="md"><Clock size={16} /></ThemeIcon>
                <Box>
                    <Text size="sm" fw={700}>{title}</Text>
                    <Text size="xs" c="dimmed">{time} • {mentor}</Text>
                </Box>
            </Group>
            <Badge size="xs" variant="outline">{type}</Badge>
        </Group>
    );
}

function ActivityItem({ text, time, icon: Icon }: any) {
    return (
        <Group gap="sm" wrap="nowrap" align="flex-start">
            <ThemeIcon variant="subtle" color="gray" size="sm"><Icon size={14} /></ThemeIcon>
            <Box>
                <Text size="xs" fw={500}>{text}</Text>
                <Text size="10px" c="dimmed">{time}</Text>
            </Box>
        </Group>
    );
}

function Tooltip({ children }: any) {
    return <Box style={{ cursor: 'pointer' }}>{children}</Box>; // Mock Tooltip
}