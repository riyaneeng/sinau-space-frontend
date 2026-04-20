import { createFileRoute } from '@tanstack/react-router'
import {
    Accordion,
    ActionIcon,
    Group,
    Button,
    Stack,
    Title,
    Text,
    Badge,
    Paper,
    ThemeIcon,
    Tooltip,
    Box,
    rem,
    Menu
} from '@mantine/core';
import {
    Edit2,
    Trash2,
    Plus,
    FileText,
    GripVertical,
    Eye,
    MoreVertical,
    BookOpen,
    Zap,
    Target
} from 'lucide-react';

export const Route = createFileRoute('/_mentor/$projectId/course-builder')({
    component: RouteComponent,
})

const COURSE_STRUCTURE = [
    {
        id: 'm1',
        title: 'Phase 1: Discovery & Mindset',
        description: 'Membangun fondasi berpikir dan menemukan masalah yang layak dipecahkan.',
        contents: [
            { id: 'c1', title: 'Entrepreneurial Mindset 101', type: 'material' },
            { id: 'c2', title: 'Problem Discovery Framework', type: 'material' },
            { id: 'c3', title: 'Task: Problem Hypotheses', type: 'task' },
        ]
    },
    {
        id: 'm2',
        title: 'Phase 2: Market Validation',
        description: 'Memastikan masalah tersebut benar-benar dialami oleh target pasar.',
        contents: [
            { id: 'c4', title: 'Effective User Interview Techniques', type: 'material' },
            { id: 'c5', title: 'Synthesizing Interview Data', type: 'material' },
            { id: 'c6', title: 'Task: Market Validation Report', type: 'task' },
        ]
    },
    {
        id: 'm3',
        title: 'Phase 3: Solution & Value Proposition',
        description: 'Merancang solusi unik yang menjawab kebutuhan pasar.',
        contents: [
            { id: 'c7', title: 'Value Proposition Canvas', type: 'material' },
            { id: 'c8', title: 'Business Model Canvas Deep Dive', type: 'material' },
            { id: 'c9', title: 'Task: Business Model Draft', type: 'task' },
        ]
    },
    {
        id: 'm4',
        title: 'Phase 4: Prototyping & MVP',
        description: 'Membangun versi pertama produk dengan fitur esensial.',
        contents: [
            { id: 'c10', title: 'The Lean Startup Methodology', type: 'material' },
            { id: 'c11', title: 'No-code & Low-code Tools for MVP', type: 'material' },
            { id: 'c12', title: 'Task: MVP Feature List & User Flow', type: 'task' },
        ]
    },
    {
        id: 'm5',
        title: 'Phase 5: Financials & Traction',
        description: 'Menghitung keberlanjutan bisnis dan strategi pertumbuhan.',
        contents: [
            { id: 'c13', title: 'Basic Unit Economics', type: 'material' },
            { id: 'c14', title: 'Marketing & Sales Strategy', type: 'material' },
            { id: 'c15', title: 'Task: 1-Year Financial Projection', type: 'task' },
        ]
    },
    {
        id: 'm6',
        title: 'Phase 6: Pitching & Storytelling',
        description: 'Cara mengomunikasikan ide kepada investor dan stakeholder.',
        contents: [
            { id: 'c16', title: 'The Perfect Pitch Deck Structure', type: 'material' },
            { id: 'c17', title: 'Public Speaking for Founders', type: 'material' },
            { id: 'c18', title: 'Task: Pitch Deck v1', type: 'task' },
        ]
    },
    {
        id: 'm7',
        title: 'Phase 7: Final Demo & Launch',
        description: 'Presentasi akhir dan persiapan masuk ke pasar nyata.',
        contents: [
            { id: 'c19', title: 'Scaling Beyond the Program', type: 'material' },
            { id: 'c20', title: 'Task: Final Project Showcase', type: 'task' },
        ]
    }
];

