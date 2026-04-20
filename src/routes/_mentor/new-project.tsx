import { createFileRoute } from '@tanstack/react-router'
import {
    Container,
    Stack,
    Title,
    Text,
    Paper,
    TextInput,
    Textarea,
    Group,
    Button,
    ColorInput,
    SimpleGrid,
    ThemeIcon,
    Box,
    Select,
    Divider
} from '@mantine/core';
import { useNavigate } from '@tanstack/react-router';
import {
    FolderPlus,
    Palette,
    Sparkles,
    Rocket,
} from 'lucide-react';

export const Route = createFileRoute('/_mentor/new-project')({
    component: RouteComponent,
})

function RouteComponent() {
    const navigate = useNavigate();

    return (
        <Container size="xl" py="xl">
            <Stack gap="xl">
                {/* Header Navigasi Balik */}
                <Box>
                    <Group gap="sm">
                        <ThemeIcon size={40} radius="md" color="indigo" variant="light">
                            <FolderPlus size={24} />
                        </ThemeIcon>
                        <Box>
                            <Title order={2} style={{ letterSpacing: '-1px' }}>Create New Project</Title>
                            <Text size="sm" c="dimmed">Siapkan workspace baru untuk batch atau kelas Anda selanjutnya.</Text>
                        </Box>
                    </Group>
                </Box>

                <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
                    {/* Sisi Kiri: Informasi Dasar & Visual */}
                    <Stack gap="md">
                        <Paper withBorder p="xl" radius="lg" shadow="sm">
                            <Group mb="lg" gap="xs">
                                <Palette size={20} color="var(--mantine-color-indigo-6)" />
                                <Text fw={700}>Basic Identity</Text>
                            </Group>

                            <Stack gap="md">
                                <TextInput
                                    label="Project Name"
                                    placeholder="e.g. Startup Accelerator Batch 3"
                                    required
                                    withAsterisk
                                />
                                <TextInput
                                    label="Project Initial"
                                    placeholder="e.g. SA3"
                                    description="Max 3 characters for sidebar icon"
                                    maxLength={3}
                                />
                                <ColorInput
                                    label="Brand Color"
                                    placeholder="Pick a color for your project"
                                    defaultValue="#4C6EF5"
                                    description="Warna ini akan menjadi tema utama di dashboard siswa."
                                />
                                <Select
                                    label="Project Visibility"
                                    data={['Public', 'Invite Only', 'Private']}
                                    defaultValue="Invite Only"
                                />
                            </Stack>
                        </Paper>
                    </Stack>

                    {/* Sisi Kanan: AI & Tujuan */}
                    <Stack gap="md">
                        <Paper withBorder p="xl" radius="lg" shadow="sm" style={{ borderLeft: '4px solid var(--mantine-color-indigo-6)' }}>
                            <Group mb="lg" gap="xs">
                                <Sparkles size={20} color="var(--mantine-color-indigo-6)" />
                                <Text fw={700}>AI Mentor Initial Setup</Text>
                            </Group>

                            <Stack gap="md">
                                <Select
                                    label="Default AI Tone"
                                    data={['Supportive', 'Strict Investor', 'Socratic Guru']}
                                    defaultValue="Supportive"
                                    description="Anda bisa mengubah ini lebih detail di AI Persona Lab nanti."
                                />
                                <Textarea
                                    label="Project Goal"
                                    placeholder="Apa yang ingin dicapai siswa di akhir proyek ini?"
                                    minRows={4}
                                    description="AI akan menggunakan tujuan ini sebagai panduan dasar."
                                />
                            </Stack>
                        </Paper>

                        {/* Tips Card */}
                        <Paper p="md" radius="md" bg="gray.0">
                            <Text size="xs" c="dimmed" style={{ lineHeight: 1.5 }}>
                                <strong>Pro-tip:</strong> Anda bisa melakukan kloning kurikulum dari proyek sebelumnya setelah workspace ini dibuat di menu Course Architect.
                            </Text>
                        </Paper>
                    </Stack>
                </SimpleGrid>

                {/* Action Buttons */}
                <Divider />
                <Group justify="flex-end">
                    <Button variant="subtle" color="gray" onClick={() => navigate({ to: "/global-overview" })}>Cancel</Button>
                    <Button
                        size="md"
                        color="indigo"
                        radius="md"
                        leftSection={<Rocket size={18} />}
                        onClick={() => {
                            // Logic Save Project
                            alert('Project Created! Redirecting...');
                        }}
                    >
                        Launch Project Workspace
                    </Button>
                </Group>
            </Stack>
        </Container>
    );
}
