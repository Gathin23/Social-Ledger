export default function PoapDisplay({items}) {
    return (
        <div className="flex flex-wrap">
            {items.map((item) => (
                <div className="w-full sm:w-1/2 p-4">
                    <div className="max-w-md mx-auto mt-4 shadow-lg border rounded-md hover:bg-gray-200 duration-300 bg-white bg-opacity-60 p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
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
                </div>
            ))}
        </div>
    )
}