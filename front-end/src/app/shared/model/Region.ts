export type Region = {
  id: number;
  name: string;
  userCreated: string;
  userUpdated: string;
  dateCreated: string;
  dateUpdated: string;
};

export type RegionResponse = Pick<Region, 'id' | 'name'>;
