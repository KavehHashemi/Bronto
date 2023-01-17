import { useState, useEffect } from "react";
import { Operation, OperationComponentProps } from "../Types"
import "../style/ResourcesDialog.css";
import Dialog from "@mui/material/Dialog";
import Header from "@mui/material/DialogTitle";
import Content from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from "@mui/icons-material/Close";
import { operationsDB } from "../indexedDb/OperationsDB";
import { addOperation } from "../FCWrapper";
import OperationListComponent from "./OperationListComponent";
const OperationComponent = ({ open, openHandler }: OperationComponentProps) => {
    const [opArray, setOpArray] = useState<Operation[]>([])

    useEffect(() => {
        (async () => {
            setOpArray(await operationsDB.operations.toArray())
        })()
    }, [open])

    useEffect(() => {
        opArray.sort((a, b) => {
            return a.createdAt - b.createdAt;
        });
    }, [opArray])

    const [operationName, setOperationName] = useState<string>("");
    const addNewOperation = async () => {
        if (operationName !== "") {
            await addOperation(operationName);
            setOpArray(await operationsDB.operations.toArray());
            setOperationName("");
        }

    };

    return (
        <Dialog fullWidth open={open} onClose={openHandler}>
            <Header className="header-container">
                <div>Operations</div>
                <div>
                    <CloseIcon
                        sx={{ cursor: "pointer" }}
                        onClick={openHandler}
                    ></CloseIcon>
                </div>
            </Header>
            <Content className="content-container">
                <InputLabel className="labels">Existing operations</InputLabel>
                <OperationListComponent
                    operations={opArray}
                ></OperationListComponent>
                <InputLabel className="labels">Add a new operation</InputLabel>
                <div className="existing-fields">
                    <TextField
                        className="fields"
                        variant="outlined"
                        size="small"
                        placeholder="Operation Title"
                        value={operationName}
                        onChange={(e) => setOperationName(e.target.value)}
                    ></TextField>
                    <div className="buttons">
                        <Button variant="text" color="primary" onClick={addNewOperation}>
                            Add
                        </Button>
                    </div>
                </div>
            </Content>
        </Dialog>
    )
}

export default OperationComponent