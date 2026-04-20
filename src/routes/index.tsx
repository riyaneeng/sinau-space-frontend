import {
  Container,
  Text,
  Button,
  Group,
  Stack,
  Title,
  SimpleGrid,
  ThemeIcon,
  Box,
  rem,
  Paper,
  Badge,
  Grid,
  Divider,
  List,
  Avatar,
  Image,
  ActionIcon,
  TextInput,
  Center,
  Burger,
  Drawer,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from '@tanstack/react-router';
import {
  BrainCircuit,
  ArrowRight,
  Zap,
  Check,
  BarChart3,
  LogIn,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Cpu,
  Mail,
} from 'lucide-react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: App })

function App() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Box bg="white">
      {/* 0. NAVIGATION BAR (Sticky & Blurry) */}
      <Box
        component="nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--mantine-color-gray-2)'
        }}
        h={70}
      >
        <Container size="lg" h="100%">
          <Group justify="space-between" h="100%">
            <Group gap="xs" component={Link} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="lg" radius="md">
                <BrainCircuit size={22} />
              </ThemeIcon>
              <Text fw={900} size="xl" lts={-1}>
                SINAU<span style={{ color: 'var(--mantine-color-indigo-6)' }}>SPACE</span>
              </Text>
            </Group>

            <Group gap="md" visibleFrom="sm">
              <Button variant="subtle" color="gray" component={Link} to="/feature">Features</Button>
              <Button variant="subtle" color="gray" component={Link} to="/pricing">Pricing</Button>
              <Button variant="subtle" color="gray" component={Link} to="/contact">Contact</Button>
              <Button variant="subtle" color="gray" component={Link} to="/showcase">Showcase</Button>
              <Divider orientation="vertical" h={20} />
              <Button variant="subtle" color="indigo" component={Link} to="/auth/login" leftSection={<LogIn size={16} />}>
                Sign In
              </Button>
              <Button color="indigo" radius="md" component={Link} to="/auth/register" >
                Get Started
              </Button>
            </Group>

            <Group hiddenFrom="sm">
              <ActionIcon variant="light" color="indigo" component={Link} to="/auth/login">
                <LogIn size={18} />
              </ActionIcon>
              <Burger opened={opened} onClick={toggle} size="sm" />
            </Group>
          </Group>
        </Container>
      </Box>

      <Drawer
        opened={opened}
        onClose={close}
        size="md"
        title={
          <Group gap="xs">
            <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} size="md" radius="md">
              <BrainCircuit size={18} />
            </ThemeIcon>
            <Text fw={900} lts={-1}>
              SINAU<span style={{ color: 'var(--mantine-color-indigo-6)' }}>SPACE</span>
            </Text>
          </Group>
        }
        hiddenFrom="sm"
        zIndex={1000}
      >
        <Stack gap="sm" mt="md">
          <Button variant="subtle" color="gray" component={Link} to="/feature" onClick={close} justify="flex-start">Features</Button>
          <Button variant="subtle" color="gray" component={Link} to="/pricing" onClick={close} justify="flex-start">Pricing</Button>
          <Button variant="subtle" color="gray" component={Link} to="/contact" onClick={close} justify="flex-start">Contact</Button>
          <Button variant="subtle" color="gray" component={Link} to="/showcase" onClick={close} justify="flex-start">Showcase</Button>
          <Divider my="sm" />
          <Button variant="light" color="indigo" component={Link} to="/auth/login" onClick={close} leftSection={<LogIn size={16} />}>
            Sign In
          </Button>
          <Button color="indigo" radius="md" component={Link} to="/auth/register" onClick={close}>
            Get Started
          </Button>
        </Stack>
      </Drawer>

      {/* 1. HERO SECTION */}
      <Box
        style={{
          position: 'relative',
          paddingTop: rem(80),
          paddingBottom: rem(100),
          background: 'radial-gradient(circle at top right, var(--mantine-color-indigo-0), transparent), radial-gradient(circle at bottom left, var(--mantine-color-gray-0), transparent)',
        }}
      >
        <Container size="lg">
          <Grid align="center" gap={50}>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap="xl">
                <Group gap="xs">
                  <Badge variant="filled" color="indigo" size="lg" radius="sm">v4.0 AI-Core</Badge>
                  <Text size="sm" fw={700} c="indigo">Transforming Education</Text>
                </Group>
                <Title style={{ fontSize: rem(68), fontWeight: 900, lineHeight: 1, letterSpacing: '-3px' }}>
                  Empower Your <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Mentorship</span> with AI.
                </Title>
                <Text size="xl" c="dimmed" style={{ maxWidth: rem(540), lineHeight: 1.6 }}>
                  Satu-satunya platform yang dirancang untuk membantu mentor mengelola ribuan siswa tanpa kehilangan sentuhan personal. Automasi feedback, pantau kesehatan proyek, dan skalakan dampak Anda.
                </Text>
                <Group gap="md">
                  <Button size="xl" color="indigo" radius="md" px={40} rightSection={<ArrowRight size={20} />} component={Link} to="/register">
                    Mulai Gratis
                  </Button>
                  <Button size="xl" variant="outline" color="gray" radius="md">Lihat Demo</Button>
                </Group>

                <Group gap="xl" mt="xl">
                  <Box><Text fw={900} size="xl">10k+</Text><Text size="xs" c="dimmed" tt="uppercase">Siswa</Text></Box>
                  <Divider orientation="vertical" />
                  <Box><Text fw={900} size="xl">500+</Text><Text size="xs" c="dimmed" tt="uppercase">Mentor</Text></Box>
                  <Divider orientation="vertical" />
                  <Box><Text fw={900} size="xl">98%</Text><Text size="xs" c="dimmed" tt="uppercase">Puas</Text></Box>
                </Group>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 5 }} visibleFrom="md">
              <Box pos="relative">
                <Paper withBorder p="md" radius="md" shadow="xl" pos="absolute" top={-30} right={-20} style={{ zIndex: 2, width: 240 }} bg="white">
                  <Group gap="xs" mb={8}>
                    <Avatar color="indigo" size="sm" radius="xl"><Cpu size={16} /></Avatar>
                    <Text size="xs" fw={800}>AI System Health</Text>
                  </Group>
                  <Progress value={92} color="teal" size="sm" radius="xl" mb={4} />
                  <Text size="10px" c="dimmed">92% Student Engagement detected</Text>
                </Paper>

                <Paper shadow="2xl" radius="lg" p="xs" bg="slate.9" style={{ border: '8px solid var(--mantine-color-slate-8)' }}>
                  <Box bg="white" h={420} p="md">
                    <Stack gap="md">
                      <Group justify="space-between"><Box h={8} w={80} bg="gray.2" /><Box h={8} w={30} bg="indigo.1" /></Group>
                      <SimpleGrid cols={2}><Paper withBorder p="xs" h={60} /><Paper withBorder p="xs" h={60} /></SimpleGrid>
                      <Paper withBorder p="xs" h={180} bg="gray.0"><Center h="100%"><BarChart3 color="#ccc" size={40} /></Center></Paper>
                    </Stack>
                  </Box>
                </Paper>
              </Box>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* 2. TRUSTED BY SECTION */}
      <Container size="lg" py="xl">
        <Stack align="center" gap="md">
          <Text size="xs" fw={800} c="dimmed" tt="uppercase" lts={2}>Dipercaya oleh institusi ternama</Text>
          <Group justify="center" gap={60} style={{ opacity: 0.5, filter: 'grayscale(1)' }}>
            <Text fw={900} size="xl">UNIVERSITY</Text>
            <Text fw={900} size="xl">BOOTCAMP.IO</Text>
            <Text fw={900} size="xl">STARTUP LAB</Text>
            <Text fw={900} size="xl">EDTECH CORP</Text>
          </Group>
        </Stack>
      </Container>

      {/* 3. HOW IT WORKS (Alternating) */}
      <Container size="lg" py={rem(100)}>
        <Stack gap={100}>
          <Grid gap={80} align="center">
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Image src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" radius="lg" />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Badge color="indigo" mb="md">Step 01</Badge>
              <Title order={2} mb="md" size={rem(36)}>Bangun Persona Mentor AI Anda</Title>
              <Text c="dimmed" size="lg" mb="xl">Unggah kurikulum dan gaya bahasa Anda. AI kami akan belajar menjadi asisten yang merepresentasikan nilai-nilai bimbingan Anda kepada siswa 24/7.</Text>
              <List spacing="sm" icon={<ThemeIcon color="teal" size={20} radius="xl"><Check size={12} /></ThemeIcon>}>
                <List.Item>Instruksi yang dipersonalisasi</List.Item>
                <List.Item>Knowledge base dari dokumen Anda</List.Item>
                <List.Item>Gaya bahasa (Tone) yang fleksibel</List.Item>
              </List>
            </Grid.Col>
          </Grid>

          <Grid gap={80} align="center">
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
              <Badge color="orange" mb="md">Step 02</Badge>
              <Title order={2} mb="md" size={rem(36)}>Monitor dengan Radar Kesehatan</Title>
              <Text c="dimmed" size="lg" mb="xl">Jangan biarkan ada siswa yang tertinggal. Sistem radar kami mendeteksi siswa yang mulai pasif atau memiliki skor kesehatan proyek yang rendah secara otomatis.</Text>
              <Button variant="light" color="orange" rightSection={<ArrowRight size={16} />}>Pelajari Sistem Radar</Button>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
              <Image src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop" radius="lg" />
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>

      {/* 4. PRICING SECTION */}
      <Box bg="gray.0" py={rem(100)}>
        <Container size="lg">
          <Stack align="center" gap="xs" mb={50}>
            <Title order={2} ta="center" size={rem(36)}>Investasi untuk Skalabilitas</Title>
            <Text c="dimmed" ta="center" size="lg">Pilih paket yang sesuai dengan jumlah siswa dan kebutuhan AI Anda.</Text>
          </Stack>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
            <PricingCard plan="Starter" price="$49" features={['20 Siswa', '1 AI Persona', 'Community Support']} />
            <PricingCard plan="Professional" price="$199" features={['100 Siswa', '3 AI Persona', 'Priority Review', 'Analytics Pro']} featured />
            <PricingCard plan="Enterprise" price="Custom" features={['Unlimited Siswa', 'White-labeling', 'SLA Guarantee', 'Dedicated Manager']} />
          </SimpleGrid>
        </Container>
      </Box>

      {/* 5. CALL TO ACTION */}
      <Container size="lg" py={rem(100)}>
        <Paper radius="xl" p={rem(60)} bg="indigo.7" style={{ backgroundImage: 'linear-gradient(45deg, var(--mantine-color-indigo-9) 0%, var(--mantine-color-indigo-6) 100%)', color: 'white', overflow: 'hidden', position: 'relative' }}>
          <Grid align="center" style={{ position: 'relative', zIndex: 1 }}>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Title order={2} size={rem(42)} mb="md">Siap mengubah cara Anda membimbing?</Title>
              <Text size="xl" style={{ opacity: 0.9 }}>Mulai uji coba 14 hari Anda sekarang. Tidak perlu kartu kredit.</Text>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} ta={{ md: 'right' }}>
              <Button size="xl" variant="white" color="indigo" radius="md">Daftar Sekarang</Button>
            </Grid.Col>
          </Grid>
          <Zap size={200} style={{ position: 'absolute', right: -40, bottom: -40, opacity: 0.1, transform: 'rotate(-15deg)' }} />
        </Paper>
      </Container>

      {/* 6. FOOTER */}
      <Box component="footer" pt={80} pb={40} bg="white" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
        <Container size="lg">
          <Grid gap={80}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Group gap="xs" mb="lg">
                <ThemeIcon variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} radius="md"><BrainCircuit size={18} /></ThemeIcon>
                <Text fw={900} size="xl">
                  SINAU<span style={{ color: 'var(--mantine-color-indigo-6)' }}>SPACE</span>
                </Text>
              </Group>
              <Text size="sm" c="dimmed" mb="xl" style={{ lineHeight: 1.6 }}>
                Platform bimbingan berbasis AI yang membantu institusi pendidikan dan mentor profesional menskalakan dampak mereka tanpa batas.
              </Text>
              <Group gap="md">
                <ActionIcon size="lg" variant="subtle" color="gray"><Twitter size={18} /></ActionIcon>
                <ActionIcon size="lg" variant="subtle" color="gray"><Linkedin size={18} /></ActionIcon>
                <ActionIcon size="lg" variant="subtle" color="gray"><Instagram size={18} /></ActionIcon>
                <ActionIcon size="lg" variant="subtle" color="gray"><Youtube size={18} /></ActionIcon>
              </Group>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Text fw={700} mb="lg">Product</Text>
              <Stack gap="sm">
                <Anchor size="sm" c="dimmed">Features</Anchor>
                <Anchor size="sm" c="dimmed">Pricing</Anchor>
                <Anchor size="sm" c="dimmed">AI Persona Lab</Anchor>
                <Anchor size="sm" c="dimmed">Release Notes</Anchor>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Text fw={700} mb="lg">Resources</Text>
              <Stack gap="sm">
                <Anchor size="sm" c="dimmed">Documentation</Anchor>
                <Anchor size="sm" c="dimmed">API Reference</Anchor>
                <Anchor size="sm" c="dimmed">Community</Anchor>
                <Anchor size="sm" c="dimmed">Help Center</Anchor>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Text fw={700} mb="lg">Stay Updated</Text>
              <Text size="sm" c="dimmed" mb="md">Dapatkan tips terbaru tentang automasi bimbingan.</Text>
              <Group gap={0}>
                <TextInput placeholder="Email Anda" style={{ flex: 1 }} styles={{ input: { borderTopRightRadius: 0, borderBottomRightRadius: 0 } }} />
                <Button color="indigo" style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}><Mail size={16} /></Button>
              </Group>
            </Grid.Col>
          </Grid>

          <Divider my={40} />

          <Group justify="space-between">
            <Text size="xs" c="dimmed">© 2026 SinauSpace AI. All rights reserved.</Text>
            <Group gap="xl">
              <Anchor size="xs" c="dimmed">Privacy Policy</Anchor>
              <Anchor size="xs" c="dimmed">Terms of Service</Anchor>
              <Anchor size="xs" c="dimmed">Cookie Policy</Anchor>
            </Group>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}

