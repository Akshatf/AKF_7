// sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
// mysitekey =6LdD2EwqAAAAAPlz_a8d_GtjGRIl5r4jkWEdYkip" site key
// secretkey ="6LdD2EwqAAAAAKj84tR1_hTjvR1485voUbdMll-E"
//web3 "2caa3035-88da-4425-92ce-b3131b5ed9ca"

import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useWeb3Forms from "@web3forms/react";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  gap: 12px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary + 50};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
`;
const Message = styled.p`
  font-size: 16px;
  color: white; /* This sets the message color to white */
  margin-top: 10px;
`;
const ErrorMessage = styled.p`
  font-size: 14px;
  color: white; /* Set the font color to white */
  margin-top: 5px;
`;
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState(false);

  const apiKey =
    process.env.PUBLIC_ACCESS_KEY || "9bdcf539-ff5e-460e-a4a4-8ac19879d533";

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: "Akshat's Portfolio",
      subject: "New Responce",
    },
    onSuccess: (msg) => {
      setIsSuccess(true);
      setMessage(msg);
      reset();
    },
    onError: (msg) => {
      setIsSuccess(false);
      setMessage(msg);
    },
  });

  const handleCaptchaChange = (value) => {
    setVerified(!!value);
  };

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>
          Feel free to reach out to me for any questions , opportunities or
          collaborations !
        </Desc>
        <Desc>
          You can Contact me via{" "}
          <a href="mailto:akshatfarkya07@gmail.com">Email</a> or fill the below
          form{" "}
        </Desc>
        {/* <a href="https://wa.me/919425718644?text=Hey!%20I%20am%20Akshat.%20I%20would%20like%20to%20connect%20with%20you." target="_blank">Send a message on WhatsApp</a> */}
        <ContactForm onSubmit={handleSubmit(onSubmit)}>
          <ContactTitle>Email Me 🚀</ContactTitle>

          <ContactInput
            placeholder="Your Name"
            {...register("name", {
              required: "Full name is required",
              maxLength: 80,
            })}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

          <ContactInput
            placeholder="Your Email"
            {...register("email", {
              required: "Enter your email",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Please enter a valid email",
              },
            })}
            className={errors.email ? "error" : ""}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          <ContactInput
            placeholder="Your Phone Number"
            {...register("phone", {
              required: "Enter your phone number",
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: "Please enter a valid phone number",
              },
            })}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && <ErrorMessage>{errors.phone.message}</ErrorMessage>}

          <ContactInput
            placeholder="Subject"
            {...register("subject", {
              required: "Enter a subject",
            })}
            className={errors.subject ? "error" : ""}
          />
          {errors.subject && (
            <ErrorMessage>{errors.subject.message}</ErrorMessage>
          )}

          <ContactInputMessage
            placeholder="Message"
            rows={4}
            {...register("message", {
              required: "Enter your message",
            })}
            className={errors.message ? "error" : ""}
          />
          {errors.message && (
            <ErrorMessage>{errors.message.message}</ErrorMessage>
          )}

          <ReCAPTCHA
            sitekey="6LdD2EwqAAAAAPlz_a8d_GtjGRIl5r4jkWEdYkip"
            onChange={handleCaptchaChange}
          />

          <ContactButton
            type="submit"
            value={isSubmitting ? "Sending..." : "Send Message"}
            disabled={!verified || isSubmitting}
          />
        </ContactForm>

        {isSubmitSuccessful && isSuccess && (
          <Message>{message || "Message sent successfully!"}</Message>
        )}
        {isSubmitSuccessful && !isSuccess && (
          <Message>{message || "Something went wrong!"}</Message>
        )}
      </Wrapper>
    </Container>
  );
};

export default Contact;
