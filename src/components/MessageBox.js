import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { PRIORITY } from '../utils/enums';

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },

  buttonContainer: {
    textAlign: 'right'
  },

  paper: {
    padding: 10,
    marginBottom: 10,
  }
}));

const bgColor = {
  1: '#F56236',
  2: '#FCE788',
  3: '#88FCA3',
}
const MessagesBox = ({ messages, onClear, priority }) => {
  const css = useStyles();

  return (
    <div>
      Count {messages.length}
      {messages.map(({ message }, idx) =>
        <Paper key={idx} style={{  backgroundColor: bgColor[priority],  }} className={css.paper}>
          <div>{message}</div>
          <div className={css.buttonContainer}>
            <button className={css.button} onClick={() => onClear({message})}>Clear</button>
          </div>
        </Paper>
      )}
    </div>
  )
}

export default React.memo(MessagesBox)
