import React from "react";


export function TickView ({online, ticks}) {
    return <div className={'ticks ' + online}>
        {Math.floor(ticks / 2)}
    </div>
}
