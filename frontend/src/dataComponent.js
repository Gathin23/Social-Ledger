import { useQuery } from "@airstack/airstack-react";
import PropTypes from "prop-types";
import Section from "./component/Section";
import lens from "./images/lens.png";
import farcaster from "./images/farcaster.png";
import ensIcon from "./images/ens.png";
import EnsCard from "./component/EnsCard";
import SocialCard from "./component/SocialCard";
import UrlCopy from "./component/UrlCopy";
import Header from "./component/Header";

const GET_QUERY = `
query tokens($address: Identity!) {
  erc721: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenType: {_in: [ERC721]}}, limit: 25, blockchain: ethereum}
  ) {
    data:TokenBalance {
      amount
      chainId
      id
      tokenAddress
      tokenId
      tokenType
      token {
        name
        symbol
      }
      tokenNfts {
        tokenId
        metaData {
          name
        }
        contentValue {
          image {
            medium
            extraSmall
            large
            original
            small
          }
        }
      }
    }
  }
  poap: Poaps(input: {blockchain: ALL, filter: {owner: {_in: [$address]}}}) {
    Poap {
      tokenId
      dappName
      poapEvent{
        eventName
        startDate
        endDate
      }
    }
  }
  xmtp: XMTPs(input: {blockchain: ALL, filter: {owner: {_in: [$address]}}}) {
    XMTP {
      isXMTPEnabled
      owner {
        addresses
        primaryDomain {
          name
        }
      }
    }
  }
  socials: Socials(
    input: {filter: {identity: {_eq:$address} }, blockchain:ethereum}
  ) {
    Social {
      blockchain
      dappName
      profileName
      followerCount
      followingCount
      userAssociatedAddresses
      userId
      userCreatedAtBlockTimestamp
    }
  }
  ens:Domains(
    input: {
      filter: {
        owner: {
          _in: [
            $address
          ]
        }
      }
      blockchain: ethereum
    }
  ) {
    Domain {
      dappName
      name
    }
  }
}
`;

