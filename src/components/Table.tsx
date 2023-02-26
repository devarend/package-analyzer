import { FC } from "react";
import DependencyResult from "@/components/DependencyResult";
import { Item } from "../../types";

const Table: FC<TableProps> = ({ dependencyResults }) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            Package name
          </th>
          <th scope="col" className="px-6 py-3">
            Minified size
          </th>
          <th scope="col" className="px-6 py-3">
            Minified + gzipped
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Alternatives
          </th>
        </tr>
      </thead>
      <tbody>
        {dependencyResults.map(
          (
            {
              packageInformation,
              packageName,
              similarPackages,
              similarPackagesInformation,
            },
            key
          ) => {
            return (
              <DependencyResult
                key={key}
                packageInformation={packageInformation}
                packageName={packageName}
                similarPackages={similarPackages}
                similarPackagesInformation={similarPackagesInformation}
              />
            );
          }
        )}
      </tbody>
    </table>
  );
};

interface TableProps {
  dependencyResults: Item[];
}

export default Table;
