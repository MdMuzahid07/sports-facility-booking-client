import { StarIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const allTimelines = [
    {
        "key": 1,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2009 - present",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🏅",
        "title": "Founded the Organization",
        "subtitle": "Springfield, IL",
        "description": "Started as a small sports facility with a single tennis court. Grew steadily over the years to expand our offerings."
    },
    {
        "key": 2,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2011",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🎾",
        "title": "Opened First Tennis Court",
        "subtitle": "Springfield, IL",
        "description": "Our first sports facility officially opened to the public with a state-of-the-art tennis court."
    },
    {
        "key": 3,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2013",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🏀",
        "title": "Added Basketball and Soccer Facilities",
        "subtitle": "Springfield, IL",
        "description": "Expanded our facility to include basketball and soccer courts, catering to a broader audience."
    },
    {
        "key": 4,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2015",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🏊",
        "title": "Opened Olympic-size Swimming Pool",
        "subtitle": "Springfield, IL",
        "description": "The largest swimming pool in the city, hosting regional swimming events and training sessions."
    },
    {
        "key": 5,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2017",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "⚽",
        "title": "Host of Annual Soccer Championship",
        "subtitle": "Springfield, IL",
        "description": "Successfully hosted our first annual soccer championship, drawing teams from across the state."
    },
    {
        "key": 6,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2018",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🏋️‍♂️",
        "title": "Expanded Gymnasium Facilities",
        "subtitle": "Springfield, IL",
        "description": "Opened a fully equipped gym, offering fitness training, personal coaching, and wellness programs."
    },
    {
        "key": 7,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2019",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🥇",
        "title": "Awarded Best Sports Facility in the Region",
        "subtitle": "Springfield, IL",
        "description": "Recognized for our outstanding services and top-tier sports facilities by the local sports council."
    },
    {
        "key": 8,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2020",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🏌️‍♂️",
        "title": "Opened 18-Hole Golf Course",
        "subtitle": "Springfield, IL",
        "description": "Launched an 18-hole golf course with scenic views, catering to golf enthusiasts and hosting tournaments."
    },
    {
        "key": 9,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2021",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🚴",
        "title": "Hosted National Cycling Event",
        "subtitle": "Springfield, IL",
        "description": "Became a host for the national cycling event, attracting participants from all over the country."
    },
    {
        "key": 10,
        "className": "vertical-timeline-element--work",
        "contentStyle": {
            "background": "#F1F5F9",
            "color": "#2C2D2D"
        },
        "contentArrowStyle": {
            "borderRight": "7px solid  #F1F5F9"
        },
        "date": "2023",
        "iconStyle": {
            "background": "#2C2D2D",
            "color": "#fff",
            "fontSize": "30px",
            "display": "flex",
            "justifyContent": "center",
            "alignItems": "center"
        },
        "icon": "🏆",
        "title": "Expanded Facilities for National-Level Events",
        "subtitle": "Springfield, IL",
        "description": "Expanded our facilities to accommodate national and international sports events, enhancing our reputation."
    }
];

const HistoryAndTimeline = () => {
    return (
        <section className="py-32 max-w-7xl mx-auto px-4 xl:px-0 border-b border-primary">
            <h3 className="text-3xl md:text-5xl font-extrabold mb-5">History and Timeline</h3>
            <div className="mt-10">
                <VerticalTimeline layout={"1-column-left"}>
                    {
                        allTimelines?.map((timeline) => (
                            <VerticalTimelineElement
                                key={timeline?.key}
                                className={timeline?.className}
                                contentStyle={timeline?.contentStyle}
                                contentArrowStyle={timeline?.contentArrowStyle}
                                date={timeline?.date}
                                iconStyle={timeline?.iconStyle}
                                icon={timeline?.icon}
                            >
                                <h3 className="vertical-timeline-element-title">{timeline?.title}</h3>
                                <h4 className="vertical-timeline-element-subtitle">{timeline?.subtitle}</h4>
                                <p>{timeline?.description}</p>
                            </VerticalTimelineElement>
                        ))
                    }

                    <VerticalTimelineElement
                        iconStyle={{ background: '#2C2D2D', color: '#fff' }}
                        icon={<StarIcon />}
                    />
                </VerticalTimeline>
            </div>
        </section>
    )
}

export default HistoryAndTimeline;