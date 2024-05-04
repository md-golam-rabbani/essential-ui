export interface IExampleFormFields {
  fname: string;
  lname: string;
  email: string;
  phone: string;
  password: string;
  jobLocation: string;
  languages: string[];
  interest: boolean;
  jobRole: string;
  terms: boolean;
}

export interface IExampleFormState {
  success: boolean;
  message: string;
  error?: Partial<Record<keyof IExampleFormFields, string>>;
}
