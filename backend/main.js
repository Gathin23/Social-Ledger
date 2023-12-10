const dotenv = require("dotenv");
const airstack = require("@airstack/node");
const fetch = require("node-fetch");
const ethers = require("ethers");
const Client = require("@xmtp/xmtp-js").Client;


dotenv.config();

airstack.init(process.env.AIRSTACK_API_KEY);

function addressesToGraphQLList(addresses) {
    return `[${addresses.map((address) => `"${address}"`).join(",")}]`;
}


const main = async () => {


    const optedInAddresses = await fetch("https://backend.susanoox.in/getOptedInAddresses").then((res) => {






        return res.json();
    })

    if (optedInAddresses.length == 0) {
        console.log("No opted in addresses");
        return;
    }

    console.log("Opted in addresses:", optedInAddresses);

    //   let time = "2023-12-09T14:24:56Z";
    const MS_PER_MINUTE = 60000;
    const now = new Date();
    durationInMinutes = 10;
    var myStartTime = new Date(now - durationInMinutes * MS_PER_MINUTE).toISOString();


    const query = `
  query GetAllSocials {
      SocialFollowers(
        input: {filter: {identity: {_in: ${addressesToGraphQLList(optedInAddresses)}},followerSince:{_gt:"${myStartTime}"}}, blockchain: ALL, limit:200,order:{followerSince:DESC}}
      ) {
        Follower {
          followerProfileId
          followingProfileId
          followingAddress{
            xmtp{
              id
              isXMTPEnabled
              owner{
                addresses
              }
            }
          }
          dappName
        }
      }
    }
  `;

    console.log("Query:", query);

    const { data, error } = await airstack.fetchQuery(query);

    if (error) {
        console.log("Error fetching data:", error, error.location);
    }

    if (data.SocialFollowers == null || data.SocialFollowers.Follower == null) {
        console.log("No data");
        return;
    }

    const Followers = data.SocialFollowers.Follower;

    let followerMap = {};
    followerMap["lens"] = {};
    followerMap["farcaster"] = {};


    for (let i = 0; i < Followers.length; i++) {
        const Follower = Followers[i];

        console.log("Follower:", Follower.followingAddress.xmtp[0].owner.addresses[0]);

        // const followerAddress = Follower.followingAddress.xmtp.owner.addresses[0];
        const fa = Follower.followingProfileId;
        // console.log("Following address:", Followers);
        if (Follower?.followingAddress != null || Follower?.followingAddress.xmtp != undefined ||Follower?.followingAddress?.xmtp[0]?.owner?.addresses?.length != 0) {
            followingAddress = Follower.followingAddress.xmtp[0].owner.addresses[0];
        }
        const dappName = Follower.dappName;

        if (dappName == "lens") {
            if (followerMap["lens"][followingAddress] == null) {
                followerMap["lens"][followingAddress] = 1;
            }

            followerMap["lens"][followingAddress] += 1;
        } else if (dappName == "farcaster") {
            if (followerMap["farcaster"][followingAddress] == null) {
                followerMap["farcaster"][followingAddress] = 1;
            }
            followerMap["farcaster"][followingAddress] += 1;

        }

        console.log(followerMap);
    }

    let messageAddressesMap = {};

    for (const dappName in followerMap) {
        const dapp = followerMap[dappName];

        for (const followingAddress in dapp) {
            const messageAddress = followingAddress;
            const message = `You have ${dapp[followingAddress]} new followers on ${dappName} in last ${durationInMinutes} minutes.`;

            if (messageAddressesMap[messageAddress] == null) {
                messageAddressesMap[messageAddress] = "";
            }else{
                messageAddressesMap[messageAddress] += "\n";
            }

            messageAddressesMap[messageAddress] += message;
        }





        // for (const followingAddress in followingAddresses) {
        //     const followingAddresses = Followers.followingAddress.xmtp[0].owner.addresses[0];
        //     console.log("Following addresses:", followingAddresses);

        //     console.log("Dapp name:", Followers);
        //     if (Followers.followingAddress == null || Followers.followingAddress.xmtp == null || Followers.followingAddress.xmtp[0] == null || Followers.followingAddress.xmtp[0].owner == null || Followers.followingAddress.xmtp[0].owner.addresses == null || Followers.followingAddress.xmtp[0].owner.addresses.length == 0) {
        //         console.log("No address");
        //         continue;
        //     }

        //     const messageAddress = followingAddress;
        //     const message = `You have ${counter[followingAddress]} new followers on ${dappName}. `;

        //     if (messageAddressesMap[messageAddress] == null) {
        //         messageAddressesMap[messageAddress] = "";
        //     }


        //     messageAddressesMap[messageAddress] += message;
        // }
    }

    console.log("Message addresses map:", messageAddressesMap);


    for (const messageAddress in messageAddressesMap) {
        const message = messageAddressesMap[messageAddress];
        console.log("Message address:", messageAddress);
        console.log("Message:", message);

        //call the xmtp api
        const signer = ethers.Wallet.createRandom();
        //Initialize the xmtp client
        const xmtp = await Client.create(signer, { env: "dev" });
        console.log("Broadcasting from: ", xmtp.address);
        //In this example we are going to broadcast to the GM_BOT wallet (already activated) and a random wallet (not activated)
        const GM_BOT = "0x937C0d4a6294cdfa575de17382c7076b579DC176";
        const test = ethers.Wallet.createRandom();
        const broadcasts_array = [messageAddress];
        //Querying the activation status of the wallets
        const broadcasts_canMessage = await xmtp.canMessage(broadcasts_array);
        for (let i = 0; i < broadcasts_array.length; i++) {
            //Checking the activation status of each wallet
            const wallet = broadcasts_array[i];
            const canMessage = broadcasts_canMessage[i];
            if (broadcasts_canMessage[i]) {
                //If activated, start
                const conversation = await xmtp.conversations.newConversation(wallet);
                // Send a message
                const sent = await conversation.send(message);
                console.log("Sent message:", sent);
            }
        }

    }
}

main();
