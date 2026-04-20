import { createFileRoute, Outlet, Link, useParams } from '@tanstack/react-router'
import {
    AppShell,
    Group,
    Text,
    Stack,
    ActionIcon,
    Burger,
    Divider,
    UnstyledButton,
    Tooltip,
    Avatar,
    Box,
    rem,
    ScrollArea,
    Menu,
    Center,
    NavLink
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import {
    LayoutDashboard,
    Bell,
    Settings,
    LogOut,
    User,
    ChevronLeft,
    ChevronRight,
    BookOpen,
    BookMarked,
    Sparkles,
    Search,
    Trophy
} from 'lucide-react';

export const Route = createFileRoute('/_student_v2')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [opened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopMini, { toggle: toggleDesktop }] = useDisclosure(false);
    const params = useParams({ strict: false });

    const projects = [
        { id: 'p1', name: 'Startup Accelerator v2', initial: 'SA', color: 'indigo' },
        { id: 'p2', name: 'UI/UX Boot Camp', initial: 'UI', color: 'violet' },
        { id: 'p3', name: 'Fintech Incubation', initial: 'FI', color: 'green' },
    ];

    const navLinks = [
        { label: 'Overview', icon: LayoutDashboard, to: '/overview' },
        { label: 'Project Hub', icon: BookOpen, to: '/project-hub' },
        { label: 'Workspace', icon: BookMarked, to: '/workspace' },
        { label: 'Portofolio', icon: Trophy, to: '/portofolio' },
    ];

    const renderNavItems = () => {
        const isMini = desktopMini && !isMobile;

        return navLinks.map((item) => (
            <Tooltip
                key={item.label}
                label={item.label}
                position="right"
                disabled={!isMini}
                transitionProps={{ transition: 'pop', duration: 200 }}
            >
                <NavLink
                    component={Link}
                    to={item.to}
                    label={!isMini ? item.label : undefined}
                    leftSection={<item.icon size={isMini ? 22 : 18} strokeWidth={1.5} />}
                    // rightSection={(!isMini && item.badge) ? <Badge size="xs" color="red" variant="filled">{item.badge}</Badge> : null}
                    activeProps={{
                        style: {
                            fontWeight: 600,
                            borderRight: isMini ? 'none' : `3px solid var(--mantine-color-indigo-filled)`,
                            backgroundColor: 'var(--mantine-color-indigo-0)'
                        }
                    }}
                    styles={{
                        root: {
                            borderRadius: rem(8),
                            justifyContent: isMini ? 'center' : 'flex-start',
                            padding: isMini ? '12px' : undefined,
                        },
                        body: {
                            display: isMini ? 'none' : 'flex',
                        },
                        label: { fontSize: rem(13), fontWeight: 500 },
                        section: { margin: isMini ? 0 : undefined }
                    }}
                />
            </Tooltip>
        ));
    };

    return (
        <AppShell
            header={{ height: 65 }}
            navbar={{
                width: isMobile ? 280 : (desktopMini ? 80 : 260),
                breakpoint: 'sm',
                collapsed: { mobile: !opened }
            }}
            padding={0}
        >
            <AppShell.Header px="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Group h="100%" justify="space-between">
                    <Group gap="sm">
                        <Burger opened={opened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
                        <Group gap={12}>
                            <Box
                                bg="indigo.6"
                                w={32} h={32}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: rem(8),
                                    boxShadow: '0 4px 10px rgba(76, 110, 245, 0.3)'
                                }}
                            >
                                <Sparkles size={18} color="white" fill="white" />
                            </Box>
                            {(!isMobile) && (
                                <Text fw={900} size="lg" lts={-0.5} style={{ whiteSpace: 'nowrap' }}>
                                    SINAU<span style={{ color: 'var(--mantine-color-indigo-6)' }}>SPACE</span>
                                </Text>
                            )}
                        </Group>
                    </Group>
                    <Group gap="md">
                        <ActionIcon variant="subtle" color="gray" radius="md" size="lg">
                            <Search size={20} strokeWidth={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray" radius="md" size="lg" pos="relative">
                            <Bell size={20} strokeWidth={1.5} />
                            <Box
                                pos="absolute" top={8} right={8} w={8} h={8}
                                bg="red.6" style={{ borderRadius: '50%', border: '2px solid white' }}
                            />
                        </ActionIcon>
                        <Divider orientation="vertical" h={24} my="auto" />
                        <Avatar radius="md" size="sm" color="indigo" src={null} style={{ cursor: 'pointer' }} />
                    </Group>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="sm" style={{
                transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                borderRight: '1px solid var(--mantine-color-gray-2)'
            }}>
                <AppShell.Section grow component={ScrollArea} scrollbars="y" mx="-xs" px="xs">
                    <Stack gap={4}>
                        {/* --- SECTION: MAIN NAVIGATION --- */}
                        <Text
                            size="10px" fw={800} c="dimmed" tt="uppercase" lts={1.5}
                            mb={8} mt={10} px={desktopMini && !isMobile ? 0 : "sm"}
                            ta={desktopMini && !isMobile ? 'center' : 'left'}
                        >
                            {desktopMini && !isMobile ? '•••' : 'Main Navigation'}
                        </Text>


                        {renderNavItems()}


                        {/* --- SECTION: WORKSPACE --- */}
                        <Divider
                            my="lg"
                            label={desktopMini && !isMobile ? null : (
                                <Group gap={4}>
                                    <Text size="10px" fw={800} tt="uppercase" lts={1}>Workspaces</Text>
                                </Group>
                            )}
                            labelPosition="center"
                        />
                        <Stack gap={4}>
                            {projects.map((p) => {
                                const isSelected = params?.project_id === p.id;
                                return (
                                    <Tooltip key={p.id} label={p.name} position="right" disabled={!desktopMini || isMobile}>
                                        <UnstyledButton
                                            p={desktopMini ? 8 : 10}
                                            component={Link}
                                            onClick={() => {
                                                if (isMobile) {
                                                    toggleMobile()
                                                } else if (!desktopMini) {
                                                    toggleDesktop()
                                                }
                                            }}
                                            // onClick={() => isMobile && toggleMobile()}
                                            to={`/${p.id}/learning-path`}
                                            style={{
                                                borderRadius: rem(12),
                                                transition: 'all 0.2s ease',
                                                backgroundColor: isSelected ? 'white' : 'transparent',
                                                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.05)' : 'none',
                                                border: isSelected ? '1px solid var(--mantine-color-gray-2)' : '1px solid transparent'
                                            }}
                                            styles={{
                                                root: {
                                                    '&:hover': {
                                                        backgroundColor: isSelected ? 'white' : 'var(--mantine-color-gray-0)',
                                                        transform: isSelected ? 'none' : 'translateX(4px)'
                                                    }
                                                }
                                            }}
                                        >
                                            <Group gap="md" wrap="nowrap" justify={desktopMini && !isMobile ? 'center' : 'flex-start'}>
                                                <Avatar
                                                    size={isSelected ? 34 : 32}
                                                    radius={isSelected ? "md" : "xl"}
                                                    color={p.color}
                                                    variant={isSelected ? "filled" : "light"}
                                                    style={{
                                                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                                        boxShadow: isSelected ? `0 8px 16px -4px var(--mantine-color-${p.color}-4)` : 'none'
                                                    }}
                                                >
                                                    <Text size="xs" fw={800}>{p.initial}</Text>
                                                </Avatar>

                                                {(!desktopMini || isMobile) && (
                                                    <Box style={{ flex: 1 }}>
                                                        <Text size="sm" fw={isSelected ? 700 : 600} c={isSelected ? 'black' : 'slate.7'}>
                                                            {p.name}
                                                        </Text>
                                                        <Text size="10px" c="dimmed" fw={500}>
                                                            {isSelected ? 'Currently Viewing' : 'Tap to switch'}
                                                        </Text>
                                                    </Box>
                                                )}
                                            </Group>
                                        </UnstyledButton>
                                    </Tooltip>
                                );
                            })}
                        </Stack>
                    </Stack>
                </AppShell.Section>

                {/* BOTTOM SECTION */}
                <AppShell.Section pt="md">
                    <Stack gap="xs">
                        <UnstyledButton
                            onClick={toggleDesktop}
                            visibleFrom="sm"
                            p="sm"
                            style={{
                                borderRadius: rem(10),
                                backgroundColor: 'var(--mantine-color-gray-1)',
                                textAlign: 'center'
                            }}
                        >
                            <Center>
                                {desktopMini ? <ChevronRight size={18} /> : <Group gap={8}><ChevronLeft size={18} /></Group>}
                            </Center>
                        </UnstyledButton>

                        <Menu
                            shadow="xl"
                            width={240}
                            position={desktopMini && !isMobile ? "right-end" : "top-start"}
                            offset={15}
                            transitionProps={{ transition: 'pop-bottom-left', duration: 200 }}
                            withArrow
                        >
                            <Menu.Target>
                                <UnstyledButton
                                    p="xs"
                                    style={{
                                        borderRadius: rem(12),
                                        transition: 'background 0.2s ease',
                                        border: '1px solid var(--mantine-color-gray-2)'
                                    }}
                                    styles={{ root: { '&:hover': { backgroundColor: 'var(--mantine-color-gray-0)' } } }}
                                >
                                    <Group gap="sm" wrap="nowrap" justify={desktopMini && !isMobile ? 'center' : 'flex-start'}>
                                        <Avatar size="md" radius="md" color="orange" src={null}>AD</Avatar>
                                        {(!desktopMini || isMobile) && (
                                            <Box style={{ flex: 1, overflow: 'hidden' }}>
                                                <Text size="sm" fw={800} truncate>Dafara Syah</Text>
                                                <Text size="xs" c="dimmed" truncate>Pro Student Plan</Text>
                                            </Box>
                                        )}
                                    </Group>
                                </UnstyledButton>
                            </Menu.Target>

                            <Menu.Dropdown p="xs">
                                <Menu.Label>Account Management</Menu.Label>
                                <Menu.Item leftSection={<User size={16} strokeWidth={1.5} />}>My Profile</Menu.Item>
                                <Menu.Item leftSection={<Settings size={16} strokeWidth={1.5} />}>App Settings</Menu.Item>
                                <Menu.Divider />
                                <Menu.Label>System</Menu.Label>
                                <Menu.Item leftSection={<Bell size={16} strokeWidth={1.5} />}>Notifications</Menu.Item>
                                <Menu.Item
                                    color="red"
                                    leftSection={<LogOut size={16} strokeWidth={1.5} />}
                                    fw={600}
                                    component={Link}
                                    to="/auth/login"
                                >
                                    Sign Out
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Stack>
                </AppShell.Section>
            </AppShell.Navbar>

            <AppShell.Main bg="gray.0" style={{ transition: 'all 300ms' }}>
                {/* <Box p={isMobile ? "md" : "xl"} style={{ minHeight: '100%' }}>
                </Box> */}
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
}