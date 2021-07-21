import {useEffect, useState} from "react"

type Timer = {
    isActive: boolean
    isInactive: boolean
    isPaused: boolean
    isRunning: boolean
    elapsedTime: number
    laps: Lap[]
    start: () => void
    stop: () => void
    reset: () => void
    lap: () => void
}

type Lap = {
    start: number
    end: number
    time: number
}

const useTimer = (): Timer => {
    // status
    const [isActive, setIsActive] = useState(false)
    const [isInactive, setIsInactive] = useState(false)
    const [isRunning, setIsRunning] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    // stats
    const [elapsedTime, setElapsedTime] = useState(0)
    const [laps, setLaps] = useState<Lap[]>([])

    // internal
    const [timerId, setTimerId] = useState(0)

    useEffect(() => {
        setIsInactive(!isActive)
    }, [isActive])

    useEffect(() => {
        if (isActive) {
            setIsRunning(!isPaused)
        }
    }, [isActive, isPaused])

    useEffect(() => {
        if (!elapsedTime) {
            return
        }

        const newLaps = laps
        const currentLap = newLaps[newLaps.length - 1]

        // update current lap
        currentLap.end = elapsedTime
        currentLap.time = currentLap.end - currentLap.start

        setLaps(newLaps)
    }, [elapsedTime, laps])

    const start = () => {
        if (isActive && !isPaused) {
            return
        }

        setIsActive(true)
        setIsPaused(false)

        if (!laps.length) {
            const lap: Lap = {
                start: 0,
                end: 0,
                time: 0,
            }

            setLaps([...laps, lap])
        }

        const startTime = Date.now()

        const timerId = window.setInterval(() => {
            setElapsedTime(elapsedTime + Date.now() - startTime)
        }, 10)

        setTimerId(timerId)
    }

    const stop = () => {
        window.clearInterval(timerId)

        setIsActive(true)
        setIsPaused(true)
        setTimerId(0)
    }

    const reset = () => {
        window.clearInterval(timerId)

        setIsActive(false)
        setIsInactive(true)
        setIsPaused(false)
        setIsRunning(false)
        setTimerId(0)
        setElapsedTime(0)
        setLaps([])
    }

    const lap = () => {
        // create a copy of laps
        const newLaps = laps

        // set the end of current lap
        const currentLap = newLaps[newLaps.length - 1]
        currentLap.end = elapsedTime

        // set the start of new lap
        const nextLap = {
            start: currentLap.end,
            end: currentLap.end,
            time: 0,
        }

        setLaps([...newLaps, nextLap])
    }

    const timer: Timer = {
        isActive,
        isInactive,
        isRunning,
        isPaused,
        elapsedTime,
        laps,
        start,
        stop,
        reset,
        lap,
    }

    return timer
}

export default useTimer
