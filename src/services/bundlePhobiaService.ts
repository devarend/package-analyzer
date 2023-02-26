import { PackageInformation, SimilarPackageInformation } from "../../types";

export const fetchPackageInformation = async (
  key: string,
  value?: string
): Promise<PackageInformation> => {
  const version = value ? `@${value}` : "";
  const response = await fetch(
    `https://bundlephobia.com/api/size?package=${key}${version}&record=true`
  );
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
};

export const fetchSimilarPackages = async (
  packageName: string
): Promise<SimilarPackageInformation> => {
  const response = await fetch(
    `https://bundlephobia.com/api/similar-packages?package=${packageName}`
  );
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
};
