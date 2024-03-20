"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return <SessionProvider basePath="/api/sample">{children}</SessionProvider>;
};

export default Providers;
