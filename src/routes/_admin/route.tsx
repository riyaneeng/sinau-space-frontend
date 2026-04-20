
import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import {
    AppShell,
    Group,
    Text,
    NavLink,
    Stack,
    Badge,
    ScrollArea,
    ActionIcon,
    Box,
    rem,
    Burger,
    Avatar,
    Divider,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    BrainCircuit,
    CreditCard,
    Activity,
    Settings,
    Database,
    Bell,
    ExternalLink,
    Lock
} from 'lucide-react';

export const Route = createFileRoute('/_admin')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [opened, { toggle, close }] = useDisclosure();

    const adminNavLinks = [
        {
            group: 'Platform', items: [
                { icon: LayoutDashboard, label: 'System Overview', to: '/dashboard' },
                { icon: BrainCircuit, label: 'AI Cost Monitor', to: '/ai-stats', badge: 'Costly' },
            ]
        },
        {
            group: 'Users & Access', items: [
                { icon: Users, label: 'User Masterlist', to: '/users' },
                { icon: ShieldCheck, label: 'Role & Permissions', to: '/roles' },
            ]
        },
        {
            group: 'Infrastructures', items: [
                { icon: Database, label: 'Content Templates', to: '/templates' },
                { icon: CreditCard, label: 'Billing & Plans', to: '/billing' },
                { icon: Activity, label: 'Audit Trail', to: '/audit' },
            ]
        },
    ];

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 280,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            {/* HEADER ADMIN */}
            <AppShell.Header px="md" bg="slate.9" style={{ borderBottom: '1px solid var(--mantine-color-slate-8)' }}>
                <Group h="100%" justify="space-between">
                    <Group gap="sm">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" color="white" />
                        <Group gap={8}>
                            <Box bg="orange.6" p={4} >
                                <Lock size={16} color="white" />
                            </Box>
                            <Text fw={800} size="lg" c="white" lts={-0.5}>
                                ADMIN<span style={{ color: 'var(--mantine-color-orange-5)' }}>PANEL</span>
                            </Text>
                        </Group>
                    </Group>

                    <Group gap="md">
                        <Badge variant="filled" color="slate.7" visibleFrom="sm" radius="sm">Server: Healthy</Badge>
                        <ActionIcon variant="subtle" color="slate.3">
                            <Bell size={20} />
                        </ActionIcon>
                        <Divider orientation="vertical" h={20} />
                        <Group gap="xs">
                            <Avatar size="sm" radius="sm" color="orange">AD</Avatar>
                            <Box visibleFrom="sm">
                                <Text size="xs" fw={700} c="white">Super Admin</Text>
                                <Text size="10px" c="slate.4">System Overseer</Text>
                            </Box>
                        </Group>
                    </Group>
                </Group>
            </AppShell.Header>

            {/* NAVBAR ADMIN */}
            <AppShell.Navbar p="md" bg="slate.9" style={{ borderRight: '1px solid var(--mantine-color-slate-8)' }}>
                <AppShell.Section grow component={ScrollArea}>
                    <Stack gap="xl">
                        {adminNavLinks.map((group) => (
                            <Box key={group.group}>
                                <Text size="10px" fw={800} c="slate.5" tt="uppercase" mb={10} lts={1}>
                                    {group.group}
                                </Text>
                                <Stack gap={4}>
                                    {group.items.map((item) => (
                                        <NavLink
                                            key={item.to}
                                            component={Link}
                                            to={item.to}
                                            label={item.label}
                                            leftSection={<item.icon size={18} strokeWidth={2} />}
                                            rightSection={item.badge && <Badge size="xs" color="orange" variant="light">{item.badge}</Badge>}
                                            onClick={close}
                                            styles={{
                                                root: {
                                                    borderRadius: rem(6),
                                                    color: 'var(--mantine-color-slate-3)',
                                                    '&:hover': { backgroundColor: 'var(--mantine-color-slate-8)' }
                                                },
                                                label: { fontWeight: 500, fontSize: rem(13) }
                                            }}
                                            activeProps={{
                                                style: {
                                                    backgroundColor: 'var(--mantine-color-slate-8)',
                                                    color: 'var(--mantine-color-orange-4)',
                                                    borderLeft: '3px solid var(--mantine-color-orange-5)'
                                                }
                                            }}
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        ))}
                    </Stack>
                </AppShell.Section>

                {/* BOTTOM SECTION */}
                <AppShell.Section pt="md">
                    <Divider mb="md" color="slate.8" />
                    <NavLink
                        label="System Settings"
                        leftSection={<Settings size={18} />}
                        styles={{ root: { borderRadius: rem(6), color: 'var(--mantine-color-slate-3)' } }}
                    />
                    <NavLink
                        label="Main Website"
                        leftSection={<ExternalLink size={18} />}
                        styles={{ root: { borderRadius: rem(6), color: 'var(--mantine-color-slate-3)' } }}
                    />
                </AppShell.Section>
            </AppShell.Navbar>

            {/* MAIN AREA */}
            <AppShell.Main bg={"gray.0"}>
                <Box p={isMobile ? 0 : 'lg'}>
                    <Outlet />
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}