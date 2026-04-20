import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    Grid, Text, Title, Stack, Group, Box, rem, Accordion, ThemeIcon,
    Button, Paper, Divider, Badge, ActionIcon, AspectRatio, ScrollArea,
    TextInput, Tooltip, Center
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    PlayCircle, CheckCircle2, ChevronLeft, Download,
    Send, Maximize2, Minimize2, Bot, FileText, HelpCircle, ArrowRight
} from 'lucide-react';

export const Route = createFileRoute('/_student_v2/$project_id/learning-path')({
    component: RouteComponent,
})

function RouteComponent() {
    const [fullscreen, { toggle: toggleFullscreen }] = useDisclosure(false);
    const [activeLessonId, setActiveLessonId] = useState('l1');

    const curriculum = useMemo(() => [
        {
            id: 'ch-1',
            title: 'Chapter 1: UI/UX Overview',
            lessons: [
                { id: 'l1', title: 'Video: Mental Models', type: 'video', completed: true },
                { id: 'l2', title: 'Reading: Research Method', type: 'reading', completed: false },
            ]
        },
        {
            id: 'ch-2',
            title: 'Chapter 2: Practice',
            lessons: [
                { id: 'l3', title: 'Quiz: Basics Check', type: 'quiz', completed: false },
                { id: 'l4', title: 'Sandbox: Figma Embed', type: 'sandbox', completed: false },
            ]
        }
    ], []);

    const allLessons = useMemo(() => curriculum.flatMap(c => c.lessons), [curriculum]);
    const activeLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];

    const currentIndex = allLessons.findIndex(l => l.id === activeLessonId);
    const isLastLesson = currentIndex === allLessons.length - 1;



    // 1. Tambahkan state untuk mengontrol Accordion yang terbuka
    const [openedChapter, setOpenedChapter] = useState<string | null>('ch-1');

    // 2. Gunakan useMemo untuk mencari pemetaan Lesson -> Chapter
    const lessonToChapterMap = useMemo(() => {
        const map: Record<string, string> = {};
        curriculum.forEach(ch => {
            ch.lessons.forEach(lesson => {
                map[lesson.id] = ch.id;
            });
        });
        return map;
    }, [curriculum]);

    // 3. Modifikasi fungsi untuk pindah lesson (juga dipicu saat klik manual atau tombol Next)
    const handleLessonChange = (lessonId: string) => {
        setActiveLessonId(lessonId);

        // Cari chapter dari lesson ini
        const chapterId = lessonToChapterMap[lessonId];
        if (chapterId) {
            setOpenedChapter(chapterId); // Auto-open dropdown
        }
    };

    // 4. Update fungsi nextLesson untuk menggunakan handler baru
    const nextLesson = () => {
        if (!isLastLesson) {
            const nextId = allLessons[currentIndex + 1].id;
            handleLessonChange(nextId);
        }
    };

    return (
        <Box
            bg="white"
            // minHeight="100vh"
            style={{
                position: fullscreen ? 'fixed' : 'relative',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: fullscreen ? 2000 : 1,
                overflow: 'hidden',
                backgroundColor: 'white'
            }}
        >
            {/* 1. TOP NAV (Kondisi Fullscreen: Putih Bersih) */}
            <Box
                p="md"
                bg="white"
                style={{
                    borderBottom: '1px solid var(--mantine-color-gray-2)',
                    transition: 'all 0.3s ease'
                }}
            >
                <Group justify="space-between">
                    <Group>
                        <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => fullscreen ? toggleFullscreen() : window.history.back()}
                        >
                            <ChevronLeft size={20} />
                        </ActionIcon>
                        <Divider orientation="vertical" />
                        <Stack gap={0}>
                            <Text size="10px" fw={800} c="indigo.6" tt="uppercase" lts={1}>
                                Learning Path
                            </Text>
                            <Title order={5} lts={-0.5}>{activeLesson.title}</Title>
                        </Stack>
                    </Group>
                    <Group>
                        {!fullscreen && <Badge variant="dot" color="indigo" size="lg">Session Active</Badge>}
                        <Tooltip label={fullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
                            <ActionIcon onClick={toggleFullscreen} variant="light" color="indigo" size="lg" radius="md">
                                {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </Group>
            </Box>

            <Grid gap={0}>
                {/* 2. MAIN CONTENT AREA */}
                <Grid.Col span={fullscreen ? 12 : { base: 12, md: 9 }} bg={fullscreen ? "white" : "gray.0"}>
                    <ScrollArea h="calc(100vh - 71px)" offsetScrollbars>
                        <Box p={fullscreen ? 0 : "xl"}>

                            {/* DYNAMIC CONTENT AREA */}
                            <Box
                                style={{
                                    maxWidth: fullscreen && activeLesson.type !== 'video' ? '1000px' : '100%',
                                    margin: '0 auto',
                                    minHeight: fullscreen ? 'calc(100vh - 180px)' : 'auto'
                                }}
                            >
                                <DynamicContent lesson={activeLesson} fullscreen={fullscreen} />
                            </Box>

                            {/* --- NEW ACTION BAR --- */}
                            <Box
                                p="xl"
                                mt={fullscreen ? 0 : "xl"}
                                style={{
                                    maxWidth: '1000px',
                                    margin: '0 auto',
                                    backgroundColor: fullscreen ? 'white' : 'transparent',
                                    borderTop: fullscreen ? '1px solid var(--mantine-color-gray-2)' : 'none'
                                }}
                            >
                                <Group justify="space-between" align="center">
                                    <Box>
                                        <Text size="xs" c="dimmed" fw={700}>UP NEXT</Text>
                                        <Text size="sm" fw={600}>
                                            {isLastLesson ? "You've reached the end!" : allLessons[currentIndex + 1].title}
                                        </Text>
                                    </Box>

                                    <Button
                                        size="lg"
                                        radius="md"
                                        color="indigo"
                                        rightSection={<ArrowRight size={20} />}
                                        disabled={isLastLesson}
                                        onClick={nextLesson}
                                        // boxShadow="xl"
                                        styles={{
                                            root: { paddingLeft: rem(30), paddingRight: rem(30) }
                                        }}
                                    >
                                        Complete & Continue
                                    </Button>
                                </Group>
                            </Box>

                            {!fullscreen && (
                                <Grid mt="xl" p="xl" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                                    <Grid.Col span={{ base: 12, md: 7 }}>
                                        <Stack gap="lg">
                                            <Box>
                                                <Title order={3}>Overview</Title>
                                                <Text c="dimmed" size="sm" mt="xs" style={{ lineHeight: 1.6 }}>
                                                    Dalam materi ini, kita akan membahas detail tentang {activeLesson.title}.
                                                    Pastikan anda memahami konsep dasar sebelum melanjutkan ke kuis atau sandbox.
                                                </Text>
                                            </Box>
                                            <Group>
                                                <Button variant="light" color="indigo" leftSection={<Download size={16} />}>Assets.zip</Button>
                                                <Button variant="subtle" color="gray" leftSection={<FileText size={16} />}>Transkrip</Button>
                                            </Group>
                                        </Stack>
                                    </Grid.Col>

                                    <Grid.Col span={{ base: 12, md: 5 }}>
                                        <Paper withBorder p="md" radius="lg" bg="white">
                                            <Group mb="sm">
                                                <ThemeIcon color="indigo" variant="light" radius="xl"><Bot size={18} /></ThemeIcon>
                                                <Text fw={700} size="sm">Ask AI Buddy</Text>
                                            </Group>
                                            <Group gap="xs">
                                                <TextInput
                                                    placeholder="Tanya hal sulit..."
                                                    style={{ flex: 1 }}
                                                    size="xs"
                                                    radius="md"
                                                />
                                                <ActionIcon color="indigo" size="lg" radius="md"><Send size={16} /></ActionIcon>
                                            </Group>
                                        </Paper>
                                    </Grid.Col>
                                </Grid>
                            )}
                        </Box>
                    </ScrollArea>
                </Grid.Col>

                {/* 3. SIDEBAR */}
                {!fullscreen && (
                    <Grid.Col span={{ base: 12, md: 3 }} style={{ borderLeft: '1px solid var(--mantine-color-gray-2)' }}>
                        <Box p="md" bg="white" h="calc(100vh - 71px)">
                            <Text fw={800} size="xs" tt="uppercase" lts={1} c="dimmed" mb="md">Curriculum</Text>
                            <ScrollArea h="calc(100vh - 160px)" scrollbars="y">
                                <Accordion
                                    variant="separated"
                                    radius="md"
                                    value={openedChapter} // Control state di sini
                                    onChange={setOpenedChapter} // Mengizinkan user buka/tutup manual juga
                                >
                                    {curriculum.map((chapter) => (
                                        <Accordion.Item key={chapter.id} value={chapter.id}>
                                            <Accordion.Control>
                                                <Group gap="xs">
                                                    {/* Indikator jika ada lesson aktif di dalam chapter ini */}
                                                    <Text size="sm" fw={700} c={openedChapter === chapter.id ? 'indigo' : 'black'}>
                                                        {chapter.title}
                                                    </Text>
                                                </Group>
                                            </Accordion.Control>
                                            <Accordion.Panel>
                                                <Stack gap={4}>
                                                    {chapter.lessons.map((lesson) => (
                                                        <UnstyledLessonButton
                                                            key={lesson.id}
                                                            lesson={lesson}
                                                            active={activeLessonId === lesson.id}
                                                            onClick={() => handleLessonChange(lesson.id)} // Gunakan handler baru
                                                        />
                                                    ))}
                                                </Stack>
                                            </Accordion.Panel>
                                        </Accordion.Item>
                                    ))}
                                </Accordion>
                            </ScrollArea>
                        </Box>
                    </Grid.Col>
                )}
            </Grid>
        </Box>
    );
}

