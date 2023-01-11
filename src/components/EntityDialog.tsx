import { ContentType, DialogProps, EventType } from "../Types";
import EventComponent from "./EventComponent";
import ResourceComponent from "./ResourceComponent";
import DateComponent from "./DateComponent";
import InfoComponent from "./InfoComponent";


const EntityDialog = ({ show, handleShow, contentType, content, calendarRef }: DialogProps) => {
    if (!show) return null
    if (contentType === ContentType.event)
        return (
            <EventComponent open={show} openHandler={handleShow} event={content as EventType} calendarRef={calendarRef} isNew={(content as EventType).title === "" ? true : false}></EventComponent>
        )
    else if (contentType === ContentType.resource)
        return (
            <ResourceComponent open={show} openHandler={handleShow} calendarRef={calendarRef}></ResourceComponent>
        )
    else if (contentType === ContentType.date)
        return (
            <DateComponent open={show} openHandler={handleShow} calendarRef={calendarRef}></DateComponent>
        )
    else if (contentType === ContentType.info)
        return (
            <InfoComponent open={show} openHandler={handleShow}></InfoComponent>
        )
    else return null
}

export default EntityDialog