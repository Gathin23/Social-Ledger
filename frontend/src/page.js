import DataComponent from "./dataComponent";
import {useEffect, useState} from "react";

const Page = ({slug}) => {
  useEffect(() => {
    // Fetch data from the localhost:3000/getAddress?id={params.id}
    fetch(`http://localhost:3000/getAddress?id=${slug}`)
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
  return <DataComponent confrimedAddress={"0xd8da6bf26964af9d7eed9e03e53415d37aa96045"} />;
};

export default Page;