// Sub-components
function PricingCard({ plan, price, features, featured }: any) {
  return (
    <Paper withBorder p={40} radius="lg" shadow={featured ? 'xl' : 'sm'} style={{ borderColor: featured ? 'var(--mantine-color-indigo-4)' : undefined, transform: featured ? 'scale(1.05)' : 'none', zIndex: featured ? 1 : 0, backgroundColor: 'white' }}>
      {featured && <Badge color="indigo" variant="filled" mb="md" fullWidth>Paling Populer</Badge>}
      <Text fw={800} size="xs" tt="uppercase" lts={1} c="dimmed">{plan}</Text>
      <Group align="flex-end" gap={4} my="md">
        <Title order={2} size={rem(42)}>{price}</Title>
        {price !== 'Custom' && <Text size="sm" c="dimmed" mb={8}>/bulan</Text>}
      </Group>
      <Stack gap="md" my={30}>
        {features.map((f: string) => (
          <Group gap="sm" key={f}>
            <ThemeIcon color="teal" size={20} radius="xl" variant="light"><Check size={12} /></ThemeIcon>
            <Text size="sm" fw={500}>{f}</Text>
          </Group>
        ))}
      </Stack>
      <Button fullWidth size="lg" color={featured ? 'indigo' : 'gray'} variant={featured ? 'filled' : 'outline'} radius="md" component={Link} to="/register">Pilih {plan}</Button>
    </Paper>
  );
}

// Helper Anchor
function Anchor({ children, ...props }: any) {
  return <Text component="a" href="#" style={{ cursor: 'pointer', textDecoration: 'none' }} {...props}>{children}</Text>
}

import { Progress } from '@mantine/core';