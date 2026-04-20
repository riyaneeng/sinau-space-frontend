import { createFileRoute } from '@tanstack/react-router'
import {
    Paper,
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
import { Github, Chrome, ArrowLeft, Sparkles, BrainCircuit } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/auth/login')({
    component: RouteComponent,
})

const DUMMY_USERS = [
    {
        id: '1',
        name: 'Admin Global',
        email: 'admin@sinauspace.ai',
        password: 'password123',
        role: 'admin',
        redirectTo: '/dashboard'
    },
    {
        id: '2',
        name: 'Mentor Senior',
        email: 'mentor@sinauspace.ai',
        password: 'password123',
        role: 'mentor',
        redirectTo: '/global-overview'
    },
    {
        id: '3',
        name: 'Siswa Aktif',
        email: 'student@sinauspace.ai',
        password: 'password123',
        role: 'student',
        redirectTo: '/overview'
    }
];

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulasi delay API
        setTimeout(() => {
            const user = DUMMY_USERS.find(
                (u) => u.email === email && u.password === password
            );

            if (user) {
                console.log(`Logged in as ${user.role}`);

                // REDIRECT BERDASARKAN ROLE
                // Gunakan properti redirectTo dari dummy user
                navigate({ to: user.redirectTo });
            } else {
                alert('Email atau Password salah!');
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <Box style={{
            minHeight: '100vh',
            display: 'flex',
            backgroundColor: 'white'
        }}>
            {/* SISI KIRI: VISUAL BRANDING (Sesuai Landing Page) */}
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
                    {/* Efek Cahaya Dekoratif (Sama dengan Landing Page) */}
                    <Box
                        style={{
                            position: 'absolute',
                            top: '-10%',
                            right: '-10%',
                            width: '60%',
                            height: '60%',
                            borderRadius: '100%',
                            background: 'rgba(255, 255, 255, 0.1)',
                            filter: 'blur(80px)',
                        }}
                    />

                    <Group gap="xs" style={{ zIndex: 1 }}>
                        <ThemeIcon variant="white" color="indigo" size="lg" radius="md">
                            <BrainCircuit size={22} />
                        </ThemeIcon>
                        <Text fw={900} size="xl" c="white" lts={-1}>
                            SINAU<span style={{ opacity: 0.7 }}>SPACE</span>
                        </Text>
                    </Group>

                    <Stack gap="md" style={{ zIndex: 1 }}>
                        <Badge variant="white" color="indigo.7" size="lg" radius="sm" w="fit-content">
                            Welcome Back
                        </Badge>
                        <Title c="white" style={{ fontSize: rem(48), lineHeight: 1.1, fontWeight: 900, letterSpacing: '-2px' }}>
                            Masuk ke Studio <br /> Bimbingan Anda.
                        </Title>
                        <Text c="white" size="lg" style={{ opacity: 0.8, maxWidth: rem(450) }}>
                            Lanjutkan perjalanan bimbingan Anda dan biarkan AI kami membantu menangani detail operasionalnya.
                        </Text>
                    </Stack>

                    <Group justify="space-between" style={{ zIndex: 1 }}>
                        <Text size="xs" c="white" style={{ opacity: 0.6 }}>
                            © 2026 MentorStudio AI.
                        </Text>
                        <Group gap="xs">
                            <Sparkles size={14} color="white" />
                            <Text size="xs" c="white" fw={700}>AI-Powered v4.0</Text>
                        </Group>
                    </Group>
                </Box>
            )}

            {/* SISI KANAN: FORM LOGIN (Minimalis & Clean) */}
            <Box
                style={{
                    flex: isMobile ? 1 : '0 0 550px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: rem(40),
                    backgroundColor: '#f8fafc' // Slate 50
                }}
            >
                <Container size={400} w="100%" p={0}>
                    <Button
                        variant="subtle"
                        color="gray"
                        leftSection={<ArrowLeft size={16} />}
                        component={Link}
                        to="/"
                        mb="xl"
                        size="xs"
                    >
                        Back to Home
                    </Button>

                    <Stack gap={4} mb={30}>
                        <Title order={1} fw={900} lts={-1.5} style={{ fontSize: rem(32) }}>
                            Sign In
                        </Title>
                        <Text c="dimmed" size="sm">
                            Kelola proyek dan bimbing siswa Anda dengan efisiensi AI.
                        </Text>
                    </Stack>

                    {/* SOCIAL LOGIN */}
                    <SimpleGrid cols={2} mb="xl">
                        <Button variant="white" color="gray" leftSection={<Chrome size={16} />} radius="md" fw={600}>
                            Google
                        </Button>
                        <Button variant="white" color="gray" leftSection={<Github size={16} />} radius="md" fw={600}>
                            GitHub
                        </Button>
                    </SimpleGrid>

                    <Divider label="Atau masuk dengan email" labelPosition="center" my="lg" />

                    <form onSubmit={handleLogin}>
                        <Stack gap="md">
                            <TextInput
                                label="Email Address"
                                placeholder="mentor@studio.com"
                                required
                                size="md"
                                radius="md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Box>
                                <Group justify="space-between" mb={5}>
                                    <Text component="label" size="sm" fw={600}>
                                        Password
                                    </Text>
                                    <Anchor component={Link} to="/auth/forgot" size="xs" c="indigo.6" fw={700}>
                                        Forgot?
                                    </Anchor>
                                </Group>
                                <PasswordInput
                                    placeholder="Your password"
                                    required
                                    size="md"
                                    radius="md"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Box>

                            <Checkbox
                                label="Biarkan saya tetap masuk"
                                color="indigo"
                                size="sm"
                                mt="xs"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                size="lg"
                                radius="md"
                                color="indigo"
                                mt="md"
                                loading={loading}
                                style={{
                                    boxShadow: '0 10px 15px -3px rgba(76, 110, 245, 0.3)'
                                }}
                            >
                                Masuk ke Dashboard
                            </Button>
                        </Stack>
                    </form>

                    <Paper withBorder p="md" radius="md" mt={rem(40)} bg="white" style={{ borderStyle: 'dashed' }}>
                        <Group gap="sm" wrap="nowrap">
                            <ThemeIcon variant="light" color="orange" size="md">
                                <Sparkles size={16} />
                            </ThemeIcon>
                            <Box>
                                <Text size="xs" fw={700}>Belum memiliki akses?</Text>
                                <Text size="xs" c="dimmed">Ajukan sebagai Mentor atau daftar Institusi Anda.</Text>
                            </Box>
                            <Button variant="subtle" size="compact-xs" ml="auto" color="indigo" component={Link} to="/auth/register">Daftar</Button>
                        </Group>
                    </Paper>
                </Container>
            </Box>
        </Box>
    );
}
