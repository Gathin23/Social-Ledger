export default function PoapDisplay({items}) {
    return (
        items.map((item) => (
            
                <div className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm">
                    <a href={item.href}>
                        <div className="pt-3 ml-4 mr-2 mb-3">
                            <h3 className="text-xl text-gray-900">
                                {item.name}
                            </h3>
                            <p className="mt-1 text-gray-600">
                                {item.desc}
                            </p>
                        </div>
                    </a>
                </div>
            )
        )
    )
}