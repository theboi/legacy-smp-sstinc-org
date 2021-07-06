import { useState, useEffect } from "react";

export const useHost = () => {
  const [host, setHost] = useState<string>();

  useEffect(() => {
    if (globalThis) setHost(globalThis.location.host);
  }, [globalThis.location]);

  return host;
};
