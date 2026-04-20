import { createFileRoute } from '@tanstack/react-router'
import {
    Container,
    Text,
    Title,
    Stack,
    Group,
    TextInput,
    Textarea,
    Button,
    SimpleGrid,
    Box,
    rem,
    Paper,
    ThemeIcon,
    ActionIcon,
    Divider,
} from '@mantine/core';
import {
    Mail,
    Phone,
    MapPin,
    MessageSquare,
    Clock,
    Twitter,
    Linkedin,
    Instagram,
    Send
} from 'lucide-react';

export const Route = createFileRoute('/contact')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <Box bg="white" pb={rem(100)}>
            {/* 1. HEADER SECTION */}
            <Box
                pt={rem(100)}
                pb={rem(60)}
                bg="indigo.0"
                style={{ borderBottom: '1px solid var(--mantine-color-indigo-1)' }}
            >
                <Container size="lg">
                    <Stack align="center" gap="md" ta="center">
                        <Title style={{ fontSize: rem(48), fontWeight: 900, letterSpacing: '-1.5px' }}>
                            Ada Pertanyaan? <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Kami di Sini.</span>
                        </Title>
                        <Text size="xl" c="dimmed" style={{ maxWidth: rem(600) }}>
                            Tim kami siap membantu Anda mengintegrasikan AI ke dalam alur bimbingan Anda.
                        </Text>
                    </Stack>
                </Container>
            </Box>

            {/* 2. CONTACT CONTENT */}
            <Container size="lg" py={rem(80)}>
                <Grid gap={80}>
                    {/* LEFT SIDE: INFO */}
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <Stack gap="xl">
                            <Box>
                                <Title order={3} mb="md">Informasi Kontak</Title>
                                <Text c="dimmed" mb="xl">
                                    Pilih saluran yang paling nyaman bagi Anda. Kami biasanya membalas dalam waktu kurang dari 24 jam kerja.
                                </Text>
                            </Box>

                            <ContactItem
                                icon={Mail}
                                title="Email Support"
                                detail="support@sinauspace.ai"
                            />
                            <ContactItem
                                icon={Phone}
                                title="Phone / WhatsApp"
                                detail="+62 812 3456 7890"
                            />
                            <ContactItem
                                icon={MapPin}
                                title="Headquarters"
                                detail="SCBD District 8, South Jakarta, Indonesia"
                            />
                            <ContactItem
                                icon={Clock}
                                title="Working Hours"
                                detail="Senin - Jumat, 09:00 - 18:00 WIB"
                            />

                            <Divider my="sm" />

                            <Box>
                                <Text fw={700} mb="md">Ikuti Kami</Text>
                                <Group gap="md">
                                    <ActionIcon size="xl" variant="light" color="indigo" radius="md"><Twitter size={20} /></ActionIcon>
                                    <ActionIcon size="xl" variant="light" color="indigo" radius="md"><Linkedin size={20} /></ActionIcon>
                                    <ActionIcon size="xl" variant="light" color="indigo" radius="md"><Instagram size={20} /></ActionIcon>
                                </Group>
                            </Box>
                        </Stack>
                    </Grid.Col>

                    {/* RIGHT SIDE: FORM */}
                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <Paper withBorder p={rem(40)} radius="lg" shadow="xl">
                            <Title order={3} mb="xs">Kirim Pesan</Title>
                            <Text size="sm" c="dimmed" mb="xl">Isi formulir di bawah ini dan tim spesialis kami akan segera menghubungi Anda.</Text>

                            <form>
                                <Stack gap="md">
                                    <SimpleGrid cols={{ base: 1, sm: 2 }}>
                                        <TextInput
                                            label="Nama Lengkap"
                                            placeholder="John Doe"
                                            required
                                            size="md"
                                            radius="md"
                                        />
                                        <TextInput
                                            label="Email"
                                            placeholder="john@company.com"
                                            required
                                            size="md"
                                            radius="md"
                                        />
                                    </SimpleGrid>

                                    <TextInput
                                        label="Subjek"
                                        placeholder="Contoh: Demo Enterprise / Kerjasama Institusi"
                                        required
                                        size="md"
                                        radius="md"
                                    />

                                    <Textarea
                                        label="Pesan Anda"
                                        placeholder="Ceritakan kebutuhan atau pertanyaan Anda..."
                                        minRows={5}
                                        required
                                        size="md"
                                        radius="md"
                                    />

                                    <Button
                                        size="lg"
                                        color="indigo"
                                        radius="md"
                                        mt="md"
                                        leftSection={<Send size={18} />}
                                    >
                                        Kirim Pesan Sekarang
                                    </Button>
                                </Stack>
                            </form>
                        </Paper>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* 3. MINI FAQ / HELP CENTER LINK */}
            <Center>
                <Paper withBorder p="lg" radius="xl" bg="gray.0">
                    <Group gap="xs">
                        <MessageSquare size={18} color="var(--mantine-color-indigo-6)" />
                        <Text size="sm">Butuh jawaban cepat? Kunjungi <Anchor fw={700} c="indigo">Pusat Bantuan</Anchor> kami.</Text>
                    </Group>
                </Paper>
            </Center>
        </Box>
    );
}

function ContactItem({ icon: Icon, title, detail }: { icon: any; title: string; detail: string }) {
    return (
        <Group align="flex-start" gap="md">
            <ThemeIcon variant="light" color="indigo" size={40} radius="md">
                <Icon size={20} />
            </ThemeIcon>
            <Box>
                <Text size="xs" fw={700} c="indigo" tt="uppercase" lts={1}>{title}</Text>
                <Text size="md" fw={500}>{detail}</Text>
            </Box>
        </Group>
    );
}

import { Grid, Anchor, Center } from '@mantine/core';