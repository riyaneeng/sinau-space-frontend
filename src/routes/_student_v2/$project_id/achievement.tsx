import { createFileRoute } from '@tanstack/react-router';
import {
    Container, Grid, Text, Title, Stack, Group, Box, rem, Paper, Badge,
    ThemeIcon, Progress, Button, Card, Image, Center, Divider
} from '@mantine/core';
import {
    Award, Zap, CheckCircle2, Download, Share2,
    Trophy, Star
} from 'lucide-react';
import { jsPDF } from 'jspdf';

export const Route = createFileRoute('/_student_v2/$project_id/achievement')({
    component: AchievementPage,
})

function AchievementPage() {
    return (
        <Box bg="gray.0" pb={rem(80)}>
            {/* 1. HEADER SUMMARY */}
            <Box bg="white" pt={rem(60)} pb={rem(40)} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Container size="lg">
                    <Grid align="center">
                        <Grid.Col span={{ base: 12, md: 8 }}>
                            <Stack gap="xs">
                                <Badge variant="light" color="indigo" size="lg">Class Achievements</Badge>
                                <Title order={1} fw={900} lts={-1.5} style={{ fontSize: rem(38) }}>
                                    Your Learning <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Milestones.</span>
                                </Title>
                                <Text c="dimmed" size="lg" style={{ maxWidth: 500 }}>
                                    Pantau setiap progres besar yang telah kamu lalui dan klaim sertifikat setelah menyelesaikan misi.
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, md: 4 }}>
                            <Paper withBorder p="xl" radius="lg" bg="indigo.0">
                                <Group justify="space-between" mb="xs">
                                    <Text fw={800} size="xs" c="indigo.9" tt="uppercase">Overall Progress</Text>
                                    <Text fw={800} size="sm" c="indigo.9">85%</Text>
                                </Group>
                                <Progress value={85} color="indigo" size="sm" radius="xl" animated />
                                <Text size="10px" c="indigo.7" mt="sm">Selesaikan 1 misi lagi untuk klaim sertifikat!</Text>
                            </Paper>
                        </Grid.Col>
                    </Grid>
                </Container>
            </Box>

            <Container size="lg" mt="xl">
                <Grid gap="xl">
                    {/* 2. PROGRESS MILESTONES (LEFT) */}
                    <Grid.Col span={{ base: 12, md: 7 }}>
                        <Title order={4} mb="lg" ml="xs">Quest Journey</Title>
                        <Stack gap="md">
                            <MilestoneItem
                                title="The Foundations"
                                desc="Menyelesaikan Chapter 1: UI/UX Intro"
                                date="Earned on 12 April 2026"
                                status="completed"
                            />
                            <MilestoneItem
                                title="Figma Wizard"
                                desc="Lulus kuis Chapter 2 dengan nilai 100"
                                date="Earned on 15 April 2026"
                                status="completed"
                            />
                            <MilestoneItem
                                title="System Architect"
                                desc="Menyelesaikan Mission Lab: UI Component System"
                                status="ongoing"
                                progress={75}
                            />
                            <MilestoneItem
                                title="The Specialist"
                                desc="Menyelesaikan Final Project & Case Study"
                                status="locked"
                            />
                        </Stack>
                    </Grid.Col>

                    {/* 3. CERTIFICATES (RIGHT) */}
                    <Grid.Col span={{ base: 12, md: 5 }}>
                        <Title order={4} mb="lg" ml="xs">Certificates</Title>
                        <Stack gap="lg">
                            {/* Certificate Card */}
                            <Card withBorder radius="lg" p={0} shadow="sm">
                                <Box pos="relative" h={200}>
                                    <Image
                                        src="https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2000&auto=format&fit=crop"
                                        h="100%"
                                        fit="cover"
                                        alt="Certificate Preview"
                                    />
                                    <Box pos="absolute" inset={0} style={{ backgroundColor: 'rgba(23, 42, 58, 0.7)' }} />
                                    <Center pos="absolute" inset={0}>
                                        <Stack align="center" gap={5}>
                                            <ThemeIcon size={50} radius="xl" color="white" variant="white">
                                                <Award size={28} color="var(--mantine-color-indigo-6)" />
                                            </ThemeIcon>
                                            <Text c="white" fw={800}>Verified Certificate</Text>
                                        </Stack>
                                    </Center>
                                </Box>
                                <Stack p="xl" gap="xs">
                                    <Title order={4}>UI/UX Design Specialist</Title>
                                    <Text size="xs" c="dimmed">Issued by MentorStudio Academy • MS-9920X</Text>
                                    <Divider my="md" variant="dashed" />
                                    <Group grow>
                                        <Button
                                            variant="light"
                                            color="indigo"
                                            radius="md"
                                            leftSection={<Download size={14} />}
                                            onClick={handleDownloadProfessionalCertificate}
                                        >
                                            Download
                                        </Button>
                                        <Button variant="subtle" color="gray" radius="md" leftSection={<Share2 size={14} />}>Share</Button>
                                    </Group>
                                </Stack>
                            </Card>

                            {/* Locked Certificate Info */}
                            <Paper withBorder p="xl" radius="lg" bg="gray.0" style={{ borderStyle: 'dashed' }}>
                                <Group wrap="nowrap">
                                    <ThemeIcon size="lg" radius="md" color="gray" variant="light">
                                        <Star size={18} />
                                    </ThemeIcon>
                                    <Box>
                                        <Text size="sm" fw={700}>Professional Degree</Text>
                                        <Text size="xs" c="dimmed">Selesaikan seluruh kurikulum untuk membuka sertifikat ini.</Text>
                                    </Box>
                                </Group>
                            </Paper>
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Container>
        </Box>
    );
}

