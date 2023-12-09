const dotenv = require("dotenv");
const airstack = require("@airstack/node");


dotenv.config();

airstack.init(process.env.AIRSTACK_API_KEY);


const query = `
query MyQuery {
  Wallet(input: {identity: "vitalik.eth", blockchain: ethereum}) {
    socials {
      dappName
      profileName
    }
    addresses
  }
}
`;

const main = async () => {
  const { data, error } = await airstack.fetchQuery(query);

  if (error) {
    throw new Error(error.message);
  }

  console.log(data);
};

main();
