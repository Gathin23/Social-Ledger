export default function SocialCard({ item }) {
    return (
      <li className="border rounded-lg bg-white bg-opacity-60 p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
        <div className="flex items-start justify-between p-4">
          <div className="space-y-2">
            <img src={item.icon} width="60px" height="60px" />
            <h4 className="text-gray-800 font-semibold">{item.name}</h4>
            <p className="text-gray-600 text-sm">{item.profileName}</p>
          </div>
          <a className="text-black text-sm border border-black rounded-lg px-3 py-2 duration-150 hover:bg-gray-100" href={item.href}>View Profile</a>
        </div>
        <div className="py-5 px-4 border-t flex flex-row justify-around">
          {/* {show follower & followed count} */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">Followers</p>
            <p className="text-gray-800 font-semibold">{item.followerCount}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 text-sm">Following</p>
            <p className="text-gray-800 font-semibold">{item.followingCount}</p>
          </div>
        </div>
      </li>
    );
  }