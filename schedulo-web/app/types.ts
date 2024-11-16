export type ShopData = {
  name: string;
  img?: string;
  summary?: string;
  new?: boolean;
}

export type ShopServicesData = {
  shop: ShopData;
  services: ServiceData[];
}

export type ServiceData = {
  name: string;
  price: number;
  description?: string;
  duration: number;
}

export type BizUserData = {
  id: string;
  email: string;
  username: string;
  roles: string[];
}