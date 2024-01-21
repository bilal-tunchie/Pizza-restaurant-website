import Billboard from "@/components/Billboard";
import MenuNavWrapper from "@/components/menuNav/MenuNavWrapper";
import ClientOnly from "@/components/ClientOnly";

import getProducts from "@/actions/getProducts";
import { blurImage } from "@/lib/imageBuffer";

export default async function Home() {
    const products = await getProducts();
    const bluryImage = await blurImage();

    return (
        <ClientOnly>
            <div>
                {/* <Billboard/> */}
                {/* <MenuNavWrapper data={products} bluryImage={bluryImage}/> */}
            </div>
        </ClientOnly>
    )
}
