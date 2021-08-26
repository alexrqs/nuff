import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';

import MessageList from './components/MessageList'
import Api from './Api'
import AppProvider from './AppProvider'
import { SnackbarError } from './components/SnackbarError';
import { PRIORITY } from './utils/enums';

const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <SnackbarError />
        <MessageList />
      </AppProvider>
    </ThemeProvider>
  )
}
