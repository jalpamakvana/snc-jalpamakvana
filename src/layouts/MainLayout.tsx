import {
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";
import classNames from "classnames";
import { Button } from "../components/Button";
import { Person } from "../utils/common/person";
import { useDataContext } from "../context/dataContext";
import { useLogContext } from "../context/LoggingContext";
import DateAndTimeComponent from "../components/DateAndTimeComponent";
import { Roboto_Slab } from "next/font/google";
import { Skeleton } from "../components/Skeleton";
import Image from "next/image";

const inter = Roboto_Slab({ subsets: ["latin"], weight: "500" });

type MainLayoutProps = {};

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = () => {
  const { loading, result, error, fetchData } = useDataContext();
  const { enableLogs, toggleLogs } = useLogContext();

  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const handleButtonClick = useCallback(
    (buttonName: string) => {
      setSelectedButton(selectedButton === buttonName ? null : buttonName);
      fetchData(buttonName);
    },
    [fetchData, selectedButton],
  );

  return (
    <>
      <div className={classNames(inter.className, "main-content")}>
        <div className="row class-log">
          <div className="d-flex flex-row-reverse bd-highlight pe-5 pt-3">
            <DateAndTimeComponent user={result} />
          </div>
        </div>

        <div className="row pe-5 pt-2">
          <p className="d-flex flex-row-reverse">
            Logging is {enableLogs ? "enabled" : "disabled"}
          </p>
          <div className="d-flex flex-row-reverse bd-highlight">
            <button
              type="button"
              className="bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-large rounded-lg text-sm px-3 py-2.5 text-center"
              onClick={toggleLogs}
            >
              Toggle Logging
            </button>
          </div>
        </div>

        <div className={classNames("d-flex justify-content-center gap-2 pt-0")}>
          {Object.values(Person).map((person) => (
            <Button
              key={person}
              onClick={() => handleButtonClick(person)}
              className={
                selectedButton === person ? "btn btn-warning" : "btn btn-dark"
              }
            >
              {person}
            </Button>
          ))}
          <button />
        </div>

        <div className={classNames("d-flex justify-content-center gap-2 pt-1")}>
          {loading && <Skeleton />}
          {result && (
            <div className="mt-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <Image
                src={result?.backgroundImageUrl}
                alt="Background image"
                className="rounded-t-lg"
                width={500}
                height={500}
              />

              <div className="flex flex-col items-center pt-2 pb-2">
                <Image
                  src={result?.profilePictureUrl}
                  alt="user image"
                  className="mb-3 rounded-full shadow-lg"
                  width={100}
                  height={200}
                  quality={100}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  {result?.title}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {result?.name}
                </span>
                <div className="mt-4 md:mt-6">
                  <div className="py-1">Followers : {result?.followers}</div>
                  <div className="py-1">Following : {result?.following}</div>
                </div>
              </div>
            </div>
          )}
          {error && (
            <div className="py-2">
              <b>{error}</b>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
