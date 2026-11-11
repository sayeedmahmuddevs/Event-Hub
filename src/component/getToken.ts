"use client"

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const clientToken = async()=> {
    // Get authentication token
      const { data: tokenData, error } = await authClient.token();

      if (error || !tokenData?.token) {
        toast.error("Token not found!");
        return;
      }

      const token = tokenData.token;
      return token
}

