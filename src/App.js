import React from 'react';
import {fetch} from './api'
import {AtomView, GraphView, Modal, Overlay, TickView} from "./components";

export function App() {
    const [displayMode, setDisplayMode] = React.useState("nuclear")
    const [ticks, setTicks] = React.useReducer(tickReducer, 0, () => 0)
    const [dcDate, setDcDate] = React.useReducer(dateReducer,undefined, () => undefined)
    const [history, setHistory] = React.useState( [])
    const [online, setOnline] = React.useState("online")
    const [showHistory, setShowHistory] = React.useState(false)

    function tickReducer(state, action) {
        switch (action) {
            case 'increment':
                return state + 1;
            case 'reset':
                return 0;
            default:
                throw new Error();
        }
    }

    function dateReducer(state, action) {
        switch (action) {
            case 'set':
                if (state) {
                    return state
                }
                return new Date();
            case 'reset':
                return undefined;
            default:
                throw new Error();
        }
    }

    React.useEffect(() => {
        check();
        setInterval(check, 500);
    }, [])

    React.useEffect(() => {
        if (online === "online") {
            document.title = "Conectado";
            console.log(ticks,dcDate)
            if (dcDate) {
                setHistory([
                    {
                        date: dcDate.toLocaleString('es', {timeZone: "America/Bogota"}),
                        ticks
                    },
                    ...history,
                ])
            }
            setDcDate("reset");
            setTicks("reset");
        } else {
            document.title = "Desconectado";
            setDcDate("set");
        }
    }, [online])

    const check = () => {
        fetch().then(isConnected => {
            if (isConnected) {
                setOnline("online");
            } else {
                setOnline("offline");
                setTicks("increment");
            }
        });
    };

    const handleHistoryModal = () => {
        setShowHistory(!showHistory)
    }

    return (
        <div
            className={'app ' + online + (displayMode === 'heart' ? ' beat' : '')}
            onClick={handleHistoryModal}
        >
            {/*<div className={'buttons'}>*/}
            {/*    <div onClick={() => this.setState({ display_mode : 'nuclear' })}>*/}
            {/*        <AtomButton />*/}
            {/*    </div>*/}
            {/*    <div onClick={() => this.setState({ display_mode : 'heart' })}>*/}
            {/*        <HeartButton />*/}
            {/*    </div>*/}
            {/*</div>*/}

            {displayMode === 'nuclear' ?
                <AtomView online={online}/>
                :
                <GraphView online={online}/>
            }

            <Overlay history={history}/>

            <Modal
                visible={showHistory}
                history={history}
            />

            <TickView
                online={online}
                ticks={ticks}
            />
        </div>
    );
}

export default App;


function AtomButton() {
    return (
        <svg className={"lil-icon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M223.99908,224a32,32,0,1,0,32.00782,32A32.06431,32.06431,0,0,0,223.99908,224Zm214.172-96c-10.877-19.5-40.50979-50.75-116.27544-41.875C300.39168,34.875,267.63386,0,223.99908,0s-76.39066,34.875-97.89653,86.125C50.3369,77.375,20.706,108.5,9.82907,128-6.54984,157.375-5.17484,201.125,34.958,256-5.17484,310.875-6.54984,354.625,9.82907,384c29.13087,52.375,101.64652,43.625,116.27348,41.875C147.60842,477.125,180.36429,512,223.99908,512s76.3926-34.875,97.89652-86.125c14.62891,1.75,87.14456,10.5,116.27544-41.875C454.55,354.625,453.175,310.875,413.04017,256,453.175,201.125,454.55,157.375,438.171,128ZM63.33886,352c-4-7.25-.125-24.75,15.00391-48.25,6.87695,6.5,14.12891,12.875,21.88087,19.125,1.625,13.75,4,27.125,6.75,40.125C82.34472,363.875,67.09081,358.625,63.33886,352Zm36.88478-162.875c-7.752,6.25-15.00392,12.625-21.88087,19.125-15.12891-23.5-19.00392-41-15.00391-48.25,3.377-6.125,16.37891-11.5,37.88478-11.5,1.75,0,3.875.375,5.75.375C104.09864,162.25,101.84864,175.625,100.22364,189.125ZM223.99908,64c9.50195,0,22.25586,13.5,33.88282,37.25-11.252,3.75-22.50391,8-33.88282,12.875-11.377-4.875-22.62892-9.125-33.88283-12.875C201.74516,77.5,214.49712,64,223.99908,64Zm0,384c-9.502,0-22.25392-13.5-33.88283-37.25,11.25391-3.75,22.50587-8,33.88283-12.875C235.378,402.75,246.62994,407,257.8819,410.75,246.25494,434.5,233.501,448,223.99908,448Zm0-112a80,80,0,1,1,80-80A80.00023,80.00023,0,0,1,223.99908,336ZM384.6593,352c-3.625,6.625-19.00392,11.875-43.63479,11,2.752-13,5.127-26.375,6.752-40.125,7.75195-6.25,15.00391-12.625,21.87891-19.125C384.7843,327.25,388.6593,344.75,384.6593,352ZM369.65538,208.25c-6.875-6.5-14.127-12.875-21.87891-19.125-1.625-13.5-3.875-26.875-6.752-40.25,1.875,0,4.002-.375,5.752-.375,21.50391,0,34.50782,5.375,37.88283,11.5C388.6593,167.25,384.7843,184.75,369.65538,208.25Z"
            />
        </svg>
    )
}

function HeartButton() {
    return (
        <svg className={"lil-icon"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M320.2 243.8l-49.7 99.4c-6 12.1-23.4 11.7-28.9-.6l-56.9-126.3-30 71.7H60.6l182.5 186.5c7.1 7.3 18.6 7.3 25.7 0L451.4 288H342.3l-22.1-44.2zM473.7 73.9l-2.4-2.5c-51.5-52.6-135.8-52.6-187.4 0L256 100l-27.9-28.5c-51.5-52.7-135.9-52.7-187.4 0l-2.4 2.4C-10.4 123.7-12.5 203 31 256h102.4l35.9-86.2c5.4-12.9 23.6-13.2 29.4-.4l58.2 129.3 49-97.9c5.9-11.8 22.7-11.8 28.6 0l27.6 55.2H481c43.5-53 41.4-132.3-7.3-182.1z"
            />
        </svg>
    )
}
