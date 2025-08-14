export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log('Copied to clipboard');
    })
    .catch((err) => {
      console.error('Failed to copy:', err);
    });
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const truncateString = (str, maxLength = 50) => {
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};