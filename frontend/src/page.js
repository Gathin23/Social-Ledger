import DataComponent from "./dataComponent";
import {useEffect, useState} from "react";

const Page = ({slug}) => {
  useEffect(() => {
    fetch(`https://backend.susanoox.in/getAddress?id=${slug}`)
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