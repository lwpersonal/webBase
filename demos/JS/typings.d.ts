declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  const content: any;
  export default content;
}

declare interface Window {
  log: (...args: any[]) => any;
}

declare interface Global {
  log: (...args: any[]) => any;
}
