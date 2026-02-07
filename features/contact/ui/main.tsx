"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

interface FormDataProps {
  services: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  help: string;
}

interface FormErrors {
  services?: string;
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
  help?: string;
}

export default function Main() {
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormDataProps, boolean>>({
    services: false,
    name: false,
    email: false,
    phone: false,
    location: false,
    help: false,
  });

  const markTouched = (field: keyof FormDataProps) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = (formData: FormDataProps): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.name || formData.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    if (!formData.email || formData.email.trim() === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.services) {
      newErrors.services = "Please an option";
    }
    if (formData.help === '') {
      newErrors.help = "How can we help you?";
    }

    return newErrors;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");

    const fd = new FormData(e.currentTarget);

    const formData: FormDataProps = {
      services: String(fd.get("services") ?? ""),
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      location: String(fd.get("location") ?? ""),
      help: String(fd.get("help") ?? ""),
    };

    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTouched({
        services: true,
        name: true,
        email: true,
        phone: true,
        location: true,
        help: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
      const response = await fetch(`${strapiUrl}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        const errData = await response.json();
        console.error("Strapi error:", errData);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };



  // gsap
  const headlines = [
    "Well, where do we start?",
    "Tell us about your idea.",
    "Let’s build greatness.",
    "What are you planning?",
  ];

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const changeText = () => {
      // animate out
      gsap.to(el, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          indexRef.current =
            (indexRef.current + 1) % headlines.length;

          el.textContent = headlines[indexRef.current];

          // animate in
          gsap.fromTo(
            el,
            { opacity: 0, x: 20 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
          );
        },
      });
    };

    const interval = setInterval(changeText, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main>
        <section id="form" className="flex flex-col px-8 justify-center items-center py-24 gap-12 bg-amber-50">
          <div className="flex flex-col md:items-start  gap-4">
            <h1 ref={headlineRef} className="font-relink-headline lg:text-7xl text-5xl md:text-6xl">
              Happy to have you here 😀
            </h1>
            <p className="font-relink-neue uppercase font-bold text-sm tracking-wider">
              I'm looking for
            </p>
          </div>

          <form
            noValidate
            action="#"
            onSubmit={handleSubmit}
            className="w-full max-w-3xl flex flex-col gap-8 items-start font-relink-neue"
          >
            <div className="flex flex-col gap-2 w-full ">
              <select
                onBlur={() => markTouched("services")}
                name="services"
                className="bg-transparent border-b border-gray-300 py-3 text-gray-700 focus:outline-none focus:border-gray-600"
              >
                <option value="">What are you looking for?</option>
                <option value="website/app">Website / App</option>
                <option value="website/app">AI Automation</option>
                <option value="marketing">Marketing</option>
                <option value="consulting">Consulting</option>
                <option value="Other">Other</option>
              </select>
              {touched.services && errors.services && (
                <p className="text-red-500 text-md font-relink-neue">
                  {errors.services}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full text-gray-400">
              <input
                type="text"
                placeholder="Your name"
                onBlur={() => markTouched("name")}
                name="name"
                className="bg-transparent border-b text-gray-700 placeholder:text-gray-400 border-gray-300 py-3 focus:outline-none focus:border-gray-600"
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-md font-relink-neue">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-full text-gray-400">
              <input
                type="email"
                onBlur={() => markTouched("email")}
                placeholder="Your email"
                name="email"
                className="bg-transparent border-b text-gray-700 placeholder:text-gray-400 border-gray-300 py-3 focus:outline-none focus:border-gray-600"
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-md font-relink-neue">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full text-gray-400">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number (optional)"
                className="bg-transparent border-b text-gray-700 placeholder:text-gray-400 border-gray-300 py-3 focus:outline-none focus:border-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2 w-full text-gray-400">
              <input
                type="text"
                name="location"
                onBlur={() => markTouched("location")}
                placeholder="Where are you located?"
                className="bg-transparent border-b text-gray-700 placeholder:text-gray-400 border-gray-300 py-3 focus:outline-none focus:border-gray-600"
              />
            </div>
            <div className="flex flex-col gap-2 w-full text-gray-400">
              <textarea
                name="help"
                onBlur={() => markTouched("help")}
                placeholder="How can we help you?"
                className="bg-transparent border-b text-gray-700 placeholder:text-gray-400 border-gray-300 py-3 focus:outline-none focus:border-gray-600"
              />
              {touched.help && errors.help && (
                <p className="text-red-500 text-md font-relink-neue">
                  {errors.help}
                </p>
              )}
            </div>
            <div className="font-relink-neue text-gray-700 flex flex-col gap-4 w-full ">
              <p>How did you hear about us? (optional)</p>
              <div className="font-relink-neue font-bold flex flex-col gap-6">
                <label className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 appearance-none  border-2 border-[#0B0D12]  focus:outline-2 focus:outline-[#0B0D12] focus:outline-offset-2 rounded checked:bg-[#0B0D12] checked:border-[#0B0D12] cursor-pointer  relative checked:after:content-['✔'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  />
                  <span className="text-gray-700">Google</span>
                </label>
                <label className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="linkedin"
                    className="w-5 h-5 appearance-none  border-2 border-[#0B0D12]  focus:outline-2 focus:outline-[#0B0D12] focus:outline-offset-2 rounded checked:bg-[#0B0D12] checked:border-[#0B0D12] cursor-pointer  relative checked:after:content-['✔'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  />
                  <span className="text-gray-700">Linkedin</span>
                </label>
                <label className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="facebook"
                    className="w-5 h-5 appearance-none  border-2 border-[#0B0D12] focus:outline-2 focus:outline-[#0B0D12] focus:outline-offset-2 rounded checked:bg-[#0B0D12] checked:border-[#0B0D12] cursor-pointer  relative checked:after:content-['✔'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  />
                  <span className="text-gray-700">Facebook</span>
                </label>
                <label className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="referral"
                    className="w-5 h-5 appearance-none  border-2 border-[#0B0D12] focus:outline-2 focus:outline-[#0B0D12] focus:outline-offset-2 rounded checked:bg-[#0B0D12] checked:border-[#0B0D12] cursor-pointer  relative checked:after:content-['✔'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  />
                  <span className="text-gray-700">Referral</span>
                </label>
                <label className="flex gap-3 items-center">
                  <input
                    type="checkbox"
                    name="other"
                    className="w-5 h-5 appearance-none  border-2 border-[#0B0D12]  focus:outline-2 focus:outline-[#0B0D12] focus:outline-offset-2 rounded checked:bg-[#0B0D12] checked:border-[#0B0D12] cursor-pointer  relative checked:after:content-['✔'] checked:after:absolute checked:after:text-white checked:after:text-sm checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
                  />
                  <span className="text-gray-700">Other</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 md:w-60 py-3 w-full tracking-wider text-md bg-[#0B0D12] uppercase font-relink-neue font-bold text-white disabled:opacity-50 transition-all hover:bg-[#0B0D12]/90"
              >
                {isSubmitting ? "Sending..." : "Submit Enquiry"}
              </button>

              {submitStatus === "success" && (
                <p className="text-green-600 font-relink-neue font-noraml">
                  Thank you! Your message has been sent.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-500 font-relink-neue font-bold">
                  Something went wrong. Please try again or email us .
                </p>
              )}
            </div>

          </form>
        </section>
      </main>
    </>
  );
}
