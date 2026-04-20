import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
    Table,
    Progress,
    Badge,
    Group,
    Text,
    ActionIcon,
    Avatar,
    Paper,
    Title,
    TextInput,
    Stack,
    ScrollArea,
    Box,
    Pagination,
    Select,
    rem
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Eye, MessageCircle, Search } from 'lucide-react';

// Data Dummy 10 Siswa
const STUDENTS_DATA = [
    { id: 1, name: 'Dafara Syah', project: 'Eco-Tech Startup', milestone: 3, health: 85, status: 'On Track' },
    { id: 2, name: 'Budi Santoso', project: 'Smart Farming App', milestone: 1, health: 40, status: 'At Risk' },
    { id: 3, name: 'Siti Aminah', project: 'EdTech Gamification', milestone: 4, health: 92, status: 'Expert' },
    { id: 4, name: 'Rian Hidayat', project: 'Fintech for MSME', milestone: 2, health: 65, status: 'Need Review' },
    { id: 5, name: 'Larasati Putri', project: 'Health Monitoring AI', milestone: 2, health: 30, status: 'Stuck' },
    { id: 6, name: 'Kevin Sanjaya', project: 'Logistics Optimization', milestone: 5, health: 98, status: 'Completed' },
    { id: 7, name: 'Dewi Lestari', project: 'Beauty Marketplace', milestone: 3, health: 75, status: 'On Track' },
    { id: 8, name: 'Andi Wijaya', project: 'IOT Smart Home', milestone: 1, health: 55, status: 'Behind' },
    { id: 9, name: 'Fahri Hamzah', project: 'Civic Engagement Platform', milestone: 3, health: 15, status: 'Critical' },
    { id: 10, name: 'Maya Indah', project: 'Virtual Fashion Lab', milestone: 2, health: 80, status: 'On Track' },
];

