import { AiOutlineHome,  } from 'react-icons/ai';
import { GiReceiveMoney } from "react-icons/gi";
import { LuList, LuListMinus,LuListPlus } from "react-icons/lu";
const links = [
  { name: 'Home', href: '/dashboard', icon: AiOutlineHome },
  { name: 'Transaction', href: '/dashboard/listTransaction', icon: GiReceiveMoney },
  { name: 'Catégories', href: '/dashboard/categories', icon: LuList },
  { name: 'Sous Catégories', href: '/dashboard/subCategories', icon: LuListMinus  },
  { name: 'Nouvelle transaction', href: '/dashboard/newTransaction', icon: LuListPlus},
];

export default links;
