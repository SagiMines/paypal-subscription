import { IMainContext } from '@/interfaces/IMainContext';
import { createContext } from 'react';

export const MainContext = createContext<IMainContext>({} as IMainContext);
