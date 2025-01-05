import {City} from './City';

export type Region = {
  id: number;
  nome: string;
  active: boolean;
  cidades: City[];
};

export type RegionResponse = Region;
