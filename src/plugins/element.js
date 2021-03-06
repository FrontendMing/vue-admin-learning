import Vue from 'vue'
import {
  Icon,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Tabs,
  TabPane,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Pagination,
  Form,
  FormItem,
  Radio,
  Checkbox,
  Input,
  Select,
  Option,
  Message,
  MessageBox,
  Upload,
  Dialog,
  Divider,
  Loading,
} from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small' };

Vue.use(Icon)
   .use(Row)
   .use(Col)
   .use(Card)
   .use(Button)
   .use(Badge)
   .use(Tabs)
   .use(TabPane)
   .use(Badge)
   .use(Menu)
   .use(Submenu)
   .use(MenuItem)
   .use(MenuItemGroup)
   .use(Dropdown)
   .use(DropdownMenu)
   .use(DropdownItem)
   .use(Table)
   .use(TableColumn)
   .use(Pagination)
   .use(Form)
   .use(FormItem)
   .use(Radio)
   .use(Checkbox)
   .use(Input)
   .use(Select)
   .use(Option)
   .use(Upload)
   .use(Dialog)
   .use(Divider)
   .use(Loading)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
