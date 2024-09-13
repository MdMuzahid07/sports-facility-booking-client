import { useParams } from "react-router-dom";

const MyBookingDetails = () => {
    const { myBookingId } = useParams();

    return (
        <div>MyBookingDetails,{myBookingId}</div>
    )
};

export default MyBookingDetails;