import Dialog from '@mui/material/Dialog'
import Header from "@mui/material/DialogTitle"
import Content from "@mui/material/DialogContent";
import Action from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import moment, { Moment } from "moment"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateComponentProps } from "../Types";
import { useState } from 'react';


const DateComponent = ({ open, openHandler, calendarRef }: DateComponentProps) => {
    const [date, setDate] = useState<Moment | null>(moment())

    const GoTo = () => {
        if (calendarRef) {
            calendarRef.current?.getApi().gotoDate(date?.toDate())
        }
        openHandler();
    }

    if (!open) return null
    return (
        <Dialog open={open} onClose={openHandler}>
            <Header style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    Select a date to go to
                </div>
                <IconButton onClick={openHandler}>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Header>
            <Content style={{ padding: "0" }}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <StaticDatePicker
                        mask="____/__/__"
                        displayStaticWrapperAs='desktop'
                        value={date}
                        onChange={(e) => setDate(e)}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Content>
            <Action>
                <Button
                    variant="text"
                    color='inherit'
                    onClick={openHandler}
                > cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={GoTo}
                > Go
                </Button>
            </Action>
        </Dialog>
    )
}

export default DateComponent