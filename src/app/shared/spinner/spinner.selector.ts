import { createFeatureSelector } from '@ngrx/store';
import { Spinner } from './spinner';

export const selectLoader = createFeatureSelector<Spinner>('spinner');
