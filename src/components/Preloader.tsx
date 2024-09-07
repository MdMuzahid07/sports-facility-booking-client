
const Preloader = () => {
    return (
        <>
            <img className="relative h-screen max-h-screen w-full object-cover" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725714068/349_zx1yji.jpg" alt="" />
            <div className="bg-[#2E2E2E] min-h-screen min-w-screen flex justify-center items-center absolute top-0 left-0 bg-opacity-75 w-full h-full">
                <div className="relative">
                    <img className="w-24 h-24 absolute left-2 top-2 rounded-full" src="https://res.cloudinary.com/dymo0iyee/image/upload/v1725714475/playTime-pro_qrlpvx.png" alt="" />
                    <div className="animate-spin h-28 w-28 border-4 border-white">
                    </div>
                </div>
            </div>
        </>
    )
};

export default Preloader;