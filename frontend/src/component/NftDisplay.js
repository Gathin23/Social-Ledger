

export default function NftDisplay({items}) {

    const posts = [
        {
            name: "NFT1",
            image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            href: "javascript:void(0)",
            symbol: "NFT",
            tokenId:"1"
        }
    ]
    
    return (
        <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
            <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {
                    items.map((items, key) => (
                        <div className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm" key={key}>
                            <a href={items.href}>
                                <img src={items.image} loading="lazy" alt={items.name}  className="w-full h-48 rounded-t-md" />
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl text-gray-900">
                                        {items.name}
                                    </h3>
                                    <p className="mt-1 text-gray-600">
                                        {items.symbol} #{items.tokenId}
                                    </p>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}
