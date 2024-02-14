import React, {useState} from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ModalContainer = ({show, setShow, ...props}) => {
    const handleClose = () => {
        setShow(false)
    }


  return (
      
<Dialog
  open={show}
  onClose = {handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  className = "modalCont"
>
  {
      props.children
  }
</Dialog>

  )
}

export default ModalContainer