function DynamicContent({ lesson, fullscreen }: { lesson: any, fullscreen: boolean }) {
    // Video Area tetap hitam untuk kontras visual konten
    const videoHeight = fullscreen ? "calc(100vh - 180px)" : "auto";

    switch (lesson.type) {
        case 'video':
            return (
                <Box bg="black" style={{ height: videoHeight }}>
                    <AspectRatio ratio={16 / 9} h="100%">
                        <iframe
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="Video"
                            frameBorder="0"
                            allowFullScreen
                            style={{ height: '100%', width: '100%' }}
                        />
                    </AspectRatio>
                </Box>
            );

        case 'reading':
            return (
                <Box p={fullscreen ? rem(80) : rem(40)} bg={fullscreen ? "white" : "transparent"}>
                    <Stack gap="xl">
                        <Badge size="lg" color="indigo" variant="light" w="fit-content">ARTICLE</Badge>
                        <Title order={1} style={{ fontSize: rem(42) }}>{lesson.title}</Title>
                        <Text size="lg" style={{ lineHeight: 1.8, color: 'var(--mantine-color-gray-8)' }}>
                            Fokus pada pembacaan yang bersih. Dalam mode putih ini, mata anda akan lebih rileks saat membaca teks panjang.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.
                            Aliquam erat volutpat. Donec placerat nisl magna, et faucibus arcu condimentum sed.
                            <br /><br />
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Text>
                    </Stack>
                </Box>
            );

        case 'quiz':
            return (
                <Center h={fullscreen ? "calc(100vh - 200px)" : 500} p="xl">
                    <Paper p={rem(60)} radius="xl" withBorder={!fullscreen} shadow={fullscreen ? "none" : "xl"} style={{ maxWidth: 600, width: '100%' }}>
                        <Stack align="center" gap="xl">
                            <ThemeIcon size={80} radius="xl" color="orange" variant="light"><HelpCircle size={40} /></ThemeIcon>
                            <Box ta="center">
                                <Title order={2}>Quick Check</Title>
                                <Text c="dimmed">Chapter 1 Review</Text>
                            </Box>
                            <Box w="100%">
                                <Text fw={700} size="lg" mb="xl">Apa elemen paling penting dalam UX Research?</Text>
                                <Stack gap="sm">
                                    <Button variant="outline" color="gray" size="lg" radius="md" justify="start">Estetika visual semata</Button>
                                    <Button variant="outline" color="indigo" size="lg" radius="md" justify="start">Empati terhadap pengguna</Button>
                                    <Button variant="outline" color="gray" size="lg" radius="md" justify="start">Mengikuti tren kompetitor</Button>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Center>
            );

        default:
            return <Box p="xl">Content ready.</Box>;
    }
}

