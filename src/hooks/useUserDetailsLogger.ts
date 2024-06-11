import { useEffect } from "react";
import { User } from "../utils/common/person";
import { useLogContext } from "../context/LoggingContext";

const usePersonDetailsLogger = (user: User | null, currentTime: string) => {
  const { enableLogs } = useLogContext();
  useEffect(() => {
    if (enableLogs && user) {
      console.log("Person details:", user);
      console.log("Current time:", currentTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, enableLogs]);
};

export default usePersonDetailsLogger;
