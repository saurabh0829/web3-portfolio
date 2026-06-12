export async function POST(request: Request) {
    const body = await request.text();
    const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;

    const response = await fetch(
        `https://base-mainnet.g.alchemy.com/v2/${alchemyKey}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
        }
    );

    const data = await response.text();
    return new Response(data, {
        status: response.status,
        headers: { "Content-Type": "application/json" },
    });
}
