/* eslint-disable react-hooks/exhaustive-deps */
import { useOrganization } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
export const useOrgChanges = (callback: () => void) => {
  const { organization } = useOrganization();

  useEffect(() => {
    console.log("organization changed");

    callback();
  }, [organization]);
};
