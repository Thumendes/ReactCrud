import React from 'react'
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core'

export const Modal = props =>
    <Dialog
        open={props.open}>
        <DialogTitle>Realmente deseja Deletar?</DialogTitle>
        <DialogActions>
            <Button onClick={() => props.handleClose()} autoFocus>
                Não
                </Button>
            <Button onClick={() => props.handleClose(true)}>
                Sim
                </Button>
        </DialogActions>
    </Dialog>

