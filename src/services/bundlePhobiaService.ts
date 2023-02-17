export const fetchPackageInformation = async (key: string, value: string) => {
  const response = await fetch(
    `https://bundlephobia.com/api/size?package=${key}@${value}&record=true`
  );
  if (!response.ok) {
    throw new Error(`${response.status}: ${await response.text()}`);
  }
  return response.json();
};
