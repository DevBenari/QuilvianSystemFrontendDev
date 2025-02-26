import CarouselComponent from '@/components/ui/carousel';
import React from 'react'
const CarouselImage = () => {
    const carouselItems = [
        {
          image: "/Images/pic1.jpg", // Gambar dari folder public
          
        },
        {
          image: "/Images/pic2.gif", // Gambar dari folder public
          
        },
        {
          image: "/Images/bg-mmc.jpg", // Gambar dari folder public
          
        },
        
      ];
    return (
        <div>
            <CarouselComponent items={carouselItems} />
        </div>
    )
}

export default CarouselImage