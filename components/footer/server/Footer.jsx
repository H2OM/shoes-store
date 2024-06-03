import Link from 'next/link';
import '../footer.scss';
import Image from 'next/image';
import FooterForm from '../client/FooterForm';

export default function Footer() {

    return (
        <footer className="Footer">
            <div className="grid">
                <div className="Footer__block Footer__block_1">
                    {/* <a href={serv+"agreement.html"} target="blank" className="Footer__link">Политика конфиденциальности</a>  */}
                    <Link href={"info#Callback"} className="Footer__link">Обратная связь</Link>
                    <Link href={"info#Contacts"} className="Footer__link">Контакты</Link>
                    <Link href={"/#Main"}>
                        <Image
                            src={"/png/Logomain.png"}
                            alt="ЗДЕСЬ ДОЛЖЕН БЫЛ БЫТЬ ЛОГОТИП"
                            className="Footer__logo"
                            height={0}
                            width={0}
                            sizes="100vw"
                            quality={100}
                        />   
                    </Link> 
                </div>
                <div className="Footer__block Footer__block_2">
                    <Link href={"info#Callback"} className="Footer__link">Тех. поддержка</Link>
                    <Link href={"info#Contacts"} className="Footer__link">Соц. сети</Link>
                    <Link href={"info#About"} className="Footer__link">О нас</Link>
                </div>
                <div className="Footer__block Footer__block_3">
                    <FooterForm/>
                </div>
            </div>
        </footer>
    )
}

