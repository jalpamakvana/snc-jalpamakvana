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
            <DateAndTimeComponent user={result} enableLogs={enableLogs} />
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
          {loading && (
            <div
              role="status"
              className="mt-3 w-[370px] h-[500px] p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
            >
              <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                <svg
                  className="w-10 h-10 text-black-200 dark:text-black-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                </svg>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
              <div className="flex items-center mt-4">
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2" />
                  <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
                </div>
              </div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
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
