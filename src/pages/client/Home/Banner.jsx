import { useRef } from "react";
import { Link } from "react-router-dom";
import SimpleSlider from "../Helpers/SliderCom";

export default function Banner({ className }) {
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    fade: true,
    arrows: false,
  };
  return (
    <>
      <div className={`w-full xl:h-[733px] h-[500px] ${className || ""}`}>
        <div className="main-wrapper w-full h-full">
          <div className="hero-slider-wrapper xl:h-full mb-20 xl:mb-0  w-full relative">
            <div className="absolute left-0 top-0 w-full h-full items-center justify-between hidden xl:flex">
              <button
                type="button"
                onClick={() => sliderRef.current.slickPrev()}
                className="relative hover:text-qh3-blue text-[#8cb1f6] 2xl:left-32 left-5 cursor-pointer z-10"
              >
                <svg
                  className="fill-current"
                  width="84"
                  height="68"
                  viewBox="0 0 84 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-qblack" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => sliderRef.current.slickNext()}
                className="relative hover:text-qh3-blue text-[#8cb1f6]  2xl:right-32 right-5 cursor-pointer z-10"
              >
                <svg
                  width="84"
                  height="68"
                  viewBox="0 0 84 68"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`fill-current`}
                >
               
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-qblack" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </svg>
              </button>
            </div>
            <SimpleSlider settings={settings} selector={sliderRef}>
              <div className="item w-full xl:h-[733px] h-[500px]">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/dyu8kdule/image/upload/v1779696455/snapedit_1779696419847_xs0uxe.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="container-x mx-auto flex items-center  h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item w-full xl:h-[733px] h-[500px]">
                <div
                  className="w-full h-full relative"
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/dyu8kdule/image/upload/v1779696455/snapedit_1779696419847_xs0uxe.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="container-x mx-auto flex items-center  h-full">
                    <div className="w-full h-full xl:flex items-center pt-20 xl:pt-0">
                      <div className="xl:w-[626px] w-full">

                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="item w-full xl:h-[733px] h-[500px]">
                <div
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/dyu8kdule/image/upload/v1779261148/banner1_xzq3ea.jpg)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                  }}
                  className="w-full h-full relative"
                >
                 
                </div>
              </div>
            </SimpleSlider>
          </div>
        </div>
      </div>
    </>
  );
}
