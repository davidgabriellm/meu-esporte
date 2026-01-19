import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../interface/product";
import PriceFormatter from "../priceFormatter/PriceFormatter";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { motion } from "framer-motion";

interface CarouselProps {
  produtos: Product[];
}

export default function Carousel({ produtos }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef;
      const scrollAmount = 300;

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleCardClick = (id: number | string) => {
    navigate(`/produto/${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!produtos.length) return null;

  return (
    <div className="group relative w-full">
      <button
        onClick={() => handleScroll("left")}
        className="absolute top-1/2 left-0 z-10 hidden -translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 text-gray-800 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-gray-100 md:block"
        aria-label="Anterior"
      >
        <IoChevronBack size={24} />
      </button>

      <div
        ref={carouselRef}
        className="no-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth pt-2 pb-6 [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex gap-6 px-1">
          {produtos.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ y: -5 }}
              onClick={() => handleCardClick(p.id!)}
              className="w-[260px] flex-shrink-0 cursor-pointer snap-start rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative mb-4 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-50">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className="h-full w-full object-contain p-4 mix-blend-multiply transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium text-gray-700 transition-colors hover:text-blue-600">
                  {p.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">
                    <PriceFormatter value={p.price} />
                  </span>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-blue-600">
                    <IoChevronForward size={14} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleScroll("right")}
        className="absolute top-1/2 right-0 z-10 hidden translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 text-gray-800 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 hover:bg-gray-100 md:block"
        aria-label="Próximo"
      >
        <IoChevronForward size={24} />
      </button>
    </div>
  );
}
