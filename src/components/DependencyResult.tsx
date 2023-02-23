import { FC } from "react";
import { PackageInformation } from "../../types";

const getPackageInformation = (packageInformation: PackageInformation) => {
  if (!packageInformation) return { size: 0, gzip: 0, description: null };
  const { size, gzip, description } = packageInformation;
  return {
    size: (size / 1024).toFixed(1),
    gzip: (gzip / 1024).toFixed(1),
    description,
  };
};

const getSimilarPackageInformation = (
  item: string,
  similarPackagesInformation: { [key: string]: PackageInformation }
) => {
  if (!(item in similarPackagesInformation)) return { size: 0, gzip: 0 };
  const { gzip } = similarPackagesInformation[item];
  return {
    gzip: (gzip / 1024).toFixed(1),
  };
};

const DependencyResult: FC<DependencyResultProps> = ({
  packageInformation,
  packageName,
  similarPackages,
  similarPackagesInformation,
}) => {
  const isFulfilled = !!packageInformation;
  const backgroundColor = isFulfilled ? "bg-white" : "bg-gray-200";
  const { size, gzip, description } = getPackageInformation(packageInformation);

  return (
    <tr className={`${backgroundColor} border-b hover:bg-gray-50`}>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        {packageName}
      </th>
      <td className="px-6 py-4">{size ? `${size}kB` : null}</td>
      <td className="px-6 py-4">{gzip ? `${gzip}kB` : null}</td>
      <td className="px-6 py-4">{description}</td>
      <td className="px-6 py-4">
        {similarPackages.map((item, key) => {
          const { gzip: similarPackageGzip } = getSimilarPackageInformation(
            item,
            similarPackagesInformation
          );
          const isLowerSize = similarPackageGzip < gzip;
          const buttonBackground = isLowerSize
            ? "from-green-400 via-green-500 to-green-600"
            : "from-red-400 via-red-500 to-red-600";
          return (
            <button
              key={key}
              type="button"
              onClick={() => null}
              className={`text-white mt-2 bg-gradient-to-br ${buttonBackground} hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
            >
              {item} {similarPackageGzip ? `(${similarPackageGzip}kB)` : null}
            </button>
          );
        })}
      </td>
    </tr>
  );
};

interface DependencyResultProps {
  packageInformation: PackageInformation;
  packageName: string;
  similarPackages: string[];
  similarPackagesInformation: { [key: string]: PackageInformation };
}

export default DependencyResult;
