import DataComponent from "./dataComponent";
import {useEffect, useState} from "react";

const Page = ({slug}) => {
  useEffect(() => {
    // Fetch data from the localhost:3000/getAddress?id={params.id}
    fetch(`https://dollie.ngrok.app/getAddress?id=${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setConfirmedAddress(data.address);
      });
  }, []);
  const [confrimedAddress, setConfirmedAddress] = useState("");

  if (confrimedAddress == "") {
    return (
        <>
        Fetching Address...
    </>
    );
  }



  // Render your component using the data returned by the query
  return <DataComponent confrimedAddress={confrimedAddress} />;
};

export default Page;