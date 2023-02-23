import { FC } from "react";
import { PackageInformation } from "../../types";

const DependencyResult: FC<DependencyResultProps> = ({
  packageInformation,
  packageName,
  similarPackages,
}) => {
  const isFulfilled = !!packageInformation;
  const backgroundColor = isFulfilled ? "bg-white" : "bg-gray-200";
  return (
    <tr className={`${backgroundColor} border-b hover:bg-gray-50`}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {packageName}
      </th>
      <td className="px-6 py-4">
        {isFulfilled ? `${(packageInformation.size / 1024).toFixed(1)}kB` : ""}
      </td>
      <td className="px-6 py-4">
        {isFulfilled ? `${(packageInformation.gzip / 1024).toFixed(1)}kB` : ""}
      </td>
      <td className="px-6 py-4">
        {isFulfilled ? packageInformation.description : ""}
      </td>
      <td className="px-6 py-4">
        {similarPackages.map((item, key) => (
          <button
            key={key}
            type="button"
            onClick={() => null}
            className="text-white mt-2 bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            {item}
          </button>
        ))}
      </td>
    </tr>
  );
};

interface DependencyResultProps {
  packageInformation: PackageInformation;
  packageName: string;
  similarPackages: string[];
}

export default DependencyResult;