export const Route = createFileRoute('/_mentor/$projectId/student-radar')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [activePage, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<string | null>('5');

    const getHealthColor = (score: number) => {
        if (score >= 80) return 'green';
        if (score >= 60) return 'blue';
        if (score >= 40) return 'yellow';
        return 'red';
    };

    // Logic Pagination
    const pagedData = useMemo(() => {
        const limit = parseInt(pageSize || '5');
        const start = (activePage - 1) * limit;
        return STUDENTS_DATA.slice(start, start + limit);
    }, [activePage, pageSize]);

    const totalPages = Math.ceil(STUDENTS_DATA.length / parseInt(pageSize || '5'));

    return (
        <Stack gap="lg" pb={isMobile ? rem(80) : rem(20)}>
            <Box>
                <Title order={2} style={{ letterSpacing: '-0.5px' }}>Student Radar</Title>
                <Text c="dimmed" size="sm">Pantau performa proyek siswa secara real-time.</Text>
            </Box>

            {/* FILTER & SEARCH BAR */}
            <Paper withBorder p="sm" radius="md" shadow="xs">
                <Stack gap="sm">
                    <Group justify="space-between">
                        <TextInput
                            placeholder="Cari nama..."
                            leftSection={<Search size={16} />}
                            style={{ flex: 1 }}
                        />
                        {!isMobile && (
                            <Select
                                w={120}
                                value={pageSize}
                                onChange={(val) => { setPageSize(val); setPage(1); }}
                                data={['5', '10', '20']}
                            />
                        )}
                    </Group>
                    <Group gap="xs">
                        <Badge variant="dot" color="red">Critical: 2</Badge>
                        <Badge variant="dot" color="yellow">At Risk: 3</Badge>
                    </Group>
                </Stack>
            </Paper>

            {/* CONTENT: TABLE (Desktop) or CARDS (Mobile) */}
            {isMobile ? (
                <Stack gap="sm">
                    {pagedData.map((s) => (
                        <Paper key={s.id} withBorder p="md" radius="md" bg="white">
                            <Group justify="space-between" mb="xs">
                                <Group gap="sm">
                                    <Avatar size="md" radius="xl" color={getHealthColor(s.health)} variant="light">
                                        {s.name.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                    <Box>
                                        <Text size="sm" fw={700}>{s.name}</Text>
                                        <Text size="xs" c="dimmed">{s.project}</Text>
                                    </Box>
                                </Group>
                                <Badge color={getHealthColor(s.health)} variant="light">
                                    {s.health}%
                                </Badge>
                            </Group>

                            <Box mb="md">
                                <Group justify="space-between" mb={4}>
                                    <Text size="xs" c="dimmed">Milestone {s.milestone}/5</Text>
                                    <Text size="xs" fw={700}>{s.status}</Text>
                                </Group>
                                <Progress value={(s.milestone / 5) * 100} color={getHealthColor(s.health)} size="sm" radius="xl" />
                            </Box>

                            <Group grow gap="sm">
                                <Button variant="light" color="gray" size="xs" leftSection={<Eye size={14} />}>View</Button>
                                <Button variant="light" color="indigo" size="xs" leftSection={<MessageCircle size={14} />}>Chat</Button>
                            </Group>
                        </Paper>
                    ))}
                </Stack>
            ) : (
                <Paper withBorder radius="md" shadow="sm" style={{ overflow: 'hidden' }}>
                    <ScrollArea>
                        <Table verticalSpacing="md" horizontalSpacing="lg" highlightOnHover>
                            <Table.Thead bg="gray.0">
                                <Table.Tr>
                                    <Table.Th>Student</Table.Th>
                                    <Table.Th>Project Name</Table.Th>
                                    <Table.Th>Milestone</Table.Th>
                                    <Table.Th>AI Score</Table.Th>
                                    <Table.Th align="right">Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {pagedData.map((s) => (
                                    <Table.Tr key={s.id}>
                                        <Table.Td>
                                            <Group gap="sm">
                                                <Avatar size="sm" radius="xl" color={getHealthColor(s.health)} variant="light">
                                                    {s.name.split(' ').map(n => n[0]).join('')}
                                                </Avatar>
                                                <Box>
                                                    <Text size="sm" fw={600}>{s.name}</Text>
                                                    <Text size="xs" c="dimmed">{s.status}</Text>
                                                </Box>
                                            </Group>
                                        </Table.Td>
                                        <Table.Td><Text size="sm" fw={500}>{s.project}</Text></Table.Td>
                                        <Table.Td>
                                            <Stack gap={4} w={150}>
                                                <Progress value={(s.milestone / 5) * 100} color={getHealthColor(s.health)} size="xs" />
                                                <Text size="xs" c="dimmed">Step {s.milestone} of 5</Text>
                                            </Stack>
                                        </Table.Td>
                                        <Table.Td>
                                            <Badge color={getHealthColor(s.health)} variant="light">{s.health}% Score</Badge>
                                        </Table.Td>
                                        <Table.Td>
                                            <Group gap="xs" justify="flex-end">
                                                <ActionIcon variant="subtle" color="gray"><Eye size={18} /></ActionIcon>
                                                <ActionIcon variant="light" color="indigo"><MessageCircle size={18} /></ActionIcon>
                                            </Group>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>
                </Paper>
            )}

            {/* STICKY PAGINATION CONTROL */}
            <Paper
                withBorder
                p="xs"
                radius="md"
                style={{
                    position: isMobile ? 'fixed' : 'relative',
                    bottom: isMobile ? rem(80) : 0, // Di atas mobile footer
                    left: isMobile ? rem(10) : 0,
                    right: isMobile ? rem(10) : 0,
                    zIndex: 10,
                    backgroundColor: 'white',
                    boxShadow: isMobile ? '0 -4px 12px rgba(0,0,0,0.05)' : 'none'
                }}
            >
                <Group justify={isMobile ? 'center' : 'space-between'}>
                    {!isMobile && <Text size="xs" c="dimmed">Page {activePage} of {totalPages}</Text>}
                    <Pagination
                        total={totalPages}
                        value={activePage}
                        onChange={setPage}
                        size={isMobile ? "sm" : "md"}
                        color="indigo"
                    />
                </Group>
            </Paper>
        </Stack>
    );
}

// Helper Button (Imported from Mantine)
import { Button } from '@mantine/core';