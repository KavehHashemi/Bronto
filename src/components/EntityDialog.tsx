import { ContentType, DialogProps, EventType } from "../Types";
import EventComponent from "./EventComponent";
import ResourceComponent from "./ResourceComponent";
import DateComponent from "./DateComponent";
import InfoComponent from "./InfoComponent";
import OperationComponent from "./OperationComponent";


const EntityDialog = ({ show, handleShow, contentType, content, calendarRef }: DialogProps) => {
    if (!show) return null
    switch (contentType) {
        case ContentType.event:
            return <EventComponent open={show} openHandler={handleShow} event={content as EventType} calendarRef={calendarRef} isNew={(content as EventType).title === "" ? true : false}></EventComponent>
        case ContentType.resource:
            return <ResourceComponent open={show} openHandler={handleShow} calendarRef={calendarRef}></ResourceComponent>
        case ContentType.date:
            return <DateComponent open={show} openHandler={handleShow} calendarRef={calendarRef}></DateComponent>
        case ContentType.info:
            return <InfoComponent open={show} openHandler={handleShow}></InfoComponent>
        case ContentType.operation:
            return <OperationComponent open={show} openHandler={handleShow}></OperationComponent>
        default:
            return null;
    }
}

export default EntityDialog