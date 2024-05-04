export interface IFormState {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  jobLocation: string;
  languages: string[];
  interest: boolean;
  jobRole: string;
}

export interface IFormStatusState {
  success: boolean;
  message: string;
  error?: Partial<Record<keyof IFormState, string>>;
}
