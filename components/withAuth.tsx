'use client'

import { ACCESS_LOCAL_STORAGE_KEY } from "@/constants";
import { decryptKey } from "@/lib/utils";
import * as localStorage from "@/lib/localstorage";
import { redirect } from "next/navigation";
import { useEffect } from "react";

 
const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const encryptedKey = localStorage.get(ACCESS_LOCAL_STORAGE_KEY);

    useEffect(() => {
      const accessKey = encryptedKey && decryptKey(encryptedKey);

      if(accessKey !== process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        redirect('/');
      } 
    }, []);
    
    if(!encryptedKey) {
      return null;
    }

    return <Component {...props} />

  }
}

export default withAuth