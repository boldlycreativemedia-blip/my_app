import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      text: "Working with this team was an absolute game-changer for our brand. Their attention to visual storytelling and ability to capture emotions through video helped us connect deeply with our audience. The final edit exceeded expectations.",
      name: "Fitness Brand",
      title: "Marketing Manager",
    },
    {
      id: 2,
      text: "They handled our entire event coverage seamlessly — from planning to delivery. The team was professional, quick on their feet, and delivered cinematic-quality highlights that we proudly shared across our social media platforms.",
      name: "Entertainment Company",
      title: "Event Operations Head",
    },
    {
      id: 3,
      text: "What impressed us the most was their creativity and communication. They understood our brief instantly and added ideas that elevated the project beyond what we had imagined. Truly a reliable creative partner.",
      name: "Hospitality Industry",
      title: "Brand Manager",
    },
    {
      id: 4,
      text: "We’ve worked with multiple video agencies, but none matched the professionalism and storytelling quality this team brings. The videos didn’t just look good — they actually improved engagement and conversions for our campaign.",
      name: "Tech Startup",
      title: "Digital Marketing Lead",
    },
    {
      id: 5,
      text: "The team brings energy, passion, and precision to every project. From event shoots to social media edits, their work consistently maintains high production value and fast turnaround times. Highly recommended!",
      name: "Media & Events Agency",
      title: "Creative Director",
    },
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (isHovering) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
      }, 2000000); // Auto-scroll every 2 seconds when hovering
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
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
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
                  className={`bg-gray-300 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 min-w-[85vw] md:min-w-0 snap-center ${
                    index === 0 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="mb-6">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
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
