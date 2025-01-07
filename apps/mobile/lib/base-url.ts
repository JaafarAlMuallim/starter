import Constants from "expo-constants";

/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
  const debuggerHost = Constants.expoConfig?.hostUri;
  const localhost = debuggerHost?.split(":")[0] || "localhost";
  if (!localhost) console.log("Failed to get localhost. Point to prod server");
  return `http://${localhost}:8080/trpc`;
};
