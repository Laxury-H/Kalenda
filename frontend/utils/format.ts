export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString();
};

export const formatPrice = (price: number): string => {
  return `${price.toFixed(2)} SOL`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};