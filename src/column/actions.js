/** @jsx jsx */
import routeAction from './routeAction';

// -------- util actions --------

export const DetailsAction = routeAction(
  '详情',
  ({record: {id}, match}) => `${match.url}/${id}`,
  {color: 'primary'}
);

export function editAction(button) {
  return routeAction(
    '修改',
    ({record: {id}, match}) => `${match.url}/${id}/edit`,
    button
  );
}

export const EditAction = editAction();

export function deleteAction(button) {
  return routeAction(
    '删除',
    ({record: {id, name}, match}) => `${match.url}/${id}/delete/${name}`,
    {color: 'secondary'},
    button
  );
}

export const DeleteAction = deleteAction();
