import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as EmThemeProvider } from 'emotion-theming';
import { createMuiTheme, ThemeProvider as MrThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DndProvider } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import Main from './Main';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Menu from './Menu';

// import { zhCN } from '@material-ui/core/locale';
// import {locales} from 'reactkit-table';

const theme = createMuiTheme(
  {
    typography: {
      button: {
        textTransform: 'none',
      }
    },
  },
  // zhCN,
  // locales.zhCN,
);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <MrThemeProvider theme={theme}>
      <EmThemeProvider theme={theme}>
        <DndProvider backend={Html5Backend}>
          <BrowserRouter>
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <Typography variant="h6" noWrap>
                    reactkit-table examples
                  </Typography>
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper,
                }}
                anchor="left"
              >
                <div className={classes.toolbar} />
                <Divider />
                <Menu />
              </Drawer>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Main />
              </main>
            </div>
          </BrowserRouter>
        </DndProvider>
      </EmThemeProvider>
    </MrThemeProvider>
  );
}
