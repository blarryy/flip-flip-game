export default function createArray(x, y) {
  return Array.apply(null, Array(x)).map(function(e) {
    return Array(y);
  });
}
