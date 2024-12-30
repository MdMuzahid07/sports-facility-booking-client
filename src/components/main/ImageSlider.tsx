/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const ImageSlider = ({ images }: any) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);

    const swiperStyle: React.CSSProperties = {
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff',
    } as any;

    return (
        <>
            <Swiper
                style={swiperStyle}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    images?.map((image: string, index: number) => (
                        <SwiperSlide className="rounded-2xl overflow-hidden drop-shadow" key={index + image}>
                            <img className="rounded-2xl overflow-hidden max-h-[500px] object-cover object-center" src={image} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={(swiper: any) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images?.map((image: string, index: number) => (
                        <SwiperSlide className="rounded-2xl overflow-hidden drop-shadow" key={(index % Math.random()) + image}>
                            <img className="cursor-pointer max-w-44 max-h-28 object-cover object-center rounded-2xl" src={image} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
};

export default ImageSlider;