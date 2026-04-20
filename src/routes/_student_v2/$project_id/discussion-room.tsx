import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
    Grid, Text, Title, Stack, Group, Box, rem, Paper, Badge,
    Avatar, TextInput, ActionIcon, ScrollArea, Divider,
    UnstyledButton, Indicator
} from '@mantine/core';
import {
    Send, Hash, Search, Plus, MoreVertical,
    Image as ImageIcon, Smile,
    Bot, CheckCheck, Users
} from 'lucide-react';

export const Route = createFileRoute(
    '/_student_v2/$project_id/discussion-room',
)({
    component: RouteComponent,
})

function RouteComponent() {
    const [activeChannel, setActiveChannel] = useState('ch-2');

    const channels = [
        { id: 'ch-general', title: 'General Lounge', type: 'social' },
        { id: 'ch-1', title: 'Chapter 1: UX Intro', type: 'study' },
        { id: 'ch-2', title: 'Chapter 2: Figma mastery', type: 'study', unread: 3 },
        { id: 'ch-qna', title: 'Q&A with Mentor', type: 'support' },
    ];

    return (
        <Box bg="white" h="calc(100vh - 70px)" style={{ overflow: 'hidden' }}>
            <Grid gap={0} h="100%">

                {/* 1. CHANNEL SIDEBAR (LEFT) */}
                <Grid.Col span={{ base: 12, md: 3 }} style={{ borderRight: '1px solid var(--mantine-color-gray-2)' }}>
                    <Box p="md">
                        <Group justify="space-between" mb="xl">
                            <Title order={4} lts={-0.5}>Discussions</Title>
                            <ActionIcon variant="light" color="indigo" radius="md">
                                <Plus size={18} />
                            </ActionIcon>
                        </Group>

                        <TextInput
                            placeholder="Cari channel..."
                            leftSection={<Search size={14} />}
                            mb="xl"
                            radius="md"
                        />

                        <Stack gap={4}>
                            <Text size="xs" fw={800} c="dimmed" tt="uppercase" lts={1} mb={4} px="sm">Channels</Text>
                            {channels.map((ch) => (
                                <UnstyledButton
                                    key={ch.id}
                                    onClick={() => setActiveChannel(ch.id)}
                                    p="sm"
                                    style={{
                                        borderRadius: rem(8),
                                        backgroundColor: activeChannel === ch.id ? 'var(--mantine-color-indigo-0)' : 'transparent',
                                        transition: 'background 0.2s ease'
                                    }}
                                >
                                    <Group justify="space-between" wrap="nowrap">
                                        <Group gap="xs" wrap="nowrap">
                                            <Hash size={16} color={activeChannel === ch.id ? 'var(--mantine-color-indigo-6)' : 'gray'} />
                                            <Text size="sm" fw={activeChannel === ch.id ? 700 : 500} c={activeChannel === ch.id ? 'indigo.9' : 'gray.7'}>
                                                {ch.title}
                                            </Text>
                                        </Group>
                                        {ch.unread && <Badge size="xs" color="red" variant="filled">{ch.unread}</Badge>}
                                    </Group>
                                </UnstyledButton>
                            ))}
                        </Stack>
                    </Box>
                </Grid.Col>

                {/* 2. CHAT AREA (CENTER) */}
                <Grid.Col span={{ base: 12, md: 6 }} bg="gray.0" style={{ display: 'flex', flexDirection: 'column' }}>
                    {/* Chat Header */}
                    <Box p="md" bg="white" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
                        <Group justify="space-between">
                            <Group>
                                <Hash size={20} color="var(--mantine-color-indigo-6)" />
                                <Box>
                                    <Text fw={700} size="sm">Chapter 2: Figma Mastery</Text>
                                    <Text size="10px" c="dimmed">12 Members online</Text>
                                </Box>
                            </Group>
                            <ActionIcon variant="subtle" color="gray"><MoreVertical size={18} /></ActionIcon>
                        </Group>
                    </Box>

                    {/* Chat Messages */}
                    <ScrollArea style={{ flex: 1 }} p="xl" offsetScrollbars>
                        <Stack gap="xl">
                            <Divider label="Yesterday" labelPosition="center" />

                            <ChatMessage
                                user="Aris Wijaya"
                                role="Mentor"
                                content="Halo semuanya! Untuk tugas di Chapter 2, pastikan kalian sudah mencoba fitur Multi-edit di Figma ya. Ada kendala?"
                                time="14:20"
                                isMentor
                            />

                            <ChatMessage
                                user="Dafara Syah"
                                content="Mentor, apakah Multi-edit ini bisa digunakan untuk komponen yang berbeda varian?"
                                time="14:25"
                                isMe
                            />

                            <ChatMessage
                                user="Sarah Chen"
                                content="Iya, saya juga penasaran soal itu. Tadi saya coba agak bingung di bagian seleksinya."
                                time="14:28"
                            />

                            <Box p="sm" bg="indigo.0" style={{ borderRadius: rem(12), border: '1px dashed var(--mantine-color-indigo-2)' }}>
                                <Group gap="xs">
                                    <Bot size={16} color="var(--mantine-color-indigo-6)" />
                                    <Text size="xs" fw={700} c="indigo.9">AI Insight:</Text>
                                    <Text size="xs" c="indigo.8">Multi-edit bekerja paling optimal jika layer memiliki nama yang identik di seluruh frame.</Text>
                                </Group>
                            </Box>
                        </Stack>
                    </ScrollArea>

                    {/* Chat Input */}
                    <Box p="md" bg="white">
                        <Paper withBorder p="xs" radius="lg" shadow="xs">
                            <Group gap="xs">
                                <ActionIcon variant="subtle" color="gray"><Plus size={20} /></ActionIcon>
                                <TextInput
                                    placeholder="Ketik pesan ke #chapter-2..."
                                    variant="unstyled"
                                    style={{ flex: 1 }}
                                />
                                <Group gap={4}>
                                    <ActionIcon variant="subtle" color="gray"><Smile size={20} /></ActionIcon>
                                    <ActionIcon variant="subtle" color="gray"><ImageIcon size={20} /></ActionIcon>
                                    <ActionIcon variant="filled" color="indigo" radius="md" size="lg">
                                        <Send size={18} />
                                    </ActionIcon>
                                </Group>
                            </Group>
                        </Paper>
                    </Box>
                </Grid.Col>

                {/* 3. MEMBER LIST / INFO (RIGHT) */}
                <Grid.Col span={{ base: 12, md: 3 }} visibleFrom="md">
                    <Box p="md">
                        <Text fw={800} size="xs" tt="uppercase" lts={1} c="dimmed" mb="xl">Participants</Text>

                        <Stack gap="md">
                            <Text size="xs" fw={700} c="indigo">Mentor — 1</Text>
                            <ParticipantItem name="Aris Wijaya" role="Mentor" online />

                            <Divider />

                            <Text size="xs" fw={700} c="dimmed">Students — 24</Text>
                            <ParticipantItem name="Dafara Syah" online />
                            <ParticipantItem name="Sarah Chen" online />
                            <ParticipantItem name="James Stark" />
                            <ParticipantItem name="Jessica Valentine" />
                        </Stack>

                        <Paper mt={rem(100)} p="md" radius="md" bg="gray.0">
                            <Group gap="xs" mb={8}>
                                <Users size={16} />
                                <Text size="xs" fw={700}>Class Stats</Text>
                            </Group>
                            <Text size="xs" c="dimmed">85% dari teman sekelasmu sudah menyelesaikan Chapter 2.</Text>
                        </Paper>
                    </Box>
                </Grid.Col>
            </Grid>
        </Box>
    );
}

