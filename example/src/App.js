import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as EmThemeProvider } from 'emotion-theming';
import { createMuiTheme, ThemeProvider as MrThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { zhCN } from '@material-ui/core/locale';
import { DndProvider } from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import Main from './Main';

const theme = createMuiTheme(
  {
  },
  zhCN,
);

export default function App() {
  return (
    <MrThemeProvider theme={theme}>
      <EmThemeProvider theme={theme}>
        <DndProvider backend={Html5Backend}>
          <BrowserRouter>
            <CssBaseline />
            <Main />
          </BrowserRouter>
        </DndProvider>
      </EmThemeProvider>
    </MrThemeProvider>
  );
}
