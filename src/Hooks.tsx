/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';

export const useDialog = (): [boolean, () => void] => {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    }

    return [
        show,
        toggleShow
    ];
}

export const useDelete = (deleteEntity: () => Promise<void>) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [ok, setOk] = useState<boolean>(false)
    const handleDelete = () => {
        setShowDeleteDialog(true)
    }
    useEffect(() => {
        if (ok) {
            deleteEntity()
            setOk(false)
        }
    }, [ok])
    const deleteDialog = {
        open: showDeleteDialog,
        openHandler: setShowDeleteDialog,
        okHandler: setOk,
        deleteHandler: handleDelete
    }
    return deleteDialog
}





