import './scss/style.scss';
import localFont from 'next/font/local';
import {Header} from "@components/header/server/Header";
import Footer from "@components/footer/server/Footer";
import {ReactNode} from "react";
import {FavoritesProvider} from "@providers/FavoritesProvider";
import {BasketProvider} from "@providers/BasketProvider";
import {Toaster} from "react-hot-toast";
import {UserProvider} from "@providers/UserProvider";
import Preloader from "@ui/preloader/Preloader";

const raleway = localFont({
    src: [
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyCkIT5lu.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptxg8zYS_SKggPN4iEgvnHyvveLxVtaorCIPrE.woff2",
            weight: "200",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptsg8zYS_SKggPNyCg4SYFqPfE.woff2",
            weight: "200",
            style: "italic",
        },
        {
            path: "../public/fonts/1Ptsg8zYS_SKggPNyCg4TYFq.woff2",
            weight: "200",
            style: "italic",
        },
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyCkIT5lu.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyC0ITw.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptsg8zYS_SKggPNyCg4SYFqPfE.woff2",
            weight: "300",
            style: "italic",
        },
        {
            path: "../public/fonts/1Ptsg8zYS_SKggPNyCg4TYFq.woff2",
            weight: "300",
            style: "italic",
        },
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyCkIT5lu.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyC0ITw.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyCkIT5lu.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/1Pt_g8zYS_SKggPNyCgSQamb1W0lwk4S4VrMDrcfIA9c.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/1Ptug8zYS_SKggPNyCkIT5lu.woff2",
            weight: "600",
            style: "normal",
        },
    ]
})

export default async function Layout({children}: { children: ReactNode }) {
    return (
        <html className={raleway.className}>
        <body>
        <BasketProvider>
            <FavoritesProvider>
                <UserProvider>
                    <Preloader/>
                    <Toaster position={"top-center"} reverseOrder={false}/>
                    <Header/>
                    {children}
                    <Footer/>
                </UserProvider>
            </FavoritesProvider>
        </BasketProvider>
        </body>
        </html>
    )
}