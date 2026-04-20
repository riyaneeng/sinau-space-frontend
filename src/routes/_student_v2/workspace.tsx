import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    Container,
    Grid,
    Card,
    Image,
    Text,
    Badge,
    Button,
    Group,
    Stack,
    Title,
    Box,
    Progress,
    Avatar,
    Menu,
    ActionIcon,
    TextInput,
    rem,
    Tabs,
    Modal,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useDisclosure } from '@mantine/hooks';
import {
    MoreVertical,
    LogOut,
    BookOpen,
    Users,
    Search,
    ChevronRight,
    AlertTriangle
} from 'lucide-react';

export const Route = createFileRoute('/_student_v2/workspace')({
    component: RouteComponent,
})

const ENROLLED_CLASSES = [
    {
        id: 'c1',
        title: 'Fullstack Web Development with Next.js',
        mentor: 'Aris Wijaya',
        chapters: 12,
        completedChapters: 8,
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
        status: 'ongoing',
    },
    {
        id: 'c2',
        title: 'UI/UX Design Masterclass: Figma to Prototyping',
        mentor: 'Sarah Chen',
        chapters: 10,
        completedChapters: 10,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
        status: 'completed',
    },
    {
        id: 'c3',
        title: 'Advanced AI Prompt Engineering',
        mentor: 'James Stark',
        chapters: 8,
        completedChapters: 2,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
        status: 'ongoing',
    },
];

function RouteComponent() {
    const isMobile = useMediaQuery('(max-width: 48em)');
    const [activeTab, setActiveTab] = useState<string | null>('all');
    const [search, setSearch] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const [selectedClass, setSelectedClass] = useState<any>(null);

    const handleDropRequest = (course: any) => {
        setSelectedClass(course);
        open();
    };

    return (
        <Box p={isMobile ? "md" : "xl"} style={{ minHeight: '100%' }}>
            {/* Header Section */}
            <Box bg="white" pt={rem(40)} pb={rem(40)} style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                <Container size="lg">
                    <Group justify="space-between" align="center">
                        <Stack gap={0}>
                            <Title order={2} fw={900}>My Workspace</Title>
                            <Text c="dimmed" size="sm">Kelola semua kelas dan progres belajarmu di sini.</Text>
                        </Stack>
                        <TextInput
                            placeholder="Cari kelas..."
                            leftSection={<Search size={16} />}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            radius="md"
                            w={300}
                        />
                    </Group>

                    <Tabs value={activeTab} onChange={setActiveTab} mt="xl" variant="pills" color="indigo">
                        <Tabs.List>
                            <Tabs.Tab value="all">Semua Kelas</Tabs.Tab>
                            <Tabs.Tab value="ongoing">Sedang Berjalan</Tabs.Tab>
                            <Tabs.Tab value="completed">Selesai</Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                </Container>
            </Box>

            {/* Main Content */}
            <Container size="lg" mt="xl">
                <Grid gap="lg">
                    {ENROLLED_CLASSES.filter(c =>
                        (activeTab === 'all' || c.status === activeTab) &&
                        c.title.toLowerCase().includes(search.toLowerCase())
                    ).map((course) => (
                        <Grid.Col key={course.id} span={{ base: 12, sm: 6, md: 4 }}>
                            <ClassCard course={course} onDrop={() => handleDropRequest(course)} />
                        </Grid.Col>
                    ))}
                </Grid>
            </Container>

            {/* Modal Konfirmasi Keluar Kelas */}
            <Modal
                opened={opened}
                onClose={close}
                title="Konfirmasi Keluar Kelas"
                centered
                radius="md"
            >
                <Stack align="center" ta="center" py="md">
                    <ThemeIcon size={60} radius="xl" color="red" variant="light">
                        <AlertTriangle size={34} />
                    </ThemeIcon>
                    <Box>
                        <Text fw={700} size="lg">Anda yakin ingin keluar?</Text>
                        <Text size="sm" c="dimmed">
                            Anda akan kehilangan akses ke materi <b>{selectedClass?.title}</b> dan progres Anda tidak akan tersimpan.
                        </Text>
                    </Box>
                    <Group grow w="100%" mt="md">
                        <Button variant="default" onClick={close}>Batal</Button>
                        <Button color="red" onClick={() => {
                            console.log(`Keluar dari: ${selectedClass?.id}`);
                            close();
                        }}>Ya, Keluar Kelas</Button>
                    </Group>
                </Stack>
            </Modal>
        </Box>
    );
}

// Komponen Kartu Kelas
function ClassCard({ course, onDrop }: { course: any; onDrop: () => void }) {
    const progress = (course.completedChapters / course.chapters) * 100;

    return (
        <Card shadow="sm" radius="lg" withBorder padding={0} style={{ overflow: 'hidden' }}>
            <Box pos="relative">
                <Image
                    src={course.image}
                    h={160}           // Gunakan h (shorthand Mantine) daripada height
                    w="100%"          // Paksa lebar penuh
                    fit="cover"       // Ini akan memaksa object-fit: cover
                    alt={course.title}
                />
                <Box
                    pos="absolute" top={10} right={10}
                    style={{ zIndex: 2 }}
                >
                    <Menu shadow="md" width={180} position="bottom-end" radius="md">
                        <Menu.Target>
                            <ActionIcon variant="filled" color="white" style={{ color: 'black' }}>
                                <MoreVertical size={16} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>Opsi Kelas</Menu.Label>
                            <Menu.Item leftSection={<BookOpen size={14} />}>Lihat Silabus</Menu.Item>
                            <Menu.Item leftSection={<Users size={14} />}>Hubungi Mentor</Menu.Item>
                            <Menu.Divider />
                            <Menu.Item
                                color="red"
                                leftSection={<LogOut size={14} />}
                                onClick={onDrop}
                            >
                                Keluar Kelas
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Box>
            </Box>

            <Stack p="md" gap="xs">
                <Group justify="space-between">
                    <Badge size="xs" variant="light" color={course.status === 'completed' ? 'green' : 'indigo'}>
                        {course.status === 'completed' ? 'Selesai' : 'Sedang Berjalan'}
                    </Badge>
                    <Text size="xs" c="dimmed" fw={600}>
                        {course.completedChapters}/{course.chapters} Chapters
                    </Text>
                </Group>

                <Title order={5} lineClamp={1} mt={4}>{course.title}</Title>

                <Group gap="xs" mt={4}>
                    <Avatar size={24} radius="xl" color="indigo">{course.mentor.charAt(0)}</Avatar>
                    <Text size="xs" fw={500} c="dimmed">{course.mentor}</Text>
                </Group>

                <Box mt="md">
                    <Group justify="space-between" mb={6}>
                        <Text size="xs" fw={700}>Progres Belajar</Text>
                        <Text size="xs" fw={700} c="indigo">{Math.round(progress)}%</Text>
                    </Group>
                    <Progress value={progress} color="indigo" size="sm" radius="xl" animated={progress < 100} />
                </Box>

                <Button
                    fullWidth
                    mt="md"
                    radius="md"
                    color="indigo"
                    variant={course.status === 'completed' ? 'outline' : 'filled'}
                    rightSection={<ChevronRight size={16} />}
                >
                    {course.status === 'completed' ? 'Review Materi' : 'Lanjutkan Belajar'}
                </Button>
            </Stack>
        </Card>
    );
}

import { ThemeIcon } from '@mantine/core'; // Tambahan untuk modal