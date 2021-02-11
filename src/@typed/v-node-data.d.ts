declare module 'vue/types/vnode' {
  export interface VNodeData {
    model?: {
      callback: (v: any) => void;
      expression: string;
      value: any;
    };
  }
}
