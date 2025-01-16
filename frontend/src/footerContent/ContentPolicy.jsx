import React from "react";

const ContentPolicy = () => {
  return (
    <div className="min-h-screen bg-[#e1ebfa] text-gray-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full bg-[#c9dcf3] rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-black">
          Content Policy
        </h1>
        <p className="text-sm md:text-base mb-4">
          Our content policy ensures a safe and respectful environment for all
          users of our blogging platform. Please review the following
          guidelines.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              1. Prohibited Content
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              Users are not allowed to post content that is illegal, harmful,
              harassing, defamatory, obscene or violates any third-party rights.
              This includes hate speech, violence and spam.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              2. Intellectual Property
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              Ensure that all content shared respects copyright and intellectual
              property laws. Do not upload materials unless you own the rights
              or have proper authorization.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              3. User Responsibility
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              Users are responsible for the accuracy, legality, and
              appropriateness of the content they publish. Violations of this
              policy may result in content removal or account suspension.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              4. Reporting Violations
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              If you come across content that violates this policy, please
              report it by contacting us at{" "}
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

export default ContentPolicy;
