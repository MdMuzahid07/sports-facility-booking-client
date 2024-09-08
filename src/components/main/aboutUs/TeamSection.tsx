import TeamCard from "./TeamCard"

const TeamSection = () => {
    return (
        <section className="py-32">
            <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-extrabold mb-5 ">Our Team</h3>
            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                {
                    [1, 2, 3, 4, 5, 6]?.map(() => <TeamCard />)
                }
            </div>
        </section>
    )
}

export default TeamSection