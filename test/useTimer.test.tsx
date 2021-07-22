import {act, renderHook} from "@testing-library/react-hooks"

import useTimer from "../src"
import {
    mockInitializedTimer,
    mockLappedTimer,
    mockRunningTimer,
    mockStartedTimer,
    mockStoppedTimer,
} from "./mocks"

jest.useFakeTimers()

test("initializes", () => {
    const {result} = renderHook(() => useTimer())
    expect(result.current).toEqual(mockInitializedTimer)
})

describe("start", () => {
    test("starts", () => {
        const {result, unmount} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
        })

        expect(result.current).toEqual(mockStartedTimer)

        act(() => {
            jest.advanceTimersByTime(100)
        })

        expect(result.current).toEqual(mockRunningTimer)
        unmount()
    })

    test("resumes", () => {
        const {result, unmount} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
        })

        act(() => {
            jest.advanceTimersByTime(100)
        })

        expect(result.current).toEqual(mockRunningTimer)

        act(() => {
            result.current.stop()
        })

        expect(result.current).toEqual(mockStoppedTimer)

        act(() => {
            result.current.start()
        })

        expect(result.current).toEqual(mockRunningTimer)
        unmount()
    })

    test("ignores start when running", () => {
        const {result, unmount} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
        })

        act(() => {
            jest.advanceTimersByTime(100)
        })

        expect(result.current).toEqual(mockRunningTimer)

        act(() => {
            result.current.start()
        })

        expect(result.current).toEqual(mockRunningTimer)
        unmount()
    })
})

describe("stop", () => {
    test("stops", () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
            jest.advanceTimersByTime(100)
            result.current.stop()
        })

        expect(result.current).toEqual(mockStoppedTimer)
    })

    test("ignores stop when inactive", () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.stop()
        })

        expect(result.current).toEqual(mockInitializedTimer)
    })

    test("ignores stop when paused", () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
            jest.advanceTimersByTime(100)
            result.current.stop()
            result.current.stop()
        })

        expect(result.current).toEqual(mockStoppedTimer)
    })
})

describe("reset", () => {
    test("resets", () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
            jest.advanceTimersByTime(100)
            result.current.reset()
        })

        expect(result.current).toEqual(mockInitializedTimer)
    })

    test("ignores reset when inactive", () => {
        const {result} = renderHook(() => useTimer())
        expect(result.current).toEqual(mockInitializedTimer)

        act(() => {
            result.current.reset()
        })

        expect(result.current).toEqual(mockInitializedTimer)
    })
})

describe("lap", () => {
    test("laps", async () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
            jest.advanceTimersByTime(100)
        })

        expect(result.current).toEqual(mockRunningTimer)

        act(() => {
            result.current.lap()
        })

        expect(result.current).toEqual(mockLappedTimer)
    })

    test("ignores lap when inactive", () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.lap()
        })

        expect(result.current).toEqual(mockInitializedTimer)
    })

    test("ignores lap when paused", () => {
        const {result} = renderHook(() => useTimer())

        act(() => {
            result.current.start()
            jest.advanceTimersByTime(100)
            result.current.stop()
        })

        act(() => {
            result.current.lap()
        })

        expect(result.current).toEqual(mockStoppedTimer)
    })
})
