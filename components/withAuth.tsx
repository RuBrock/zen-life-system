'use client'

import { decryptKey } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useEffect } from "react";

 
const withAuth = (Component: any) => {
  return function WithAuth(props: any) {
    const encryptedKey = typeof window != 'undefined' ? window.localStorage.getItem('accessKey') : null;

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