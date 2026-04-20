import { createFileRoute } from '@tanstack/react-router'
import {
    Stack,
    TextInput,
    Select,
    Textarea,
    Button,
    Grid,
    Paper,
    Title,
    Text,
    Group,
    ThemeIcon,
    Badge,
    Avatar,
    Box,
    Slider,
    rem,
    Alert,
    ActionIcon,
} from '@mantine/core';
import {
    Bot,
    Sparkles,
    MessageSquare,
    Zap,
    BrainCircuit,
    Save,
    RefreshCcw
} from 'lucide-react';

export const Route = createFileRoute('/_mentor/$projectId/ai-config')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Stack gap="xl" py="lg">
            {/* HEADER SECTION */}
            <Box>
                <Group gap="sm">
                    <ThemeIcon size="xl" radius="md" color="indigo" variant="light">
                        <BrainCircuit size={24} />
                    </ThemeIcon>
                    <Box>
                        <Title order={2} style={{ letterSpacing: '-1px' }}>AI Persona Lab</Title>
                        <Text size="sm" c="dimmed">Konfigurasi kepribadian dan logika berpikir asisten AI siswa.</Text>
                    </Box>
                </Group>
            </Box>

            <Grid gap="xl">
                {/* LEFT COLUMN: CONFIGURATION */}
                <Grid.Col span={{ base: 12, md: 7 }}>
                    <Stack gap="md">
                        <Paper withBorder p="xl" radius="lg" shadow="sm">
                            <Stack gap="lg">
                                <Title order={4}>Identity & Persona</Title>

                                <Group grow>
                                    <TextInput
                                        label="Assistant Name"
                                        placeholder="e.g. James Stark"
                                        defaultValue="James Stark"
                                        description="Nama yang akan muncul di chat siswa"
                                    />
                                    <Select
                                        label="Persona Archetype"
                                        data={['Professional', 'Encouraging', 'Critical & Aggressive', 'Socratic Mentor']}
                                        defaultValue="Critical & Aggressive"
                                        description="Gaya bicara dan pendekatan AI"
                                    />
                                </Group>

                                <Box>
                                    <Text size="sm" fw={500} mb="xs">Creativity Level (Temperature)</Text>
                                    <Slider
                                        color="indigo"
                                        marks={[
                                            { value: 20, label: 'Strict' },
                                            { value: 50, label: 'Balanced' },
                                            { value: 80, label: 'Creative' },
                                        ]}
                                        defaultValue={40}
                                    />
                                    <Text size="xs" c="dimmed" mt="xl">Rendah untuk jawaban faktual, tinggi untuk brainstorming ide.</Text>
                                </Box>

                                <Textarea
                                    label="System Prompt (Core Intelligence)"
                                    placeholder="Contoh: Kamu adalah investor galak yang fokus pada profitabilitas..."
                                    minRows={8}
                                    description="Berikan instruksi mendalam tentang batasan dan tujuan AI."
                                    styles={{ input: { fontFamily: 'monospace', fontSize: rem(13) } }}
                                />

                                <Group justify="flex-end">
                                    <Button variant="subtle" color="gray" leftSection={<RefreshCcw size={16} />}>Reset Default</Button>
                                    <Button color="indigo" radius="md" leftSection={<Save size={16} />}>Save Changes</Button>
                                </Group>
                            </Stack>
                        </Paper>

                        <Alert icon={<Zap size={16} />} title="Tips Pelatihan" color="blue" radius="md">
                            Gunakan teknik <em>"Few-shot prompting"</em> dengan memberikan contoh percakapan di dalam System Prompt untuk hasil yang lebih akurat.
                        </Alert>
                    </Stack>
                </Grid.Col>

                {/* RIGHT COLUMN: LIVE SIMULATION */}
                <Grid.Col span={{ base: 12, md: 5 }}>
                    <Paper withBorder radius="lg" shadow="md" h={600} style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        {/* Simulation Header */}
                        <Box p="md" bg="gray.0" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                            <Group justify="space-between">
                                <Group gap="xs">
                                    <Avatar color="indigo" radius="xl" size="sm"><Bot size={18} /></Avatar>
                                    <Box>
                                        <Text size="xs" fw={700}>Simulation Mode</Text>
                                        <Badge size="xs" variant="dot" color="green">Active</Badge>
                                    </Box>
                                </Group>
                                <ActionIcon variant="subtle" color="gray"><RefreshCcw size={14} /></ActionIcon>
                            </Group>
                        </Box>

                        {/* Chat Area */}
                        <Box style={{ flex: 1 }} p="md" bg="white">
                            <Stack gap="md">
                                <Group justify="flex-start" align="flex-start">
                                    <Paper withBorder p="sm" radius="md" bg="gray.0" style={{ maxWidth: '85%' }}>
                                        <Text size="xs" fw={700} mb={4}>James Stark (AI)</Text>
                                        <Text size="xs">
                                            "Saya sudah membaca rencana bisnismu. Terlalu banyak asumsi, sedikit data. Bagaimana caramu membuktikan bahwa orang benar-benar mau membayar untuk produk ini?"
                                        </Text>
                                    </Paper>
                                </Group>

                                <Group justify="flex-end">
                                    <Paper p="sm" radius="md" bg="indigo.6" c="white" style={{ maxWidth: '85%' }}>
                                        <Text size="xs">"Saya akan melakukan survei ke 100 orang target pasar minggu depan."</Text>
                                    </Paper>
                                </Group>

                                <Group justify="flex-start" align="flex-start">
                                    <Paper withBorder p="sm" radius="md" bg="gray.0" style={{ maxWidth: '85%' }}>
                                        <Text size="xs" fw={700} mb={4}>James Stark (AI)</Text>
                                        <Text size="xs">
                                            <Sparkles size={12} color="orange" style={{ display: 'inline', marginRight: 4 }} />
                                            "Minggu depan? Kelamaan. Kompetitormu sudah meluncurkan fitur baru hari ini. Berikan saya 3 hipotesis utama yang ingin kamu uji sekarang!"
                                        </Text>
                                    </Paper>
                                </Group>
                            </Stack>
                        </Box>

                        {/* Input Area */}
                        <Box p="md" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                            <TextInput
                                placeholder="Coba ajak bicara AI-mu..."
                                radius="xl"
                                rightSection={<ActionIcon color="indigo" radius="xl"><MessageSquare size={16} /></ActionIcon>}
                            />
                            <Text size="10px" c="dimmed" mt={8} >
                                Preview ini menggunakan konfigurasi di sebelah kiri.
                            </Text>
                        </Box>
                    </Paper>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}
