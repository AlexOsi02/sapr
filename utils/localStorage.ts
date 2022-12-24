import {ConstructionQuery} from "../types";

export const parseObjFromLocalStorage = (obj: string) => {
  return JSON.parse(localStorage.getItem(obj) as string);
};

export const getConstructionsFromLocalStorage = () => {
  const constructions: ConstructionQuery[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    let storedValue = localStorage.key(i);

    if (storedValue?.includes("construction")) {
      constructions.push({
        name: storedValue,
        construction: parseObjFromLocalStorage(localStorage.key(i) as string),
      });
    }
  }

  return constructions
};