function UnstyledLessonButton({ lesson, active, onClick }: { lesson: any, active: boolean, onClick: () => void }) {
    const Icon = lesson.type === 'video' ? PlayCircle : lesson.type === 'quiz' ? HelpCircle : FileText;

    return (
        <Box
            p="sm"
            onClick={onClick}
            style={{
                borderRadius: rem(10),
                cursor: 'pointer',
                // Berikan highlight lebih kuat pada item yang aktif
                backgroundColor: active ? 'var(--mantine-color-indigo-0)' : 'transparent',
                border: active ? '1px solid var(--mantine-color-indigo-2)' : '1px solid transparent',
                transition: 'all 0.2s ease',
            }}
        >
            <Group wrap="nowrap" gap="sm">
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    {lesson.completed ? (
                        <CheckCircle2 size={18} color="green" />
                    ) : (
                        <Icon size={18} color={active ? 'var(--mantine-color-indigo-6)' : 'gray'} />
                    )}
                </Box>
                <Box>
                    <Text size="sm" fw={active ? 800 : 500} c={active ? 'indigo.9' : 'gray.8'}>
                        {lesson.title}
                    </Text>
                    {active && (
                        <Badge size="xs" color="indigo" variant="light" mt={2}>
                            Currently Viewing
                        </Badge>
                    )}
                </Box>
            </Group>
        </Box>
    );
}