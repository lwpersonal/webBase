import type { IFuncOptions } from './interface';
export default class Func {
    #private;
    private pause;
    private fns;
    options: IFuncOptions;
    root: Element;
    constructor(options: IFuncOptions);
    start: () => void;
}
