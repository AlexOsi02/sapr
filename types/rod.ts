import { Dispatch, SetStateAction } from "react";

export interface Rod {
  id: string;
  elasticModulus: number;
  rodLength: number;
  concentratedLoad: number;
  allowableVoltage: number;
  crossSectionalArea: number;
  linearLoad: number;
}

export interface RodsDataState {
  rodsData: Rod[];
  setRodsData: Dispatch<SetStateAction<Rod[]>>;
}

export interface Supports {
  supportLeft: boolean;
  supportRight: boolean;
}

export interface HaveSupportsState {
  isHaveSupports: Supports;
  setIsHaveSupports: Dispatch<SetStateAction<Supports>>;
}

export interface Construction {
  leftLimit: boolean;
  rightLimit: boolean;
  rodsData: Rod[]
}

export interface ConstructionQuery {
  name: string;
  construction: Construction;
}
