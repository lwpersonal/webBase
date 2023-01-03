export interface TRenderData {
  name: string;
  extra: number;
  other: {
    count: number;
  };
}

export interface TCommonProps extends TRenderData {
  mark: string;
}
