/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useMemo } from 'react';
import { Paper, Button } from '@material-ui/core';
import Table, {buttonTool} from 'reactkit-table';
import { Add } from '@material-ui/icons';

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
            format: value => value.charAt(0) + value.substring(1).toLowerCase(),
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
        parse: true,
        format: 'yyyy-MM-dd HH:mm',
      },
      {
        label: 'Date Updated',
        name: 'updateDate',
        type: 'date',
        parse: true,
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
  return [
    {
      "id": 1000,
      "username": "1",
      "enabled": false,
      "name": "1",
      "gender": "MALE",
      "phoneNumber": "1",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-08 18:28:34",
      "role": {
        "id": 1000,
        "name": "test",
        "permissions": []
      }
    },
    {
      "id": 11,
      "username": "11",
      "enabled": true,
      "name": "11",
      "gender": "MALE",
      "phoneNumber": "2",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1001,
        "name": "没有女的",
        "permissions": []
      }
    },
    {
      "id": 12,
      "username": "12",
      "enabled": false,
      "name": "12",
      "gender": "FEMALE",
      "phoneNumber": "3",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1,
        "name": "系统管理员",
        "permissions": []
      }
    },
    {
      "id": 13,
      "username": "13",
      "enabled": false,
      "name": "13",
      "gender": "FEMALE",
      "phoneNumber": "4",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1,
        "name": "系统管理员",
        "permissions": []
      }
    },
    {
      "id": 14,
      "username": "14",
      "enabled": false,
      "name": "14",
      "gender": "FEMALE",
      "phoneNumber": "5",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1000,
        "name": "test",
        "permissions": []
      }
    },
    {
      "id": 15,
      "username": "15",
      "enabled": false,
      "name": "15",
      "gender": "MALE",
      "phoneNumber": "6",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1000,
        "name": "test",
        "permissions": []
      }
    },
    {
      "id": 16,
      "username": "16",
      "enabled": false,
      "name": "16",
      "gender": "MALE",
      "phoneNumber": "7",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1,
        "name": "系统管理员",
        "permissions": []
      }
    },
    {
      "id": 17,
      "username": "17",
      "enabled": false,
      "name": "17",
      "gender": "FEMALE",
      "phoneNumber": "8",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1,
        "name": "系统管理员",
        "permissions": []
      }
    },
    {
      "id": 18,
      "username": "18",
      "enabled": false,
      "name": "18",
      "gender": "FEMALE",
      "phoneNumber": "9",
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1000,
        "name": "test",
        "permissions": []
      }
    },
    {
      "id": 20,
      "username": "20",
      "enabled": false,
      "name": "20",
      "gender": "MALE",
      "phoneNumber": null,
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1,
        "name": "系统管理员",
        "permissions": []
      }
    },
    {
      "id": 19,
      "username": "19",
      "enabled": false,
      "name": "19",
      "gender": "MALE",
      "phoneNumber": null,
      "remark": null,
      "createDate": "2020-02-05 10:39:22",
      "updateDate": "2020-02-07 17:03:02",
      "role": {
        "id": 1000,
        "name": "test",
        "permissions": []
      }
    },
    {
      "id": 1,
      "username": "root",
      "enabled": true,
      "name": "根管理员",
      "gender": "FEMALE",
      "phoneNumber": null,
      "remark": null,
      "createDate": "2020-02-04 14:44:32",
      "updateDate": "2020-02-04 14:44:32",
      "role": {
        "id": 1,
        "name": "系统管理员",
        "permissions": []
      }
    }
  ];
}
