import Step1 from "./Steps/Step1";
import Step2 from "./Steps/Step2";
import Step3 from "./Steps/Step3";
import { useEffect, useState } from "react";
const SignUpStepper = ({ onComplete }) => {
    const [activeStep, setActiveStep] = useState(1);

    const handlePrev = () => setActiveStep(activeStep - 1);
    const handleNext = () => setActiveStep(activeStep + 1);
    const handleReset = () => setActiveStep(1);
    const handleComplete = () => {
        onComplete();
    };




    return (
        <div className="stepper" style={{ height: "calc(100vh - 88px)" }}>
            <div className="stepper-header">
                <div className="stepper-header-content">
                    <div className="pxp-logo">
                        <a href="/" className="pxp-animate">
                            <span style={{ color: "var(--pxpMainColor)" }}>Der</span>Work
                        </a>
                    </div>
                </div>
                {/* progress */}
                <div className="stepper-progress">
                    <span className="fill" style={{ width: `${activeStep * 25}%` }}></span>
                </div>
            </div>
            <div className="stepper-step container h-100" style={{ overflowY: "scroll" }}>
                {
                    activeStep === 1 ? <Step1 handelNext={handleNext} handelPrev={handlePrev} /> :
                        activeStep === 2 ? <Step2 handelNext={handleNext} handelPrev={handlePrev} handleSkip={handleComplete} /> :
                            activeStep === 3 ? <Step3 handelNext={handleNext} handelPrev={handlePrev} handleSkip={handleComplete} /> :
                                null
                }
            </div>
        </div>
    )
}

export default SignUpStepper;

