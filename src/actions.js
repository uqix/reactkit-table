/** @jsx jsx */
import { jsx } from '@emotion/core';
import RouteAction from './RouteAction';

export const DetailsAction = ({row: {id}, match, ...others}) => (
  <RouteAction
    to={`${match.url}/${id}`}
    color='primary'
    {...others}
  >
    详情
  </RouteAction>
);

export const EditAction = ({row: {id}, match, ...others}) => (
  <RouteAction
    to={`${match.url}/${id}/edit`}
    {...others}
  >
    修改
  </RouteAction>
);

export const DeleteAction = ({row: {id, name}, match, ...others}) => (
  <RouteAction
    to={`${match.url}/${id}/delete/${name}`}
    color='secondary'
    {...others}
  >
    删除
  </RouteAction>
);
