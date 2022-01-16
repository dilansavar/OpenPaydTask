import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LaunchDetailState } from "../reducers/launch-detail.reducer";

export const getLaunchDetailState = createFeatureSelector<LaunchDetailState>(
  "launchDetail"
);

export const getLaunchDetail = createSelector(
  getLaunchDetailState,
  (state: any) => {
    return state.data;
  }
);

export const getLaunchDetailLoaded = createSelector(
  getLaunchDetailState,
  (state: any) => state.loaded
);

export const getLaunchDetailLoading = createSelector(
  getLaunchDetailState,
  (state: any) => state.loading
);
