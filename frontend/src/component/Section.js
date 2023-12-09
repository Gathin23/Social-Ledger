import { useState } from "react";
import NftDisplay from "./NftDisplay"; // Import NftDisplay component
import PoapDisplay from "./PoapDisplay"; // Import PoapDisplay component

export default function Section({nft, poap}) {
    const [display, setDisplay] = useState(0); // State to manage button click

    const handleNftClick = () => {
        setDisplay(0); // Set display state to 0 for NFTs button
    };

    const handlePoapClick = () => {
        setDisplay(1); // Set display state to 1 for POAPs button
    };
    console.log(poap.poaps)

    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between py-4 border-b md:flex">
                <div>
                    <h3 className="text-gray-800 text-2xl font-bold">
                        Collections
                    </h3>
                </div>
                <div className="items-center gap-x-3 mt-6 md:mt-0 flex">
                    <button 
                        onClick={handleNftClick}
                        className={`block px-4 py-2 mt-3 text-center font-medium rounded-lg ${
                            display === 0
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 border hover:bg-gray-50 active:bg-gray-100'
                        } duration-150 md:text-sm`}
                    >
                        NFTs({nft.total})
                    </button>
                    <button
                        onClick={handlePoapClick}
                        className={`block px-4 py-2 md:mt-3 text-center font-medium rounded-lg ${
                            display === 1
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-700 border hover:bg-gray-50 active:bg-gray-100'
                        } duration-150 md:text-sm`}
                    >
                        POAPs({poap.total})
                    </button>
                </div>
            </div>
            {display === 0 && <NftDisplay items={nft.nfts}/>} {/* Render NftDisplay if display state is 0 */}
            {display === 1 && <PoapDisplay items={poap.poaps}/>} {/* Render PoapDisplay if display state is 1 */}
        </div>
    );
}
