import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Toast, ToastHeader } from 'reactstrap'

export const SaveToast = ({ id }) => {
    const [showToast, setShow] = useState(true)

    useEffect(() => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 2000)
    }, [id])

    if (id == null) {
        return null
    }
    
    return (
        <Toast isOpen={showToast} style={{ background: 'green', color: 'black' }}>
            <ToastHeader toggle={() => setShow(false)}>Saved! <small>{moment().fromNow()}</small></ToastHeader>
        </Toast>
    )
}