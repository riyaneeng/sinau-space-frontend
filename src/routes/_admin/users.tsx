import { useState, useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Stack, Group, Title, Text, Paper, Table, ActionIcon,
  Badge, Avatar, TextInput, Select, Menu, Checkbox,
  Pagination, ScrollArea, Button, Tooltip, Box
} from '@mantine/core';
import {
  Search, Filter, MoreVertical, ShieldCheck,
  UserMinus, Mail, Download, Edit2, UserPlus
} from 'lucide-react';

export const Route = createFileRoute('/_admin/users')({
  component: UserMasterlist,
})

// Data Dummy 15 User (Admin, Mentor, Student)
const USER_DATABASE = [
  { id: 1, name: 'Alex Rivera', email: 'alex@mentorstudio.com', role: 'Super Admin', status: 'Active', lastLogin: '2 mins ago' },
  { id: 2, name: 'Dafara Syah', email: 'dafara@student.com', role: 'Student', status: 'Active', lastLogin: '1 hour ago' },
  { id: 3, name: 'Sarah Connor', email: 'sarah@mentor.com', role: 'Mentor', status: 'Active', lastLogin: 'Yesterday' },
  { id: 4, name: 'Budi Santoso', email: 'budi@student.com', role: 'Student', status: 'Suspended', lastLogin: '2 weeks ago' },
  { id: 5, name: 'James Stark', email: 'james@ai-lab.com', role: 'Mentor', status: 'Active', lastLogin: '4 hours ago' },
  { id: 6, name: 'Larasati Putri', email: 'laras@student.id', role: 'Student', status: 'Active', lastLogin: '3 days ago' },
  { id: 7, name: 'Kevin Flynn', email: 'kevin@grid.com', role: 'Admin', status: 'Active', lastLogin: 'Just now' },
  { id: 8, name: 'Andi Wijaya', email: 'andi@student.com', role: 'Student', status: 'Inactive', lastLogin: '1 month ago' },
  { id: 9, name: 'Maya Indah', email: 'maya@design.com', role: 'Student', status: 'Active', lastLogin: '5 hours ago' },
  { id: 10, name: 'Eko Prasetyo', email: 'eko@corp.id', role: 'Mentor', status: 'Active', lastLogin: '12 mins ago' },
  { id: 11, name: 'Rina Nose', email: 'rina@talent.com', role: 'Student', status: 'Active', lastLogin: '30 mins ago' },
  { id: 12, name: 'Gading Marten', email: 'gading@auto.com', role: 'Student', status: 'Active', lastLogin: '6 hours ago' },
  { id: 13, name: 'Luna Maya', email: 'luna@stars.com', role: 'Mentor', status: 'Pending', lastLogin: 'Never' },
  { id: 14, name: 'Ariel Noah', email: 'ariel@music.id', role: 'Student', status: 'Active', lastLogin: '1 day ago' },
  { id: 15, name: 'Indro Warkop', email: 'indro@legend.com', role: 'Admin', status: 'Active', lastLogin: '2 days ago' },
];

