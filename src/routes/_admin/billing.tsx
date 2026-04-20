import { createFileRoute } from '@tanstack/react-router'
import {
    Stack, Group, Title, Text, Paper, Button, Badge,
    SimpleGrid, ActionIcon, Box, Table,
    ThemeIcon, Divider, Progress
} from '@mantine/core';
import {
    Plus,
    TrendingUp,
    Users,
    ArrowUpRight,
    Download,
    CheckCircle2,
    Settings2,
    DollarSign
} from 'lucide-react';

export const Route = createFileRoute('/_admin/billing')({
    component: AdminBillingPlans,
})

function AdminBillingPlans() {
    const plans = [
        { name: 'Starter', price: '$49', users: '20 Students', ai: '5M Tokens', active: 12, color: 'blue' },
        { name: 'Professional', price: '$199', users: '100 Students', ai: '30M Tokens', active: 45, color: 'orange' },
        { name: 'Enterprise', price: 'Custom', users: 'Unlimited', ai: 'Custom', active: 5, color: 'slate' },
    ];

    const invoices = [
        { id: 'INV-001', client: 'Binus University', plan: 'Enterprise', amount: '$2,400', status: 'Paid', date: '10 Apr 2026' },
        { id: 'INV-002', client: 'Alex Mentor', plan: 'Professional', amount: '$199', status: 'Pending', date: '12 Apr 2026' },
        { id: 'INV-003', client: 'Siti Aminah', plan: 'Starter', amount: '$49', status: 'Paid', date: '08 Apr 2026' },
    ];

    return (
        <Stack gap="lg">
            {/* HEADER */}
            <Group justify="space-between">
                <Box>
                    <Title order={2} lts={-0.5}>Billing & Revenue</Title>
                    <Text size="sm" c="dimmed">Kelola paket langganan dan pantau arus kas masuk platform.</Text>
                </Box>
                <Button color="orange.6" leftSection={<Plus size={16} />}>Create New Plan</Button>
            </Group>

            {/* TOP METRICS */}
            <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <Paper withBorder p="lg" radius="md">
                    <Group justify="space-between" mb="xs">
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Monthly Recurring Revenue (MRR)</Text>
                        <ThemeIcon color="orange.1" c="orange.7" variant="flat"><DollarSign size={16} /></ThemeIcon>
                    </Group>
                    <Title order={1}>$12,840</Title>
                    <Group gap={5} mt={4}>
                        <ArrowUpRight size={14} color="var(--mantine-color-teal-6)" />
                        <Text c="teal.6" size="xs" fw={700}>+8.2% from last month</Text>
                    </Group>
                </Paper>

                <Paper withBorder p="lg" radius="md">
                    <Group justify="space-between" mb="xs">
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Active Subscriptions</Text>
                        <Users size={16} color="gray" />
                    </Group>
                    <Title order={1}>62</Title>
                    <Text size="xs" c="dimmed" mt={4}>92% retention rate</Text>
                </Paper>

                <Paper withBorder p="lg" radius="md">
                    <Group justify="space-between" mb="xs">
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Revenue Goal</Text>
                        <TrendingUp size={16} color="gray" />
                    </Group>
                    <Title order={1}>$15,000</Title>
                    <Progress value={85} mt="md" color="orange.6" radius="xl" size="sm" />
                </Paper>
            </SimpleGrid>

            {/* MANAGE PLANS */}
            <Title order={4} mb={-10}>Subscription Tiers</Title>
            <SimpleGrid cols={{ base: 1, md: 3 }}>
                {plans.map((plan) => (
                    <Paper key={plan.name} withBorder p="xl" radius="lg" style={{ position: 'relative' }}>
                        <Group justify="space-between" mb="md">
                            <Badge color={plan.color} variant="light" size="lg">{plan.name}</Badge>
                            <ActionIcon variant="subtle" color="slate.4"><Settings2 size={16} /></ActionIcon>
                        </Group>
                        <Group align="flex-end" gap={4} mb="lg">
                            <Title order={2}>{plan.price}</Title>
                            {plan.price !== 'Custom' && <Text size="sm" c="dimmed" mb={4}>/month</Text>}
                        </Group>
                        <Stack gap="xs" mb="xl">
                            <Group gap="xs">
                                <CheckCircle2 size={14} color="var(--mantine-color-teal-6)" />
                                <Text size="sm">{plan.users}</Text>
                            </Group>
                            <Group gap="xs">
                                <CheckCircle2 size={14} color="var(--mantine-color-teal-6)" />
                                <Text size="sm">{plan.ai}</Text>
                            </Group>
                        </Stack>
                        <Divider variant="dashed" mb="md" />
                        <Group justify="space-between">
                            <Text size="xs" fw={700} c="dimmed">{plan.active} Active Subscribers</Text>
                            <Button variant="subtle" size="compact-xs">Edit Plan</Button>
                        </Group>
                    </Paper>
                ))}
            </SimpleGrid>

            {/* RECENT INVOICES */}
            <Paper withBorder radius="md">
                <Box p="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                    <Group justify="space-between">
                        <Title order={5}>Recent Invoices</Title>
                        <Button variant="light" color="slate.6" size="xs" leftSection={<Download size={14} />}>Export All</Button>
                    </Group>
                </Box>
                <Table verticalSpacing="md" highlightOnHover>
                    <Table.Thead bg="slate.0">
                        <Table.Tr>
                            <Table.Th>Invoice ID</Table.Th>
                            <Table.Th>Client</Table.Th>
                            <Table.Th>Date</Table.Th>
                            <Table.Th>Plan</Table.Th>
                            <Table.Th>Amount</Table.Th>
                            <Table.Th>Status</Table.Th>
                            <Table.Th />
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {invoices.map((inv) => (
                            <Table.Tr key={inv.id}>
                                <Table.Td><Text size="sm" fw={700}>{inv.id}</Text></Table.Td>
                                <Table.Td><Text size="sm">{inv.client}</Text></Table.Td>
                                <Table.Td><Text size="sm" c="dimmed">{inv.date}</Text></Table.Td>
                                <Table.Td><Badge variant="outline" size="xs" color="gray">{inv.plan}</Badge></Table.Td>
                                <Table.Td><Text size="sm" fw={700}>{inv.amount}</Text></Table.Td>
                                <Table.Td>
                                    <Badge color={inv.status === 'Paid' ? 'teal' : 'orange'} variant="dot">
                                        {inv.status}
                                    </Badge>
                                </Table.Td>
                                <Table.Td>
                                    <ActionIcon variant="subtle" color="gray"><Download size={16} /></ActionIcon>
                                </Table.Td>
                            </Table.Tr>
                        ))}
                    </Table.Tbody>
                </Table>
            </Paper>
        </Stack>
    );
}