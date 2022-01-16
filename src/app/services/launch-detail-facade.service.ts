import { LaunchDetailState } from "./../store/reducers/launch-Detail.reducer";
import { map } from "rxjs/operators";
import { LaunchDetailsGQL } from "./spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadLaunchDetail } from "../store/actions";
import * as launchDetailQuery from "../store/selectors";

@Injectable({
  providedIn: "root"
})
export class LaunchDetailFacadeService {
  launchDetailState$ = this.store.select(launchDetailQuery.getLaunchDetailState);
  launchDetail$ = this.store.select(launchDetailQuery.getLaunchDetail);
  launchDetailLoaded$ = this.store.select(launchDetailQuery.getLaunchDetailLoaded);
  launchDetailLoading$ = this.store.select(launchDetailQuery.getLaunchDetailLoading);

  constructor(
    private readonly store: Store<LaunchDetailState>,
    private readonly pastLaunchesService: LaunchDetailsGQL
  ) {}

  pastLaunchDetailStoreCache(id:string) {
    this.store.dispatch(loadLaunchDetail({id}));
    return this.launchDetail$;
  }

  pastLaunchDetailFacade(id:string) {
    return this.pastLaunchesService
      .fetch({ id })
      .pipe(map(res => res.data.launch));
  }
}
