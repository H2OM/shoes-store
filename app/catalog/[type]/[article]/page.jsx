import Details from "@/components/details/server/Details";
import {notFound} from "next/navigation";
import GET_DATA from "@/lib/GETDATA/GET_DATA";

export default async function Page({params}) {

    const data = await GET_DATA({
        controller: 'catalog',
        action: 'get-product' + params.type + '&article=' + params.article
    });

    if(!data) {
        return notFound();
    }

    return <Details data={data}/>
}