// --- SUB COMPONENTS ---

function ChatMessage({ user, content, time, isMentor, isMe, role }: any) {
    return (
        <Group align="flex-start" gap="sm" justify={isMe ? 'flex-end' : 'flex-start'} wrap="nowrap">
            {!isMe && <Avatar color={isMentor ? 'indigo' : 'gray'} radius="md">{user.charAt(0)}</Avatar>}
            <Box style={{ maxWidth: '80%' }}>
                <Group gap="xs" mb={4} justify={isMe ? 'flex-end' : 'flex-start'}>
                    <Text size="xs" fw={700}>{user}</Text>
                    {isMentor && <Badge size="xs" variant="filled" color="indigo">{role}</Badge>}
                    <Text size="10px" c="dimmed">{time}</Text>
                </Group>
                <Paper
                    p="sm"
                    radius="lg"
                    bg={isMe ? 'indigo.6' : 'white'}
                    c={isMe ? 'white' : 'black'}
                    withBorder={!isMe}
                    style={{
                        borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                        boxShadow: 'var(--mantine-shadow-xs)'
                    }}
                >
                    <Text size="sm">{content}</Text>
                    {isMe && (
                        <Group justify="flex-end" mt={4}>
                            <CheckCheck size={12} color="rgba(255,255,255,0.7)" />
                        </Group>
                    )}
                </Paper>
            </Box>
            {isMe && <Avatar color="indigo" radius="md">DS</Avatar>}
        </Group>
    );
}

function ParticipantItem({ name, role, online }: any) {
    return (
        <Group gap="sm" wrap="nowrap" style={{ cursor: 'pointer' }}>
            <Indicator color="green" offset={2} position="bottom-end" disabled={!online} withBorder>
                <Avatar size="sm" radius="md" color="gray">{name.charAt(0)}</Avatar>
            </Indicator>
            <Box>
                <Text size="xs" fw={600} c={online ? 'dark' : 'dimmed'}>{name}</Text>
                {role && <Text size="10px" c="indigo">{role}</Text>}
            </Box>
        </Group>
    );
}