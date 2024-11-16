import { BizUserData, ShopData, ShopServicesData } from "./types";

export async function getShops(): Promise<ShopData[] | null> {
  const shops = await doFetchJson<ShopData[]>(process.env.API_URL + "shops");
  if (isApiErrors(shops)) {
    return null;
  }

  return shops as ShopData[];
}

export async function searchShops(
  query: string | undefined
): Promise<ShopServicesData[] | null> {
  if (!query) {
    return null;
  }

  const result = await doFetchJson<ShopServicesData[]>(
    process.env.API_URL + "shops?withServices=true"
  );

  if (isApiErrors(result)) {
    return null;
  }

  const shops = result as ShopServicesData[];

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

export type RegisterDto = {
  email: string;
  username: string;
  password: string;
};

export const API_ERRORS_TYPE = "ApiErrors";

export type ApiErrors = {
  errors: {
    code: string;
    description: string;
  }[];
};

export function isApiErrors(obj: unknown): boolean {
  return (obj as ApiErrors)?.errors !== undefined;
}

export async function bizRegister(dto: RegisterDto): Promise<null | ApiErrors> {
  const result = await doFetch(process.env.API_URL + "business-user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dto),
  });

  if (isApiErrors(result)) {
    return result as ApiErrors;
  }

  return null;
}

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export async function bizLogin(
  dto: LoginDto
): Promise<LoginResponse | ApiErrors> {
  return await doFetchJson<LoginResponse>(
    process.env.API_URL + "business-user/login",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }
  );
}

export async function getBizUserData(
  accessToken: string
): Promise<BizUserData | null> {
  const result = await doFetchJson<BizUserData>(
    process.env.API_URL + "business-user",
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  if (isApiErrors(result)) {
    return null;
  }

  return result as BizUserData;
}

async function doFetchJson<T>(
  url: string,
  init?: RequestInit
): Promise<T | ApiErrors> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(url, init);
    const json = await response.json();
    return response.ok ? json : { errors: json };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: [{ code: "Error", description: e.message }] };
    }

    return { errors: [{ code: "Unknown", description: e as string }] };
  }
}

async function doFetch(
  url: string,
  init?: RequestInit
): Promise<number | ApiErrors> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(url, init);
    return response.ok ? response.status : { errors: await response.json() };
  } catch (e: unknown) {
    if (e instanceof Error) {
      return { errors: [{ code: "Error", description: e.message }] };
    }

    return { errors: [{ code: "Unknown", description: e as string }] };
  }
}
