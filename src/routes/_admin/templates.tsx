import { createFileRoute } from '@tanstack/react-router';
import {
    Stack, Group, Title, Text, Paper, Button, Badge,
    SimpleGrid, ActionIcon, Box, rem, TextInput,
    Menu, ThemeIcon, Divider,
} from '@mantine/core';
import {
    Database,
    Plus,
    Search,
    MoreVertical,
    Copy,
    Edit2,
    Trash2,
    BookOpen,
    Rocket,
    Clock,
    FileText,
    Layout
} from 'lucide-react';

export const Route = createFileRoute('/_admin/templates')({
    component: GlobalContentTemplates,
})

// Data Dummy Template Kurikulum
const TEMPLATE_DATABASE = [
    {
        id: 't1',
        name: 'Tech Startup Accelerator',
        category: 'Business',
        milestones: 7,
        lessons: 21,
        usage: 12,
        updated: '2 days ago',
        color: 'indigo'
    },
    {
        id: 't2',
        name: 'UI/UX Designer Bootcamp',
        category: 'Design',
        milestones: 5,
        lessons: 15,
        usage: 8,
        updated: '1 week ago',
        color: 'violet'
    },
    {
        id: 't3',
        name: 'Corporate Innovation Lab',
        category: 'Enterprise',
        milestones: 4,
        lessons: 12,
        usage: 3,
        updated: '3 days ago',
        color: 'teal'
    },
    {
        id: 't4',
        name: 'No-Code MVP Builder',
        category: 'Development',
        milestones: 6,
        lessons: 18,
        usage: 24,
        updated: 'Just now',
        color: 'orange'
    },
];

function GlobalContentTemplates() {
    return (
        <Stack gap="lg">
            {/* HEADER */}
            <Group justify="space-between">
                <Box>
                    <Title order={2} lts={-0.5}>Content Templates</Title>
                    <Text size="sm" c="dimmed">Kelola blueprint kurikulum global yang dapat digunakan oleh seluruh Mentor.</Text>
                </Box>
                <Button color="orange.6" leftSection={<Plus size={16} />}>Create Master Template</Button>
            </Group>

            {/* SEARCH & FILTER AREA */}
            <Paper withBorder p="sm" radius="md">
                <Group justify="space-between">
                    <TextInput
                        placeholder="Search templates..."
                        leftSection={<Search size={16} />}
                        style={{ flex: 1 }}
                    />
                    <Group gap="xs">
                        <Button variant="light" color="slate.6" size="sm">All Categories</Button>
                        <Button variant="light" color="slate.6" size="sm">Most Used</Button>
                    </Group>
                </Group>
            </Paper>

            {/* TEMPLATE GRID */}
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
                {TEMPLATE_DATABASE.map((temp) => (
                    <Paper
                        key={temp.id}
                        withBorder
                        p="lg"
                        radius="md"
                        shadow="xs"
                        style={{
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = 'var(--mantine-shadow-md)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'var(--mantine-shadow-xs)';
                        }}
                    >
                        <Group justify="space-between" mb="md">
                            <ThemeIcon variant="light" color={temp.color} size="lg" radius="md">
                                <BookOpen size={20} />
                            </ThemeIcon>
                            <Menu position="bottom-end">
                                <Menu.Target>
                                    <ActionIcon variant="subtle" color="slate.4">
                                        <MoreVertical size={16} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item leftSection={<Edit2 size={14} />}>Edit Content</Menu.Item>
                                    <Menu.Item leftSection={<Copy size={14} />}>Duplicate Template</Menu.Item>
                                    <Menu.Divider />
                                    <Menu.Item leftSection={<Trash2 size={14} />} color="red">Delete Master</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>

                        <Title order={4} mb={4}>{temp.name}</Title>
                        <Badge variant="dot" color={temp.color} size="xs" mb="xl">{temp.category}</Badge>

                        <SimpleGrid cols={2} mb="xl">
                            <Group gap="xs">
                                <Layout size={14} color="gray" />
                                <Text size="xs" fw={700}>{temp.milestones} Phases</Text>
                            </Group>
                            <Group gap="xs">
                                <FileText size={14} color="gray" />
                                <Text size="xs" fw={700}>{temp.lessons} Lessons</Text>
                            </Group>
                        </SimpleGrid>

                        <Divider mb="md" variant="dashed" />

                        <Group justify="space-between">
                            <Group gap={4}>
                                <Rocket size={14} color="var(--mantine-color-slate-4)" />
                                <Text size="xs" c="dimmed">Used in <b>{temp.usage}</b> projects</Text>
                            </Group>
                            <Group gap={4}>
                                <Clock size={12} color="var(--mantine-color-slate-4)" />
                                <Text size="10px" c="dimmed">{temp.updated}</Text>
                            </Group>
                        </Group>
                    </Paper>
                ))}

                {/* ADD NEW PLACEHOLDER */}
                <Paper
                    withBorder
                    radius="md"
                    p="xl"
                    style={{
                        borderStyle: 'dashed',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--mantine-color-slate-0)',
                        minHeight: rem(220)
                    }}
                >
                    <ActionIcon size={50} radius="xl" variant="light" color="orange.6" mb="sm">
                        <Plus size={24} />
                    </ActionIcon>
                    <Text fw={700} size="sm">New Blueprint</Text>
                    <Text size="xs" c="dimmed" ta="center">Create a reusable course framework</Text>
                </Paper>
            </SimpleGrid>

            {/* INFO BOX */}
            <Paper p="md" radius="md" bg="slate.9" c="white" mt="xl">
                <Group justify="space-between">
                    <Group gap="sm">
                        <Database size={20} color="var(--mantine-color-orange-5)" />
                        <Box>
                            <Text size="sm" fw={700}>Template Syncing</Text>
                            <Text size="xs" c="slate.4">Perubahan pada master template tidak akan merubah proyek yang sudah berjalan, hanya berlaku untuk proyek baru.</Text>
                        </Box>
                    </Group>
                    <Button variant="white" color="slate.9" size="xs">Learn More</Button>
                </Group>
            </Paper>
        </Stack>
    );
}