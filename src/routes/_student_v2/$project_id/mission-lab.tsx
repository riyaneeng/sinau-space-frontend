import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    Container, Grid, Text, Title, Stack, Group, Box, rem, Paper, Badge,
    ThemeIcon, Button, FileInput,
    Textarea, Alert, List,
} from '@mantine/core';
import {
    Rocket, CheckCircle2, Clock, FileUp, MessageSquare,
    ExternalLink, Download, Trophy, Ghost, Info
} from 'lucide-react';
export const Route = createFileRoute('/_student_v2/$project_id/mission-lab')({
    component: RouteComponent,
})

function RouteComponent() {
    const [submitted, setSubmitted] = useState(false);

    // Dummy Data Mission
    const missionDetail = {
        title: "Mission 04: UI Kit Component System",
        deadline: "24 April 2026, 23:59",
        status: "In Progress", // In Progress, Under Review, Completed
        points: 500,
        description: "Bangun sistem desain yang skalabel menggunakan Auto Layout dan Variants untuk komponen Input, Button, dan Modal.",
        requirements: [
            "Gunakan Local Styles untuk Warna & Tipografi",
            "Buat setidaknya 3 varian Button (Primary, Secondary, Ghost)",
            "Komponen harus responsif (Auto Layout)",
            "Dokumentasikan dalam satu halaman UI Kit"
        ]
    };

    return (
        <Box bg="gray.0" pb={rem(80)}>
            {/* 1. MISSION HEADER */}
            <Box bg="white" pt={rem(40)} pb={rem(40)} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Container size="lg">
                    <Group justify="space-between" align="flex-start">
                        <Stack gap="xs">
                            <Group gap="xs">
                                <Badge color="orange" variant="light" leftSection={<Clock size={12} />}>
                                    Deadline: {missionDetail.deadline}
                                </Badge>
                                <Badge color="indigo" variant="filled">{missionDetail.points} XP</Badge>
                            </Group>
                            <Title order={2} fw={900} lts={-1}>{missionDetail.title}</Title>
                            <Text c="dimmed">Selesaikan misi ini untuk membuka chapter berikutnya.</Text>
                        </Stack>
                        <Group gap="sm">
                            <Button variant="outline" color="gray" leftSection={<MessageSquare size={16} />}>Ask Mentor</Button>
                        </Group>
                    </Group>
                </Container>
            </Box>

            <Container size="lg" mt="xl">
                <Grid gap="xl">
                    {/* 2. MISSION BRIEF (LEFT) */}
                    <Grid.Col span={{ base: 12, md: 8 }}>
                        <Stack gap="lg">
                            <Paper withBorder p="xl" radius="lg">
                                <Title order={4} mb="md">Brief & Instructions</Title>
                                <Text size="sm" style={{ lineHeight: 1.7 }} mb="xl">
                                    {missionDetail.description}
                                </Text>

                                <Title order={5} mb="sm">Technical Requirements:</Title>
                                <List
                                    spacing="xs"
                                    size="sm"
                                    center
                                    icon={
                                        <ThemeIcon color="teal" size={20} radius="xl">
                                            <CheckCircle2 size={12} />
                                        </ThemeIcon>
                                    }
                                >
                                    {missionDetail.requirements.map((req, i) => (
                                        <List.Item key={i}>{req}</List.Item>
                                    ))}
                                </List>

                                <Alert variant="light" color="indigo" title="Mentor's Tip" icon={<Info size={18} />} mt="xl">
                                    "Fokus pada penamaan layer yang rapi. Ini akan memudahkan developer saat proses hand-off nanti."
                                </Alert>
                            </Paper>

                            <Paper withBorder p="xl" radius="lg">
                                <Title order={4} mb="md">Support Assets</Title>
                                <Group gap="sm">
                                    <Button variant="light" color="gray" radius="md" leftSection={<Download size={16} />}>Starter-Kit.fig</Button>
                                    <Button variant="light" color="gray" radius="md" leftSection={<ExternalLink size={16} />}>Design System Docs</Button>
                                </Group>
                            </Paper>
                        </Stack>
                    </Grid.Col>

                    {/* 3. SUBMISSION PANEL (RIGHT) */}
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Stack gap="lg">
                            <Paper withBorder p="xl" radius="lg" bg={submitted ? 'green.0' : 'white'}>
                                <Title order={4} mb="lg">Your Submission</Title>

                                {!submitted ? (
                                    <Stack gap="md">
                                        <FileInput
                                            label="Upload File / Link"
                                            placeholder="Pilih file atau link Figma"
                                            leftSection={<FileUp size={16} />}
                                            radius="md"
                                        />
                                        <Textarea
                                            label="Notes to Mentor"
                                            placeholder="Apa yang kamu pelajari dari misi ini?"
                                            minRows={3}
                                            radius="md"
                                        />
                                        <Button
                                            fullWidth
                                            size="lg"
                                            color="indigo"
                                            radius="md"
                                            onClick={() => setSubmitted(true)}
                                            leftSection={<Rocket size={18} />}
                                        >
                                            Submit Mission
                                        </Button>
                                    </Stack>
                                ) : (
                                    <Stack align="center" ta="center" py="md">
                                        <ThemeIcon size={60} radius="xl" color="green" variant="light">
                                            <CheckCircle2 size={34} />
                                        </ThemeIcon>
                                        <Box>
                                            <Text fw={700}>Mission Submitted!</Text>
                                            <Text size="xs" c="dimmed">Menunggu review dari mentor (Est. 24 Jam)</Text>
                                        </Box>
                                        <Button variant="subtle" fullWidth color="gray" onClick={() => setSubmitted(false)}>Edit Submission</Button>
                                    </Stack>
                                )}
                            </Paper>

                            {/* 4. FEEDBACK MENTOR (Placeholder) */}
                            <Paper withBorder p="xl" radius="lg">
                                <Title order={4} mb="md">Mentor Feedback</Title>
                                <Stack align="center" py="xl" gap="xs">
                                    <Ghost size={40} color="var(--mantine-color-gray-4)" />
                                    <Text size="xs" c="dimmed" ta="center">Belum ada feedback. Kirim tugasmu terlebih dahulu!</Text>
                                </Stack>
                            </Paper>

                            <Paper withBorder p="xl" radius="lg" bg="indigo.6" c="white">
                                <Group justify="space-between">
                                    <Stack gap={0}>
                                        <Text size="xs" fw={700}>CURRENT RANK</Text>
                                        <Title order={3}>Gold Member</Title>
                                    </Stack>
                                    <Trophy size={32} />
                                </Group>
                            </Paper>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    );
}