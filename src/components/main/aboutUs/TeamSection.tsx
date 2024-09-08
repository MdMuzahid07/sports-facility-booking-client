import TeamCard from "./TeamCard"

const TeamSection = () => {
    return (
        <section className="py-32 max-w-7xl mx-auto px-4 xl:px-0">
            <h3 className="text-3xl md:text-5xl font-extrabold mb-5">Our Team</h3>
            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                {
                    [1, 2, 3, 4, 5, 6]?.map(() => <TeamCard />)
                }
            </div>
        </section>
    )
}

export default TeamSection