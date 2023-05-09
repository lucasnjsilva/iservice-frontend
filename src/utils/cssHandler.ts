interface IClasses {
  [key: string]: string[];
}

export const handler = {
  get: (target: any, prop: string) => {
    if (!(prop in target)) {
      return "";
    }

    return target[prop].join(" ");
  },
};

export default function useStyle(classes: IClasses) {
  const proxy = new Proxy(classes, handler);

  return proxy;
}
