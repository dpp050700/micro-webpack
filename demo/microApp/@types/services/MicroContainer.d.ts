declare module 'MicroContainer/components/antd' {
  import 'antd/es/auto-complete/style/index.css';
  import 'antd/es/alert/style/index.css';
  import 'antd/es/breadcrumb/style/index.css';
  import 'antd/es/button/style/index.css';
  import 'antd/es/checkbox/style/index.css';
  import 'antd/es/dropdown/style/index.css';
  import 'antd/es/empty/style/index.css';
  import 'antd/es/input/style/index.css';
  import 'antd/es/input-number/style/index.css';
  import 'antd/es/menu/style/index.css';
  import 'antd/es/message/style/index.css';
  import 'antd/es/modal/style/index.css';
  import 'antd/es/notification/style/index.css';
  import 'antd/es/pagination/style/index.css';
  import 'antd/es/popconfirm/style/index.css';
  import 'antd/es/radio/style/index.css';
  import 'antd/es/select/style/index.css';
  import 'antd/es/space/style/index.css';
  import 'antd/es/spin/style/index.css';
  import 'antd/es/switch/style/index.css';
  import 'antd/es/tabs/style/index.css';
  import 'antd/es/tag/style/index.css';
  import 'antd/es/timeline/style/index.css';
  import 'antd/es/tooltip/style/index.css';
  import 'antd/es/form/style/index.css';
  import 'antd/es/row/style/css';
  import 'antd/es/col/style/css';
  import 'antd/es/tree/style/index.css';
  import 'antd/es/cascader/style/index.css';
  import 'antd/es/carousel/style/index.css';
  import 'antd/es/upload/style/index.css';
  import 'antd/es/progress/style/index.css';
  import 'antd/es/divider/style/index.css';
  import 'antd/es/icon/style/index.css';
  import 'antd/es/steps/style/index.css';
  import 'antd/es/popover/style/index.css';
  import 'antd/es/drawer/style/index.css';
  import 'antd/es/collapse/style/index.css';
  import 'antd/es/typography/style/index.css';
  import 'antd/es/layout/style/index.css';
  import 'antd/es/avatar/style/index.css';
  export { default as AutoComplete } from 'antd/es/auto-complete';
  export { default as Alert } from 'antd/es/alert';
  export { default as Breadcrumb } from 'antd/es/breadcrumb';
  export { default as Button } from 'antd/es/button';
  export { default as Checkbox } from 'antd/es/checkbox';
  export { default as Dropdown } from 'antd/es/dropdown';
  export { default as Empty } from 'antd/es/empty';
  export { default as Input } from 'antd/es/input';
  export { default as InputNumber } from 'antd/es/input-number';
  export { default as Menu } from 'antd/es/menu';
  export { default as message } from 'antd/es/message';
  export { default as Modal } from 'antd/es/modal';
  export { default as notification } from 'antd/es/notification';
  export { default as Pagination } from 'antd/es/pagination';
  export { default as Popconfirm } from 'antd/es/popconfirm';
  export { default as Radio } from 'antd/es/radio';
  export { default as Select } from 'antd/es/select';
  export { default as Space } from 'antd/es/space';
  export { default as Spin } from 'antd/es/spin';
  export { default as Switch } from 'antd/es/switch';
  export { default as Tabs } from 'antd/es/tabs';
  export { default as Tag } from 'antd/es/tag';
  export { default as Timeline } from 'antd/es/timeline';
  export { default as Tooltip } from 'antd/es/tooltip';
  export { default as Form } from 'antd/es/form';
  export { default as Row } from 'antd/es/row';
  export { default as Col } from 'antd/es/col';
  export { default as Tree } from 'antd/es/tree';
  export { default as Cascader } from 'antd/es/cascader';
  export { default as Carousel } from 'antd/es/carousel';
  export { default as Upload } from 'antd/es/upload';
  export { default as Progress } from 'antd/es/progress';
  export { default as Divider } from 'antd/es/divider';
  export { default as Icon } from 'antd/es/icon';
  export { default as Steps } from 'antd/es/steps';
  export { default as Popover } from 'antd/es/popover';
  export { default as Drawer } from 'antd/es/drawer';
  export { default as Collapse } from 'antd/es/collapse';
  export { default as Layout } from 'antd/es/layout';
  export { default as Avatar } from 'antd/es/avatar';
  export { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

}
declare module 'MicroContainer/components/button' {
  import React from 'react';
  import { ITheme } from 'MicroContainer/components/button/type';
  interface IButton {
      children?: React.ReactElement;
      theme?: ITheme;
  }
  export default function Button({ children, theme }: IButton): JSX.Element;
  export {};

}
declare module 'MicroContainer/components/button/type' {
  export interface ITheme {
      theme?: 'normal' | 'dark';
  }

}
declare module 'MicroContainer/components/layout/components/AppHeader' {
  /// <reference types="react" />
  interface IAppHeader {
      collapsed: boolean;
      setCollapsed: () => void;
  }
  function AppHeader({ collapsed, setCollapsed }: IAppHeader): JSX.Element;
  export default AppHeader;

}
declare module 'MicroContainer/components/layout/components/AppLayout' {
  import React from 'react';
  interface IAppLayout {
      children: React.ReactNode;
  }
  export default function AppLayout({ children }: IAppLayout): JSX.Element;
  export {};

}
declare module 'MicroContainer/components/layout/components/AppMenu' {
  /// <reference types="react" />
  export default function AppMenu(): JSX.Element;

}
declare module 'MicroContainer/components/layout/components/UserAvatar' {
  /// <reference types="react" />
  export default function UserAvatar(): JSX.Element;

}
declare module 'MicroContainer/components/layout' {
  /// <reference types="react" />
  export default function RenderRoutes({ routes }: any): JSX.Element;

}
declare module 'MicroContainer' {
  export {};

}
declare module 'MicroContainer/utils/constant' {
  export const APPID = 500;
  export const APP_NAME = "test";
  function getId(name: string): string;
  export default getId;

}
declare module 'MicroContainer/utils/helper' {
  export const add: (a: number, b: number) => number;
  export const consoleFn: (content: string, type?: 'log' | 'warn') => void;

}
declare module 'MicroContainer' {
  import main = require('MicroContainer/src');
  export = main;
}