import { createAction, props } from '@ngrx/store';

export const updateLoaderStatus = createAction(
  '[Loader] update the loader status',
  props<{ isLoading: boolean }>()
);