const DataComponent = ({ confrimedAddress }) => {
  const { data, loading, error } = useQuery(
    GET_QUERY,
    { address: confrimedAddress },
    { cache: false }
  );
  let dataString;

  if (loading) {
    return (
      <>
      <Header/>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white bg-opacity-60 p-6 rounded-lg shadow-xl text-center backdrop-filter backdrop-blur-lg">
          <p className="text-gray-800 text-2xl mb-4">
            Loading Data for 
          </p>
          <span className="block font-bold text-black text-lg">
            {confrimedAddress}
          </span>
        </div>
      </div>
      </>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No Data for {confrimedAddress}.</p>;
  }

  dataString = JSON.stringify(data, null, 2);

  let ens = {
    name: "ENS",
    link: "",
    icon: ensIcon,
    href: "https://app.ens.domains/name/",
  };

  try {
    if (data.ens.Domain[0].name) {
      ens.link = data.ens.Domain[0].name;
      ens.href = "https://app.ens.domains/name/" + data.ens.Domain[0].name;
    }
  } catch (error) {
    console.log("domain fetching issue");
  }

  // split lens & farcaster from socials
  let socials = {
    lens: {},
    farcaster: {},
  };
  //if the socails are empty, then the user has no socials
  if (data.socials.Social.length === 0) {
    socials.lens = {
      name: "Lens Protocol",
      icon: lens,
      profileName: "No Lens",
      blockchain: "ethereum",
      userId: "No Lens",
      followerCount: "No Lens",
      followingCount: "No Lens",
      href: "https://hey.xyz/u/",
    };
    socials.farcaster = {
      name: "Farcaster",
      icon: farcaster,
      profileName: "No Farcaster",
      blockchain: "ethereum",
      userId: "No Farcaster",
      followerCount: "No Farcaster",
      followingCount: "No Farcaster",
      href: "https://farcaster.network/profile/",
    };
  } else {
    for (let i = 0; i < data.socials.Social.length; i++) {
      if (data.socials.Social[i].dappName === "lens") {
        socials.lens = {
          name: "Lens Protocol",
          icon: lens,
          profileName: data.socials.Social[i].profileName,
          blockchain: data.socials.Social[i].blockchain,
          userId: data.socials.Social[i].userId,
          followerCount: data.socials.Social[i].followerCount,
          followingCount: data.socials.Social[i].followingCount,
          href:
            "https://hey.xyz/u/" +
            data.socials.Social[i].profileName.split("@")[1],
        };
      } else if (data.socials.Social[i].dappName === "farcaster") {
        socials.farcaster = {
          name: "Farcaster",
          icon: farcaster,
          profileName: data.socials.Social[i].profileName,
          blockchain: data.socials.Social[i].blockchain,
          userId: data.socials.Social[i].userId,
          followerCount: data.socials.Social[i].followerCount,
          followingCount: data.socials.Social[i].followingCount,
          href:
            "https://farcaster.network/profile/" +
            data.socials.Social[i].userId,
        };
      }
    }
  }

  let poap = {
    poaps: [],
    total: 0,
  };

  poap.total = data.poap.Poap.length;

  for (let i = 0; i < data.poap.Poap.length; i++) {
    poap.poaps.push({
      name: data.poap.Poap[i].poapEvent.eventName,
      desc: data.poap.Poap[i].poapEvent?.description
        ? data.poap.Poap[i].poapEvent.description
        : data.poap.Poap[i].dappName +
          " " +
          data.poap.Poap[i].poapEvent.eventName,
      href: "https://poap.gallery/event/" + data.poap.Poap[i].tokenId,
    });
  }

  let nft = {
    nfts: [],
    total: 0,
  };

  let NFTs = data.erc721.data;
  nft.total = NFTs.length;

  for (let i = 0; i < NFTs.length; i++) {
    let image = "https://via.placeholder.com/150";
    if (NFTs[i].tokenNfts.contentValue.image !== null) {
      image = NFTs[i].tokenNfts.contentValue.image.original;
    }

    nft.nfts.push({
      name: NFTs[i].token?.name ? NFTs[i].token.name : "No Name",
      symbol: NFTs[i].token.symbol ? NFTs[i].token.symbol : "No Symbol",
      tokenId: NFTs[i].tokenNfts.tokenId
        ? NFTs[i].tokenNfts.tokenId
        : "No Token ID",
      image: image,
    });
  }

  let xmtp = {
    enabled: data.xmtp.XMTP[0].isXMTPEnabled
      ? data.xmtp.XMTP[0].isXMTPEnabled
      : false,
    owner: data.xmtp.XMTP[0].primaryDomain?.name
      ? data.xmtp.XMTP[0].primaryDomain.name
      : "No XMTP",
  };

  // Render your component using the data returned by the query
  return (
    <>
    <Header/>
      {/* <p>Address: {confrimedAddress}</p>
      <p>XMTP Enabled: {xmtp.enabled ? "True":"False"}</p>
      <p>XMTP: {xmtp.owner}</p>
      <p>ENS: {ens.link}</p>
      <pre>{JSON.stringify(socials, null, 2)}</pre>
      <pre>{JSON.stringify(poap, null, 2)}</pre>
      <pre>{JSON.stringify(nft, null, 2)}</pre>

      <pre>{dataString}</pre> */}
      <UrlCopy/>

      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          {/* <div className="max-w-md">
                <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">Integrations</h1>
                <p className="text-gray-600 mt-2">Extend and automate your workflow by using integrations for your favorite tools.</p>
            </div> */}
          <ul className="mt-0 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <EnsCard item={ens} />
            <SocialCard item={socials.lens} />
            <SocialCard item={socials.farcaster} />
          </ul>
        </div>
      </section>
      <Section nft={nft} poap={poap} />
    </>
  );
};

DataComponent.propTypes = {
  confrimedAddress: PropTypes.string,
};

export default DataComponent;
