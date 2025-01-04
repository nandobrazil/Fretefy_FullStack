import {City} from './City';

export type Region = {
  id: number;
  nome: string;
  cidades: City[];
};

export type RegionResponse = Region;
