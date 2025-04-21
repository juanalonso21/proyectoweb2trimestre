import React, {useState} from "react";
import  ICarousel  from "@/model/interfaces/iCarousel"; 


interface CarouselComponentProps {
  carouselItems: ICarousel[]; 
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ carouselItems }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="relative w-full overflow-hidden rounded-lg">
        {/* Contenedor del carrusel */}
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {carouselItems.map((item, index) => (
            <div 
              key={index} 
              className="w-full flex-shrink-0"
            >
              <img
                className="w-full h-auto object-cover"
                src={item.imagenUrl}
                alt={item.titulo}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
                <h5 className="text-xl font-bold">{item.titulo}</h5>
                <p className="text-sm">{item.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Controles */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
        >
          ›
        </button>
  
        {/* Indicadores */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default CarouselComponent;