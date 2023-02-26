export type ValidationStatus = "valid" | "invalid" | null;

export type PackageInformation = null | {
  size: number;
  gzip: number;
  description: string;
};

export type SimilarPackages = [] | string[];

export type SimilarPackageInformation = {
  category: {
    score: number;
    similar: SimilarPackages;
  };
};

export type SimilarPackagesInformation = Record<string, PackageInformation>;

export type Item = {
  packageName: string;
  packageInformation: PackageInformation;
  similarPackages: SimilarPackages;
  similarPackagesInformation: SimilarPackagesInformation;
};
