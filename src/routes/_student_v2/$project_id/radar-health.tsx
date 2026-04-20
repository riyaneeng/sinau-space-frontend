import { createFileRoute } from '@tanstack/react-router';
import {
  Container, Grid, Text, Title, Stack, Group, Box, rem, Paper, Badge,
  ThemeIcon, SimpleGrid, RingProgress, Divider, Button, Center
} from '@mantine/core';
import {
  Zap, Target, Brain, TrendingUp, Lightbulb, Star, AlertCircle, ArrowRight
} from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const Route = createFileRoute(
  '/_student_v2/$project_id/radar-health',
)({
  component: RouteComponent,
})

const SKILL_DATA = [
  { subject: 'Research', A: 70, fullMark: 100 },
  { subject: 'Visual', A: 95, fullMark: 100 },
  { subject: 'Strategy', A: 60, fullMark: 100 },
  { subject: 'Tech', A: 85, fullMark: 100 },
  { subject: 'Soft Skills', A: 75, fullMark: 100 },
];

function RouteComponent() {
  return (
    <Box bg="gray.0" h="100vh" pb={rem(80)}>
      {/* 1. HEADER */}
      <Box bg="white" pt={rem(40)} pb={rem(40)} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
        <Container size="lg">
          <Group justify="space-between">
            <Box>
              <Badge color="indigo" variant="light" mb="xs">Performance Analytics</Badge>
              <Title order={2} fw={900} lts={-1}>Your Learning Radar</Title>
              <Text c="dimmed" size="sm">Analisis kompetensi berdasarkan pengerjaan Mission Lab & Quiz.</Text>
            </Box>
            <Button variant="light" color="indigo" radius="md" leftSection={<Target size={16} />}>
              Update Goals
            </Button>
          </Group>
        </Container>
      </Box>

      <Container size="lg" mt="xl">
        <Grid gap="md">
          {/* 2. THE REAL RADAR CHART (USING RECHARTS) */}
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Paper withBorder p="xl" radius="lg" shadow="sm" h="100%">
              <Stack align="center" gap="md" h="100%">
                <Title order={4}>Skill Matrix Analysis</Title>

                <Box style={{ width: '100%', height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                      <PolarGrid stroke="#e9ecef" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#868e96', fontSize: 12, fontWeight: 600 }}
                      />
                      <Radar
                        name="Student Skill"
                        dataKey="A"
                        stroke="var(--mantine-color-indigo-6)"
                        strokeWidth={2}
                        fill="var(--mantine-color-indigo-6)"
                        fillOpacity={0.2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>

                <Text size="xs" c="dimmed" ta="center">
                  Data diperbarui secara otomatis setelah setiap submisi Mission Lab disetujui Mentor.
                </Text>
              </Stack>
            </Paper>
          </Grid.Col>

          {/* 3. PERFORMANCE STATS (RIGHT) */}
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Stack gap="md">
              <Paper withBorder p="lg" radius="lg">
                <Group justify="space-between">
                  <Box>
                    <Text size="xs" c="dimmed" fw={800} tt="uppercase">Health Index</Text>
                    <Title order={2} c="indigo">A- Strong</Title>
                  </Box>
                  <RingProgress
                    size={90}
                    thickness={8}
                    roundCaps
                    sections={[{ value: 88, color: 'indigo' }]}
                    label={
                      <Center>
                        <Text size="xs" fw={800}>88%</Text>
                      </Center>
                    }
                  />
                </Group>
              </Paper>

              <SimpleGrid cols={2}>
                <Paper withBorder p="md" radius="lg">
                  <ThemeIcon variant="light" color="teal" mb="xs"><Zap size={16} /></ThemeIcon>
                  <Text size="xs" c="dimmed" fw={700}>Consistency</Text>
                  <Text fw={700}>95%</Text>
                </Paper>
                <Paper withBorder p="md" radius="lg">
                  <ThemeIcon variant="light" color="orange" mb="xs"><Brain size={16} /></ThemeIcon>
                  <Text size="xs" c="dimmed" fw={700}>Quiz Accuracy</Text>
                  <Text fw={700}>92%</Text>
                </Paper>
              </SimpleGrid>

              <Paper withBorder p="xl" radius="lg" bg="indigo.6" c="white" style={{ position: 'relative', overflow: 'hidden' }}>
                <Stack gap={2} style={{ zIndex: 1 }}>
                  <Text size="xs" fw={800} opacity={0.8}>WEEKLY ACCELERATION</Text>
                  <Title order={2}>+12.5%</Title>
                  <Text size="xs" mt="sm">Trending Up: Visual Design Mastery</Text>
                </Stack>
                <TrendingUp
                  size={100}
                  style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.1, color: 'white' }}
                />
              </Paper>
            </Stack>
          </Grid.Col>

          {/* 4. AI RECOMMENDATIONS */}
          <Grid.Col span={12}>
            <Paper withBorder p="xl" radius="lg">
              <Group mb="xl" gap="sm">
                <ThemeIcon size="lg" radius="md" color="yellow" variant="light">
                  <Lightbulb size={20} />
                </ThemeIcon>
                <Box>
                  <Title order={4}>MentorStudio AI Insights</Title>
                  <Text size="xs" c="dimmed">Saran otomatis berdasarkan grafik radarmu.</Text>
                </Box>
              </Group>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
                <Paper p="md" radius="md" bg="gray.0" withBorder style={{ borderStyle: 'dashed' }}>
                  <Group gap="xs" mb={8}>
                    <Star size={16} color="orange" />
                    <Text size="sm" fw={700}>Main Strength</Text>
                  </Group>
                  <Text size="sm">
                    <b>Visual & Tech:</b> Kamu sangat kuat di eksekusi visual. Detail antarmuka dan pemahaman teknismu berada di atas rata-rata kelas.
                  </Text>
                </Paper>

                <Paper p="md" radius="md" bg="gray.0" withBorder style={{ borderStyle: 'dashed' }}>
                  <Group gap="xs" mb={8}>
                    <AlertCircle size={16} color="red" />
                    <Text size="sm" fw={700}>Growth Opportunity</Text>
                  </Group>
                  <Text size="sm">
                    <b>Research & Strategy:</b> Skor risetmu (70) masih bisa ditingkatkan. Cobalah kembali ke Chapter 3 untuk memperdalam *User Interview*.
                  </Text>
                </Paper>
              </SimpleGrid>

              <Divider my="xl" variant="dashed" />

              <Group justify="center">
                <Button
                  variant="subtle"
                  color="indigo"
                  rightSection={<ArrowRight size={16} />}
                  onClick={handleDownloadExecutivePDF} // Trigger Fungsi Di Sini
                >
                  Download Detailed Competency Report (PDF)
                </Button>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}


const handleDownloadExecutivePDF = () => {
  const doc = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
  });

  // Konfigurasi Warna & Brand
  const colors = {
    primary: [67, 94, 190] as [number, number, number],   // Deep Indigo
    secondary: [73, 80, 87] as [number, number, number],  // Dark Slate
    accent: [238, 242, 255] as [number, number, number],  // Soft Blue Wash
    textMain: [33, 37, 41] as [number, number, number],
    textDimmed: [108, 117, 125] as [number, number, number],
    success: [25, 135, 84] as [number, number, number]
  };

  const date = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // --- 1. LATAR BELAKANG ELEGAN ---
  doc.setFillColor(252, 252, 253);
  doc.rect(0, 0, 210, 297, 'F');

  // Aksen Geometris di Header
  doc.setFillColor(67, 94, 190);
  doc.rect(140, 0, 70, 40, 'F'); // Diperlebar ke kiri

  // --- 2. HEADER BRANDING ---
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.text('SINAU', 15, 25);

  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.text('SPACE', 44, 25);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(colors.textDimmed[0], colors.textDimmed[1], colors.textDimmed[2]);
  doc.text('INDUSTRIAL-GRADE COMPETENCY CERTIFICATION', 15, 32);

  // Info Siswa (Kanan Atas di dalam Box Biru)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text([
    `Report ID: MS-RADAR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    `Issue Date: ${date}`,
    `Status: Verified Student`
  ], 200, 15, { align: 'right' }); // Rata kanan (align right) dengan margin x=200

  // --- 3. PROFIL PESERTA ---
  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT PROFILE', 15, 55);

  autoTable(doc, {
    startY: 60,
    margin: { left: 15 },
    body: [
      ['Full Name', 'Dafara Syah', 'Academic Track', 'UI/UX Design Masterclass'],
      ['Student ID', 'MS-2026-0881', 'Avg. Performance', '88% (Excellent)']
    ],
    theme: 'plain',
    styles: { fontSize: 9, cellPadding: 2 },
    columnStyles: {
      0: { fontStyle: 'bold', textColor: colors.textDimmed, cellWidth: 30 },
      1: { cellWidth: 60 },
      2: { fontStyle: 'bold', textColor: colors.textDimmed, cellWidth: 30 },
    }
  });

  // --- 4. DATA TABEL DENGAN BADGE ---
  doc.setFontSize(14);
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.text('Skill Matrix Analytics', 15, 85);

  autoTable(doc, {
    startY: 90,
    margin: { left: 15, right: 15 },
    head: [['Domain Subject', 'Score', 'Competency Level', 'Status']],
    body: SKILL_DATA.map(item => [
      item.subject,
      `${item.A}/100`,
      item.A >= 90 ? 'EXPERT' : item.A >= 75 ? 'ADVANCED' : 'INTERMEDIATE',
      'VALIDATED'
    ]),
    headStyles: {
      fillColor: colors.primary,
      fontSize: 10,
      fontStyle: 'bold',
      cellPadding: 5
    },
    styles: {
      fontSize: 9,
      cellPadding: 6,
      valign: 'middle'
    },
    columnStyles: {
      1: { halign: 'center', fontStyle: 'bold' },
      2: { halign: 'center' },
      3: { halign: 'center', textColor: colors.success, fontStyle: 'bold' }
    }
  });

  // --- 5. AI INSIGHTS BOX ---
  const currentY = (doc as any).lastAutoTable.finalY + 15;
  doc.setFillColor(colors.accent[0], colors.accent[1], colors.accent[2]);
  doc.roundedRect(15, currentY, 180, 40, 3, 3, 'F');

  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setFontSize(11);
  doc.text('MentorStudio AI Intelligence Summary', 22, currentY + 10);

  doc.setFontSize(9);
  doc.setTextColor(colors.secondary[0], colors.secondary[1], colors.secondary[2]);
  const insights = [
    `• Berdasarkan data, penguasaan Visual Design Anda berada di persentil ke-95.`,
    `• Dibutuhkan penguatan pada sektor Strategy untuk mencapai level Professional Specialist.`,
    `• Rekomendasi: Selesaikan modul 'Business UX' untuk menyeimbangkan radar kompetensi.`
  ];
  doc.text(insights, 22, currentY + 20);

  // --- 6. DIGITAL SIGNATURE & FOOTER ---
  const footerY = 250;

  // Simulasi QR Code / Security Stamp
  doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  doc.setLineWidth(0.8);
  doc.rect(165, footerY - 5, 25, 25);
  doc.setFontSize(6);
  doc.text('SCAN TO VERIFY', 167, footerY + 25);

  doc.setTextColor(colors.textMain[0], colors.textMain[1], colors.textMain[2]);
  doc.setFontSize(10);
  doc.text('Academic Director,', 15, footerY);

  doc.setFont('courier', 'bolditalic');
  doc.setFontSize(14);
  doc.text('Aris Wijaya', 15, footerY + 10); // Digital Signature Font

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(colors.textDimmed[0], colors.textDimmed[1], colors.textDimmed[2]);
  doc.text('This is a computer-generated document. No signature is required.', 15, footerY + 18);

  // Footer Disclaimer
  doc.setFontSize(7);
  doc.text('SinauSpace | Jalan Sudirman No. 12, Jakarta | support@sinauspace.id', 105, 285, { align: 'center' });

  // EXECUTE
  const pdfDataUri = doc.output('datauristring');
  const previewWindow = window.open();
  if (previewWindow) {
    previewWindow.document.write(`
      <html>
        <head><title>Competency Report - ${date}</title></head>
        <body style="margin:0; display:flex; justify-content:center; align-items:center; background:#444;">
          <iframe width='100%' height='100%' style='border:none;' src='${pdfDataUri}'></iframe>
        </body>
      </html>
    `);
  }
};