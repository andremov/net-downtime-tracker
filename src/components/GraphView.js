import React from "react";

export function GraphView({online} ) {
    return (
        online === 'online' ?
            <svg className={'ecg online'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349 170.529">
                <polyline
                    points="0 111.412 147.5 111.412 171.5 145.412 185.5 4.412 206.5 167.412 217.5 111.412 349 111.412" />
            </svg>
            :
            <svg className={'ecg offline'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 349 1">
                <line y1="0.5" x2="349" y2="0.5" />
            </svg>
    )
}
