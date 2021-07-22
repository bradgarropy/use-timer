const mockInitializedTimer = {
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
}

const mockStartedTimer = {
    isActive: true,
    isInactive: false,
    isRunning: true,
    isPaused: false,
    elapsedTime: 0,
    laps: [{start: 0, end: 0, time: 0}],
    start: expect.any(Function),
    stop: expect.any(Function),
    reset: expect.any(Function),
    lap: expect.any(Function),
}

const mockRunningTimer = {
    isActive: true,
    isInactive: false,
    isRunning: true,
    isPaused: false,
    elapsedTime: 100,
    laps: [{start: 0, end: 100, time: 100}],
    start: expect.any(Function),
    stop: expect.any(Function),
    reset: expect.any(Function),
    lap: expect.any(Function),
}

const mockStoppedTimer = {
    isActive: true,
    isInactive: false,
    isRunning: false,
    isPaused: true,
    elapsedTime: 100,
    laps: [{start: 0, end: 100, time: 100}],
    start: expect.any(Function),
    stop: expect.any(Function),
    reset: expect.any(Function),
    lap: expect.any(Function),
}

const mockLappedTimer = {
    isActive: true,
    isInactive: false,
    isRunning: true,
    isPaused: false,
    elapsedTime: 100,
    laps: [
        {start: 0, end: 100, time: 100},
        {start: 100, end: 100, time: 0},
    ],
    start: expect.any(Function),
    stop: expect.any(Function),
    reset: expect.any(Function),
    lap: expect.any(Function),
}

export {
    mockInitializedTimer,
    mockLappedTimer,
    mockRunningTimer,
    mockStartedTimer,
    mockStoppedTimer,
}
