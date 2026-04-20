import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router'
import {
    Stack, Group, Title, Text, Button, Tabs, TextInput, Paper, Table,
    ActionIcon, Tooltip, ThemeIcon, Grid, Box, Avatar, Badge,
    Pagination, ScrollArea, Divider
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
    UserPlus, FileUp, Link as LinkIcon, Mail, Trash2,
    Copy, Users, Search, MoreHorizontal, ShieldCheck
} from 'lucide-react';

// Data Dummy 13 Siswa
const ROSTER_DATA = [
    { id: 1, name: 'Dafara Syah', email: 'dafara@eco.com', joined: '12 Jan 2026', status: 'Active' },
    { id: 2, name: 'Budi Santoso', email: 'budi@farm.id', joined: '13 Jan 2026', status: 'Active' },
    { id: 3, name: 'Siti Aminah', email: 'siti@edu.com', joined: '14 Jan 2026', status: 'Active' },
    { id: 4, name: 'Rian Hidayat', email: 'rian@fin.tech', joined: '15 Jan 2026', status: 'Pending' },
    { id: 5, name: 'Larasati Putri', email: 'lara@health.ai', joined: '16 Jan 2026', status: 'Active' },
    { id: 6, name: 'Kevin Sanjaya', email: 'kevin@log.com', joined: '17 Jan 2026', status: 'Active' },
    { id: 7, name: 'Dewi Lestari', email: 'dewi@beauty.io', joined: '18 Jan 2026', status: 'Inactive' },
    { id: 8, name: 'Andi Wijaya', email: 'andi@iot.com', joined: '19 Jan 2026', status: 'Active' },
    { id: 9, name: 'Fahri Hamzah', email: 'fahri@civic.org', joined: '20 Jan 2026', status: 'Pending' },
    { id: 10, name: 'Maya Indah', email: 'maya@fashion.lab', joined: '21 Jan 2026', status: 'Active' },
    { id: 11, name: 'Eko Prasetyo', email: 'eko@tech.com', joined: '22 Jan 2026', status: 'Active' },
    { id: 12, name: 'Rina Nose', email: 'rina@funny.com', joined: '23 Jan 2026', status: 'Active' },
    { id: 13, name: 'Gading Marten', email: 'gading@auto.com', joined: '24 Jan 2026', status: 'Active' },
];

