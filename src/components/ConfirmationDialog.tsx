import Dialog from '@mui/material/Dialog'
import Header from '@mui/material/DialogTitle'
import Content from '@mui/material/DialogContent'
import Action from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { ConfirmationDialogProps } from '../Types';

const ConfirmationDialog = ({ open, openHandler, title, type, confirmation }: ConfirmationDialogProps) => {
    if (!open) return null
    return (
        <Dialog fullWidth open={open} onClose={() => openHandler(false)}>
            <Header>{`Delete ${type}`}</Header>
            <Content>{`Are you sure you want to delete ${title}?`}</Content>
            <Action>
                <Button color="inherit" onClick={() => openHandler(false)}>Cancel</Button>
                <Button variant='contained' color='error' onClick={() => { confirmation(true); openHandler(false) }}>Delete</Button>
            </Action>
        </Dialog>
    )
}

export default ConfirmationDialog