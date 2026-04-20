import { createFileRoute } from '@tanstack/react-router'
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Container,
    Group,
    Stack,
    Box,
    rem,
    Anchor,
    Divider,
    SimpleGrid,
    ThemeIcon,
    Badge
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate, Link } from '@tanstack/react-router';
import { BrainCircuit, Chrome, Github, ArrowLeft, Rocket, Check } from 'lucide-react';

export const Route = createFileRoute('/auth/register')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const navigate = useNavigate();

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulasi pendaftaran berhasil dan diarahkan ke onboarding atau login
        navigate({ to: '/auth/login' });
    };

    return (
        <Box style={{
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: 'white'
        }}>
            {/* SISI KIRI: BRANDING & BENEFITS */}
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
                    {/* Decorative Blur */}
                    <Box
                        style={{
                            position: 'absolute',
                            top: '10%',
                            left: '-10%',
                            width: '70%',
                            height: '70%',
                            borderRadius: '100%',
                            background: 'rgba(255, 255, 255, 0.08)',
                            filter: 'blur(100px)',
                        }}
                    />

                    <Group gap="xs" style={{ zIndex: 1 }} component={Link} >
                        <ThemeIcon variant="white" color="indigo" size="lg" radius="md">
                            <BrainCircuit size={22} />
                        </ThemeIcon>
                        <Text fw={900} size="xl" c="white" lts={-1}>
                            MENTOR<span style={{ opacity: 0.7 }}>STUDIO</span>
                        </Text>
                    </Group>

                    <Stack gap="xl" style={{ zIndex: 1 }}>
                        <Box>
                            <Badge variant="white" color="indigo.7" size="lg" radius="sm" mb="md">
                                Join the Future
                            </Badge>
                            <Title c="white" style={{ fontSize: rem(48), lineHeight: 1.1, fontWeight: 900, letterSpacing: '-2px' }}>
                                Mulai Perjalanan <br /> Mentor Anda.
                            </Title>
                        </Box>

                        <Stack gap="lg">
                            <BenefitItem text="Akses ke AI Mentor Persona Lab" />
                            <BenefitItem text="Dashboard Monitoring Siswa Real-time" />
                            <BenefitItem text="Sistem Validasi Tugas Otomatis" />
                            <BenefitItem text="Analitik Performa & Kesehatan Proyek" />
                        </Stack>
                    </Stack>

                    <Group gap="xs" style={{ zIndex: 1 }}>
                        <AvatarGroup />
                        <Text size="xs" c="white" style={{ opacity: 0.8 }}>
                            Bergabung dengan 500+ mentor profesional lainnya.
                        </Text>
                    </Group>
                </Box>
            )}

            {/* SISI KANAN: FORM REGISTER */}
            <Box
                style={{
                    flex: isMobile ? 1 : '0 0 600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: rem(40),
                    backgroundColor: '#f8fafc'
                }}
            >
                <Container size={440} w="100%" p={0}>
                    <Button
                        variant="subtle"
                        color="gray"
                        leftSection={<ArrowLeft size={16} />}
                        component={Link}
                        to="/auth/login"
                        mb="xl"
                        size="xs"
                    >
                        Sudah punya akun? Login
                    </Button>

                    <Stack gap={4} mb={30}>
                        <Title order={1} fw={900} lts={-1.5} style={{ fontSize: rem(32) }}>
                            Create Account
                        </Title>
                        <Text c="dimmed" size="sm">
                            Daftar sekarang dan skalakan dampak bimbingan Anda.
                        </Text>
                    </Stack>

                    <form onSubmit={handleRegister}>
                        <Stack gap="md">
                            <SimpleGrid cols={2}>
                                <TextInput
                                    label="Nama Depan"
                                    placeholder="John"
                                    required
                                    radius="md"
                                />
                                <TextInput
                                    label="Nama Belakang"
                                    placeholder="Doe"
                                    required
                                    radius="md"
                                />
                            </SimpleGrid>

                            <TextInput
                                label="Email Institusi"
                                placeholder="name@university.com"
                                required
                                radius="md"
                            />

                            <PasswordInput
                                label="Password"
                                placeholder="Minimal 8 karakter"
                                required
                                radius="md"
                            />

                            <Checkbox
                                label={
                                    <Text size="sm">
                                        Saya setuju dengan{' '}
                                        <Anchor size="sm" c="indigo" fw={700}>Syarat & Ketentuan</Anchor>
                                    </Text>
                                }
                                color="indigo"
                                mt="xs"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                radius="md"
                                color="indigo"
                                mt="md"
                                leftSection={<Rocket size={18} />}
                                style={{
                                    boxShadow: '0 10px 15px -3px rgba(76, 110, 245, 0.3)'
                                }}
                            >
                                Buat Akun Mentor
                            </Button>
                        </Stack>
                    </form>

                    <Divider label="Atau daftar cepat dengan" labelPosition="center" my="xl" />

                    <SimpleGrid cols={2}>
                        <Button variant="white" color="gray" leftSection={<Chrome size={16} />} radius="md">
                            Google
                        </Button>
                        <Button variant="white" color="gray" leftSection={<Github size={16} />} radius="md">
                            GitHub
                        </Button>
                    </SimpleGrid>
                </Container>
            </Box>
        </Box>
    );
}

function BenefitItem({ text }: { text: string }) {
    return (
        <Group gap="sm">
            <ThemeIcon color="white" variant="white" size={20} radius="xl">
                <Check size={12} color="var(--mantine-color-indigo-7)" />
            </ThemeIcon>
            <Text c="white" size="sm" fw={500}>{text}</Text>
        </Group>
    );
}

function AvatarGroup() {
    return (
        <Group gap={-10}>
            {[1, 2, 3].map((i) => (
                <Box
                    key={i}
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        border: '2px solid var(--mantine-color-indigo-7)',
                        backgroundColor: 'var(--mantine-color-indigo-2)',
                        overflow: 'hidden'
                    }}
                />
            ))}
        </Group>
    );
}