/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useMemo } from 'react';
import { Paper, Button } from '@material-ui/core';
import Table, {buttonTool} from 'reactkit-table';
import { Add } from '@material-ui/icons';
import faker from 'faker';

export default function UserList() {
  const records = useMemo(
    () => getAllUsers(),
    []
  );

  const columns = useMemo(
    () => [
      {
        label: 'Account',
        children: [
          {
            label: 'Username',
            name: 'username',
          },
          {
            id: 'role',
            label: 'Role',
            name: record => record.role.name,
            filter: 'select',
          },
          {
            label: 'Enabled?',
            name: 'enabled',
            format: value => value ? 'enabled' : 'disabled',
          },
        ],
      },
      {
        label: 'Personal Info',
        children: [
          {
            label: 'Name',
            name: 'name',
          },
          {
            label: 'Gender',
            name: 'gender',
            format: value => value.toLowerCase(),
          },
          {
            label: 'Phone Number',
            name: 'phoneNumber',
          },
        ],
      },
      {
        label: 'Date Created',
        name: 'createDate',
        type: 'date',
        format: 'yyyy-MM-dd HH:mm',
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      ({record: {name, role}}) => (
        <Button
          css={css`min-width: 32px;`}
          size='small'
          onClick={() => alert(`User details: ${name}, ${role.name}`)}
          color='primary'
        >
          Details
        </Button>
      ),
    ],
    []
  );

  const tools = useMemo(
    () => [
      buttonTool(
        'Add',
        () => alert('Add user'),
        {startIcon: <Add />}
      ),
    ],
    []
  );

  return (
    <Fragment>
      <h2>Users</h2>
      <Paper>
        <Table
          columns={columns}
          records={records}
          actions={actions}
          tools={tools}
        />
      </Paper>
    </Fragment>
  );
}

function getAllUsers() {
  const roles = getAllRoles();
  const users = [];
  for (let i = 0; i < 150; i++) {
    users.push({
      id: i + 1,
      username: faker.internet.userName(),
      role: faker.random.arrayElement(roles),
      enabled: faker.random.boolean(),

      name: faker.name.findName(),
      gender: faker.random.arrayElement(['MALE', 'FEMALE']),
      phoneNumber: faker.phone.phoneNumber(),
      createDate: faker.date.past(),
    });
  }
  return users;
}

function getAllRoles() {
  const roles = [];
  for (let i = 0; i < 20; i++) {
    roles.push({
      id: i + 1,
      name: faker.name.jobTitle(),
    });
  }
  return roles;
}
