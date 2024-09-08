import { Calendar, CheckCheck, Search, ThumbsUp } from 'lucide-react';
import { Button } from '../ui/button';

const howItsWorksCardData = [
    {
        icon: <Search />,
        title: "Search",
        description: "Browse our selection of sports facilities and find the perfect one for your needs."
    },
    {
        icon: <Calendar />,
        title: "Select Dates",
        description: "Choose your desired booking dates to check availability."
    },
    {
        icon: <CheckCheck />,
        title: "Book and Pay",
        description: "Securely book your sports facility and pay online. We'll send you a confirmation. "
    },
    {
        icon: <ThumbsUp />,
        title: "Enjoy",
        description: "Show up and enjoy your booked sports facility. Have a great time!"
    },
];



const HowItWorks = () => {

    return (
        <section className="bg-slate-200">
            <div className="max-w-7xl mx-auto pt-28 pb-32 px-4 xl:px-0">
                <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Unlock Your Sports Experience with Ease </h3>
                <p className="text-xl md:text-2xl lg:text-3xl">Our platform makes booking your next sports facility easy and hassle-free. Follow these simple steps to get started.</p>

                <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {
                        howItsWorksCardData?.map(({ icon, title, description }, index) => (

                            <div key={index + title} className="w-full h-[270px] border-2 border-[#2E2E2E] px-5 py-8 hover:bg-[#2B2C2D] hover:text-white transition ease-in delay-50">
                                <div className="flex flew-col  justify-center">
                                    <Button className="w-12 h-12 p-2 rounded-full">
                                        {icon}
                                    </Button>
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-bold text-center mt-3 mb-5">{title}</h1>
                                    <p className="text-lg font-bold text-center">{description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
};

export default HowItWorks;