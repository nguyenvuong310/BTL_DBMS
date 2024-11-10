import Header from "../components/Header";
import HC1 from "../assets/HC1.jpg"
import HC2 from "../assets/HC2.jpg"
import HC3 from "../assets/HC3.jpg"
import { Carousel } from "@material-tailwind/react";
const HomePage = () => {
    return (
        <>
            <div className="h-screen">
                <Header role='main' />
                <Carousel transition={{ duration: 2 }} autoplay='true' loop='true' className="h-[600x]">
                    <img
                        src={HC1}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src={HC2}
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <img
                        src={HC3}
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                </Carousel>

            </div>
            

        </>
    );
}

export default HomePage