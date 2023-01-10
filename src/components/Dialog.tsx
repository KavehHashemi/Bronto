import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Actions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { createPortal } from 'react-dom';
import { ContentType, DialogProps, EventType } from "../Types";
import EventComponent from "./EventComponent";
import ResourceComponent from "./ResourceComponent";


const Modal = ({ show, handleShow, contentType, content, calendarRef }: DialogProps) => {
    if (!show) return null
    if (contentType === ContentType.event)
        return createPortal(
            <Dialog fullWidth open={show} onClose={handleShow}>
                <EventComponent event={content as EventType} calendarRef={calendarRef} isNew={content.title === "" ? true : false}></EventComponent>
            </Dialog>
            , document.body)

    else if (contentType === ContentType.resource)
        return createPortal(
            <Dialog fullWidth open={show} onClose={handleShow}>
                <ResourceComponent calendarRef={calendarRef}></ResourceComponent>
            </Dialog>
            , document.body)

    else if (contentType === ContentType.confirmation)
        return createPortal(
            <Dialog fullWidth open={show} onClose={handleShow}>
                <Header></Header>
                <Content></Content>
                <Actions></Actions>
            </Dialog>
            , document.body)

    else if (contentType === ContentType.date)
        return createPortal(
            <Dialog fullWidth open={show} onClose={handleShow}>
                <Header></Header>
                <Content></Content>
                <Actions></Actions>
            </Dialog>
            , document.body)

    else if (contentType === ContentType.info)
        return createPortal(
            <Dialog fullWidth open={show} onClose={handleShow}>
                <Header></Header>
                <Content></Content>
                <Actions></Actions>
            </Dialog>
            , document.body)
    else return null
}

export default Modal