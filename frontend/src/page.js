import DataComponent from "./dataComponent";
import { useEffect, useState } from "react";

const Page = ({ slug }) => {
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
        <div className="flex items-center justify-center h-screen"></div>
      </>
    );
  }

  // Render your component using the data returned by the query
  return <DataComponent confrimedAddress={confrimedAddress} />;
};

export default Page;
