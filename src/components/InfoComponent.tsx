import Dialog from '@mui/material/Dialog'
type props = {
    open: boolean;
    openHandler: () => void
}
const InfoComponent = ({ open, openHandler }: props) => {
    return (
        <Dialog fullWidth open={open} onClose={openHandler}>InfoComponent</Dialog>
    )
}

export default InfoComponent