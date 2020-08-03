import React, {useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {checkCaptcha} from "../../../../lib/api/login";
import {SITE_KEY} from "../../../../lib/api/client";

const GoogleRecaptcha = (props) => {
    const recaptchaRef = React.createRef();
    const {visible, setCaptchaOk} = props;

    // Not used
    const axiosCaptcha = async () => {
        try {
            const response = await checkCaptcha();
            console.log("Captcha response:", response);
            return response;
        } catch {
            recaptchaRef.current.reset();
            return null;
        }
    };

    // Chaptcha is successfully
    const handleChange = (value) => {
        console.log("Captcha value:", value);
        setCaptchaOk(true);
        // axiosCaptcha();
    };
    
    // Chaptcha is errored
    const handleErrored = (value) => {
        console.log("Captcha Error:", value);
    };

    useEffect(() => {
        recaptchaRef.current.reset();
    }, []);

    return (
        <div
            style={{
                paddingLeft: "50px",
                display: visible ? "block" : "none",
            }}
        >
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={SITE_KEY}
                    onChange={handleChange}
                    onErrored={handleErrored}
                />
        </div>
    );
};

export default GoogleRecaptcha;
