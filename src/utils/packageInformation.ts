import {
  Item,
  PackageInformation,
  SimilarPackagesInformation,
} from "../../types";
import {
  fetchPackageInformation,
  fetchSimilarPackages,
} from "@/services/bundlePhobiaService";

export const fetchInfo = async (key: string, value: string) => {
  let item: Item = {
    packageName: `${key}@${value}`,
    packageInformation: null,
    similarPackages: [],
    similarPackagesInformation: {},
  };
  try {
    item.packageInformation = await fetchPackageInformation(
      key,
      value as string
    );
    const { category } = await fetchSimilarPackages(key);
    if (category.score >= 999) {
      item.similarPackages = category.similar;
      await Promise.all(
        category.similar.map(async (similarItem) => {
          try {
            item.similarPackagesInformation[similarItem] =
              await fetchPackageInformation(similarItem);
          } catch {}
        })
      );
    }
    return item;
  } catch {
    return item;
  }
};

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
