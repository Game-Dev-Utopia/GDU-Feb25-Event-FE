import FlipCountdown from "@rumess/react-flip-countdown";
// import bg from "../../../public/images/countdown/bg-stars.svg";
// import bottomBg from "../../../public/images/countdown/pattern-hills.svg";
// import fbIcon from "../../../public/images/countdown/icon-facebook.svg";
// import pinterestIcon from "../../../public/images/countdown/icon-pinterest.svg";
// import instagramIcon from "../../../public/images/countdown/icon-instagram.svg";

function Countdown() {
    return (
        
            <div
                
                className="bg-cover flex justify-center items-center">
                <div className="font-bold text-white tracking-widest text-center font-cinzel" >
                    <h1 className="text-3xl md:text-6xl tracking-[10px] mb-16 text-goldenrod">WE'RE LAUNCHING SOON</h1>
                    <div className="text=[#C49A3E] font-cinzel">
                        <FlipCountdown
                            hideYear
                            hideMonth
                            theme="dark"
                            size="large"
                            titlePosition="bottom"
                            endAt={new Date("2025-02-15T00:00:00Z").toUTCString()} // Set to 15 Feb 2025
                            dayTitle="DAYS"
                            hourTitle="HOURS"
                            minuteTitle="MINUTES"
                            secondTitle="SECONDS"
                        />

                    </div>
                </div>
            </div >
        
    );
}

export default Countdown;