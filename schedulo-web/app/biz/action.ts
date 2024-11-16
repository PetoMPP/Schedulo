"use server";

import { getBizUserData } from "../api";

export default async function getUserData(accessToken: string) {
  return getBizUserData(accessToken);
}