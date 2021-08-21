import React, { useContext } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { APIContext } from '../App'
import { useEffect } from 'react';

function Alert(props) {
  return <MuiAlert elevation={5} variant="filled" {...props} />;
}

export const SnackbarError = () => {
  const { newError } = useContext(APIContext)
  const [open, setOpen] = React.useState(!!newError);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    if (!!newError) {
      setOpen(true)
    }
  }, [newError])

  return (
    <Snackbar open={open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
      <Alert severity="error" onClose={handleClose}>
        {newError}
      </Alert>
    </Snackbar>
  )
}
