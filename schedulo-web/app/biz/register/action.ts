"use server";

import { ApiErrors, bizRegister } from "@/app/api";

export default async function register(
  prevState: boolean | ApiErrors,
  formData: FormData
): Promise<boolean | ApiErrors> {
  const email = formData?.get("email") as string;
  const username = formData?.get("username") as string;
  const password = formData?.get("password") as string;
  const response = await bizRegister({ email, username, password });
  return response ?? true;
}
