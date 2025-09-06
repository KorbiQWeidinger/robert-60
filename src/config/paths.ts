// Centralized path configuration
export const BASE_PATH = "/robert-60";

// Helper function to create full paths
export const createPath = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_PATH}/${cleanPath}`;
};

// Specific path creators
export const createAudioPath = (filename: string): string => {
  return createPath(filename);
};

export const createImagePath = (filename: string): string => {
  return createPath(filename);
};
