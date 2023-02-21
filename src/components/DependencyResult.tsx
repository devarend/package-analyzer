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
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
        {isFulfilled ? similarPackages.join(", ") : ""}
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
