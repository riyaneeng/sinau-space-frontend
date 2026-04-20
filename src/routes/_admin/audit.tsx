import { createFileRoute } from '@tanstack/react-router';
import {
  Stack, Group, Title, Text, Paper, Table, Badge,
  ActionIcon, Box, TextInput, Select,
  ScrollArea, Code, Pagination, HoverCard,
  Grid, Button
} from '@mantine/core';
import {
  Search,
  Filter,
  Eye,
  Download,
  History,
  Terminal,
  Calendar,
  User
} from 'lucide-react';

export const Route = createFileRoute('/_admin/audit')({
  component: SystemAuditTrail,
})

// Data Dummy Log Aktivitas
const AUDIT_LOGS = [
  {
    id: 'LOG-8821',
    timestamp: '2026-04-12 21:05:42',
    user: 'Alex Rivera (Admin)',
    action: 'UPDATE_ROLE',
    target: 'Sarah Connor',
    severity: 'Warning',
    ip: '182.16.2.10',
    details: { old: 'Mentor', new: 'Admin' }
  },
  {
    id: 'LOG-8820',
    timestamp: '2026-04-12 20:15:10',
    user: 'System (CronJob)',
    action: 'DB_BACKUP',
    target: 'AWS-S3-Region1',
    severity: 'Info',
    ip: '127.0.0.1',
    details: { status: 'Success', size: '1.2GB' }
  },
  {
    id: 'LOG-8819',
    timestamp: '2026-04-12 19:42:05',
    user: 'Budi Santoso (Student)',
    action: 'FAILED_LOGIN',
    target: 'Login Page',
    severity: 'Critical',
    ip: '103.12.5.88',
    details: { attempts: 5, reason: 'Wrong Password' }
  },
  {
    id: 'LOG-8818',
    timestamp: '2026-04-12 18:20:00',
    user: 'Dafara Syah (Admin)',
    action: 'DELETE_PROJECT',
    target: 'Eco-System V1',
    severity: 'Critical',
    ip: '182.16.2.11',
    details: { project_id: 'PRJ-99', deleted_by: 'Dafara' }
  },
  {
    id: 'LOG-8817',
    timestamp: '2026-04-12 17:10:30',
    user: 'Maya Indah (Mentor)',
    action: 'CREATE_TEMPLATE',
    target: 'UI/UX Advanced',
    severity: 'Info',
    ip: '110.22.4.5',
    details: { type: 'Curriculum' }
  },
];

function SystemAuditTrail() {

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'red';
      case 'Warning': return 'orange';
      case 'Info': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <Stack gap="lg">
      {/* HEADER */}
      <Group justify="space-between">
        <Box>
          <Title order={2} lts={-0.5} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={28} /> Audit Trail logs
          </Title>
          <Text size="sm" c="dimmed">Rekaman permanen dari seluruh aktivitas sistem dan administratif.</Text>
        </Box>
        <Button variant="outline" color="slate.6" leftSection={<Download size={16} />}>
          Download Audit Report
        </Button>
      </Group>

      {/* ADVANCED FILTERS */}
      <Paper withBorder p="md" radius="md">
        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <TextInput
              placeholder="Cari user, aksi, atau IP address..."
              leftSection={<Search size={16} />}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 2 }}>
            <Select
              placeholder="Severity"
              data={['All', 'Critical', 'Warning', 'Info']}
              defaultValue="All"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <TextInput
              placeholder="Select Date Range"
              leftSection={<Calendar size={16} />}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Button fullWidth color="slate.9" leftSection={<Filter size={16} />}>
              Apply Filters
            </Button>
          </Grid.Col>
        </Grid>
      </Paper>

      {/* AUDIT TABLE */}
      <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
        <ScrollArea>
          <Table verticalSpacing="md" highlightOnHover>
            <Table.Thead bg="slate.0">
              <Table.Tr>
                <Table.Th>Log ID</Table.Th>
                <Table.Th>Timestamp</Table.Th>
                <Table.Th>Initiator</Table.Th>
                <Table.Th>Action</Table.Th>
                <Table.Th>Severity</Table.Th>
                <Table.Th align="right">Quick View</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {AUDIT_LOGS.map((log) => (
                <Table.Tr key={log.id}>
                  <Table.Td>
                    <Text size="xs" fw={700} c="dimmed">{log.id}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs">{log.timestamp}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <User size={14} color="gray" />
                      <Box>
                        <Text size="xs" fw={700}>{log.user}</Text>
                        <Text size="10px" c="dimmed">IP: {log.ip}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={6}>
                      <Terminal size={14} color="gray" />
                      <Code color="slate.1" c="slate.9" fw={700}>{log.action}</Code>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="filled"
                      color={getSeverityColor(log.severity)}
                      size="sm"
                    >
                      {log.severity}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group justify="flex-end">
                      <HoverCard width={300} shadow="md">
                        <HoverCard.Target>
                          <ActionIcon variant="subtle" color="slate.4">
                            <Eye size={16} />
                          </ActionIcon>
                        </HoverCard.Target>
                        <HoverCard.Dropdown>
                          <Stack gap="xs">
                            <Text size="xs" fw={700}>Raw Metadata:</Text>
                            <Code block bg="slate.0" p="xs" >
                              {JSON.stringify(log.details, null, 2)}
                            </Code>
                          </Stack>
                        </HoverCard.Dropdown>
                      </HoverCard>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>

      {/* FOOTER */}
      <Group justify="space-between" pb="xl">
        <Text size="xs" c="dimmed">Log disimpan selama 90 hari sesuai protokol keamanan.</Text>
        <Pagination total={10} color="orange.6" radius="md" />
      </Group>
    </Stack>
  );
}