export const Route = createFileRoute('/_mentor/$projectId/participants')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [activePage, setPage] = useState(1);
    const pageSize = 5;

    // Logic Pagination
    const pagedData = useMemo(() => {
        const start = (activePage - 1) * pageSize;
        return ROSTER_DATA.slice(start, start + pageSize);
    }, [activePage]);

    const totalPages = Math.ceil(ROSTER_DATA.length / pageSize);

    return (
        <Stack gap="xl">
            <Box>
                <Title order={2} lts={-0.5}>Student Roster</Title>
                <Text size="sm" c="dimmed">Kelola siswa yang terdaftar dalam proyek ini.</Text>
            </Box>

            <Tabs defaultValue="list" variant="pills" color="indigo">
                <Tabs.List>
                    <Tabs.Tab value="add" leftSection={<UserPlus size={16} />}>Tambah Siswa</Tabs.Tab>
                    <Tabs.Tab value="list" leftSection={<Users size={16} />}>Daftar Siswa ({ROSTER_DATA.length})</Tabs.Tab>
                </Tabs.List>

                {/* TAB 1: TAMBAH SISWA (KODE SEBELUMNYA) */}
                <Tabs.Panel value="add" pt="xl">
                    <Grid gap="xl">
                        <Grid.Col span={{ base: 12, md: 7 }}>
                            <Stack gap="md">
                                <Paper withBorder p="xl" radius="md">
                                    <Text fw={700} mb="sm">Undang via Email</Text>
                                    <Group align="flex-end">
                                        <TextInput placeholder="nama@email.com" label="Alamat Email" style={{ flex: 1 }} leftSection={<Mail size={16} />} />
                                        <Button color="indigo">Kirim</Button>
                                    </Group>
                                </Paper>
                                <Paper withBorder p="xl" radius="md" style={{ borderStyle: 'dashed' }}>
                                    <Stack align="center" gap="xs">
                                        <FileUp size={30} color="var(--mantine-color-indigo-6)" />
                                        <Text fw={600}>Bulk Import CSV</Text>
                                        <Button variant="light" color="indigo" size="xs">Pilih File</Button>
                                    </Stack>
                                </Paper>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 5 }}>
                            <Paper p="xl" radius="md" bg="indigo.0" style={{ border: '1px solid var(--mantine-color-indigo-2)' }}>
                                <Stack gap="xs">
                                    <ThemeIcon variant="light" color="indigo" size="lg"><LinkIcon size={20} /></ThemeIcon>
                                    <Text fw={700}>Project Access Code</Text>
                                    <Paper withBorder p="xs" ta="center" style={{ backgroundColor: 'white' }}>
                                        <Text fw={900} size="lg" lts={2}>STARTUP-2026</Text>
                                    </Paper>
                                    <Button variant="filled" color="indigo" leftSection={<Copy size={16} />}>Copy Code</Button>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Tabs.Panel>

                {/* TAB 2: DAFTAR SISWA (TABLE & RESPONSIVE) */}
                <Tabs.Panel value="list" pt="xl">
                    <Stack gap="md">
                        {/* Search & Bulk Action Header */}
                        <Group justify="space-between">
                            <TextInput
                                placeholder="Cari siswa..."
                                leftSection={<Search size={16} />}
                                w={isMobile ? '100%' : 300}
                            />
                            {!isMobile && (
                                <Button variant="outline" color="red" leftSection={<Trash2 size={16} />}>
                                    Hapus Terpilih
                                </Button>
                            )}
                        </Group>

                        {isMobile ? (
                            /* MOBILE VIEW: Card List */
                            <Stack gap="sm">
                                {pagedData.map((item) => (
                                    <Paper key={item.id} withBorder p="md" radius="md">
                                        <Group justify="space-between">
                                            <Group gap="sm">
                                                <Avatar radius="xl" color="indigo">{item.name[0]}</Avatar>
                                                <Box>
                                                    <Text size="sm" fw={700}>{item.name}</Text>
                                                    <Text size="xs" c="dimmed">{item.email}</Text>
                                                </Box>
                                            </Group>
                                            <ActionIcon variant="subtle" color="gray"><MoreHorizontal size={16} /></ActionIcon>
                                        </Group>
                                        <Divider my="sm" variant="dashed" />
                                        <Group justify="space-between">
                                            <Text size="xs" c="dimmed">Joined: {item.joined}</Text>
                                            <Badge
                                                size="sm"
                                                color={item.status === 'Active' ? 'green' : item.status === 'Pending' ? 'yellow' : 'gray'}
                                            >
                                                {item.status}
                                            </Badge>
                                        </Group>
                                    </Paper>
                                ))}
                            </Stack>
                        ) : (
                            /* DESKTOP VIEW: Table */
                            <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
                                <ScrollArea>
                                    <Table verticalSpacing="sm" highlightOnHover>
                                        <Table.Thead bg="gray.0">
                                            <Table.Tr>
                                                <Table.Th w={40}>No</Table.Th>
                                                <Table.Th>Student</Table.Th>
                                                <Table.Th>Email</Table.Th>
                                                <Table.Th>Joined Date</Table.Th>
                                                <Table.Th>Status</Table.Th>
                                                <Table.Th align="right">Actions</Table.Th>
                                            </Table.Tr>
                                        </Table.Thead>
                                        <Table.Tbody>
                                            {pagedData.map((item, index) => (
                                                <Table.Tr key={item.id}>
                                                    <Table.Td>{(activePage - 1) * pageSize + index + 1}</Table.Td>
                                                    <Table.Td>
                                                        <Group gap="sm">
                                                            <Avatar size="sm" radius="xl" color="indigo">{item.name[0]}</Avatar>
                                                            <Text size="sm" fw={500}>{item.name}</Text>
                                                        </Group>
                                                    </Table.Td>
                                                    <Table.Td><Text size="sm">{item.email}</Text></Table.Td>
                                                    <Table.Td><Text size="sm" c="dimmed">{item.joined}</Text></Table.Td>
                                                    <Table.Td>
                                                        <Badge
                                                            variant="light"
                                                            color={item.status === 'Active' ? 'green' : item.status === 'Pending' ? 'yellow' : 'gray'}
                                                        >
                                                            {item.status}
                                                        </Badge>
                                                    </Table.Td>
                                                    <Table.Td>
                                                        <Group gap="xs" justify="flex-end">
                                                            <Tooltip label="Edit Profile">
                                                                <ActionIcon variant="subtle" color="gray"><ShieldCheck size={16} /></ActionIcon>
                                                            </Tooltip>
                                                            <ActionIcon variant="subtle" color="red"><Trash2 size={16} /></ActionIcon>
                                                        </Group>
                                                    </Table.Td>
                                                </Table.Tr>
                                            ))}
                                        </Table.Tbody>
                                    </Table>
                                </ScrollArea>
                            </Paper>
                        )}

                        {/* PAGINATION */}
                        <Group justify="center" mt="md" pb="xl">
                            <Pagination
                                total={totalPages}
                                value={activePage}
                                onChange={setPage}
                                color="indigo"
                                radius="md"
                            />
                        </Group>
                    </Stack>
                </Tabs.Panel>
            </Tabs>
        </Stack>
    );
}