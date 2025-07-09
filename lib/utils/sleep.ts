type SleepArgs = {
  ms: number;
};

export function sleep({ ms = 2000 }: SleepArgs) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
