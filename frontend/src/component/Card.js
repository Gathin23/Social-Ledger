import lens from "../images/lens.png"
import farcaster from "../images/farcaster.png"
import ens from "../images/ens.png"


const integrations = [
    {
        title: "Lens Protocol",
        desc: "",
        icon: <img src={lens} width="100px" height="100px" />

    }, {
        title: "Farcaster",
        desc: "",
        icon: <img src={farcaster} width="80px" height="80px" />

    }, {
        title: "ENS",
        desc: "",
        icon: <img src={ens} width="60px" height="60px" />

    },
]

export default function ConnectButton() {
    return (
    <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="max-w-md">
                <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">Integrations</h1>
                <p className="text-gray-600 mt-2">Extend and automate your workflow by using integrations for your favorite tools.</p>
            </div>
            <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {
                    integrations.map((item, idx) => (
                        <li className="border rounded-lg">
                            <div className="flex items-start justify-between p-4">
                                <div className="space-y-2">
                                    {item.icon}
                                    <h4 className="text-gray-800 font-semibold">{item.title}</h4>
                                    <p className="text-gray-600 text-sm">{item.desc}</p>
                                </div>
                                <button className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 hover:bg-gray-100">Connect</button>
                            </div>
                            <div className="py-5 px-4 border-t text-right">
                                <a href="javascript:void(0)" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                                    View integration
                                </a>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </section>
            )
}