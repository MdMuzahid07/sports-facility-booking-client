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


const ImageSlider = ({ image }: any) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2"
            >
                {
                    [1, 2, 3, 4]?.map(() => (
                        <SwiperSlide>
                            <img src={image} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    [1, 2, 3, 4]?.map(() => (
                        <SwiperSlide>
                            <img src={image} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </>
    );
};

export default ImageSlider;