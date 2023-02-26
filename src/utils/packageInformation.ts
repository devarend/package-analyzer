import { PackageInformation, SimilarPackagesInformation } from "../../types";

export const getPackageInformation = (
  packageInformation: PackageInformation
) => {
  if (!packageInformation) return { size: 0, gzip: 0, description: null };
  const { size, gzip, description } = packageInformation;
  return {
    size: (size / 1024).toFixed(1),
    gzip: (gzip / 1024).toFixed(1),
    description,
  };
};

export const getSimilarPackageInformation = (
  item: string,
  similarPackagesInformation: SimilarPackagesInformation
) => {
  if (!(item in similarPackagesInformation))
    return { size: 0, gzip: 0, repository: null };
  const { gzip, repository } = similarPackagesInformation[
    item
  ] as NonNullable<PackageInformation>;
  return {
    gzip: (gzip / 1024).toFixed(1),
    repository,
  };
};
