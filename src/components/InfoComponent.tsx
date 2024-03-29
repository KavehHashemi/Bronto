import Dialog from '@mui/material/Dialog'
import Header from "@mui/material/DialogTitle"
import Content from "@mui/material/DialogContent"
import Action from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import { InfoComponentProps } from "../Types";
const InfoComponent = ({ open, openHandler }: InfoComponentProps) => {
    return (
        <Dialog fullWidth open={open} onClose={openHandler}>
            <Header style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                    How to use this app
                </div>
                <IconButton onClick={openHandler}>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Header>
            <Content style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>- Click on any date to add a new event</div>
                <div>- Click on any event to edit or delete the event</div>
                <div>- Move the start or the end of an event to edit its start or end time</div>
                <div>- Drag and drop an event to change its start and end time</div>
                <div>- Click on "Resources" button to add, edit, or delete resources</div>
                <div>- Click on "Operations" button to add, edit, or delete operations</div>
            </Content>
            <Action>
                <Button onClick={openHandler}>Close</Button>
            </Action>
        </Dialog>
    )
}

export default InfoComponent