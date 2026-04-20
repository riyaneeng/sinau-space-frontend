import { createFileRoute } from '@tanstack/react-router'
import {
    Grid,
    Paper,
    Text,
    Group,
    Title,
    Stack,
    ThemeIcon,
    SimpleGrid,
    Box,
    Badge,
    Table,
    Progress
} from '@mantine/core';
import {
    Users,
    BrainCircuit,
    Zap,
    TrendingUp,
    Globe
} from 'lucide-react';

export const Route = createFileRoute('/_admin/dashboard')({
    component: RouteComponent,
})

function RouteComponent() {
    const stats = [
        { title: 'Total Active Users', value: '12,482', diff: 14, icon: Users, color: 'blue' },
        { title: 'AI Tokens Usage', value: '84.2M', diff: -2, icon: BrainCircuit, color: 'orange' },
        { title: 'System Uptime', value: '99.98%', diff: 0, icon: Zap, color: 'teal' },
        { title: 'Monthly Revenue', value: '$42,300', diff: 18, icon: TrendingUp, color: 'grape' },
    ];

    return (
        <Stack gap="lg">
            {/* WELCOME HEADER */}
            <Box>
                <Title order={2} style={{ letterSpacing: '-0.5px' }}>System Command Center</Title>
                <Text c="dimmed" size="sm">Real-time monitoring dan performa infrastruktur global.</Text>
            </Box>

            {/* QUICK STATS CARDS */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }}>
                {stats.map((stat) => (
                    <Paper withBorder p="md" radius="md" key={stat.title}>
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">{stat.title}</Text>
                            <stat.icon size={16} strokeWidth={2.5} color={`var(--mantine-color-${stat.color}-6)`} />
                        </Group>
                        <Group align="flex-end" gap="xs" mt="sm">
                            <Text size="xl" fw={800}>{stat.value}</Text>
                            {stat.diff !== 0 && (
                                <Text c={stat.diff > 0 ? 'teal' : 'red'} size="xs" fw={700} mb={4}>
                                    {stat.diff > 0 ? '+' : ''}{stat.diff}%
                                </Text>
                            )}
                        </Group>
                    </Paper>
                ))}
            </SimpleGrid>

            <Grid gap="md">
                {/* AI LOAD MONITORING (Simulation Chart Placeholder) */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Paper withBorder p="xl" radius="md" h="100%">
                        <Group justify="space-between" mb="xl">
                            <Box>
                                <Title order={4}>AI Traffic Analysis</Title>
                                <Text size="xs" c="dimmed">Permintaan API (Tokens per second) dalam 24 jam terakhir</Text>
                            </Box>
                            <Badge variant="dot" color="orange">Live Monitoring</Badge>
                        </Group>

                        {/* AreaChart Placeholder - Ganti dengan @mantine/charts jika terinstall */}
                        <Box h={200} bg="gray.0" style={{ borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--mantine-color-gray-3)' }}>
                            <Text c="dimmed" size="sm">Chart: AI Token Consumption Trend Lines</Text>
                        </Box>

                        <SimpleGrid cols={3} mt="xl">
                            <Box>
                                <Text size="xs" c="dimmed" fw={600}>Peak Load</Text>
                                <Text fw={700}>4.2k req/s</Text>
                            </Box>
                            <Box>
                                <Text size="xs" c="dimmed" fw={600}>Avg Latency</Text>
                                <Text fw={700}>240ms</Text>
                            </Box>
                            <Box>
                                <Text size="xs" c="dimmed" fw={600}>Error Rate</Text>
                                <Text fw={700} c="teal">0.02%</Text>
                            </Box>
                        </SimpleGrid>
                    </Paper>
                </Grid.Col>

                {/* SERVER STATUS & NODES */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="md">
                        <Paper withBorder p="lg" radius="md">
                            <Title order={5} mb="md">Infrastructure Health</Title>
                            <Stack gap="sm">
                                <Box>
                                    <Group justify="space-between" mb={5}>
                                        <Text size="xs" fw={700}>Primary DB (PostgreSQL)</Text>
                                        <Text size="xs" c="teal">Healthy</Text>
                                    </Group>
                                    <Progress value={45} color="teal" size="xs" radius="xl" />
                                </Box>
                                <Box>
                                    <Group justify="space-between" mb={5}>
                                        <Text size="xs" fw={700}>Object Storage</Text>
                                        <Text size="xs" c="teal">Healthy</Text>
                                    </Group>
                                    <Progress value={68} color="teal" size="xs" radius="xl" />
                                </Box>
                                <Box>
                                    <Group justify="space-between" mb={5}>
                                        <Text size="xs" fw={700}>Redis Cache</Text>
                                        <Text size="xs" c="orange">Heavy Load</Text>
                                    </Group>
                                    <Progress value={89} color="orange" size="xs" radius="xl" />
                                </Box>
                            </Stack>
                        </Paper>

                        <Paper withBorder p="lg" radius="md" bg="slate.9" c="white">
                            <Group gap="sm" mb="sm">
                                <ThemeIcon color="orange" variant="light">
                                    <Globe size={16} />
                                </ThemeIcon>
                                <Text size="sm" fw={700}>Active Region</Text>
                            </Group>
                            <Text size="24px" fw={800}>ap-southeast-1</Text>
                            <Text size="xs" c="slate.4">Jakarta, Indonesia</Text>
                        </Paper>
                    </Stack>
                </Grid.Col>
            </Grid>

            {/* RECENT SYSTEM LOGS */}
            <Paper withBorder radius="md">
                <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                    <Group justify="space-between">
                        <Title order={5}>System Audit Logs</Title>
                        <Text size="xs" c="indigo" style={{ cursor: 'pointer' }} fw={600}>View All Logs</Text>
                    </Group>
                </Box>
                <Table verticalSpacing="sm">
                    <Table.Thead bg="gray.0">
                        <Table.Tr>
                            <Table.Th>Timestamp</Table.Th>
                            <Table.Th>Event</Table.Th>
                            <Table.Th>User</Table.Th>
                            <Table.Th>Status</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {[
                            { time: '2 mins ago', event: 'Global Config Updated', user: 'Admin: Alex', status: 'Success' },
                            { time: '15 mins ago', event: 'New Mentor Approved', user: 'System', status: 'Success' },
                            { time: '1 hour ago', event: 'Database Backup', user: 'CronJob', status: 'Warning' },
                            { time: '3 hours ago', event: 'Failed Admin Login', user: 'IP: 192.168.1.1', status: 'Critical' },
                        ].map((log, i) => (
                            <Table.Tr key={i}>
                                <Table.Td><Text size="xs" c="dimmed">{log.time}</Text></Table.Td>
                                <Table.Td><Text size="xs" fw={600}>{log.event}</Text></Table.Td>
                                <Table.Td><Text size="xs">{log.user}</Text></Table.Td>
                                <Table.Td>
                                    <Badge size="xs" color={log.status === 'Success' ? 'teal' : log.status === 'Warning' ? 'orange' : 'red'}>
                                        {log.status}
                                    </Badge>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
    );
}