function RouteComponent() {
    return (
        <Stack gap="xl" py="lg">
            {/* HERO HEADER - Glassmorphism style */}
            <Paper
                p="xl"
                radius="lg"
                style={{
                    background: 'linear-gradient(135deg, var(--mantine-color-indigo-7) 0%, var(--mantine-color-blue-8) 100%)',
                    color: 'white',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
            >
                <Group justify="space-between" align="flex-end">
                    <Box>
                        <Group gap="xs" mb="xs">
                            <ThemeIcon variant="white" color="indigo" radius="md">
                                <BookOpen size={18} />
                            </ThemeIcon>
                            <Text size="xs" fw={700} opacity={0.8} tt="uppercase" lts={1.5}>Architect Mode</Text>
                        </Group>
                        <Title order={1} style={{ letterSpacing: '-1.5px', fontSize: rem(32) }}>Curriculum Designer</Title>
                        <Text size="sm" opacity={0.9}>
                            Total 7 Phases • 14 Materials • 7 Workspaces
                        </Text>
                    </Box>
                    <Group gap="sm">
                        <Button variant="white" color="indigo" radius="md" leftSection={<Eye size={16} />}>
                            Student View
                        </Button>
                        <Button variant="filled" color="indigo.4" radius="md" leftSection={<Plus size={16} />}>
                            New Phase
                        </Button>
                    </Group>
                </Group>
            </Paper>

            {/* MILESTONE LIST */}
            <Accordion
                variant="separated"
                radius="md"
                styles={{
                    item: { border: 'none', backgroundColor: 'transparent' },
                    control: { padding: 'var(--mantine-spacing-md)' },
                    content: { padding: '0 var(--mantine-spacing-md) var(--mantine-spacing-md)' }
                }}
            >
                {COURSE_STRUCTURE.map((milestone, index) => (
                    <Accordion.Item key={milestone.id} value={milestone.id} mb="md">
                        <Paper withBorder shadow="sm" radius="md">
                            <Accordion.Control>
                                <Group justify="space-between" wrap="nowrap">
                                    <Group gap="md">
                                        <Box p={8} bg="indigo.0" style={{ borderRadius: rem(8), display: 'flex' }}>
                                            <Target size={20} color="var(--mantine-color-indigo-6)" />
                                        </Box>
                                        <Box>
                                            <Text fw={800} size="lg" style={{ lineHeight: 1.2 }}>
                                                Phase {index + 1}: {milestone.title}
                                            </Text>
                                            <Text size="xs" c="dimmed" mt={4} lineClamp={1}>
                                                {milestone.description}
                                            </Text>
                                        </Box>
                                    </Group>
                                    <Group gap="xl" visibleFrom="sm">
                                        <Badge variant="light" color="indigo" size="lg" radius="sm">
                                            {milestone.contents.length} Items
                                        </Badge>
                                        <Menu position="bottom-end">
                                            <Menu.Target>
                                                <ActionIcon variant="subtle" color="gray" onClick={(e) => e.stopPropagation()}>
                                                    <MoreVertical size={16} />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item leftSection={<Edit2 size={14} />}>Edit Phase Name</Menu.Item>
                                                <Menu.Item leftSection={<Trash2 size={14} />} color="red">Delete Phase</Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                    </Group>
                                </Group>
                            </Accordion.Control>

                            <Accordion.Panel>
                                <Stack gap="xs" mt="sm">
                                    {milestone.contents.map((item) => (
                                        <Paper
                                            key={item.id}
                                            withBorder
                                            p="md"
                                            radius="md"
                                            style={{
                                                borderLeft: `4px solid var(--mantine-color-${item.type === 'task' ? 'orange' : 'indigo'}-5)`,
                                                transition: 'transform 0.2s ease',
                                                cursor: 'pointer'
                                            }}
                                            // Efek Hover via CSS Inline (atau gunakan className)
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateX(5px)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateX(0)')}
                                        >
                                            <Group justify="space-between">
                                                <Group gap="md">
                                                    <ThemeIcon
                                                        color={item.type === 'task' ? 'orange' : 'indigo'}
                                                        variant="light"
                                                        size="lg"
                                                        radius="md"
                                                    >
                                                        {item.type === 'task' ? <Zap size={18} /> : <FileText size={18} />}
                                                    </ThemeIcon>
                                                    <Box>
                                                        <Text size="sm" fw={700}>{item.title}</Text>
                                                        <Text size="xs" c="dimmed">
                                                            {item.type === 'task' ? 'Workspace Task' : 'Learning Lab Material'}
                                                        </Text>
                                                    </Box>
                                                </Group>
                                                <Group gap="xs">
                                                    <Tooltip label="Edit Content">
                                                        <ActionIcon variant="subtle" color="blue" size="sm">
                                                            <Edit2 size={14} />
                                                        </ActionIcon>
                                                    </Tooltip>
                                                    <ActionIcon variant="subtle" color="red" size="sm">
                                                        <Trash2 size={14} />
                                                    </ActionIcon>
                                                    <ActionIcon variant="subtle" color="gray" size="sm">
                                                        <GripVertical size={14} />
                                                    </ActionIcon>
                                                </Group>
                                            </Group>
                                        </Paper>
                                    ))}

                                    <Group grow mt="md" gap="sm">
                                        <Button
                                            variant="light"
                                            color="indigo"
                                            size="xs"
                                            leftSection={<Plus size={14} />}
                                            radius="md"
                                        >
                                            Add Material
                                        </Button>
                                        <Button
                                            variant="light"
                                            color="orange"
                                            size="xs"
                                            leftSection={<Plus size={14} />}
                                            radius="md"
                                        >
                                            Add Task
                                        </Button>
                                    </Group>
                                </Stack>
                            </Accordion.Panel>
                        </Paper>
                    </Accordion.Item>
                ))}
            </Accordion>

            {/* FLOATING ACTION FOOTER */}
            <Paper
                withBorder
                p="lg"
                radius="lg"
                shadow="md"
                style={{
                    borderStyle: 'dashed',
                    backgroundColor: 'var(--mantine-color-indigo-0)',
                    position: 'sticky',
                    bottom: rem(20),
                    zIndex: 10
                }}
            >
                <Group justify="space-between">
                    <Group>
                        <ThemeIcon color="indigo" size="lg" radius="xl">
                            <Zap size={18} />
                        </ThemeIcon>
                        <Box>
                            <Text size="sm" fw={700} c="indigo.9">Unpublished Changes</Text>
                            <Text size="xs" c="indigo.7">Update kurikulum akan langsung merubah roadmap siswa.</Text>
                        </Box>
                    </Group>
                    <Button color="indigo" radius="md">Publish Curriculum</Button>
                </Group>
            </Paper>
        </Stack>
    );
}