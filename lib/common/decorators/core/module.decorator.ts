export interface ModuleOptions {
  providers?: any[];
  controllers?: any[];
}

export function Module(options: ModuleOptions): ClassDecorator {
  return (target: Function) => {
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (options as any)[property], target);
      }
    }
  };
}
