const BusinessCard = ({ business }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold">{business.name}</h2>
        <p>Location: {business.location}</p>
        <p>Services: {business.services.join(", ")}</p>
        <p>Price Range: {business.price}</p>
      </div>
    );
  };
  
export default BusinessCard;
  