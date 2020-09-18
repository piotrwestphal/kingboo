export const sort = <T>(list: T[],
                        primaryKey: keyof T,
                        secondaryKey: keyof T,
                        reverse: boolean = false): T[] => {
  return [...list].sort(
    ({
       [primaryKey]: a1,
       [secondaryKey]: a2,
     }, {
       [primaryKey]: b1,
       [secondaryKey]: b2
     }) => {
      const firstComp = reverse ? -1 : 1
      const secondComp = reverse ? 1 : -1
      return a1 > b1
        ? firstComp
        : a1 < b1
          ? secondComp
          : a2 > b2
            ? firstComp
            : a2 < b2
              ? secondComp
              : 0
    })
}
