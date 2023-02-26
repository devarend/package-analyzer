import { FC } from "react";
import {
  PackageInformation,
  SimilarPackages,
  SimilarPackagesInformation,
} from "../../types";
import {
  getPackageInformation,
  getSimilarPackageInformation,
} from "@/utils/packageInformation";

const DependencyResult: FC<DependencyResultProps> = ({
  packageInformation,
  packageName,
  similarPackages,
  similarPackagesInformation,
}) => {
  const isFulfilled = !!packageInformation;
  const backgroundColor = isFulfilled ? "bg-white" : "bg-gray-200";
  const { size, gzip, description } = getPackageInformation(packageInformation);

  const onClick = (link: string | null) => {
    if (!link) return;
    window.open(link, "_blank");
  };

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
          const { gzip: similarPackageGzip, repository } =
            getSimilarPackageInformation(item, similarPackagesInformation);
          const isLowerSize = similarPackageGzip < gzip;
          const buttonBackground = isLowerSize
            ? "from-green-400 via-green-500 to-green-600"
            : "from-red-400 via-red-500 to-red-600";
          return (
            <button
              key={key}
              type="button"
              onClick={() => onClick(repository)}
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
  similarPackages: SimilarPackages;
  similarPackagesInformation: SimilarPackagesInformation;
}

export default DependencyResult;
