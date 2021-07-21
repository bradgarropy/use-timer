import {FC} from "react"

import useTimer from "../../src"

const App: FC = () => {
    const timer = useTimer()
    console.log(timer)

    return (
        <>
            <h2>controls</h2>
            <button onClick={() => timer.start()}>start</button>
            <button onClick={() => timer.stop()}>stop</button>
            <button onClick={() => timer.reset()}>reset</button>
            <button onClick={() => timer.lap()}>lap</button>

            <h2>time</h2>
            <p>{timer.elapsedTime}</p>

            <h2>laps</h2>
            <div>
                {timer.laps.map((lap, index) => {
                    return <p key={index}>{lap.time}</p>
                })}
            </div>
        </>
    )
}

export default App
