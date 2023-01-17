import { useEffect, useState } from "react";
import { Operation, OperationListComponentProps } from "../Types"
import SingleOperationComponent from "./SingleOperationComponent";


const OperationListComponent = ({ operations }: OperationListComponentProps) => {
    const [currentOperations, setCurrentOperations] =
        useState<Operation[]>(operations);

    useEffect(() => {
        setCurrentOperations(operations);
    }, [operations]);

    const operationElements: JSX.Element[] = [];
    for (let i = 0; i < currentOperations.length; i++) {
        operationElements.push(
            <SingleOperationComponent operation={currentOperations[i]} key={currentOperations[i].id}></SingleOperationComponent>
        );
    }
    return <>{operationElements}</>;

}

export default OperationListComponent