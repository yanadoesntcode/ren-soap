// Map product names to image filenames
export const getProductImage = (productName: string): string => {
  const slugName = productName
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumerics with hyphen
    .replace(/-+/g, '-')          // collapse multiple hyphens
    .replace(/^-|-$/g, '');       // trim leading/trailing hyphens

  return `/soaps/${slugName}.jpg`;
};
