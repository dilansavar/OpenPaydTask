import { LaunchDetailsGQL } from "./../../services/spacexGraphql.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  loadLaunchDetail,
  loadLaunchDetailFail,
  loadLaunchDetailSuccess
} from "../actions";
import { catchError, map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class LaunchDetailEffects {
  constructor(
    private actions$: Actions,
    private readonly pastLaunchesService: LaunchDetailsGQL
  ) {}

  loadLaunchDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLaunchDetail),
      switchMap((payload) =>
        this.pastLaunchesService.fetch({id:payload.id}).pipe(
          map((response: any) =>
            loadLaunchDetailSuccess({
              payload: response.data.launch as any
            })
          ),
          catchError(error => of(loadLaunchDetailFail(error)))
        )
      )
    )
  );
}
