declare module 'MicroBook/bootstrap' {
  import 'MicroContainer/styles/base';

}
declare module 'MicroBook/exports/page' {
  import routes from '@/routes';
  export default routes;

}
declare module 'MicroBook' {

}
declare module 'MicroBook/pages/bookList' {
  /// <reference types="react" />
  export default function BookList(): JSX.Element;

}
declare module 'MicroBook/pages/categoryList' {
  /// <reference types="react" />
  export default function CategoryList(): JSX.Element;

}
declare module 'MicroBook/routes' {
  /// <reference types="react" />
  const _default: {
      path: string;
      component: import("react").LazyExoticComponent<typeof import("../pages/bookList").default>;
      name: string;
  }[];
  export default _default;

}
declare module 'MicroBook' {
  import main = require('MicroBook/src');
  export = main;
}