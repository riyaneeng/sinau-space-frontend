import { createFileRoute } from '@tanstack/react-router'
import {
    Grid,
    Paper,
    Text,
    Group,
    Title,
    Stack,
    Box,
    Badge,
    Table,
    Progress,
    SimpleGrid,
    Select,
    ActionIcon,
    Alert,
    Divider
} from '@mantine/core';
import {
    BrainCircuit,
    TrendingUp,
    Coins,
    AlertTriangle,
    ArrowUpRight,
    Filter,
    Download
} from 'lucide-react';

export const Route = createFileRoute('/_admin/ai-stats')({
    component: AICostMonitor,
})

function AICostMonitor() {
    const costData = [
        { id: 'p1', name: 'Startup Accelerator v2', tokens: '45.2M', cost: '$678.00', status: 'high' },
        { id: 'p2', name: 'UI/UX Boot Camp', tokens: '12.8M', cost: '$192.00', status: 'normal' },
        { id: 'p3', name: 'Fintech Incubation', tokens: '28.5M', cost: '$427.50', status: 'warning' },
        { id: 'p4', name: 'Corporate Innovation', tokens: '5.1M', cost: '$76.50', status: 'normal' },
    ];

    return (
        <Stack gap="lg">
            {/* HEADER */}
            <Group justify="space-between">
                <Box>
                    <Title order={2} style={{ letterSpacing: '-0.5px' }}>AI Cost Intelligence</Title>
                    <Text c="dimmed" size="sm">Monitor penggunaan token dan estimasi biaya operasional model AI.</Text>
                </Box>
                <Group>
                    <Select
                        placeholder="Billing Period"
                        data={['April 2026', 'March 2026', 'February 2026']}
                        defaultValue="April 2026"
                        size="xs"
                    />
                    <ActionIcon variant="light" size="lg" color="slate.6"><Download size={18} /></ActionIcon>
                </Group>
            </Group>

            {/* TOP METRICS */}
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <Paper withBorder p="lg" radius="md" bg="slate.9" c="white">
                    <Group justify="space-between">
                        <Text size="xs" fw={700} c="slate.4" tt="uppercase">Total MTD Spend</Text>
                        <Coins size={18} color="var(--mantine-color-orange-5)" />
                    </Group>
                    <Title order={1} mt="sm">$1,374.00</Title>
                    <Group gap={5} mt={4}>
                        <ArrowUpRight size={14} color="var(--mantine-color-red-5)" />
                        <Text c="red.5" size="xs" fw={700}>+12.5% vs last month</Text>
                    </Group>
                </Paper>

                <Paper withBorder p="lg" radius="md">
                    <Group justify="space-between">
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Avg. Cost per User</Text>
                        <TrendingUp size={18} color="var(--mantine-color-indigo-6)" />
                    </Group>
                    <Title order={1} mt="sm">$5.34</Title>
                    <Text size="xs" c="dimmed" mt={4}>Berdasarkan 257 siswa aktif</Text>
                </Paper>

                <Paper withBorder p="lg" radius="md">
                    <Group justify="space-between">
                        <Text size="xs" c="dimmed" fw={700} tt="uppercase">Tokens Remaining</Text>
                        <BrainCircuit size={18} color="var(--mantine-color-teal-6)" />
                    </Group>
                    <Title order={1} mt="sm">215.8M</Title>
                    <Progress value={65} color="teal" size="xs" mt="md" radius="xl" />
                </Paper>
            </SimpleGrid>

            {/* ALERT BOX */}
            <Alert variant="light" color="orange" title="Cost Threshold Alert" icon={<AlertTriangle size={16} />}>
                Project <strong>Startup Accelerator v2</strong> telah mencapai 85% dari budget bulanan yang dialokasikan ($800.00).
            </Alert>

            <Grid gap="md">
                {/* COST BY PROJECT TABLE */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Paper withBorder radius="md">
                        <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                            <Group justify="space-between">
                                <Title order={5}>Consumption by Project</Title>
                                <ActionIcon variant="subtle" color="gray"><Filter size={16} /></ActionIcon>
                            </Group>
                        </Box>
                        <Table verticalSpacing="md" highlightOnHover>
                            <Table.Thead bg="gray.0">
                                <Table.Tr>
                                    <Table.Th>Project Name</Table.Th>
                                    <Table.Th>Tokens Used</Table.Th>
                                    <Table.Th>Est. Cost</Table.Th>
                                    <Table.Th>Budget Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {costData.map((item) => (
                                    <Table.Tr key={item.id}>
                                        <Table.Td><Text size="sm" fw={600}>{item.name}</Text></Table.Td>
                                        <Table.Td><Text size="sm">{item.tokens}</Text></Table.Td>
                                        <Table.Td><Text size="sm" fw={700}>{item.cost}</Text></Table.Td>
                                        <Table.Td>
                                            <Badge
                                                variant="dot"
                                                color={item.status === 'high' ? 'red' : item.status === 'warning' ? 'orange' : 'teal'}
                                            >
                                                {item.status.toUpperCase()}
                                            </Badge>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </Paper>
                </Grid.Col>

                {/* MODEL DISTRIBUTION */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Paper withBorder p="lg" radius="md">
                        <Title order={5} mb="md">Model Distribution</Title>
                        <Stack gap="lg">
                            <Box>
                                <Group justify="space-between" mb={5}>
                                    <Text size="xs" fw={700}>Gemini 1.5 Pro</Text>
                                    <Text size="xs" c="dimmed">70% ($961)</Text>
                                </Group>
                                <Progress value={70} color="indigo" size="sm" radius="xl" />
                            </Box>
                            <Box>
                                <Group justify="space-between" mb={5}>
                                    <Text size="xs" fw={700}>Gemini 1.5 Flash</Text>
                                    <Text size="xs" c="dimmed">25% ($343)</Text>
                                </Group>
                                <Progress value={25} color="cyan" size="sm" radius="xl" />
                            </Box>
                            <Box>
                                <Group justify="space-between" mb={5}>
                                    <Text size="xs" fw={700}>GPT-4o (Legacy)</Text>
                                    <Text size="xs" c="dimmed">5% ($70)</Text>
                                </Group>
                                <Progress value={5} color="gray" size="sm" radius="xl" />
                            </Box>
                        </Stack>
                        <Divider my="xl" label="Insight" labelPosition="center" />
                        <Text size="xs" c="dimmed" ta="center">
                            Penggunaan <strong>Flash</strong> meningkat 15%, membantu menekan biaya sebesar $120 bulan ini.
                        </Text>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}