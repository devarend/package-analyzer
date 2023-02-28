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

export const getDependenciesToCheck = (packageJSON: string) => {
  const { dependencies } = JSON.parse(packageJSON);
  return Object.entries(dependencies).filter(([key]) =>
    shouldCheckDependency(key)
  );
};
