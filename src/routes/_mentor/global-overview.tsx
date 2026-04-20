import { createFileRoute } from '@tanstack/react-router'
import {
    Container,
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
    Table,
    ActionIcon,
    Progress,
    Button
} from '@mantine/core';
import {
    Users,
    ShieldCheck,
    TrendingUp,
    AlertCircle,
    ArrowRight,
    LayoutDashboard,
    BrainCircuit
} from 'lucide-react';

export const Route = createFileRoute('/_mentor/global-overview')({
    component: RouteComponent,
})

function RouteComponent() {
    const projectSummaries = [
        { name: 'Startup Accelerator v2', students: 124, tasks: 12, health: 85, color: 'indigo' },
        { name: 'UI/UX Boot Camp', students: 45, tasks: 0, health: 92, color: 'violet' },
        { name: 'Fintech Incubation', students: 88, tasks: 5, health: 40, color: 'teal' },
    ];

    return (
        <Container size="xl" py="md">
            <Stack gap="xl">
                {/* 1. WELCOME & QUICK STATS */}
                <Box>
                    <Title order={2} lts={-0.5}>Global Command Center</Title>
                    <Text c="dimmed" size="sm">Ringkasan performa dari 3 Project aktif Anda.</Text>
                </Box>

                <SimpleGrid cols={{ base: 1, sm: 4 }}>
                    <Paper withBorder p="md" radius="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Students</Text>
                            <Users size={16} color="gray" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">257</Text>
                        <Text size="xs" c="teal" fw={500} mt={4}>+12% dari batch lalu</Text>
                    </Paper>

                    <Paper withBorder p="md" radius="md" style={{ borderLeft: '4px solid var(--mantine-color-red-6)' }}>
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Pending Reviews</Text>
                            <ShieldCheck size={16} color="red" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">17</Text>
                        <Text size="xs" c="dimmed" mt={4}>Segera validasi tugas masuk</Text>
                    </Paper>

                    <Paper withBorder p="md" radius="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">Avg. Health Score</Text>
                            <TrendingUp size={16} color="gray" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">72%</Text>
                        <Progress value={72} size="xs" mt="md" color="indigo" />
                    </Paper>

                    <Paper withBorder p="md" radius="md">
                        <Group justify="space-between">
                            <Text size="xs" c="dimmed" fw={700} tt="uppercase">AI Interactions</Text>
                            <BrainCircuit size={16} color="gray" />
                        </Group>
                        <Text size="xl" fw={700} mt="sm">1.2k</Text>
                        <Text size="xs" c="dimmed" mt={4}>Percakapan AI minggu ini</Text>
                    </Paper>
                </SimpleGrid>

                <Grid gap="md">
                    {/* 2. PROJECT COMPARISON TABLE */}
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Paper withBorder radius="md" p="xl">
                            <Title order={4} mb="lg">Active Projects Performance</Title>
                            <Table verticalSpacing="sm">
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Project Name</Table.Th>
                                        <Table.Th>Students</Table.Th>
                                        <Table.Th>Review Queue</Table.Th>
                                        <Table.Th>Health</Table.Th>
                                        <Table.Th />
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>
                                    {projectSummaries.map((proj) => (
                                        <Table.Tr key={proj.name}>
                                            <Table.Td>
                                                <Group gap="xs">
                                                    <ThemeIcon color={proj.color} size="sm" variant="light">
                                                        <LayoutDashboard size={12} />
                                                    </ThemeIcon>
                                                    <Text size="sm" fw={600}>{proj.name}</Text>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td><Text size="sm">{proj.students}</Text></Table.Td>
                                            <Table.Td>
                                                {proj.tasks > 0 ? (
                                                    <Badge color="red" variant="filled" size="xs">{proj.tasks} New</Badge>
                                                ) : (
                                                    <Text size="xs" c="dimmed">Clear</Text>
                                                )}
                                            </Table.Td>
                                            <Table.Td>
                                                <Group gap="xs">
                                                    <Progress value={proj.health} w={60} size="xs" color={proj.health > 50 ? 'teal' : 'red'} />
                                                    <Text size="xs">{proj.health}%</Text>
                                                </Group>
                                            </Table.Td>
                                            <Table.Td>
                                                <ActionIcon variant="subtle" color="gray">
                                                    <ArrowRight size={16} />
                                                </ActionIcon>
                                            </Table.Td>
                                        </Table.Tr>
                                    ))}
                                </Table.Tbody>
                            </Table>
                        </Paper>
                    </Grid.Col>

                    {/* 3. SYSTEM ALERTS & INSIGHTS */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack gap="md">
                            <Paper withBorder radius="md" p="lg" bg="red.0" style={{ borderColor: 'var(--mantine-color-red-2)' }}>
                                <Group gap="xs" mb="xs">
                                    <AlertCircle size={18} color="var(--mantine-color-red-7)" />
                                    <Text fw={700} c="red.9" size="sm">Critical Attention</Text>
                                </Group>
                                <Text size="xs" c="red.8">
                                    Siswa di <strong>Fintech Incubation</strong> menunjukkan penurunan aktivitas sebesar 40% dalam 3 hari terakhir.
                                </Text>
                                <Button color="red" size="compact-xs" mt="md">Investigate</Button>
                            </Paper>

                            <Paper withBorder radius="md" p="lg">
                                <Title order={5} mb="md">AI Sentiment Analysis</Title>
                                <Group align="center" justify="center" py="xs">
                                    <RingProgress
                                        size={120}
                                        thickness={12}
                                        sections={[
                                            { value: 60, color: 'teal' },
                                            { value: 25, color: 'yellow' },
                                            { value: 15, color: 'red' },
                                        ]}
                                        label={
                                            <Text fw={700} size="xs">Satisfied</Text>
                                        }
                                    />
                                </Group>
                                <Text size="xs" c="dimmed" mt="sm">
                                    Rata-rata kepuasan siswa terhadap bimbingan AI Mentor di semua project.
                                </Text>
                            </Paper>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Stack>
        </Container>
    );
}
