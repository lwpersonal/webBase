export interface TRenderData {
  // name: string;
  // extra: number;
  // other: {
  //   count: number;
  // };
  [key: string]: any;
}

export interface TCommonProps extends TRenderData {
  mark: string;
}
