import Image from "next/image";
import Link from "next/link";
import HeaderBtns from "../client/HeaderBtns";
import '../header.scss';

export default function Header() {


    return (
        <header className="Header" id="Main">
            <div className="Header__links">
                <div className="He121vav#4flvs">
                    <Link className="Header__links__link" href={"/catalog/man"} >Мужчинам</Link>
                    <Link className="Header__links__link" href={"/catalog/woman"} >Женщинам</Link>
                    <Link className="Header__links__link" href={"/catalog/kids"}>Детям</Link>
                </div>
                <Link className="Header__links__link" href={"/info"}>О нас</Link>
            </div>
            <Link href={"/"}>
                <Image
                    src={"/png/Logomain.png"}
                    alt={"ЗДЕСЬ ДОЛЖЕН БЫЛ БЫТЬ ЛОГОТИП"}
                    className={"Header__logo"}
                    height={100}
                    width={250}
                    quality={100}
                    priority={true}
                />
                </Link> 
            <HeaderBtns/>
            {/* <div className="ErrorBlock">Ошибка!</div> */}
        </header>

    )
}