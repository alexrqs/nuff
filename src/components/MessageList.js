import React, { Component, useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'

import MessagesBox from './MessageBox';
import { PRIORITY } from '../utils/enums'
import { APIContext } from '../AppProvider';

const MessageList = () => {
  const { messages, onDelete, isApiStarted, toggleApi, clearMessages } = useContext(APIContext)
  const errorMessages = messages.filter(m => m.priority === PRIORITY.ERROR).reverse()
  const warningMessages = messages.filter(m => m.priority === PRIORITY.WARNING).reverse()
  const infoMessages = messages.filter(m => m.priority === PRIORITY.INFO).reverse()
  const newError = "message of error"

  const RenderButton = React.memo(() => (
    <Button
        variant="contained"
        onClick={toggleApi}
      >
      {isApiStarted ? 'Stop Messages' : 'Start Messages'}
    </Button>
  ))

  const RenderClearButton = React.memo(() => (
    <Button variant="contained" onClick={clearMessages} >
      Clear Messages
    </Button>
  ))

  return (
    <div>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}><RenderButton /></Grid>
        <Grid item xs={3}><RenderClearButton /></Grid>
        <Grid item xs={3}></Grid>
      </Grid>

      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={4}>
          <h3>Error Type 1</h3>
          <MessagesBox messages={errorMessages} onClear={onDelete} priority={PRIORITY.ERROR} />
        </Grid>

        <Grid item xs={4}>
          <h3>Warning Type 2</h3>
          <MessagesBox messages={warningMessages} onClear={onDelete} priority={PRIORITY.WARNING} />
        </Grid>

        <Grid item xs={4}>
          <h3>Info Type 3</h3>
          <MessagesBox messages={infoMessages} onClear={onDelete} priority={PRIORITY.INFO} />
        </Grid>
      </Grid>
    </div>
  )
}

export default React.memo(MessageList)
