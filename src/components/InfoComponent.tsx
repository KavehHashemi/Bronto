import Dialog from '@mui/material/Dialog'
import { InfoComponentProps } from "../Types";
const InfoComponent = ({ open, openHandler }: InfoComponentProps) => {
    return (
        <Dialog fullWidth open={open} onClose={openHandler}>InfoComponent</Dialog>
    )
}

export default InfoComponent