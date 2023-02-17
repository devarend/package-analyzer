import Head from "next/head";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";

const avoidCheckingDependencies = [
  "react",
  "react-dom",
  "next",
  "typescript",
  "eslint",
  "eslint-config-next",
];

const shouldCheckDependency = (key: string) => {
  const avoidCondition =
    avoidCheckingDependencies.includes(key) || key.startsWith("@types/");
  return !avoidCondition;
};

const Home = () => {
  const [validationStatus, setValidationStatus] = useState<
    "valid" | "invalid" | null
  >(null);

  const [packageJSON, setPackageJSON] = useState<string>("");

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setPackageJSON(event.target.value);
    try {
      const parsedPackageJSON = JSON.parse(event.target.value);
      if (!("dependencies" in parsedPackageJSON)) {
        setValidationStatus("invalid");
        return;
      }
      setValidationStatus("valid");
    } catch {
      setValidationStatus("invalid");
    }
  };

  const onClick = () => {
    const { dependencies } = JSON.parse(packageJSON);
    const dependenciesToCheck = Object.entries(dependencies).filter(([key]) =>
      shouldCheckDependency(key)
    );
    dependenciesToCheck.map(([key, value]) => {
      console.log(key, value);
    });
  };

  const valid = validationStatus === "valid";
  const invalid = validationStatus === "invalid";

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={"p-4"}>
          <div>
            <label
              htmlFor="json"
              className="block text-sm font-medium text-gray-700"
            >
              Paste your package.json here
            </label>
            <div className="mt-1">
              <textarea
                value={packageJSON}
                onChange={onChange}
                id="json"
                name="json"
                rows={12}
                className="mt-1 p-2 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="package.json"
              />
            </div>
            <div className={"flex mt-2 items-center"}>
              {valid && (
                <>
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  <p className="text-sm text-gray-500">Valid</p>
                </>
              )}
              {invalid && (
                <>
                  <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                  <p className="text-sm text-gray-500">Invalid</p>
                </>
              )}
            </div>
            <button
              type="button"
              disabled={!valid}
              onClick={onClick}
              className="text-white mt-2 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Check dependencies
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
