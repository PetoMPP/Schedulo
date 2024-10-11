import { ShopData, ShopServicesData } from "./types";

export async function getShops(): Promise<ShopData[] | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return await fetch(process.env.API_URL + "shops").then((response) =>
    response.json()
  );
}

export async function searchShops(
  query: string | undefined
): Promise<ShopServicesData[] | null> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!query) {
    return null;
  }

  const shops: ShopServicesData[] = await fetch(
    process.env.API_URL + "shops?withServices=true"
  ).then((response) => response.json());
  const q = query.trim().toLowerCase();
  return shops.filter(
    (shop) =>
      shop.shop.name.toLowerCase().includes(q) ||
      shop.shop.summary?.toLowerCase().includes(q) ||
      shop.services.some(
        (service) =>
          service.name.toLowerCase().includes(q) ||
          service.description?.toLowerCase().includes(q)
      )
  );
}
