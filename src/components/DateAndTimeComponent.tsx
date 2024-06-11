import React, {
  FunctionComponent,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import useUserDetailsLogger from "../hooks/useUserDetailsLogger";
import { User } from "@/utils/common/person";

type Props = {
  user: User;
  enableLogs: boolean;
};

const DateTimeComponent: FunctionComponent<PropsWithChildren<Props>> = ({
  user,
  enableLogs,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(formatDate(new Date()));
    };

    // Update the time immediately after mounting
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useUserDetailsLogger(user, enableLogs, currentTime);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} : ${hours}:${minutes}:${seconds}`;
  };

  return <div>{currentTime}</div>;
};

export default DateTimeComponent;
