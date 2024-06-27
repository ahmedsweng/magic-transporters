export const removeDuplicate = (array: number[]): number[] => {
  let writeIndex = 0; //* Index to write non-duplicate values to
  const nonDuplicate = new Set<number>();

  for (let readIndex = 0; readIndex < array.length; readIndex++) {
    const value = array[readIndex];
    if (!nonDuplicate.has(value)) {
      nonDuplicate.add(value);
      array[writeIndex] = value;
      writeIndex++;
    }
  }

  array.length = writeIndex; //* Truncate array to remove extra elements
  return array;
};
