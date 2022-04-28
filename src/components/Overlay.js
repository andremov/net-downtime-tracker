import React from "react";

export function Overlay({history}) {

    return <div className={'history'}>
        {
            history.slice(0,5).map(item => {
                return <div
                    style={{opacity: 1 - history.indexOf(item) / 5}}
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
