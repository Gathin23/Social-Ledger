import { useQuery } from "@airstack/airstack-react";
import PropTypes from 'prop-types';

const GET_QUERY = `
query tokens($address: Identity!) {
  erc721: TokenBalances(
    input: {filter: {owner: {_in: [$address]}, tokenType: {_in: [ERC721]}}, limit: 10, blockchain: ethereum}
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



const DataComponent = ({confrimedAddress}) => {
  const { data, loading, error } = useQuery(GET_QUERY, {"address":confrimedAddress}, { cache: false });
  let dataString;

  if (loading) {
    return <p>Loading Data for {confrimedAddress}...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>No Data for {confrimedAddress}.</p>;
  }

  dataString = JSON.stringify(data, null, 2);
  
  let ens = {
    link: data.ens.Domain[0].name,
  }

// split lens & farcaster from socials
let socials = {
  lens: {},
  farcaster: {},
}

for (let i = 0; i < data.socials.Social.length; i++) {
  if (data.socials.Social[i].dappName === 'lens') {
    socials.lens = {
      profileName: data.socials.Social[i].profileName,
      blockchain: data.socials.Social[i].blockchain,
      userId: data.socials.Social[i].userId,
      followerCount: data.socials.Social[i].followerCount,
      followingCount: data.socials.Social[i].followingCount,
    }
  } else if (data.socials.Social[i].dappName === 'farcaster') {
    socials.farcaster = {
      profileName: data.socials.Social[i].profileName,
      blockchain: data.socials.Social[i].blockchain,
      userId: data.socials.Social[i].userId,
      followerCount: data.socials.Social[i].followerCount,
      followingCount: data.socials.Social[i].followingCount,
    }
  }
}

let poap = {
  poaps: [],
  total: 0,
}

poap.total = data.poap.Poap.length

for (let i = 0; i < data.poap.Poap.length; i++) {
  poap.poaps.push({
    eventName: data.poap.Poap[i].poapEvent.eventName,
    desscription: data.poap.Poap[i].poapEvent.description,
  })
}

let nft = {
  nfts: [],
  total: 0,
}

let NFTs = data.erc721.data
nft.total = NFTs.length


for (let i = 0; i < NFTs.length; i++) {
  let image= "https://via.placeholder.com/150";
  if (NFTs[i].tokenNfts.contentValue.image !== null) {
    image= NFTs[i].tokenNfts.contentValue.image.original
  }

  nft.nfts.push({
    name: NFTs[i].token?.name ? NFTs[i].token.name : "No Name",
    symbol: NFTs[i].token.symbol? NFTs[i].token.symbol : "No Symbol",
    tokenId: NFTs[i].tokenNfts.tokenId? NFTs[i].tokenNfts.tokenId : "No Token ID",
    image: image,
  })
}

let xmtp = {
  enabled: data.xmtp.XMTP[0].isXMTPEnabled? data.xmtp.XMTP[0].isXMTPEnabled : false,
  owner: data.xmtp.XMTP[0].primaryDomain?.name? data.xmtp.XMTP[0].primaryDomain.name : "No XMTP",
}

  // Render your component using the data returned by the query
  return (
    <>
      <p>Address: {confrimedAddress}</p>
      <p>XMTP Enabled: {xmtp.enabled ? "True":"False"}</p>
      <p>XMTP: {xmtp.owner}</p>
      <p>ENS: {ens.link}</p>
      <pre>{JSON.stringify(socials, null, 2)}</pre>
      <pre>{JSON.stringify(poap, null, 2)}</pre>
      <pre>{JSON.stringify(nft, null, 2)}</pre>

      <pre>{dataString}</pre>

    </>
  );
};

DataComponent.propTypes = {
  confrimedAddress: PropTypes.string,
};

export default DataComponent;