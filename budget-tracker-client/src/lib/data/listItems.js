import { AiOutlineHome,  } from 'react-icons/ai';
import { GiReceiveMoney } from "react-icons/gi";
import { LuList, LuListMinus,LuListPlus } from "react-icons/lu";
import { AiOutlineFileAdd } from "react-icons/ai";
const links = [
  { name: 'Home', href: '/dashboard', icon: AiOutlineHome },
  { name: 'Transaction', href: '/dashboard/listTransaction', icon: GiReceiveMoney },
  { name: 'Catégories', href: '/dashboard/categories', icon: LuList },
  { name: 'Sous Catégories', href: '/dashboard/subCategories', icon: LuListMinus  },
  { name: 'Nouvelle transaction', href: '/dashboard/newTransaction', icon: LuListPlus},
  { name: 'Import', href: '/dashboard/import', icon: AiOutlineFileAdd},

];

export default links;
