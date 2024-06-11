import { useEffect, useRef } from "react";
import { User } from "../utils/common/person";
import { useLogContext } from "../context/LoggingContext";

const usePersonDetailsLogger = (user: User | null, currentTime: string) => {
  const currentTimeData = useRef(currentTime);
  const { enableLogs } = useLogContext();

  useEffect(() => {
    currentTimeData.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    if (enableLogs && user) {
      console.log("Person details:", user);
      console.log("Current time:", currentTimeData.current);
    }
  }, [user, enableLogs]);
};

export default usePersonDetailsLogger;
