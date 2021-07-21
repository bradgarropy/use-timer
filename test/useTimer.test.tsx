import {renderHook} from "@testing-library/react-hooks"

import useTimer from "../src"

jest.useFakeTimers()

test("initializes", () => {
    const {result} = renderHook(() => useTimer())

    expect(result.current).toEqual({
        isActive: false,
        isInactive: true,
        isRunning: false,
        isPaused: false,
        elapsedTime: 0,
        laps: [],
        start: expect.any(Function),
        stop: expect.any(Function),
        reset: expect.any(Function),
        lap: expect.any(Function),
    })
})
