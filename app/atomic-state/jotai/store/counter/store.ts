import { atom } from 'jotai';

export const initialValues = {
  count: 0,
  simpleText: 'Default text',
};

export const countAtom = atom(0);

export const simpleTextAtom = atom('Default text');
