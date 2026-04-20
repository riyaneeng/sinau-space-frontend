import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import {
    Box, Stack, NavLink, Text, AppShell, Group, UnstyledButton, Badge, rem,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Users, ShieldCheck, Library, MessageSquareCode, BarChart3, UserPlus } from 'lucide-react';

export const Route = createFileRoute('/_mentor/$projectId')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const { projectId } = Route.useParams();
    const navLinks = [
        { icon: Users, label: 'Student Radar', to: `/${projectId}/student-radar`, group: 'Main Ops' },
        {
            icon: UserPlus,
            label: 'Participants',
            to: `/${projectId}/participants`,
            group: 'Main Ops'
        },
        { icon: ShieldCheck, label: 'Review Queue', to: `/${projectId}/review-queue`, group: 'Main Ops', badge: 12 },
        { icon: Library, label: 'Course Architect', to: `/${projectId}/course-builder`, group: 'Content Creator' },
        { icon: MessageSquareCode, label: 'AI Persona Lab', to: `/${projectId}/ai-config`, group: 'Content Creator' },
        { icon: BarChart3, label: 'Class Analytics', to: `/${projectId}/analytics`, group: 'Insights' },
    ];

    const renderNavItems = (groupName: string) => {
        return navLinks
            .filter((item) => item.group === groupName)
            .map((item) => (
                <NavLink
                    key={item.to}
                    component={Link}
                    to={item.to}
                    label={item.label}
                    leftSection={<item.icon size={18} strokeWidth={1.5} />}
                    rightSection={item.badge ? <Badge size="xs" color="red" variant="filled">{item.badge}</Badge> : null}
                    activeProps={{ style: { fontWeight: 600, borderRight: `3px solid var(--mantine-color-indigo-filled)` } }}
                    styles={{ root: { borderRadius: rem(4), marginBottom: rem(2) }, label: { fontSize: rem(13), fontWeight: 500 } }}
                />
            ));
    };
    return (
        <Box style={{ display: 'flex', height: '100%' }}>
            {/* DESKTOP: Wide Sidebar (Menu Operasional) */}
            {!isMobile && (
                <Box
                    w={280}
                    style={{ borderRight: '1px solid var(--mantine-color-gray-2)', height: 'calc(100vh - 65px)', position: 'sticky', top: 65 }}
                    p="md"
                >
                    <Text size="xs" fw={800} c="indigo.7" px="md" tt="uppercase" mb={15} lts={1}>Project: {projectId}</Text>
                    <Stack gap="xs">
                        <Box>
                            <Text size="11px" fw={700} c="dimmed" px="md" tt="uppercase" mb={8}>Operations</Text>
                            {renderNavItems('Main Ops')}
                        </Box>
                        <Box mt="md">
                            <Text size="11px" fw={700} c="dimmed" px="md" tt="uppercase" mb={8}>Curriculum</Text>
                            {renderNavItems('Content Creator')}
                        </Box>
                        <Box mt="md">
                            <Text size="11px" fw={700} c="dimmed" px="md" tt="uppercase" mb={8}>Reports</Text>
                            {renderNavItems('Insights')}
                        </Box>
                    </Stack>
                </Box>
            )}



            {/* MAIN CONTENT AREA */}
            <Box style={{ flex: 1 }} p="md" bg="gray.0">
                <Outlet />
            </Box>

            {/* MOBILE: Bottom Navigation */}
            {isMobile && (
                <AppShell.Footer hiddenFrom="sm" p={0} bg="white" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                    <Group h="100%" justify="space-around" wrap="nowrap" gap={0}>
                        {navLinks.map((link) => (
                            <UnstyledButton
                                key={link.to}
                                component={Link}
                                to={link.to}
                                style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                activeProps={{ style: { color: 'var(--mantine-color-indigo-6)' } }}
                            >
                                <Box pos="relative">
                                    <link.icon size={20} strokeWidth={1.5} />
                                    {link.badge && <Badge size="xs" color="red" variant="filled" pos="absolute" top={-8} right={-12} p={0} style={{ minWidth: 16, height: 16 }}>{link.badge}</Badge>}
                                </Box>
                                <Text size="9px" fw={700} mt={4}>{link.label.split(' ')[0]}</Text>
                            </UnstyledButton>
                        ))}
                    </Group>
                </AppShell.Footer>
            )}
        </Box>
    );
}
