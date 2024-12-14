
const LoadingSpinner = () => {
    return (
        <section className="py-32 w-full flex justify-center flex-col items-center bg-transparent">
            <div className="relative flex h-24 w-24">
                <img className="w-24 h-24 absolute left-0 top-0 rounded-full" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725714475/playTime-pro_qrlpvx.png" alt="" />
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            </div>
            <h1 className="text-xl font-extrabold mt-2">Loading...</h1>
        </section>
    )
};

export default LoadingSpinner;