export type OwnerData = {
  name: string;
  img?: string;
  summary?: string;
  new?: boolean;
}

export type OwnerServicesData = {
  owner: OwnerData;
  services: ServiceData[];
}

export type ServiceData = {
  name: string;
  price: number;
  description?: string;
  duration: number;
}