import Details from "app/_components/details/server/Details";

export default function Page({params}: { params: Promise<{ id: string; }> }) {
    return <Details params={params}/>;
}