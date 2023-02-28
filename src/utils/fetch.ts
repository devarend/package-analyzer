export const fetchWithTimeout = async (endpoint: string, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(endpoint, {
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
};
