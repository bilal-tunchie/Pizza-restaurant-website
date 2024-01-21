import { getPlaiceholder } from "plaiceholder";

export async function blurImage() {
    try {
        const src: string = "https://mponlineassets.s3.me-south-1.amazonaws.com/ksa/assets/products/OOP.png"
        const buffer = await fetch(src).then(async (res) =>
            Buffer.from(await res.arrayBuffer())
        );
    
        const { base64 } = await getPlaiceholder(buffer);
    
        return base64;

    } catch (err) {
        console.log(err);
    }
}
