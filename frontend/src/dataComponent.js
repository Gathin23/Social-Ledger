import { useQuery } from "@airstack/airstack-react";
import PropTypes from 'prop-types';

const GET_VITALIK_LENS_FARCASTER_ENS = `
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
      userAssociatedAddresses
      userId
      userCreatedAtBlockTimestamp
    }
  }
}
`;



const DataComponent = ({confrimedAddress}) => {
  const { data, loading, error } = useQuery(GET_VITALIK_LENS_FARCASTER_ENS, {"address":confrimedAddress}, { cache: false });
  let dataString;

  if (loading) {
    return <p>Loading Data for {confrimedAddress}...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  dataString = JSON.stringify(data, null, 2);

  // Render your component using the data returned by the query
  return (
    <>
      <p>Address: {confrimedAddress}</p>
      <pre>{dataString}</pre>
    </>
  );
};

DataComponent.propTypes = {
  confrimedAddress: PropTypes.string,
};

export default DataComponent;