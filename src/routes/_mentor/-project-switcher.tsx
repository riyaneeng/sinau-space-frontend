// src/components/mentor/ProjectSwitcher.tsx
import { Menu, UnstyledButton, Group, Text, Badge, Box, rem } from '@mantine/core';
import { ChevronDown, FolderKanban, Plus, Circle } from 'lucide-react';

export function ProjectSwitcher() {
    const projects = [
        { id: 'p1', name: 'Startup Accelerator v2', students: 124, status: 'Active', color: 'blue' },
        { id: 'p2', name: 'UI/UX Boot Camp', students: 45, status: 'Paused', color: 'gray' },
        { id: 'p3', name: 'Fintech Incubation', students: 88, status: 'Active', color: 'green' },
    ];

    // Simulasi project yang aktif
    const activeProject = projects[0];

    return (
        <Menu withArrow width={280} position="right-start" offset={20} shadow="xl">
            <Menu.Target>
                <UnstyledButton
                    p="md"
                    style={{
                        width: '100%',
                        borderRadius: 'var(--mantine-radius-md)',
                        border: '1px solid var(--mantine-color-gray-2)',
                        backgroundColor: 'var(--mantine-color-white)'
                    }}
                >
                    <Group justify="space-between">
                        <Group gap="sm">
                            <Box
                                w={32} h={32} bg={`${activeProject.color}.1`}
                                style={{ borderRadius: rem(6), display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <FolderKanban size={18} color={`var(--mantine-color-${activeProject.color}-6)`} />
                            </Box>
                            <Box style={{ flex: 1 }}>
                                <Text size="sm" fw={800} truncate maw={140}>{activeProject.name}</Text>
                                <Group gap={4}>
                                    <Circle size={8} fill={`var(--mantine-color-${activeProject.color}-6)`} color="transparent" />
                                    <Text size="xs" c="dimmed">{activeProject.students} Students</Text>
                                </Group>
                            </Box>
                        </Group>
                        <ChevronDown size={16} color="gray" />
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Switch Project Workspace</Menu.Label>
                {projects.map((p) => (
                    <Menu.Item
                        key={p.id}
                        leftSection={<FolderKanban size={16} />}
                        rightSection={<Badge size="xs" variant="light" color={p.color}>{p.status}</Badge>}
                    >
                        <Box>
                            <Text size="sm" fw={600}>{p.name}</Text>
                            <Text size="xs" c="dimmed">{p.students} Students</Text>
                        </Box>
                    </Menu.Item>
                ))}
                <Menu.Divider />
                <Menu.Item leftSection={<Plus size={16} />} color="indigo">
                    Create New Project Workspace
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}