export enum CardStateEnum {
  LOADING,
  LOADED,
  ERROR,
}
export interface  CarteDataState<T> {
  dataState?: CardStateEnum,
  data?:T,
  errorMessage?:string
}
