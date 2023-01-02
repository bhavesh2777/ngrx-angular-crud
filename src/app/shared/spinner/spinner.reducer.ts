import { createReducer, on } from '@ngrx/store';
import { Spinner } from './spinner';
import { updateLoaderStatus } from './spinner.action';

export const initialState: Readonly<Spinner> = {
  isLoading: false,
};

export const loaderReducer = createReducer(
  initialState,
  on(updateLoaderStatus, (state, { isLoading }) => {
    return {
      ...state,
      isLoading,
    };
  })
);
