import React, {
  FunctionComponent,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import useUserDetailsLogger from "../hooks/useUserDetailsLogger";
import { User, FormatDate } from "@/utils/common/person";

type Props = {
  user: User | null;
};

const DateTimeComponent: FunctionComponent<PropsWithChildren<Props>> = ({
  user,
}) => {
  const [currentTime, setCurrentTime] = useState(FormatDate(new Date()));

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(FormatDate(new Date()));
    };
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);
  useUserDetailsLogger(user, currentTime);

  return <div suppressHydrationWarning>{currentTime}</div>;
};

export default DateTimeComponent;
