import React from "react";

export function Modal({history, visible}) {

    if (!visible) {
        return false
    }

    return <div className={'history-modal'}>
        {
            history.length === 0? <div style={{textAlign: "center"}}>
                No hay historial.
                </div>
                : history.map(item => {
                return <div
                    className={'history-entry'}
                    key={history.indexOf(item)}
                >
                    <span>{`Desconexión: ${item.date}`}</span>
                    <span>{`Duración: ${item.ticks} seg`}</span>
                </div>
            })
        }
    </div>
}
