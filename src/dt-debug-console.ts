/* tslint:disable:no-console */

export function log(message?: any, ...optionalParams: any[]) {
  console.log(message, ...optionalParams);
}

export function time(name: string) {
  console.time(name);
}
export function timeEnd(name: string) {
  console.timeEnd(name);
}

export function error(message?: any, ...optionalParams: any[]) {
  console.error(message, ...optionalParams);
}

export function setWindow(name: string, obj: any): void {
  (window as any)[name] = obj;
}
