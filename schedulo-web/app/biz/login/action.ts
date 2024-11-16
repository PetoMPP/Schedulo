"use server";

import { ApiErrors, bizLogin, isApiErrors, LoginResponse } from "@/app/api";

export default async function login(
  prevState: LoginResponse | null | ApiErrors,
  formData: FormData
): Promise<LoginResponse | null | ApiErrors> {
  const email = formData?.get("email") as string;
  const password = formData?.get("password") as string;
  const response = await bizLogin({ email, password });

  if (isApiErrors(response)) {
    return response as ApiErrors;
  }

  return response as LoginResponse;
}
