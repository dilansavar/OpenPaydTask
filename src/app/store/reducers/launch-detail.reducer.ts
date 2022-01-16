import { createReducer, on } from "@ngrx/store";
import {
  LaunchDetailAction,
  loadLaunchDetail,
  loadLaunchDetailFail,
  loadLaunchDetailSuccess
} from "../actions";

export type LaunchDetailState = any;

const initialState: LaunchDetailState = {
  data: null,
  loaded: false,
  loading: false,
  error: null
};

const launchDetailReducer = createReducer(
  initialState,
  on(loadLaunchDetail, state => ({
    ...state,
    loading: true,
    loaded: false
  })),
  on(loadLaunchDetailSuccess, (state, { payload }) => {
    return {
      ...state,
      data: payload,
      loading: false,
      loaded: true
    };
  }),
  on(loadLaunchDetailFail, (state, { payload }) => ({
    ...initialState,
    error: payload
  }))
);

export function reducer(
  state: LaunchDetailState | undefined,
  action: LaunchDetailAction
) {
  return launchDetailReducer(state, action);
}
