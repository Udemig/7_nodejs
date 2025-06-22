import { BiHeart } from "react-icons/bi";
import { FaRegCompass } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { MdHelpOutline } from "react-icons/md";

export const links = [
    { icon: <IoHome />, title: "Anasayfa", path:'/'},
    { icon: <IoIosCreate />, title: "Oluştur", path:'/ekle'},
    { icon: <FaRegCompass />, title: "Keşfet", path:'/kesfet'},
    { icon: <BiHeart />, title: "Favoriler", path:'/fav'},
    { icon: <MdHelpOutline />, title: "Yardım", path:'/yardim'},

]