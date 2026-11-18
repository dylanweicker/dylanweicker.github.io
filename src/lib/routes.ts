import { isAppId, type AppId } from '@/data/apps';

export interface Route {
  app: AppId;
  slug?: string;
}

/** The desktop home ("/") opens the Welcome window. */
export const HOME: Route = { app: 'about' };

export function pathFor({ app, slug }: Route): string {
  return slug ? `/${app}/${slug}/` : `/${app}/`;
}

export function parsePath(pathname: string): Route | null {
  const [app, slug] = pathname.split('/').filter(Boolean);
  if (!app) return HOME;
  if (!isAppId(app)) return null;
  return slug ? { app, slug } : { app };
}
