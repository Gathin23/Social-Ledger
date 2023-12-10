const dotenv = require("dotenv");
const airstack = require("@airstack/node");


dotenv.config();

airstack.init(process.env.AIRSTACK_API_KEY);




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
        input: {filter: {identity: {_in: ${optedInAddresses}},followerSince:{_gt:${myStartTime}}}, blockchain: ALL, limit:1000,order:{followerSince:DESC}}
      ) {
        Follower {
          followerSince
          followerProfileId
          followingProfileId
          dappName
        }
      }
    }
  `;

  const { data, error } = await airstack.fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
};

main();
