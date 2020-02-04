# ReactFiberScheduler

## 全局变量

## requestCurrentTime

```js
if (isRendering) {
    // We're already rendering. Return the most recently read time.
    return currentSchedulerTime;
}
// Check if there's pending work.
findHighestPriorityRoot();
if (
    nextFlushedExpirationTime === NoWork ||
    nextFlushedExpirationTime === Never
) {
    // If there's no pending work, or if the pending work is offscreen, we can
    // read the current time without risk of tearing.
    recomputeCurrentRendererTime();
    currentSchedulerTime = currentRendererTime;
    return currentSchedulerTime;
}
// There's already pending work. We might be in the middle of a browser
// event. If we were to read the current time, it could cause multiple updates
// within the same event to receive different expiration times, leading to
// tearing. Return the last read time. During the next idle callback, the
// time will be updated.
return currentSchedulerTime;
```

## computeExpirationForFiber

```js
function computeExpirationForFiber(currentTime, fiber) {
    let expirationTime;
    if (expirationContext !== NoWork) {
        // An explicit expiration context was set;
        expirationTime = expirationContext;
    } else if (isWorking) {
        if (isCommitting) {
            // Updates that occur during the commit phase should have sync priority
            // by default.
            expirationTime = Sync;
        } else {
            // Updates during the render phase should expire at the same time as
            // the work that is being rendered.
            expirationTime = nextRenderExpirationTime;
        }
    } else {
        // No explicit expiration context was set, and we're not currently
        // performing work. Calculate a new expiration time.
        if (fiber.mode & ConcurrentMode) {
            if (isBatchingInteractiveUpdates) {
                // This is an interactive update
                expirationTime = computeInteractiveExpiration(currentTime);
            } else {
                // This is an async update
                expirationTime = computeAsyncExpiration(currentTime);
            }
            // If we're in the middle of rendering a tree, do not update at the same
            // expiration time that is already rendering.
            if (
                nextRoot !== null &&
                expirationTime === nextRenderExpirationTime
            ) {
                expirationTime += 1;
            }
        } else {
            // This is a sync update
            expirationTime = Sync;
        }
    }
    if (isBatchingInteractiveUpdates) {
        // This is an interactive update. Keep track of the lowest pending
        // interactive expiration time. This allows us to synchronously flush
        // all interactive updates when needed.
        if (expirationTime > lowestPriorityPendingInteractiveExpirationTime) {
            lowestPriorityPendingInteractiveExpirationTime = expirationTime;
        }
    }
    return expirationTime;
}
```
