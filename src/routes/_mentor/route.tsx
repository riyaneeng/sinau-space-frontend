import { createFileRoute, Outlet, Link, useParams } from '@tanstack/react-router'
import {
    AppShell,
    Group,
    Text,
    Stack,
    Badge,
    ActionIcon,
    Burger,
    Divider,
    UnstyledButton,
    Tooltip,
    Avatar,
    Box,
    rem
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
    LayoutDashboard, Bell, Plus, LogOut
} from 'lucide-react';

export const Route = createFileRoute('/_mentor')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [opened, { toggle, close }] = useDisclosure();
    const { projectId } = useParams({ strict: false });

    const projects = [
        { id: 'p1', name: 'Startup Accelerator v2', initial: 'SA', color: 'indigo' },
        { id: 'p2', name: 'UI/UX Boot Camp', initial: 'UI', color: 'violet' },
        { id: 'p3', name: 'Fintech Incubation', initial: 'FI', color: 'green' },
    ];

    return (
        <AppShell
            header={{ height: 65 }}
            navbar={{
                width: isMobile ? 280 : 70, // Hanya lebar Slim Sidebar di desktop
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
            footer={{ height: 65, collapsed: !isMobile }}
            padding={0}
        >
            <AppShell.Header px="md">
                <Group h="100%" justify="space-between">
                    <Group gap="sm">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Text fw={900}>MENTOR<span style={{ color: 'var(--mantine-color-indigo-6)' }}>STUDIO</span></Text>
                        {isMobile && projectId && <Badge variant="outline">Project: {projectId}</Badge>}
                    </Group>
                    <Group gap="sm">
                        <ActionIcon variant="subtle" color="gray"><Bell size={20} /></ActionIcon>
                        <ActionIcon variant="light" color="red" component={Link} to="/auth/login" title="Sign Out">
                            <LogOut size={18} />
                        </ActionIcon>
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p={0} bg={isMobile ? 'white' : 'gray.0'} style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}>
                <Stack gap="md" align="center" pt="md" style={{ width: '100%' }}>
                    <Tooltip label="Global Overview" position="right" disabled={isMobile}>
                        <ActionIcon component={Link} to="/global-overview" size={42} radius="md" variant="filled" color="indigo" onClick={close}>
                            <LayoutDashboard size={20} />
                        </ActionIcon>
                    </Tooltip>
                    <Divider w="60%" />
                    <Tooltip label="Add New Project" position="right" disabled={isMobile}>
                        <UnstyledButton
                            onClick={() => console.log('Open Create Project Modal')}
                            style={isMobile ? { width: '100%' } : {}}
                        >
                            <Group gap="sm">
                                <ActionIcon
                                    size={42}
                                    radius="md"
                                    variant="dashed"
                                    color="gray"
                                    style={{ borderStyle: 'dashed', borderWidth: rem(2) }}
                                    component={Link}
                                    to="/new-project"
                                >
                                    <Plus size={20} />
                                </ActionIcon>
                                {isMobile && (
                                    <Box>
                                        <Text size="sm" fw={600} c="dimmed">Create Project</Text>
                                        <Text size="10px" c="dimmed">Tambah workspace baru</Text>
                                    </Box>
                                )}
                            </Group>
                        </UnstyledButton>
                    </Tooltip>
                    {projects.map((p) => (
                        <Tooltip key={p.id} label={p.name} position="right" disabled={isMobile}>
                            <UnstyledButton component={Link} to={`/${p.id}/student-radar`} onClick={close}>
                                <Avatar size={42} radius="md" color={p.color} variant={projectId === p.id ? 'filled' : 'light'}>
                                    {p.initial}
                                </Avatar>
                                {isMobile && <Text size="sm" ml="md" fw={500}>{p.name}</Text>}
                            </UnstyledButton>
                        </Tooltip>
                    ))}
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}