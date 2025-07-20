import React from "react";
import Spinner from "../components/ui/Spinner";
import Header4 from "../components/Header4";
import Morder from "../components/myorder/Morder";

const MyOrder = () => {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time for orders
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <Header4 title="My Orders" />
      <div className="py-[2px] mt-[50px] bg-gray-100"></div>
      <Morder />
    </div>
  );
};

export default MyOrder;
