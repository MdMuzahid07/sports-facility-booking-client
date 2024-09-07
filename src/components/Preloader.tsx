
const Preloader = () => {
    return (
        <div className="bg-[#171717] min-h-screen min-w-screen flex justify-center items-center absolute top-0 left-0 w-full h-full">
            <div className="relative flex h-24 w-24">
                <img className="w-24 h-24 absolute left-0 top-0 rounded-full" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725714475/playTime-pro_qrlpvx.png" alt="" />
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            </div>
        </div>
    )
};

export default Preloader;