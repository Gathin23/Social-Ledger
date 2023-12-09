export default function Header() {
//navbar fixed with tailwind with just logo and title
    return (
        <nav className="flex items-center justify-between flex-wrap bg-white bg-opacity-60 p-6 rounded-lg shadow-xl backdrop-filter backdrop-blur-lg">
        <div className="flex items-center flex-shrink-0 text-black mr-6">
            <img src="https://img.lovepik.com/free-png/20210922/lovepik-small-flower-png-image_401111416_wh1200.png" width="30px" height="30px" />
            <span className="font-semibold text-xl tracking-tight ml-2">Social Ledger</span>
        </div>
        </nav>
    );
}