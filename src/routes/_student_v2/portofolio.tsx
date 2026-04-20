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
    ThemeIcon,
    Avatar,
    Tabs,
    Button,
    Progress,
    ActionIcon,
    Tooltip,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
    Award,
    FileCheck,
    Trophy,
    Download,
    ExternalLink,
    Medal,
    Star,
    CheckCircle2
} from 'lucide-react';

export const Route = createFileRoute('/_student_v2/portofolio')({
    component: RouteComponent,
})

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    return (
        <Box p={isMobile ? "md" : "xl"} style={{ minHeight: '100%' }}>
            {/* 1. HEADER PROFILE SUMMARY */}
            <Box bg="white" pt={rem(60)} pb={rem(40)} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Container size="lg">
                    <Group justify="space-between" align="flex-end">
                        <Group gap="xl">
                            <Avatar size={100} radius="md" color="indigo" src={null}>DS</Avatar>
                            <Stack gap={4}>
                                <Title order={1} lts={-1}>Dafara Syah</Title>
                                <Text c="dimmed" fw={500}>UI/UX Design Student & AI Enthusiast</Text>
                                <Group gap="xs" mt="xs">
                                    <Badge variant="dot" color="indigo">12 Courses Completed</Badge>
                                    <Badge variant="dot" color="grape">5 Professional Badges</Badge>
                                </Group>
                            </Stack>
                        </Group>
                        <Button leftSection={<Download size={16} />} variant="outline" color="indigo">
                            Export Portfolio PDF
                        </Button>
                    </Group>
                </Container>
            </Box>

            <Container size="lg" mt="xl">
                <Tabs defaultValue="certificates" color="indigo" variant="pills" radius="xl">
                    <Tabs.List mb="xl">
                        <Tabs.Tab value="certificates" leftSection={<FileCheck size={16} />}>Certificates</Tabs.Tab>
                        <Tabs.Tab value="badges" leftSection={<Medal size={16} />}>Badges & Achievements</Tabs.Tab>
                        <Tabs.Tab value="projects" leftSection={<Trophy size={16} />}>Completed Projects</Tabs.Tab>
                    </Tabs.List>

                    {/* 2. TAB CONTENT: CERTIFICATES */}
                    <Tabs.Panel value="certificates">
                        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                            <CertificateCard
                                title="Advanced UI Design System"
                                issuer="MentorStudio Academy"
                                date="Oct 2023"
                                id="CERT-88291-UI"
                            />
                            <CertificateCard
                                title="AI Prompt Engineering for Business"
                                issuer="Future Tech Lab"
                                date="Sept 2023"
                                id="CERT-11022-AI"
                            />
                        </SimpleGrid>
                    </Tabs.Panel>

                    {/* 3. TAB CONTENT: BADGES */}
                    <Tabs.Panel value="badges">
                        <SimpleGrid cols={{ base: 2, sm: 4, md: 6 }} spacing="md">
                            <BadgeItem icon={Star} label="Fast Learner" color="yellow" tip="Selesai 5 tugas dalam 1 hari" />
                            <BadgeItem icon={CheckCircle2} label="Verified Skill" color="blue" tip="Lulus ujian kompetensi utama" />
                            <BadgeItem icon={Medal} label="Top Contributor" color="indigo" tip="Aktif membantu di forum diskusi" />
                            <BadgeItem icon={Award} label="Project Leader" color="grape" tip="Memimpin tim di project inkubasi" />
                        </SimpleGrid>
                    </Tabs.Panel>

                    {/* 4. TAB CONTENT: PROJECTS */}
                    <Tabs.Panel value="projects">
                        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
                            <ProjectShowcaseCard
                                title="Fintech Mobile App"
                                image="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
                                score={95}
                            />
                            <ProjectShowcaseCard
                                title="AI Health Monitoring"
                                // Gambar medis/teknologi kesehatan (untuk melengkapi grid 3 kolom)
                                image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
                                score={92}
                            />
                        </SimpleGrid>
                    </Tabs.Panel>
                </Tabs>
            </Container>
        </Box>
    );
}

// Sub-komponen Sertifikat
function CertificateCard({ title, issuer, date, id }: any) {
    return (
        <Paper withBorder p="lg" radius="md" style={{ transition: 'all 0.2s ease' }}>
            <Group justify="space-between" align="flex-start">
                <ThemeIcon size={50} variant="light" color="indigo" radius="md">
                    <Award size={28} />
                </ThemeIcon>
                <ActionIcon variant="subtle" color="gray"><Download size={18} /></ActionIcon>
            </Group>
            <Stack gap={4} mt="md">
                <Text fw={700} size="lg">{title}</Text>
                <Text size="sm" c="dimmed">{issuer} • {date}</Text>
                <Text size="xs" c="indigo" fw={500} mt="xs">Verify ID: {id}</Text>
            </Stack>
        </Paper>
    );
}

// Sub-komponen Badge
function BadgeItem({ icon: Icon, label, color, tip }: any) {
    return (
        <Tooltip label={tip} withArrow>
            <Paper withBorder p="md" radius="lg" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <Stack align="center" gap="xs">
                    <ThemeIcon size={60} radius="xl" variant="light" color={color}>
                        <Icon size={30} />
                    </ThemeIcon>
                    <Text size="xs" fw={700}>{label}</Text>
                </Stack>
            </Paper>
        </Tooltip>
    );
}

// Sub-komponen Project
function ProjectShowcaseCard({ title, image, score }: any) {
    return (
        <Paper withBorder radius="md">
            <Box style={{ height: 140, overflow: 'hidden' }}>
                <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </Box>
            <Box p="md">
                <Text fw={700} mb="xs">{title}</Text>
                <Group justify="space-between" mb={4}>
                    <Text size="xs" c="dimmed">Grade Score</Text>
                    <Text size="xs" fw={700} color="indigo">{score}%</Text>
                </Group>
                <Progress value={score} size="xs" color="indigo" radius="xl" />
                <Button fullWidth mt="md" size="xs" variant="light" rightSection={<ExternalLink size={14} />}>
                    View Case Study
                </Button>
            </Box>
        </Paper>
    )
}