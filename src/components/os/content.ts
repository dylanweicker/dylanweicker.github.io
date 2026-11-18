import { createContext, useContext } from 'react';
import type { SiteContent } from '@/lib/types';

export const ContentContext = createContext<SiteContent>({ work: [], projects: [] });

export const useSiteContent = () => useContext(ContentContext);
