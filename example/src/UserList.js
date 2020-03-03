/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useMemo } from 'react';
import { Paper } from '@material-ui/core';
import Table, {actions, tools} from 'reactkit-table';

const {DetailsAction, editAction, deleteAction} = actions;
const {AddTool} = tools;

export default function UserList() {
  const records = useMemo(
    () => getAllUsers(),
    []
  );

  const columns = useMemo(
    () => [
      {
        label: '帐号',
        name: 'username',
      },
      {
        label: '启用?',
        name: record => record.enabled ? '启用' : '禁用',
      },
      {
        id: 'role',
        label: '角色',
        name: record => record.role.name,
        filter: 'select',
      },
      {
        label: '姓名',
        name: 'name',
      },
      {
        label: '性别',
        name: record => ({MALE: '男', FEMALE: '女'})[record.gender],
      },
      {
        label: '电话',
        name: 'phoneNumber',
      },
      {
        label: '创建时间',
        name: 'createDate',
        type: 'date',
        parse: true,
      },
      {
        label: '更新时间',
        name: 'updateDate',
        type: 'date',
        parse: true,
      },
    ],
    []
  );

  const actions = useMemo(
    () => [
      DetailsAction,
      editAction(({record: {id}}) => ({disabled: id === 1})),
      deleteAction(({record: {id}}) => ({disabled: id === 1})),
    ],
    []
  );

  const tools = useMemo(
    () => [
      AddTool,
    ],
    []
  );

  return (
    <Fragment>
      <h2>用户管理</h2>
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
