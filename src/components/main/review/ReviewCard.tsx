/* eslint-disable @typescript-eslint/no-explicit-any */
const ReviewCard = ({ review }: any) => {
    const ratingNumber = Number(review?.rating);
    const ratings = Array.from({ length: ratingNumber }, (_, index) => index + 1);
    console.log(review)

    return (
        <div className="border-b border-slate-300 p-4 flex gap-4">
            <div className="w-16 h-16">
                <img
                    src={review?.userId?.avatar}
                    alt={`${review?.userId?.name}'s review`}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            <div className="flex-1">
                <h3 className="text-lg font-semibold">{review?.name}</h3>

                <div className="flex items-center my-2">
                    {ratings?.map((star: number) => (
                        <span
                            key={star + Math.random()}
                            className={`text-xl ${review?.rating >= star ? "text-yellow-500" : "text-gray-300"
                                }`}
                        >
                            ★
                        </span>
                    ))}
                </div>

                <p className="text-sm text-gray-700">{review?.reviewText}</p>

                <div className="flex flex-wrap gap-4 mt-5">
                    {
                        review?.reviewImages?.map((image: string, index: number) => (
                            <img key={index + image} className="w-20 h-20 object-cover object-center" src={image} alt="" />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;