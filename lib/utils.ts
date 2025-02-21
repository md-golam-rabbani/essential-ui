type SleepArgs = {
  ms: number;
};

export const sleep = async ({ ms = 1000 }: SleepArgs) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
