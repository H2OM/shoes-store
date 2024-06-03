import { redirect } from "next/navigation";
import './page.scss';
import MiniSlider from "@/lib/basecomponents/miniSlider/miniSlider";
import MainSlider from "@/components/mainSlider/client/MainSlider";
export default async function Page() {
    const data = await fetch('http://127.0.0.1/api/media/main-info', {method: 'GET', cache: "no-cache"})
    .then(data=>{
        if(!data.ok) {
            return false;
        }
        return data.json();
    }).catch(()=>false);
    if(!data) {
        redirect('catalog');
    }
    
    const {slider, popular, sales} = data;
    return (
        <section className="FirstPage section">
            <div className="Slider">
                <div className="grid">
                    <MainSlider slides={slider}/>
                </div>
            </div>
            <div className="grid">
                <div className="block">
                    { Array.isArray(popular) && popular.length > 0 ? <MiniSlider title={"Популярные товары"} products={popular}/> : null }
                </div>
                <div className="block">
                    { Array.isArray(popular) && popular.length > 0 ? <MiniSlider title={"Главные скидки"} products={sales}/> : null }
                </div>
            </div>
        </section>
    )
}