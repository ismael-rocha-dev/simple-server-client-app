export default function getSliceOfArray<T>(array: T[]) {
    return array.slice(array.length > 6 ? array.length - 6 : 0);
  }