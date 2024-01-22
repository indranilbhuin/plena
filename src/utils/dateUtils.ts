export function formatDate(timestamp) {
  const options = {year: 'numeric', month: 'short', day: 'numeric'};
  const date = new Date(timestamp).toLocaleDateString('en-US', options);

  const timeOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
  const time = new Date(timestamp).toLocaleTimeString('en-US', timeOptions);

  return `${date} ${time}`;
}
