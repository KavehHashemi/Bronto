import FullCalendar from '@fullcalendar/react';
import Dialog from '@mui/material/Dialog'
type props = {
    calendarRef: React.RefObject<FullCalendar>;
    open: boolean;
    openHandler: () => void
}

const DateComponent = ({ open, openHandler, calendarRef }: props) => {
    return (
        <Dialog open={open} onClose={openHandler}>DateComponent</Dialog>
    )
}

export default DateComponent