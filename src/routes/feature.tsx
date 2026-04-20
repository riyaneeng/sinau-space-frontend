import { createFileRoute } from '@tanstack/react-router'
import {
    Container,
    Text,
    Stack,
    Title,
    SimpleGrid,
    ThemeIcon,
    Box,
    rem,
    Paper,
    Badge,
    Grid,
    Button,
    Divider,
    Group
} from '@mantine/core';
import { Link } from '@tanstack/react-router';
import {
    BrainCircuit,
    ShieldCheck,
    Zap,
    MessageSquare,
    CheckCircle2,
    Cpu,
    Fingerprint,
    LineChart
} from 'lucide-react';

export const Route = createFileRoute('/feature')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Box bg="white">
            {/* 1. HEADER SECTION */}
            <Box
                pt={rem(100)}
                pb={rem(60)}
                bg="var(--mantine-color-indigo-0)"
                style={{ borderBottom: '1px solid var(--mantine-color-indigo-1)' }}
            >
                <Container size="lg">
                    <Stack align="center" gap="md" ta="center">
                        <Badge variant="filled" color="indigo" size="lg" radius="sm">Capabilities</Badge>
                        <Title style={{ fontSize: rem(48), fontWeight: 900, letterSpacing: '-1.5px' }}>
                            Teknologi di Balik <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Kesuksesan Siswa.</span>
                        </Title>
                        <Text size="xl" c="dimmed" style={{ maxWidth: rem(700) }}>
                            Kami membangun infrastruktur yang memungkinkan Mentor untuk memberikan bimbingan personal berkualitas tinggi dalam skala yang tak terbatas.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* 2. MAIN FEATURES - ALTERNATING SECTIONS */}
            <Container size="lg" py={rem(100)}>
                <Stack gap={rem(120)}>
                    {/* Feature 1: AI Mentor Persona */}
                    <Grid gap={80} align="center">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Badge color="indigo" variant="light" mb="md">Custom Intelligence</Badge>
                            <Title order={2} mb="md">AI Persona Lab: Ciptakan Duplikasi Digital Anda</Title>
                            <Text c="dimmed" mb="xl" style={{ lineHeight: 1.7 }}>
                                Bentuk asisten AI yang memiliki pengetahuan dasar, gaya bahasa, dan filosofi bimbingan Anda. AI ini akan menjawab pertanyaan teknis siswa 24/7 saat Anda sedang beristirahat.
                            </Text>
                            <SimpleGrid cols={2}>
                                <FeatureItem icon={Cpu} text="Model Training Lokal" />
                                <FeatureItem icon={MessageSquare} text="Tone of Voice Control" />
                                <FeatureItem icon={CheckCircle2} text="Contextual Memory" />
                                <FeatureItem icon={ShieldCheck} text="IP Protection" />
                            </SimpleGrid>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Paper shadow="xl" radius="lg" bg="indigo.6" p="lg">
                                <Box h={300} bg="rgba(255,255,255,0.1)" style={{ borderRadius: '8px', border: '2px dashed rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <BrainCircuit size={80} color="white" />
                                </Box>
                            </Paper>
                        </Grid.Col>
                    </Grid>

                    {/* Feature 2: Student Radar */}
                    <Grid gap={80} align="center">
                        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
                            <Paper withBorder shadow="xl" radius="lg" p="lg" bg="white">
                                <Stack gap="md">
                                    <Box h={20} w="40%" bg="gray.1" />
                                    <Divider />
                                    <SimpleGrid cols={3}>
                                        <Box h={60} bg="indigo.0" />
                                        <Box h={60} bg="green.0" />
                                        <Box h={60} bg="red.0" />
                                    </SimpleGrid>
                                    <Box h={100} bg="gray.0" />
                                </Stack>
                            </Paper>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
                            <Badge color="orange" variant="light" mb="md">Advanced Monitoring</Badge>
                            <Title order={2} mb="md">Student Radar: Deteksi Dini Masalah Siswa</Title>
                            <Text c="dimmed" mb="xl" style={{ lineHeight: 1.7 }}>
                                Jangan biarkan siswa Anda *stuck* terlalu lama. Radar kami menganalisis pola pengumpulan tugas dan sentimen percakapan untuk memberi tahu Anda siapa yang membutuhkan bantuan segera.
                            </Text>
                            <Stack gap="xs">
                                <FeatureItem icon={LineChart} text="Predictive Dropout Analytics" />
                                <FeatureItem icon={Fingerprint} text="Activity Heatmaps" />
                                <FeatureItem icon={Zap} text="Instant Alert System" />
                            </Stack>
                        </Grid.Col>
                    </Grid>

                    {/* Feature 3: Automated Review */}
                    <Grid gap={80} align="center">
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Badge color="teal" variant="light" mb="md">Efficiency First</Badge>
                            <Title order={2} mb="md">Review Queue: Validasi Tugas dalam Hitungan Detik</Title>
                            <Text c="dimmed" mb="xl" style={{ lineHeight: 1.7 }}>
                                AI akan melakukan pengecekan awal terhadap tugas siswa berdasarkan rubrik penilaian Anda. Anda hanya perlu melakukan validasi akhir (Approval) sebelum nilai dipublikasikan.
                            </Text>
                            <Button color="indigo" size="md">Pelajari Rubrik AI</Button>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 6 }}>
                            <Paper bg="slate.9" p="xl" radius="lg">
                                <Stack gap="sm">
                                    <Badge color="green">Pass</Badge>
                                    <Box h={10} w="100%" bg="slate.7" />
                                    <Box h={10} w="80%" bg="slate.7" />
                                    <Divider color="slate.7" />
                                    <Text size="xs" c="slate.4">"Kriteria 1: Market Fit - Terpenuhi dengan data valid..."</Text>
                                </Stack>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Stack>
            </Container>

            {/* 3. CTA FOOTER */}
            <Box bg="gray.0" py={rem(80)}>
                <Container size="sm" ta="center">
                    <Title order={2} mb="md">Siap untuk mencoba semua fitur ini?</Title>
                    <Text c="dimmed" mb="xl">Mulai dengan gratis untuk 5 siswa pertama dan rasakan kemudahannya.</Text>
                    <Group justify="center">
                        <Button size="lg" color="indigo" component={Link} to="/auth/register">Daftar Sekarang</Button>
                        <Button size="lg" variant="outline" color="indigo">Hubungi Penjualan</Button>
                    </Group>
                </Container>
            </Box>
        </Box>
    );
}

function FeatureItem({ icon: Icon, text }: { icon: any; text: string }) {
    return (
        <Group gap="xs" align="center">
            <ThemeIcon variant="light" color="indigo" size="sm" >
                <Icon size={12} strokeWidth={3} />
            </ThemeIcon>
            <Text size="sm" fw={600}>{text}</Text>
        </Group>
    );
}