// --- SUB-COMPONENTS ---

function MilestoneItem({ title, desc, date, status, progress }: any) {
    const isCompleted = status === 'completed';
    const isLocked = status === 'locked';

    return (
        <Paper
            withBorder
            p="lg"
            radius="lg"
            bg={isCompleted ? 'white' : isLocked ? 'gray.0' : 'white'}
            style={{ opacity: isLocked ? 0.6 : 1, borderLeft: isCompleted ? '4px solid var(--mantine-color-teal-6)' : '1px solid var(--mantine-color-gray-3)' }}
        >
            <Group justify="space-between" wrap="nowrap">
                <Group gap="md" wrap="nowrap">
                    <ThemeIcon
                        size="xl"
                        radius="md"
                        variant="light"
                        color={isCompleted ? 'teal' : isLocked ? 'gray' : 'indigo'}
                    >
                        {isCompleted ? <CheckCircle2 size={20} /> : <Zap size={20} />}
                    </ThemeIcon>
                    <Box>
                        <Text fw={800} size="sm" c={isLocked ? 'dimmed' : 'dark'}>{title}</Text>
                        <Text size="xs" c="dimmed">{desc}</Text>
                        {isCompleted && <Text size="10px" c="teal.7" fw={700} mt={4}>{date}</Text>}
                    </Box>
                </Group>

                {!isCompleted && !isLocked && (
                    <Box w={120}>
                        <Group justify="space-between" mb={4}>
                            <Text size="10px" fw={800} c="indigo">{progress}%</Text>
                        </Group>
                        <Progress value={progress} size="xs" color="indigo" radius="xl" animated />
                    </Box>
                )}

                {isLocked && <Trophy size={18} color="var(--mantine-color-gray-4)" />}
            </Group>
        </Paper>
    );
}

