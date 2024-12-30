import TeamCard from "./TeamCard";



const teamMembers = [
    {
        "name": "John Smith",
        "bio": "Basketball Coach",
        "about": "An experienced basketball coach with over 15 years of experience developing youth players and specializing in advanced basketball techniques, team strategy, and player motivation.",
        "image": "https://res.cloudinary.com/dsdbqct3r/image/upload/v1735459327/5962_edxtcw.jpg",
        "facebook": "https://facebook.com/john.smith.coach",
        "twitter": "https://twitter.com/coachjohnsmith",
        "linkedin": "https://linkedin.com/in/johnsmithcoach"
    },
    {
        "name": "Emily Johnson",
        "bio": "Yoga Instructor",
        "about": "A certified yoga instructor and wellness coach who focuses on flexibility, mindfulness, and holistic well-being by combining physical and mental health practices.",
        "image": "https://res.cloudinary.com/dsdbqct3r/image/upload/v1735459316/5098_nou3iu.jpg",
        "facebook": "https://facebook.com/emily.johnson.coach",
        "twitter": "https://twitter.com/coach_emilyj",
        "linkedin": "https://linkedin.com/in/emilyjohnsoncoach"
    },
    {
        "name": "Michael Lee",
        "bio": "Football Coach",
        "about": "A professional football coach with expertise in offensive and defensive tactics, having worked with college and semi-pro teams to deliver consistent championship results.",
        "image": "https://res.cloudinary.com/dsdbqct3r/image/upload/v1735459307/4766_rddwha.jpg",
        "facebook": "https://facebook.com/coach.michaellee",
        "twitter": "https://twitter.com/michaelleecoach",
        "linkedin": "https://linkedin.com/in/michaelleecoach"
    },
    {
        "name": "Sophia Martinez",
        "bio": "Swimming Coach",
        "about": "A renowned swimming coach with a track record of training national-level athletes, specializing in endurance training, technique improvement, and mental preparation.",
        "image": "https://res.cloudinary.com/dsdbqct3r/image/upload/v1735459298/3542_cdnkvm.jpg",
        "facebook": "https://facebook.com/sophia.martinez.coach",
        "twitter": "https://twitter.com/sophia_swimcoach",
        "linkedin": "https://linkedin.com/in/sophiamartinezcoach"
    },
    {
        "name": "David Nguyen",
        "bio": "Strength and Conditioning Coach",
        "about": "An expert in weightlifting and athletic performance, David helps athletes achieve peak performance through personalized strength and conditioning programs.",
        "image": "https://res.cloudinary.com/dsdbqct3r/image/upload/v1735459290/24877_tmqrcx.jpg",
        "facebook": "https://facebook.com/coach.davidnguyen",
        "twitter": "https://twitter.com/davidnguyencoach",
        "linkedin": "https://linkedin.com/in/davidnguyencoach"
    },
    {
        "name": "Rachel Carter",
        "bio": "HIIT Trainer",
        "about": "A high-intensity interval training (HIIT) specialist who creates structured and engaging workout plans to motivate clients and help them reach their fitness goals.",
        "image": "https://res.cloudinary.com/dymo0iyee/image/upload/v1725725369/2150465472_h8vplw.jpg",
        "facebook": "https://facebook.com/rachel.carter.coach",
        "twitter": "https://twitter.com/rachelcoach",
        "linkedin": "https://linkedin.com/in/rachelcartercoach"
    }
];



const TeamSection = () => {
    return (
        <section className="py-32 max-w-7xl mx-auto px-4 xl:px-0">
            <h3 className="text-3xl md:text-5xl font-bold mb-5">Our Team</h3>
            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                {
                    teamMembers?.map((team, index) => <TeamCard team={team} key={index} />)
                }
            </div>
        </section>
    )
}

export default TeamSection