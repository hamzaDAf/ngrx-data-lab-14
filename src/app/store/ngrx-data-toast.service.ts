import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  EntityAction,
  EntityActionPayload,
  EntityCacheAction,
  EntityOp,
  ofEntityOp,
  OP_ERROR,
  OP_SUCCESS
} from '@ngrx/data';
import { filter } from 'rxjs/operators';
import { ToastService } from '../core/toast.service';

/** Report ngrx-data success/error actions as toast messages * */
@Injectable()
export class NgrxDataToastService {

  constructor(actions$: Actions<EntityAction>, toast: ToastService) {
    actions$
      .pipe(
        ofEntityOp(),
        filter(
          (ea: EntityAction) =>
            ea.payload.entityOp.endsWith(OP_SUCCESS) ||
            ea.payload.entityOp.endsWith(OP_ERROR)
        )
      )
      // this service never dies so no need to unsubscribe
      .subscribe(action =>
        toast.openSnackBar(
          // `${action.payload.entityName} action`,
          this.actionMessage(action.payload),
          // action.payload.entityOp
          this.actionMethod(action.payload.entityOp)
        )
      );

    actions$
      .pipe(
        ofType(
          EntityCacheAction.SAVE_ENTITIES_SUCCESS,
          EntityCacheAction.SAVE_ENTITIES_ERROR
        )
      )
      .subscribe((action: any) =>
        toast.openSnackBar(
          `${action.type} - url: ${action.payload.url}`,
          'SaveEntities'
        )
      );
  }

  actionMethod (entityOp: string) : string {
    let method = '';
    switch (entityOp) {
      case EntityOp.QUERY_ALL_SUCCESS:
        method = 'GET';
        break;
      case EntityOp.SAVE_DELETE_ONE_SUCCESS:
        method = 'DELETE';
        break;
      case EntityOp.SAVE_ADD_ONE_SUCCESS:
        method = 'POST';
        break;
      case EntityOp.SAVE_UPDATE_ONE_SUCCESS:
        method = 'PUT';
        break;
    
      default:
        
        break;
    }

    return `${method}`;
  }

  actionMessage (payload: EntityActionPayload) : string {
    payload.entityName; //Heroes | Villains
    payload.entityOp;
    let msg = '';
    let entity = payload.entityName;
    let s = payload.entityName == 'Hero' ? 'es' : 's';

    switch (payload.entityOp) {
      case EntityOp.QUERY_ALL_SUCCESS:
        msg = `${entity + s } retrieved successfully!`
        break;
      case EntityOp.SAVE_DELETE_ONE_SUCCESS:
        msg = `${entity} ${  payload.data} deleted`;
        break;
      case EntityOp.SAVE_ADD_ONE_SUCCESS:
        msg = `${entity} ${ payload.data.name } added`;
        break;
      case EntityOp.SAVE_UPDATE_ONE_SUCCESS:
        msg = `${entity} ${payload.data.changes.name} updated`;
        break;
    
      default:
        
        break;
    }

    return `${msg}`;
  }
}