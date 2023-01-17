/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "../style/ResourcesDialog.css";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import IconButton from "@mui/material/IconButton";
import { ContentType, Operation } from "../Types";
import ConfirmationDialog from "./ConfirmationDialog";
import { SingleOperationComponentProps } from '../Types'
import { operationsDB } from "../indexedDb/OperationsDB";
import { eventsDB } from "../indexedDb/EventsDB";

const SingleOperationComponent = ({ operation }: SingleOperationComponentProps) => {
    const [edited, setEdited] = useState<boolean>(false)
    const [singleOperation, setSingleOperation] = useState<Operation | null>(null)
    useEffect(() => {
        setSingleOperation(operation)
    }, [operation])

    const editOperation = async () => {
        if (singleOperation) {
            await operationsDB.operations.update(
                singleOperation.id,
                singleOperation
            );
            setEdited(false)
        }
    };

    const deleteOperation = async () => {
        if (singleOperation) {
            // let evs = await eventsDB.events.filter((ev)=>{                
            //     for(let op in ev.operations){
            //        (ev.operations[op] === singleOperation.title)
            //     }
            // })
            await operationsDB.operations.delete(singleOperation.id);
            setSingleOperation(null);
        }
    };

    /////////
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [ok, setOk] = useState<boolean>(false)
    const handleDelete = () => {
        setShowDeleteDialog(true)
    }
    useEffect(() => {
        if (ok) {
            deleteOperation()
            setOk(false)
        }
    }, [ok])
    ////////
    if (!singleOperation) return null
    return (
        <div className="existing-fields">
            <div className="input-fields">
                <TextField
                    className="fields"
                    variant="outlined"
                    size="small"
                    placeholder="Resource Title"
                    value={singleOperation.title}
                    onChange={(e) => {
                        setSingleOperation({ ...singleOperation, title: e.target.value })
                        setEdited(true)
                    }}
                ></TextField>
            </div>
            <div className="buttons">
                <IconButton disabled={!edited} color="info" onClick={editOperation}>
                    <SaveIcon></SaveIcon>
                </IconButton>
                <IconButton color="error" onClick={handleDelete}>
                    <DeleteIcon></DeleteIcon>
                </IconButton>
            </div>
            <ConfirmationDialog open={showDeleteDialog} openHandler={setShowDeleteDialog} confirmation={setOk} title={singleOperation.title} type={ContentType.operation}></ConfirmationDialog>
        </div >
    )
}

export default SingleOperationComponent