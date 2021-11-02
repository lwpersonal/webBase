export interface IFuncOptions {
    cursor: boolean;
    el: string;
    sourceData: string;
    speed: number;
    delay: number;
    delayVal: string[];
}
export interface ICycleHandleOptions {
    handleArr: any[];
    root: Element;
    cb?: () => any;
}
export interface IHandleAnimateBeforeOptions {
    el: Element;
    regexp: RegExp;
    htmlType?: string;
    className?: string;
    delaySta: boolean;
    addCursorFlashing?: boolean;
    handleFn?: (matchStr: string, animateEl: Element) => any;
}
