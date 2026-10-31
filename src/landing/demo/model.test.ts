import { describe, expect, it } from "vitest";
import {
  DEMO_SCENARIOS,
  currentScenario,
  currentStep,
  nextDemoState,
  replayDemo,
  scenarioProgress,
  selectDemoScenario,
} from "./model";

describe("landing demo playback", () => {
  it("starts on the first scenario and the first step", () => {
    const state = replayDemo();
    expect(currentScenario(state).id).toBe("vault-deposit");
    expect(currentStep(state).id).toBe("vault-user");
    expect(scenarioProgress(state)).toBe(0.25);
  });

  it("advances through steps, then wraps to the next scenario", () => {
    let state = replayDemo();
    state = nextDemoState(state);
    expect(state.stepIndex).toBe(1);
    state = nextDemoState(state);
    state = nextDemoState(state);
    expect(currentScenario(state).id).toBe("vault-deposit");
    expect(state.stepIndex).toBe(3);
    state = nextDemoState(state);
    expect(currentScenario(state).id).toBe("local-withdraw");
    expect(state.stepIndex).toBe(0);
  });

  it("wraps from the last scenario back to the first", () => {
    const state = selectDemoScenario(DEMO_SCENARIOS.length - 1);
    let last = state;
    for (let index = 0; index < currentScenario(state).steps.length; index++) {
      last = nextDemoState(last);
    }
    expect(currentScenario(last).id).toBe("vault-deposit");
    expect(last.stepIndex).toBe(0);
  });

  it("selects a scenario at its first step and clamps out-of-range indexes", () => {
    expect(selectDemoScenario(2)).toEqual({ scenarioIndex: 2, stepIndex: 0 });
    expect(selectDemoScenario(-1)).toEqual({
      scenarioIndex: DEMO_SCENARIOS.length - 1,
      stepIndex: 0,
    });
  });

  it("keeps every demo scenario honest about signing and settlement", () => {
    const copy = JSON.stringify(DEMO_SCENARIOS).toLowerCase();
    expect(copy).not.toContain("0x");
    expect(copy).not.toContain("guaranteed");
    expect(copy).toContain("wallet");
    expect(copy).toContain("demo only");
  });

  it("reports increasing progress through the scenario", () => {
    const state = selectDemoScenario(0);
    expect(scenarioProgress(state)).toBe(0.25);
    expect(scenarioProgress(nextDemoState(state))).toBe(0.5);
  });
});