function UserMasterlist() {
  const [activePage, setPage] = useState(1);
  const [selection, setSelection] = useState<string[]>([]);
  const pageSize = 10;

  const toggleSelection = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === pagedData.length ? [] : pagedData.map((item) => item.id.toString())));

  const pagedData = useMemo(() => {
    const start = (activePage - 1) * pageSize;
    return USER_DATABASE.slice(start, start + pageSize);
  }, [activePage]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Super Admin': return 'red';
      case 'Admin': return 'orange';
      case 'Mentor': return 'indigo';
      default: return 'gray';
    }
  };

  return (
    <Stack gap="lg">
      {/* HEADER */}
      <Group justify="space-between">
        <Box>
          <Title order={2} lts={-0.5}>User Masterlist</Title>
          <Text size="sm" c="dimmed">Total {USER_DATABASE.length} pengguna terdaftar di seluruh platform.</Text>
        </Box>
        <Group>
          <Button variant="outline" color="slate.6" leftSection={<Download size={16} />}>Export CSV</Button>
          <Button color="orange.6" leftSection={<UserPlus size={16} />}>Add New User</Button>
        </Group>
      </Group>

      {/* FILTER & BULK ACTIONS */}
      <Paper withBorder p="md" radius="md" shadow="xs">
        <Group justify="space-between">
          <Group flex={1}>
            <TextInput
              placeholder="Search by name, email, or ID..."
              leftSection={<Search size={16} />}
              style={{ flex: 1 }}
            />
            <Select
              placeholder="Filter Role"
              data={['All Roles', 'Admin', 'Mentor', 'Student']}
              defaultValue="All Roles"
              w={150}
            />
            <ActionIcon variant="light" size="lg" color="slate.6">
              <Filter size={18} />
            </ActionIcon>
          </Group>

          {selection.length > 0 && (
            <Group gap="xs">
              <Text size="xs" fw={700} c="orange.6">{selection.length} selected</Text>
              <Button size="xs" variant="light" color="red" leftSection={<UserMinus size={14} />}>Suspend</Button>
              <Button size="xs" variant="light" color="indigo" leftSection={<Mail size={14} />}>Broadcast</Button>
            </Group>
          )}
        </Group>
      </Paper>

      {/* MAIN TABLE */}
      <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
        <ScrollArea>
          <Table verticalSpacing="sm" highlightOnHover>
            <Table.Thead bg="slate.0">
              <Table.Tr>
                <Table.Th w={40}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === pagedData.length}
                    indeterminate={selection.length > 0 && selection.length < pagedData.length}
                  />
                </Table.Th>
                <Table.Th>User Info</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Last Activity</Table.Th>
                <Table.Th align="right">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {pagedData.map((user) => (
                <Table.Tr key={user.id} bg={selection.includes(user.id.toString()) ? 'orange.0' : undefined}>
                  <Table.Td>
                    <Checkbox
                      checked={selection.includes(user.id.toString())}
                      onChange={() => toggleSelection(user.id.toString())}
                    />
                  </Table.Td>
                  <Table.Td>
                    <Group gap="sm">
                      <Avatar radius="md" color={getRoleColor(user.role)} variant="light">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Box>
                        <Text size="sm" fw={700}>{user.name}</Text>
                        <Text size="xs" c="dimmed">{user.email}</Text>
                      </Box>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={getRoleColor(user.role)} variant="outline" size="sm">
                      {user.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      variant="dot"
                      color={user.status === 'Active' ? 'green' : user.status === 'Suspended' ? 'red' : 'gray'}
                    >
                      {user.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="xs" c="dimmed">{user.lastLogin}</Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={0} justify="flex-end">
                      <Tooltip label="Edit User">
                        <ActionIcon variant="subtle" color="slate.6"><Edit2 size={16} /></ActionIcon>
                      </Tooltip>
                      <Menu position="bottom-end" withinPortal shadow="md">
                        <Menu.Target>
                          <ActionIcon variant="subtle" color="slate.6"><MoreVertical size={16} /></ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Label>Quick Action</Menu.Label>
                          <Menu.Item leftSection={<ShieldCheck size={14} />}>Change Role</Menu.Item>
                          <Menu.Item leftSection={<Mail size={14} />}>Send Credentials</Menu.Item>
                          <Menu.Divider />
                          <Menu.Label>Danger Zone</Menu.Label>
                          <Menu.Item leftSection={<UserMinus size={14} />} color="red">Suspend Account</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>

      {/* FOOTER PAGINATION */}
      <Group justify="space-between" pb="xl">
        <Text size="xs" c="dimmed">Showing 10 of 1,240 users</Text>
        <Pagination
          total={Math.ceil(USER_DATABASE.length / pageSize)}
          value={activePage}
          onChange={setPage}
          color="orange.6"
          radius="md"
        />
      </Group>
    </Stack>
  );
}