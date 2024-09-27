 export function timeAgo(timestamp: any): string {
  const milliseconds = Number(timestamp / BigInt(1_000_000));
  const postDate = new Date(milliseconds);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const elapsed = Math.floor(secondsAgo / value);
    if (elapsed > 0) {
      return `${elapsed} ${unit}${elapsed > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export function formatBudget(budget: bigint): string {
  return `${Number(budget).toLocaleString()}`;
}