const handleDownloadProfessionalCertificate = () => {
    const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // --- KONFIGURASI WARNA (Sama dengan Radar-Health) ---
    const colors = {
        primary: [67, 94, 190],   // Deep Indigo
        textMain: [33, 37, 41],   // Dark Slate
        textDimmed: [108, 117, 125],
        bgWash: [252, 252, 253]
    };

    // --- 1. BACKGROUND & ACCENTS ---
    doc.setFillColor(colors.bgWash[0], colors.bgWash[1], colors.bgWash[2]);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Aksen Geometris Khas MentorStudio (Sama dengan header Radar-Health)
    doc.setFillColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.rect(pageWidth - 60, 0, 60, 45, 'F');

    // Border Tipis Profesional
    doc.setDrawColor(233, 236, 239);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // --- 2. BRANDING LOGO ---
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('MENTOR', 20, 25);
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.text('STUDIO', 54, 25);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textDimmed[0], colors.textDimmed[1], colors.textDimmed[2]);
    doc.text('OFFICIAL ACADEMIC CREDENTIAL', 20, 31);

    // --- 3. MAIN CONTENT ---
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('This is to certify that the individual named below has attained the', pageWidth / 2, 65, { align: 'center' });
    doc.text('prescribed level of competency and excellence in', pageWidth / 2, 72, { align: 'center' });

    // Nama Siswa (Professional Heavy Weight)
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(44);
    doc.text('DAFARA SYAH', pageWidth / 2, 95, { align: 'center', charSpace: 1 });

    // Track Name
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFontSize(20);
    doc.text('UI/UX DESIGN SPECIALIZATION', pageWidth / 2, 115, { align: 'center' });

    // Divider
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - 40, 122, pageWidth / 2 + 40, 122);

    // Meta Data
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textDimmed[0], colors.textDimmed[1], colors.textDimmed[2]);
    doc.text('Issued upon successful completion of rigorous project-based assessments', pageWidth / 2, 132, { align: 'center' });
    doc.text('and mentor-led competency evaluations.', pageWidth / 2, 137, { align: 'center' });

    // --- 4. SIGNATURES & VERIFICATION ---
    const signY = 170;

    // Signature Area 1
    doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
    doc.setFont('courier', 'bolditalic');
    doc.setFontSize(16);
    doc.text('Aris Wijaya', 60, signY, { align: 'center' });
    doc.line(35, signY + 2, 85, signY + 2);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('LEAD MENTOR', 60, signY + 7, { align: 'center' });

    // Signature Area 2
    doc.setFont('courier', 'bolditalic');
    doc.setFontSize(16);
    doc.text('James Stark', pageWidth - 60, signY, { align: 'center' });
    doc.line(pageWidth - 85, signY + 2, pageWidth - 35, signY + 2);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text('ACADEMIC DIRECTOR', pageWidth - 60, signY + 7, { align: 'center' });

    // --- 5. STAMP & SECURITY (Sync with Radar-Health) ---
    // Security Hexagon/Square
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.8);
    doc.rect(pageWidth / 2 - 12.5, signY - 15, 25, 25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6);
    doc.text('VERIFIED', pageWidth / 2, signY - 2, { align: 'center' });
    doc.text('CREDENTIAL', pageWidth / 2, signY + 2, { align: 'center' });

    // Footer Info
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(colors.textDimmed[0], colors.textDimmed[1], colors.textDimmed[2]);
    const certID = `CERT-ID: MS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    doc.text(certID, 20, pageHeight - 15);
    doc.text('Authorized by MentorStudio Academic Board | mentorstudio.id', pageWidth - 20, pageHeight - 15, { align: 'right' });

    // --- OUTPUT ---
    const pdfDataUri = doc.output('datauristring');
    const win = window.open();
    win?.document.write(`
        <html>
            <head><title>Sertifikat Kompetensi - Dafara Syah</title></head>
            <body style="margin:0; background: #f0f0f0; display: flex; align-items: center; justify-content: center;">
                <iframe src="${pdfDataUri}" width="100%" height="100%" style="border:none;"></iframe>
            </body>
        </html>
    `);
};