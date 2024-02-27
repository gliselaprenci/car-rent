import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { AppRoutes } from '../../app.routes';

export type SidebarItem = {
  id: number,
  icon: IconProp,
  label: string,
  route: AppRoutes
}
