export type BizLoginData = {
  accessToken: string;
  refreshToken: string;
  validUntilUtc: number;
};

// export default function useBizUserData(): [
//   BizLoginData | null,
//   (loginData: BizLoginData | null) => void
// ] {
//   const [loginData, setLoginDataInternal] = useState<BizLoginData | null>(null);
//   const setLoginData = (loginData: BizLoginData | null) => {
//     setBizLoginData(loginData);
//     setLoginDataInternal(getBizLoginData());
//   };

//   if (!loginData) {
//     return [null, setLoginData];
//   }

//   if (loginData.validUntilUtc < Date.now()) {
//     setBizLoginData(null);
//     return [null, setLoginData];
//   }

//   return [loginData, setLoginData];
// }

export function getBizLoginData(): BizLoginData | null {
  const loginDataJson = localStorage.getItem("bizLoginData");
  if (!loginDataJson) {
    return null;
  }

  const loginData = JSON.parse(loginDataJson);
  if (loginData.validUntilUtc < Date.now()) {
    localStorage.removeItem("bizLoginData");
    return null;
  }

  return loginData;
}

export function setBizLoginData(loginData: BizLoginData | null) {
  if (!loginData) {
    localStorage.removeItem("bizLoginData");
    return;
  }

  localStorage.setItem("bizLoginData", JSON.stringify(loginData));
}
