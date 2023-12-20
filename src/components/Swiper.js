import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import swiperImg1 from '../images/swiper1.jpg';
import swiperImg2 from '../images/swiper2.jpg';
import swiperImg3 from '../images/swiper3.jpg';
import swiperImg4 from '../images/swiper4.jpg';
import swiperImg5 from '../images/swiper5.jpg';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

export default () => {
  return (
    <Swiper
      // install Swiper modules
      className='mySwiper'
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><img alt='swiper img' src={swiperImg2} /></SwiperSlide>
      <SwiperSlide><img alt='swiper img' src={swiperImg3} /></SwiperSlide>
      <SwiperSlide><img alt='swiper img' src={swiperImg4} /></SwiperSlide>
      <SwiperSlide><img alt='swiper img' src={swiperImg5} /></SwiperSlide>
      <SwiperSlide><img alt='swiper img' src={swiperImg1} /></SwiperSlide>
    </Swiper>
  );
};