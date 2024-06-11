import { useEffect } from "react";
import { User } from "../utils/common/person";

const usePersonDetailsLogger = (
  user: User,
  enableLogs: boolean,
  currentTime: string,
) => {
  useEffect(() => {
    if (enableLogs && user) {
      console.log("Person details:", user);
      console.log("Current time:", currentTime);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, enableLogs]);
};

export default usePersonDetailsLogger;
