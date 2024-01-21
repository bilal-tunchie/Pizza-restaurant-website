import Heading from "@/components/heading"

import OffersClient from "./_components/offersClient";
import getOffers from "@/actions/getOffers"

export async function generateMetadata() {
    return {
        title: "العروض",
    };
}

async function Offerspage() {
    const offers = await getOffers();

    return (
        <div className="mt-24">
            <Heading title="العروض"/>
            {/* <OffersClient data={offers}/> */}
        </div>
    )
}

export default Offerspage;