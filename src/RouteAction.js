/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const propTypes = (({string, element, bool, oneOfType}) => ({
  to: string.isRequired,
  children: oneOfType([string, element]).isRequired,
  color: string,
  disabled: bool,
}))(PropTypes);

const RouteAction = props => (
  <Button
    css={css`min-width: 32px;`}
    size='small'
    component={Link}
    {...props}
  />
);

RouteAction.propTypes = propTypes;

export default RouteAction;
