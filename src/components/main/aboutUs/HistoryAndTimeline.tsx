import { StarIcon, WorkflowIcon } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const HistoryAndTimeline = () => {
    return (
        <section className="py-32 max-w-7xl mx-auto px-4 xl:px-0">
            <h3 className="text-3xl md:text-5xl font-extrabold mb-5">History and Timeline</h3>
            <div className="mt-10">
                <VerticalTimeline layout={"1-column-left"}>
                    {
                        [1, 2, 3, 4, 5, 6, 7]?.map((index) => (
                            <VerticalTimelineElement
                                key={index}
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: '#F1F5F9', color: '#2C2D2D' }}
                                contentArrowStyle={{ borderRight: '7px solid  #F1F5F9' }}
                                date="2011 - present"
                                iconStyle={{ background: '#2C2D2D', color: '#fff' }}
                                icon={<WorkflowIcon />}
                            >
                                <h3 className="vertical-timeline-element-title">Creative Director</h3>
                                <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                                <p>
                                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                                </p>
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