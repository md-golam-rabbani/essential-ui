import * as z from 'zod';

export const formSchema = z.object({
  fname: z
    .string({
      required_error: 'First name is required',
    })
    .min(3, { message: 'First name must be at least 3 characters long' }),
  lname: z.string().optional(),
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Please enter a valid gmail address' }),
});

export type IFormFields = z.infer<typeof formSchema>;

export const initialValues: IFormFields = {
  fname: '',
  lname: '',
  email: '',
};
