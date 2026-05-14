import "@/page.scss";
import {mainAPI} from "@api";
import MiniSlider from "@components/ui/miniSlider/MiniSlider";
import {SliderMain} from "@/_types/sliders";
import Fallback from "@ui/fallback/Fallback";
import {Product} from "@_types/product";
import MainSlider from "@components/main/client/MainSlider";

export default async function Main() {
    const data = await mainAPI.getInfo();

    const {slider, popular, sales}: {
        slider?: SliderMain[],
        popular?: Product[],
        sales?: Product[]
    } = data.data ?? {};

    return (
        <section className="FirstPage section">
            <div className="Slider">
                <div className="grid">
                    {slider && <MainSlider slides={slider}/>}
                    {!data.success && <Fallback message={data.message}/>}
                </div>
            </div>
            <div className="grid">
                <div className="block">
                    {Array.isArray(popular) && popular.length > 0 &&
                        <MiniSlider title={"Популярные товары"} products={popular}/>}
                    {!data.success && <Fallback message={data.message}/>}
                </div>
                <div className="block">
                    {Array.isArray(sales) && sales.length > 0 &&
                        <MiniSlider title={"Главные скидки"} products={sales}/>}
                    {!data.success && <Fallback message={data.message}/>}
                </div>
            </div>
        </section>
    );
}