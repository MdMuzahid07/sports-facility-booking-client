
const Map = () => {
    return (
        <section className="h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
            <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                title="Google Map"
                src="https://maps.google.com/maps?width=520&height=400&hl=en&q=Dhaka%20Dhaka+(PlayTime%20Pro)&t=p&z=12&ie=UTF8&iwloc=B&output=embed"
                style={{ border: 0 }}
                allowFullScreen
            />
        </section>
    )
};

export default Map;