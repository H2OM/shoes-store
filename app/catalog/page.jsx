import Catalog from "@/components/catalog/server/catalog";


export default function Page ({params, searchParams}) {
    return <Catalog params={params} searchParams={searchParams}/>
}