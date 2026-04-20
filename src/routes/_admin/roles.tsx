import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    Stack, Group, Title, Text, Paper, Switch,
    Badge, Button, Box, rem, Accordion, ThemeIcon,
    Tooltip, ActionIcon, Grid
} from '@mantine/core';
import {
    ShieldCheck,
    Lock,
    Info,
    Save,
    RotateCcw,
    ChevronRight,
    Plus
} from 'lucide-react';

export const Route = createFileRoute('/_admin/roles')({
    component: RolePermissions,
})

// Struktur Data Izin (Permissions)
const PERMISSION_GROUPS = [
    {
        group: 'User Management',
        permissions: [
            { id: 'u_view', label: 'View Users', description: 'Melihat daftar seluruh pengguna' },
            { id: 'u_edit', label: 'Edit Users', description: 'Mengubah profil dan status pengguna' },
            { id: 'u_delete', label: 'Delete Users', description: 'Menghapus permanen pengguna' },
            { id: 'u_impersonate', label: 'Impersonate', description: 'Login sebagai user lain untuk debugging' },
        ]
    },
    {
        group: 'AI & Analytics',
        permissions: [
            { id: 'ai_stats', label: 'View AI Stats', description: 'Melihat penggunaan token global' },
            { id: 'ai_config', label: 'Configure Models', description: 'Mengubah endpoint API atau model AI' },
            { id: 'ai_cost', label: 'View Cost Data', description: 'Melihat rincian biaya tagihan AI' },
        ]
    },
    {
        group: 'Project Controls',
        permissions: [
            { id: 'p_view', label: 'View All Projects', description: 'Melihat seluruh proyek mentor' },
            { id: 'p_audit', label: 'Audit Course', description: 'Mengedit kurikulum proyek milik siapapun' },
        ]
    }
];

function RolePermissions() {
    const [selectedRole, setSelectedRole] = useState('Mentor');

    const roles = [
        { label: 'Super Admin', color: 'red', desc: 'Akses penuh ke seluruh sistem' },
        { label: 'Admin', color: 'orange', desc: 'Manajemen operasional harian' },
        { label: 'Mentor', color: 'indigo', desc: 'Terbatas pada manajemen proyek' },
    ];

    return (
        <Stack gap="lg">
            {/* HEADER */}
            <Group justify="space-between">
                <Box>
                    <Title order={2} lts={-0.5}>Role & Permissions (RBAC)</Title>
                    <Text size="sm" c="dimmed">Tentukan batasan akses dan izin untuk setiap tipe pengguna.</Text>
                </Box>
                <Group>
                    <Button variant="subtle" color="slate.6" leftSection={<RotateCcw size={16} />}>Reset Changes</Button>
                    <Button color="orange.6" leftSection={<Save size={16} />}>Save Permissions</Button>
                </Group>
            </Group>

            <Grid gap="xl">
                {/* LEFT: ROLE SELECTOR */}
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Stack gap="sm">
                        <Text size="xs" fw={800} c="slate.5" tt="uppercase" lts={1}>Select Role to Edit</Text>
                        {roles.map((role) => (
                            <Paper
                                key={role.label}
                                withBorder
                                p="md"
                                radius="md"
                                onClick={() => setSelectedRole(role.label)}
                                style={{
                                    cursor: 'pointer',
                                    borderLeft: selectedRole === role.label ? `4px solid var(--mantine-color-${role.color}-6)` : '1px solid var(--mantine-color-slate-2)',
                                    backgroundColor: selectedRole === role.label ? 'white' : 'var(--mantine-color-slate-0)',
                                    transition: 'all 0.2s'
                                }}
                            >
                                <Group justify="space-between">
                                    <Box>
                                        <Text size="sm" fw={700} c={selectedRole === role.label ? role.color : 'slate.9'}>
                                            {role.label}
                                        </Text>
                                        <Text size="xs" c="dimmed">{role.desc}</Text>
                                    </Box>
                                    {selectedRole === role.label && <ChevronRight size={16} color={`var(--mantine-color-${role.color}-6)`} />}
                                </Group>
                            </Paper>
                        ))}
                        <Button variant="dashed" color="slate.6" fullWidth mt="sm" leftSection={<Plus size={16} />}>
                            Create New Role
                        </Button>
                    </Stack>
                </Grid.Col>

                {/* RIGHT: PERMISSION MATRIX */}
                <Grid.Col span={{ base: 12, md: 8 }}>
                    <Paper withBorder radius="md" p={0} shadow="sm">
                        <Box p="md" bg="slate.0" style={{ borderBottom: '1px solid var(--mantine-color-slate-2)' }}>
                            <Group justify="space-between">
                                <Group gap="sm">
                                    <ThemeIcon variant="light" color="indigo" radius="md">
                                        <Lock size={18} />
                                    </ThemeIcon>
                                    <Box>
                                        <Text fw={700} size="sm">Permissions for: {selectedRole}</Text>
                                        <Text size="10px" c="dimmed">Changes will take effect after user re-login</Text>
                                    </Box>
                                </Group>
                                <Badge color="indigo">Active Role</Badge>
                            </Group>
                        </Box>

                        <Accordion variant="separated" chevronPosition="right">
                            {PERMISSION_GROUPS.map((group) => (
                                <Accordion.Item key={group.group} value={group.group} style={{ border: 'none', borderBottom: '1px solid var(--mantine-color-slate-1)' }}>
                                    <Accordion.Control>
                                        <Text fw={700} size="sm">{group.group}</Text>
                                    </Accordion.Control>
                                    <Accordion.Panel>
                                        <Stack gap="xs">
                                            {group.permissions.map((perm) => (
                                                <Group key={perm.id} justify="space-between" p="xs" style={{
                                                    borderRadius: rem(8),
                                                    '&:hover': { backgroundColor: 'var(--mantine-color-slate-0)' }
                                                }}>
                                                    <Box style={{ flex: 1 }}>
                                                        <Group gap={6}>
                                                            <Text size="sm" fw={600}>{perm.label}</Text>
                                                            <Tooltip label={perm.description} position="right">
                                                                <ActionIcon variant="transparent" size="xs" color="slate.4">
                                                                    <Info size={14} />
                                                                </ActionIcon>
                                                            </Tooltip>
                                                        </Group>
                                                        <Text size="xs" c="dimmed">{perm.id}</Text>
                                                    </Box>
                                                    <Switch
                                                        defaultChecked={selectedRole === 'Super Admin'}
                                                        disabled={selectedRole === 'Super Admin'} // Super Admin always has full access
                                                        color="orange"
                                                        size="sm"
                                                    />
                                                </Group>
                                            ))}
                                        </Stack>
                                    </Accordion.Panel>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Paper>

                    <Paper mt="lg" p="md" bg="orange.0" radius="md" withBorder style={{ borderColor: 'var(--mantine-color-orange-2)' }}>
                        <Group align="flex-start" gap="sm">
                            <ShieldCheck size={20} color="var(--mantine-color-orange-7)" />
                            <Box>
                                <Text size="xs" fw={700} c="orange.9">Keamanan Level Sistem</Text>
                                <Text size="xs" c="orange.8">
                                    Memberikan akses <strong>Impersonate</strong> atau <strong>Delete Users</strong> sangat berisiko. Pastikan role yang Anda edit hanya diberikan kepada personil yang berwenang.
                                </Text>
                            </Box>
                        </Group>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}