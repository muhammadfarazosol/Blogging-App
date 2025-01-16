import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#e1ebfa] text-gray-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full bg-[#c9dcf3] rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-black">
          Privacy Policy
        </h1>
        <p className="text-sm md:text-base mb-4">
          Your privacy is important to us. This policy explains how we collect,
          use and protect your information while using our blogging platform.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
              1. Information We Collect
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black">
              We may collect personal information such as your name, email
              address and usage data to provide and improve our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
              2. Use of Information
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black">
              The information we collect is used to operate, maintain and
              improve our services, as well as to communicate with you.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
              3. Data Protection
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black">
              We implement industry-standard security measures to protect your
              data from unauthorized access, alteration or disclosure.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-black">
              4. Contact Us
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-black">
              For questions or concerns regarding our privacy policy, please
              contact us at{" "}
              <a
                href="mailto:neuronest.noreply@gmail.com"
                className="text-blue-500 underline"
              >
                neuronest.noreply@gmail.com
              </a>
              .
            </p>
          </div>
        </div>

        <p className="text-center text-sm md:text-base text-gray-500 mt-8">
          Last updated: January 16, 2025
        </p>
      </div>
    </div>
  );
};

export default Privacy;
