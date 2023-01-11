import Dialog from '@mui/material/Dialog'
import { DateComponentProps } from "../Types";


const DateComponent = ({ open, openHandler, calendarRef }: DateComponentProps) => {
    return (
        <Dialog open={open} onClose={openHandler}>DateComponent</Dialog>
    )
}

export default DateComponent