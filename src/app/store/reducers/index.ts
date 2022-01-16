import { ActionReducerMap } from "@ngrx/store";
import * as fromLaunchList from "./launch-list.reducer";
import * as fromLaunchDetail from "./launch-detail.reducer";

export interface LaunchListState {
  launchList: fromLaunchList.LaunchListState;
  launchDetail: fromLaunchDetail.LaunchDetailState;
}

export const launchReducers: ActionReducerMap<LaunchListState, any> = {
  launchList: fromLaunchList.reducer,
  launchDetail: fromLaunchDetail.reducer
};
