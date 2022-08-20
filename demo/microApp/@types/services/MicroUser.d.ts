declare module 'MicroUser/bootstrap' {
  import 'MicroContainer/styles/base';

}
declare module 'MicroUser/exports/page' {
  import routes from '@/routes';
  export default routes;

}
declare module 'MicroUser' {

}
declare module 'MicroUser/pages/adminList' {
  /// <reference types="react" />
  export default function AdminList(): JSX.Element;

}
declare module 'MicroUser/pages/userList' {
  /// <reference types="react" />
  export default function UserList(): JSX.Element;

}
declare module 'MicroUser/routes' {
  /// <reference types="react" />
  import User from 'MicroUser/pages/userList';
  const _default: ({
      path: string;
      component: typeof User;
      name: string;
  } | {
      path: string;
      component: import("react").LazyExoticComponent<typeof import("../pages/adminList").default>;
      name: string;
  })[];
  export default _default;

}
declare module 'MicroUser' {
  import main = require('MicroUser/src');
  export = main;
}