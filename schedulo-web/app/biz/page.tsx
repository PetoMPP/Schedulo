"use client";

import { useEffect, useState } from "react";
import getUserData from "./action";
import { BizUserData } from "../types";
import { getBizLoginData } from "../utils/biz-login-data";

export default function OwnerApp() {
  const [userData, setUserData] = useState<BizUserData | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const loginData = getBizLoginData();
      if (!loginData) {
        return;
      }
      setUserData(await getUserData(loginData.accessToken));
    };

    getUser();
  }, []);

  console.log("userData", userData);

  return (
    <>
      <h1 className="font-semibold text-3xl">Business owner app</h1>
      {userData ? <p>Welcome back <span className="font-semibold text-primary">{userData?.username}</span></p> : <p>You are not logged in.</p>}
    </>
  );
}
