import React, { FunctionComponent, PropsWithChildren } from "react";
import { DataContextProvider } from "./dataContext";
import { LogProvider } from "./LoggingContext";

export const AppProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <LogProvider>
      <DataContextProvider>{children}</DataContextProvider>
    </LogProvider>
  );
};
