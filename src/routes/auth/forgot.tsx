import { createFileRoute } from '@tanstack/react-router'
import {
    Paper,
    TextInput,
    Button,
    Title,
    Text,
    Container,
    Group,
    Stack,
    Box,
    rem,
    Anchor,
    Center,
    ThemeIcon,
    ActionIcon
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Link } from '@tanstack/react-router';
import { BrainCircuit, ArrowLeft, Mail, KeyRound, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/auth/forgot')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [submitted, setSubmitted] = useState(false);

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Logic: Simulasi pengiriman email
    };

    return (
        <Box style={{
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: '#f8fafc'
        }}>
            {/* SISI KIRI: BRANDING (Sama dengan Login) */}
            {!isMobile && (
                <Box
                    style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, var(--mantine-color-indigo-7) 0%, var(--mantine-color-grape-8) 100%)',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: rem(60),
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        style={{
                            position: 'absolute',
                            bottom: '-10%',
                            left: '-10%',
                            width: '50%',
                            height: '50%',
                            borderRadius: '100%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            filter: 'blur(60px)',
                        }}
                    />

                    <Group gap="xs" style={{ zIndex: 1 }} component={Link}>
                        <ThemeIcon variant="white" color="indigo" size="lg" radius="md">
                            <BrainCircuit size={22} />
                        </ThemeIcon>
                        <Text fw={900} size="xl" c="white" lts={-1}>
                            MENTOR<span style={{ opacity: 0.7 }}>STUDIO</span>
                        </Text>
                    </Group>

                    <Stack gap="md" style={{ zIndex: 1 }}>
                        <Title c="white" style={{ fontSize: rem(48), lineHeight: 1.1, fontWeight: 900, letterSpacing: '-2px' }}>
                            Keamanan Akun <br /> Prioritas Kami.
                        </Title>
                        <Text c="white" size="lg" style={{ opacity: 0.8, maxWidth: rem(450) }}>
                            Jangan khawatir, kami akan membantu Anda memulihkan akses ke dashboard bimbingan dalam hitungan menit.
                        </Text>
                    </Stack>

                    <Text size="xs" c="white" style={{ opacity: 0.6, zIndex: 1 }}>
                        © 2026 MentorStudio AI. Secure Access Protocol.
                    </Text>
                </Box>
            )}

            {/* SISI KANAN: FORM RECOVERY */}
            <Box
                style={{
                    flex: isMobile ? 1 : '0 0 550px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: rem(40),
                }}
            >
                <Container size={400} w="100%" p={0}>
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        component={Link}
                        to="/auth/login"
                        mb="xl"
                        size="lg"
                        radius="xl"
                    >
                        <ArrowLeft size={20} />
                    </ActionIcon>

                    {!submitted ? (
                        <Stack gap="md">
                            <Box>
                                <ThemeIcon variant="light" color="indigo" size={50} radius="md" mb="md">
                                    <KeyRound size={28} />
                                </ThemeIcon>
                                <Title order={1} fw={900} lts={-1.5} style={{ fontSize: rem(32) }}>
                                    Lupa Password?
                                </Title>
                                <Text c="dimmed" size="sm" mt="xs">
                                    Masukkan email yang terdaftar. Kami akan mengirimkan instruksi untuk mengatur ulang password Anda.
                                </Text>
                            </Box>

                            <form onSubmit={handleReset} style={{ marginTop: rem(20) }}>
                                <Stack gap="lg">
                                    <TextInput
                                        label="Email Address"
                                        placeholder="mentor@studio.com"
                                        required
                                        size="md"
                                        radius="md"
                                        leftSection={<Mail size={16} />}
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        size="lg"
                                        radius="md"
                                        color="indigo"
                                    >
                                        Kirim Instruksi Pemulihan
                                    </Button>
                                </Stack>
                            </form>

                            <Center mt="md">
                                <Text size="sm" c="dimmed">
                                    Ingat password Anda?{' '}
                                    <Anchor component={Link} to="/auth/login" fw={700} c="indigo.6">
                                        Kembali ke Login
                                    </Anchor>
                                </Text>
                            </Center>
                        </Stack>
                    ) : (
                        /* SUCCESS STATE */
                        <Stack align="center" gap="lg" ta="center">
                            <ThemeIcon variant="filled" color="teal" size={80} radius="xl">
                                <CheckCircle2 size={45} />
                            </ThemeIcon>
                            <Box>
                                <Title order={2} fw={900}>Cek Email Anda</Title>
                                <Text c="dimmed" mt="sm">
                                    Kami telah mengirimkan instruksi pemulihan ke <br />
                                    <Text span fw={700} c="black">mentor@studio.com</Text>
                                </Text>
                            </Box>
                            <Button
                                variant="light"
                                color="indigo"
                                fullWidth
                                size="md"
                                onClick={() => setSubmitted(false)}
                            >
                                Gunakan Email Lain
                            </Button>
                            <Text size="xs" c="dimmed">
                                Tidak menerima email? Cek folder spam atau <Anchor fw={700}>Kirim Ulang</Anchor>
                            </Text>
                        </Stack>
                    )}

                    {/* SUPPORT CARD */}
                    <Paper withBorder p="md" radius="md" mt={rem(60)} bg="white" style={{ borderStyle: 'dashed' }}>
                        <Group gap="sm" wrap="nowrap">
                            <Box>
                                <Text size="xs" fw={700}>Butuh Bantuan Cepat?</Text>
                                <Text size="xs" c="dimmed">Hubungi IT Support jika Anda mengalami kendala akses.</Text>
                            </Box>
                            <Button variant="subtle" size="compact-xs" ml="auto" color="gray">Hubungi</Button>
                        </Group>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}
