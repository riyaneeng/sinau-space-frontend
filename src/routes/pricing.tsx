import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import {
    Container,
    Text,
    Stack,
    Title,
    SimpleGrid,
    ThemeIcon,
    Box,
    rem,
    Paper,
    Badge,
    Button,
    Group,
    Switch,
    Divider,
    Table,
    ScrollArea
} from '@mantine/core';
import { Check, Zap, ShieldCheck, Rocket, Building2 } from 'lucide-react';

export const Route = createFileRoute('/pricing')({
    component: PricingPage,
});

function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    const plans = [
        {
            name: 'Starter',
            description: 'Cocok untuk mentor independen yang baru memulai.',
            monthlyPrice: 49,
            yearlyPrice: 39,
            features: ['20 Active Students', 'Basic AI Persona', 'Automated Review Queue', 'Email Support'],
            icon: Zap,
            color: 'blue',
        },
        {
            name: 'Professional',
            description: 'Solusi lengkap untuk akselerator & bootcamp.',
            monthlyPrice: 199,
            yearlyPrice: 159,
            features: ['100 Active Students', 'Custom AI Persona Lab', 'Advanced Analytics Radar', 'Priority Support', 'Custom Domain'],
            icon: Rocket,
            color: 'indigo',
            popular: true,
        },
        {
            name: 'Enterprise',
            description: 'Infrastruktur khusus untuk institusi skala besar.',
            monthlyPrice: null,
            yearlyPrice: null,
            features: ['Unlimited Students', 'Multiple AI Personalities', 'White-label Branding', 'Dedicated Account Manager', 'SLA & Private Cloud'],
            icon: Building2,
            color: 'slate',
        },
    ];

    return (
        <Box bg="white" pb={rem(100)}>
            {/* 1. HEADER SECTION */}
            <Box
                pt={rem(100)}
                pb={rem(80)}
                bg="gray.0"
                style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}
            >
                <Container size="lg">
                    <Stack align="center" gap="md" ta="center">
                        <Badge variant="light" color="indigo" size="lg" radius="sm">Pricing Plans</Badge>
                        <Title style={{ fontSize: rem(48), fontWeight: 900, letterSpacing: '-1.5px' }}>
                            Investasi untuk <span style={{ color: 'var(--mantine-color-indigo-6)' }}>Skalabilitas.</span>
                        </Title>
                        <Text size="xl" c="dimmed" style={{ maxWidth: rem(600) }}>
                            Pilih paket yang sesuai dengan jumlah bimbingan Anda. Hemat hingga 20% dengan paket tahunan.
                        </Text>

                        {/* BILLING SWITCHER */}
                        <Group mt="xl" gap="sm">
                            <Text size="sm" fw={billingCycle === 'monthly' ? 700 : 500} c={billingCycle === 'monthly' ? 'black' : 'dimmed'}>Monthly</Text>
                            <Switch
                                checked={billingCycle === 'yearly'}
                                onChange={(event) => setBillingCycle(event.currentTarget.checked ? 'yearly' : 'monthly')}
                                color="indigo"
                                size="lg"
                            />
                            <Text size="sm" fw={billingCycle === 'yearly' ? 700 : 500} c={billingCycle === 'yearly' ? 'black' : 'dimmed'}>Yearly</Text>
                            <Badge variant="filled" color="teal" size="sm" radius="sm">Hemat 20%</Badge>
                        </Group>
                    </Stack>
                </Container>
            </Box>

            {/* 2. PRICING CARDS */}
            <Container size="lg" py={rem(80)}>
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
                    {plans.map((plan) => (
                        <Paper
                            key={plan.name}
                            withBorder
                            p={rem(40)}
                            radius="lg"
                            shadow={plan.popular ? 'xl' : 'sm'}
                            style={{
                                borderColor: plan.popular ? 'var(--mantine-color-indigo-5)' : undefined,
                                transform: plan.popular ? 'scale(1.05)' : 'none',
                                zIndex: plan.popular ? 2 : 1,
                                backgroundColor: 'white'
                            }}
                        >
                            {plan.popular && (
                                <Badge color="indigo" variant="filled" pos="absolute" top={-12} right={20}>
                                    Paling Populer
                                </Badge>
                            )}

                            <ThemeIcon variant="light" color={plan.color} size={50} radius="md" mb="md">
                                <plan.icon size={28} />
                            </ThemeIcon>

                            <Title order={3} mb={4}>{plan.name}</Title>
                            <Text size="xs" c="dimmed" mb="xl">{plan.description}</Text>

                            <Box mb="xl">
                                {plan.monthlyPrice ? (
                                    <Group align="flex-end" gap={4}>
                                        <Title order={1} style={{ fontSize: rem(42) }}>
                                            ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                                        </Title>
                                        <Text size="sm" c="dimmed" mb={8}>/bulan</Text>
                                    </Group>
                                ) : (
                                    <Title order={1} style={{ fontSize: rem(42) }}>Custom</Title>
                                )}
                            </Box>

                            <Divider my="xl" variant="dashed" />

                            <Stack gap="sm" mb={40}>
                                {plan.features.map((feature) => (
                                    <Group gap="xs" key={feature}>
                                        <ThemeIcon color="teal" size={20} radius="xl" variant="light">
                                            <Check size={14} strokeWidth={3} />
                                        </ThemeIcon>
                                        <Text size="sm" fw={500}>{feature}</Text>
                                    </Group>
                                ))}
                            </Stack>

                            <Button
                                fullWidth
                                size="lg"
                                radius="md"
                                color={plan.popular ? 'indigo' : 'gray'}
                                variant={plan.popular ? 'filled' : 'outline'}
                                component={Link}
                                to="/auth/register"
                            >
                                {plan.monthlyPrice === null ? 'Hubungi Kami' : 'Mulai Sekarang'}
                            </Button>
                        </Paper>
                    ))}
                </SimpleGrid>
            </Container>

            {/* 3. FEATURE COMPARISON (Optional for Deep Detail) */}
            <Container size="lg" py="xl">
                <Title order={3} ta="center" mb="xl">Perbandingan Fitur Detail</Title>
                <ScrollArea>
                    <Table verticalSpacing="md" withTableBorder>
                        <Table.Thead bg="gray.0">
                            <Table.Tr>
                                <Table.Th>Fitur</Table.Th>
                                <Table.Th ta="center">Starter</Table.Th>
                                <Table.Th ta="center">Professional</Table.Th>
                                <Table.Th ta="center">Enterprise</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            <Table.Tr>
                                <Table.Td fw={500}>AI Mentor Response Speed</Table.Td>
                                <Table.Td ta="center">Standar</Table.Td>
                                <Table.Td ta="center">High Priority</Table.Td>
                                <Table.Td ta="center">Dedicated</Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw={500}>Custom AI Training</Table.Td>
                                <Table.Td ta="center">-</Table.Td>
                                <Table.Td ta="center"><Check size={16} color="green" /></Table.Td>
                                <Table.Td ta="center"><Check size={16} color="green" /></Table.Td>
                            </Table.Tr>
                            <Table.Tr>
                                <Table.Td fw={500}>API Access</Table.Td>
                                <Table.Td ta="center">-</Table.Td>
                                <Table.Td ta="center">-</Table.Td>
                                <Table.Td ta="center"><Check size={16} color="green" /></Table.Td>
                            </Table.Tr>
                        </Table.Tbody>
                    </Table>
                </ScrollArea>
            </Container>

            {/* 4. TRUST BADGE / FOOTER CTA */}
            <Container size="sm" mt={rem(80)}>
                <Paper withBorder p="xl" radius="md" bg="indigo.0" style={{ borderStyle: 'dashed', borderColor: 'var(--mantine-color-indigo-3)' }}>
                    <Stack align="center" ta="center" gap="sm">
                        <ShieldCheck size={40} color="var(--mantine-color-indigo-6)" />
                        <Title order={4}>Butuh Penawaran Khusus?</Title>
                        <Text size="sm" c="dimmed">
                            Kami menyediakan diskon khusus untuk institusi nonprofit, edukasi, dan startup tahap awal.
                        </Text>
                        <Button variant="subtle" color="indigo">Ajukan Keringanan Biaya</Button>
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}