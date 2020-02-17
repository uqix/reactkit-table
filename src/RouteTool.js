/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = (({string, element, bool, oneOfType}) => ({
  to: string.isRequired,
  children: oneOfType([string, element]).isRequired,
  color: string,
  disabled: bool,
}))(PropTypes);

const RouteTool = props => (
  <Button
    variant='outlined'
    size='small'
    component={Link}
    {...props}
  />
);

RouteTool.propTypes = propTypes;

export default RouteTool;
