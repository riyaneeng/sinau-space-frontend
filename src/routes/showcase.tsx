import { createFileRoute } from '@tanstack/react-router'
import {
    Container,
    Text,
    Title,
    Stack,
    Group,
    SimpleGrid,
    Box,
    rem,
    Paper,
    Badge,
    Image,
    Avatar,
    ThemeIcon,
    Button,
    Tabs,
    Center
} from '@mantine/core';
import {
    ExternalLink,
    Quote,
    Star,
    Zap,
    Trophy,
    Layout
} from 'lucide-react';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/showcase')({
    component: RouteComponent,
})

function RouteComponent() {
    const cases = [
        {
            title: "Global Tech Accelerator",
            category: "Business",
            // Gambar: Suasana meeting/pitching profesional modern
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop",
            mentor: "Dr. Sarah Chen",
            stats: "200+ Projects",
            desc: "Menggunakan AI Mentor untuk melakukan validasi awal pada 500+ pitch deck setiap bulannya."
        },
        {
            title: "Design System Bootcamp",
            category: "Design",
            // Gambar: Seseorang sedang mengerjakan wireframe/desain UI di tablet/laptop
            image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop",
            mentor: "Aris Wijaya",
            stats: "1.2k Students",
            desc: "Otomatisasi feedback desain UI dasar menggunakan AI Persona yang dilatih khusus."
        },
        {
            title: "Fintech Innovation Lab",
            category: "Finance",
            // Gambar: Data keuangan, grafik, atau suasana trading modern
            image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=2070&auto=format&fit=crop",
            mentor: "James Stark",
            stats: "45 Startups",
            desc: "Memantau kepatuhan regulasi startup inkubasi melalui Audit Trail yang terintegrasi."
        },
        {
            title: "Fullstack Academy",
            category: "Coding",
            // Gambar: Baris kode di layar monitor dalam suasana gelap (programmer vibe)
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
            mentor: "Denny Scott",
            stats: "3k Graduates",
            desc: "AI Mentor menangani 80% pertanyaan teknis siswa, mengurangi beban mentor hingga 60%."
        }
    ];

    return (
        <Box bg="white" pb={rem(100)}>
            {/* 1. HERO SHOWCASE */}
            <Box
                pt={rem(100)}
                pb={rem(80)}
                bg="var(--mantine-color-indigo-9)"
                c="white"
                style={{
                    backgroundImage: 'radial-gradient(circle at top right, rgba(255,255,255,0.1), transparent)',
                }}
            >
                <Container size="lg">
                    <Stack align="center" gap="md" ta="center">
                        <Badge variant="outline" color="indigo.2" size="lg" radius="sm">Our Impact</Badge>
                        <Title style={{ fontSize: rem(56), fontWeight: 900, letterSpacing: '-2px', lineHeight: 1 }}>
                            Inspirasi dari <span style={{ color: 'var(--mantine-color-indigo-2)' }}>Mentor Terbaik.</span>
                        </Title>
                        <Text size="xl" style={{ maxWidth: rem(700), opacity: 0.8 }}>
                            Lihat bagaimana institusi pendidikan dan akselerator global mengubah cara mereka membimbing dengan bantuan SinauSpace.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* 2. CASE STUDIES GRID */}
            <Container size="lg" py={rem(80)}>
                <Tabs defaultValue="all" color="indigo" mb={50}>
                    <Center>
                        <Tabs.List>
                            <Tabs.Tab value="all" leftSection={<Layout size={14} />}>All Projects</Tabs.Tab>
                            <Tabs.Tab value="business">Business</Tabs.Tab>
                            <Tabs.Tab value="design">Design</Tabs.Tab>
                            <Tabs.Tab value="coding">Coding</Tabs.Tab>
                        </Tabs.List>
                    </Center>
                </Tabs>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                    {cases.map((item, index) => (
                        <Paper key={index} withBorder radius="lg" shadow="sm" style={{ transition: 'all 0.3s ease' }}>
                            <Grid gap={0}>
                                <Grid.Col span={{ base: 12, md: 5 }}>
                                    <Image src={item.image} h="100%" style={{ minHeight: rem(250) }} />
                                </Grid.Col>
                                <Grid.Col span={{ base: 12, md: 7 }} p="xl">
                                    <Stack justify="space-between" h="100%">
                                        <Box>
                                            <Badge color="indigo.1" c="indigo.7" mb="xs">{item.category}</Badge>
                                            <Title order={3} mb="sm">{item.title}</Title>
                                            <Text size="sm" c="dimmed" mb="md">{item.desc}</Text>
                                            <Group gap="xs">
                                                <ThemeIcon size="sm" variant="light" color="teal"><Zap size={12} /></ThemeIcon>
                                                <Text size="xs" fw={700}>{item.stats}</Text>
                                            </Group>
                                        </Box>
                                        <Group mt="xl" justify="space-between">
                                            <Group gap="xs">
                                                <Avatar size="sm" radius="xl" color="indigo" />
                                                <Text size="xs" fw={700}>{item.mentor}</Text>
                                            </Group>
                                            <ActionIcon variant="subtle" color="gray"><ExternalLink size={16} /></ActionIcon>
                                        </Group>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>

            {/* 3. TESTIMONIAL HIGHLIGHT */}
            <Box bg="gray.0" py={rem(100)}>
                <Container size="lg">
                    <Paper p={rem(60)} radius="xl" shadow="xl" pos="relative" bg="white">
                        <Quote
                            size={80}
                            color="var(--mantine-color-indigo-1)"
                            style={{ position: 'absolute', top: 20, left: 20 }}
                        />
                        <Stack align="center" ta="center" gap="xl" style={{ position: 'relative', zIndex: 1 }}>
                            <Title order={2} style={{ fontSize: rem(28), fontWeight: 500, fontStyle: 'italic' }}>
                                "SinauSpace bukan sekadar alat automasi. Ini adalah perluasan dari otak saya. Saya bisa memberikan perhatian personal kepada 300 siswa sekaligus tanpa merasa kewalahan."
                            </Title>
                            <Stack gap={4}>
                                <Avatar size="xl" radius="xl" mx="auto" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" />
                                <Text fw={900} size="lg">Jessica Valentine</Text>
                                <Text size="sm" c="dimmed">Program Director at FutureLabs</Text>
                                <Group gap={4} justify="center">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="orange" color="orange" />)}
                                </Group>
                            </Stack>
                        </Stack>
                    </Paper>
                </Container>
            </Box>

            {/* 4. CALL TO ACTION */}
            <Container size="lg" py={rem(100)}>
                <Stack align="center" gap="xl">
                    <ThemeIcon size={80} radius="xl" color="indigo" variant="light">
                        <Trophy size={40} />
                    </ThemeIcon>
                    <Title order={2} ta="center">Siap Menjadi Kisah Sukses Berikutnya?</Title>
                    <Text c="dimmed" ta="center" style={{ maxWidth: 600 }}>
                        Bergabunglah dengan komunitas mentor global dan mulai bangun ekosistem bimbingan yang skalabel dan efisien hari ini.
                    </Text>
                    <Group>
                        <Button size="xl" color="indigo" radius="md" component={Link} to="/register">Daftar Sekarang</Button>
                        <Button size="xl" variant="outline" color="indigo" radius="md">Konsultasi Gratis</Button>
                    </Group>
                </Stack>
            </Container>
        </Box>
    );
}

import { Grid, ActionIcon } from '@mantine/core';