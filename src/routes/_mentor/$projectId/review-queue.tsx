import { useState, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
    Paper, Title, Text, Button, Divider, Alert, Group, Badge,
    Stack, ActionIcon, Avatar, Box, Select, Pagination, rem
} from '@mantine/core';
import {
    Sparkles, ArrowRight, CheckCircle2,
    AlertCircle, Ban,
} from 'lucide-react';

// Data simulasi 15 antrean tugas (ditambah agar pagination terlihat)
const QUEUE_DATA = [
    { id: 1, student: 'Dafara Syah', milestone: 'Milestone 2', title: 'Market Research Report - EcoTech', time: '2 hours ago', priority: 'high', aiScore: 85, aiSummary: 'Analisis data kuat, namun bagian "Competitor Gap" kurang detail.' },
    { id: 2, student: 'Budi Santoso', milestone: 'Milestone 1', title: 'Business Model Canvas - Smart Farming', time: '5 hours ago', priority: 'medium', aiScore: 62, aiSummary: 'Revenue stream tidak sinkron dengan target segmen.' },
    { id: 3, student: 'Larasati Putri', milestone: 'Milestone 2', title: 'User Interview Synthesis', time: '1 day ago', priority: 'low', aiScore: 92, aiSummary: 'Laporan sangat lengkap. AI memberikan skor tinggi.' },
    { id: 4, student: 'Rian Hidayat', milestone: 'Milestone 3', title: 'Financial Projection v1', time: '3 hours ago', priority: 'high', aiScore: 45, aiSummary: 'Terdeteksi kesalahan logika pada perhitungan ROI.' },
    { id: 5, student: 'Siti Aminah', milestone: 'Milestone 4', title: 'Pitch Deck Draft', time: '1 hour ago', priority: 'medium', aiScore: 78, aiSummary: 'Desain visual bagus. Alur story-telling oke.' },
    { id: 6, student: 'Kevin Sanjaya', milestone: 'Milestone 5', title: 'Final Project Documentation', time: '30 mins ago', priority: 'high', aiScore: 95, aiSummary: 'Luar biasa. Siap untuk kelulusan.' },
    { id: 7, student: 'Dewi Lestari', milestone: 'Milestone 1', title: 'Problem Definition Document', time: '6 hours ago', priority: 'low', aiScore: 50, aiSummary: 'Definisi masalah terlalu umum.' },
    { id: 8, student: 'Andi Wijaya', milestone: 'Milestone 2', title: 'Competitor Analysis Matrix', time: '12 hours ago', priority: 'medium', aiScore: 70, aiSummary: 'Matriks lengkap, tapi belum ada kompetitor tidak langsung.' },
    { id: 9, student: 'Fahri Hamzah', milestone: 'Milestone 3', title: 'MVP Feature List', time: '4 hours ago', priority: 'high', aiScore: 30, aiSummary: 'Scope creep terdeteksi. Fitur terlalu banyak untuk tahap MVP.' },
    { id: 10, student: 'Maya Indah', milestone: 'Milestone 2', title: 'Customer Persona Profile', time: '2 days ago', priority: 'low', aiScore: 88, aiSummary: 'Sangat detail. Psikografis dijelaskan dengan baik.' },
    { id: 11, student: 'Eko Prasetyo', milestone: 'Milestone 1', title: 'Value Proposition Canvas', time: '8 hours ago', priority: 'medium', aiScore: 65, aiSummary: 'Pain relievers belum menjawab customer pains secara spesifik.' },
    { id: 12, student: 'Rina Nose', milestone: 'Milestone 3', title: 'Landing Page Copy', time: '7 hours ago', priority: 'low', aiScore: 75, aiSummary: 'Copywriting menarik, tapi Call to Action (CTA) kurang menonjol.' },
    { id: 13, student: 'Gading Marten', milestone: 'Milestone 4', title: 'Marketing Strategy', time: '9 hours ago', priority: 'high', aiScore: 40, aiSummary: 'Budget marketing melebihi proyeksi revenue tahun pertama.' },
    { id: 14, student: 'Luna Maya', milestone: 'Milestone 2', title: 'Survey Result Analysis', time: '3 hours ago', priority: 'medium', aiScore: 82, aiSummary: 'Sampling size memadai, margin of error dalam batas wajar.' },
    { id: 15, student: 'Ariel Noah', milestone: 'Milestone 5', title: 'Final Prototype Demo', time: '1 hour ago', priority: 'high', aiScore: 90, aiSummary: 'User flow mulus, tidak ditemukan bug kritikal pada flow utama.' }
];
export const Route = createFileRoute('/_mentor/$projectId/review-queue')({
    component: RouteComponent,
})


