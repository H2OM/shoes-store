import Catalog from "@components/catalog/server/Catalog";
import {SearchParams} from "@_types/common";

export default function Page({params, searchParams}: {
    params: Promise<{}>;
    searchParams: Promise<SearchParams>;
}) {
    return <Catalog promiseParams={params} promiseSearchParams={searchParams}/>;
}
