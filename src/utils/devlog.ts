export function devlog<T>(...args: T[]) {
  if (process.env.NODE_ENV === "development") {
    console.log(...args);
  }
}
