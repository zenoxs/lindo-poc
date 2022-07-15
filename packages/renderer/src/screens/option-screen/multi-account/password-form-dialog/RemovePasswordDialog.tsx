import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material'

export interface RemovePasswordDialogProps {
  onClose: () => void
  open: boolean
}

export const RemovePasswordDialog = ({ open, onClose }: RemovePasswordDialogProps) => {
  const handleRemovePassword = async () => {
    window.lindoAPI.removeMasterPassword()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove your master password ?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          If you remove your master password you will lost your multi account configuration
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRemovePassword} color='error'>
          Remove Password
        </Button>
        <Button onClick={onClose} autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
