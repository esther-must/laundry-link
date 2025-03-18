import useStore from "../store/store";
import BusinessCard from "../components/BusinessCard";

const Home = () => {
  const businesses = useStore((state) => state.businesses);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Laundry Businesses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
};

export default Home;
