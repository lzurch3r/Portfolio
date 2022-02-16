export default function curry(func,...oldArgs) {
  return function(...newArgs) {
    const allArgs = [...oldArgs,...newArgs];
    return func(...allArgs);
  }
}