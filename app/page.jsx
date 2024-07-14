import { redirect } from "next/navigation";
import './page.scss';
import MiniSlider from "@/lib/basecomponents/miniSlider/miniSlider";
import MainSlider from "@/components/mainSlider/client/MainSlider";
import GET_DATA from "@/lib/GETDATA/GET_DATA";
export default async function Page() {

    const data = await GET_DATA({controller: 'media', action: 'main-info'});

    if(!data) {
        return redirect('catalog');
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