function RouteComponent() {
    const [activePage, setPage] = useState(1);
    const [pageSize, setPageSize] = useState<string | null>('5');

    const pagedData = useMemo(() => {
        const limit = pageSize === 'all' ? QUEUE_DATA.length : parseInt(pageSize || '5');
        const start = (activePage - 1) * limit;
        const end = start + limit;
        return QUEUE_DATA.slice(start, end);
    }, [activePage, pageSize]);

    const totalPages = useMemo(() => {
        const limit = pageSize === 'all' ? 1 : parseInt(pageSize || '5');
        return Math.ceil(QUEUE_DATA.length / limit);
    }, [pageSize]);

    return (
        <>
            <Stack gap="xl">

                {/* STICKY HEADER */}
                <Box
                    style={{
                        position: 'sticky',
                        top: rem(60), // Menyesuaikan tinggi header AppShell
                        zIndex: 10,
                        backgroundColor: 'var(--mantine-color-gray-0)',
                        paddingBottom: 'var(--mantine-spacing-md)',
                        marginTop: rem(-15)
                    }}
                >
                    <Group justify="space-between" align="flex-end">
                        <Box>
                            <Title order={2} style={{ letterSpacing: '-0.5px' }}>Review Queue</Title>
                            <Text size="sm" c="dimmed">
                                Menampilkan {pagedData.length} dari {QUEUE_DATA.length} tugas
                            </Text>
                        </Box>
                        <Select
                            size="xs"
                            w={120}
                            label="Tampilkan"
                            value={pageSize}
                            onChange={(val) => { setPageSize(val); setPage(1); }}
                            data={[
                                { value: '5', label: '5 data' },
                                { value: '10', label: '10 data' },
                                { value: '20', label: '20 data' },
                                { value: 'all', label: 'Semua' },
                            ]}
                        />
                    </Group>
                    <Divider mt="md" />
                </Box>

                {/* LIST REVIEWS */}
                <Stack gap="md">
                    {pagedData.map((item) => (
                        <Paper key={item.id} withBorder p="lg" radius="md" shadow="xs">
                            <Group justify="space-between" mb="sm">
                                <Group gap="sm">
                                    <Avatar color="indigo" radius="xl" size="md">
                                        {item.student.split(' ').map(n => n[0]).join('')}
                                    </Avatar>
                                    <Box>
                                        <Text size="sm" fw={700}>{item.student}</Text>
                                        <Text size="xs" c="dimmed">{item.time}</Text>
                                    </Box>
                                </Group>
                                <Badge variant="light" color="indigo">{item.milestone}</Badge>
                            </Group>

                            <Title order={5} mb="md">{item.title}</Title>

                            <Alert variant="light" color="indigo" radius="md" py="xs">
                                <Text size="xs">
                                    <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                                    {item.aiSummary}
                                </Text>
                            </Alert>

                            <Group justify="space-between" mt="lg">
                                <Group gap="xs">
                                    <ActionIcon variant="light" color="teal"><CheckCircle2 size={18} /></ActionIcon>
                                    <ActionIcon variant="light" color="orange"><AlertCircle size={18} /></ActionIcon>
                                    <ActionIcon variant="light" color="red"><Ban size={18} /></ActionIcon>
                                </Group>
                                <Button variant="filled" color="indigo" size="sm" rightSection={<ArrowRight size={16} />}>
                                    Detail Review
                                </Button>
                            </Group>
                        </Paper>
                    ))}
                </Stack>

                {/* STICKY FOOTER PAGINATION */}
                {pageSize !== 'all' && (
                    <Box
                        style={{
                            position: 'sticky',
                            bottom: rem(20),
                            zIndex: 10,
                            marginTop: 'xl'
                        }}
                    >
                        <Paper withBorder p="sm" radius="md" shadow="md">
                            <Group justify="space-between">
                                <Text size="xs" c="dimmed" visibleFrom="xs">
                                    Halaman <b>{activePage}</b> dari {totalPages}
                                </Text>
                                <Pagination
                                    total={totalPages}
                                    value={activePage}
                                    onChange={setPage}
                                    color="indigo"
                                    size="sm"
                                    radius="md"
                                    withEdges
                                />
                            </Group>
                        </Paper>
                    </Box>
                )}
            </Stack>
        </>
    );
}