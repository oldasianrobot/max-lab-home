// src/utils/perfMonitor.ts
import { useSpatialStore } from '../store/useSpatialStore';

let slowFrameCount = 0;
const THRESHOLD_FPS = 45;
const SLOW_FRAME_LIMIT = 30;

export function checkFrame(delta: number) {
  const fps = 1 / delta;
  if (fps < THRESHOLD_FPS) {
    slowFrameCount++;
    if (slowFrameCount >= SLOW_FRAME_LIMIT) {
      useSpatialStore.getState().setFxEnabled(false);
      slowFrameCount = 0;
    }
  } else {
    slowFrameCount = 0;
  }
}
