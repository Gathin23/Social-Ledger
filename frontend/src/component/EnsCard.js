export default function EnsCard({ item }) {
    return (
      <li className="border rounded-lg bg-white bg-opacity-60 p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
        <div className="flex items-start justify-between p-4">
          <div className="space-y-2">
            <img src={item.icon} width="60px" height="60px" />
            <h4 className="text-gray-800 font-semibold">{item.name}</h4>
            <p className="text-gray-600 text-sm">{item.link}</p>
          </div>
          <a
            className="text-black text-sm border border-black rounded-lg px-3 py-2 duration-150 hover:bg-gray-100"
            href={item.href}
          >
            View ENS
          </a>
        </div>
      </li>
    );
  }