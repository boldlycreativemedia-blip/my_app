import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "The team at Orcative exceeded our expectations. The website they built is a game-changer for our business.",
      name: "Califin Danang",
      title: "Product Manager",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      text: "Branding services elevated our online presence and helped us attract more clients. Highly recommended!",
      name: "Sarah Johnson",
      title: "CEO, BrightTech",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      text: "Their creative approach and attention to detail helped transform our brand to reach new heights in the market.",
      name: "Emma Rodriguez",
      title: "Product Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      text: "Outstanding service and innovative solutions. They delivered beyond what we imagined was possible for our startup.",
      name: "Michael Chen",
      title: "Founder, TechFlow",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000); // Auto-scroll every 2 seconds when hovering
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="w-16 h-0.5 bg-red-500"></div>
              <div className="w-0 h-0 border-l-[8px] border-l-red-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Clients Say.
            </h2>
          </div>
        </div>

        {/* Testimonials Container */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation Buttons */}
          <div className="absolute -top-16 right-4 z-10 flex gap-2">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all duration-200 shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-gray-800 transition-all duration-200 shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {testimonials
              .slice(currentIndex, currentIndex + 3)
              .concat(
                testimonials.slice(
                  0,
                  Math.max(0, currentIndex + 3 - testimonials.length)
                )
              )
              .map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentIndex}-${index}`}
                  className={`bg-gray-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                    index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-red-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
