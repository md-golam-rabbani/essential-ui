import axios from 'axios';

const githubAxiosInstance = (baseUrl: string) => {
  const backend = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });

  return backend;
};

export default githubAxiosInstance;
