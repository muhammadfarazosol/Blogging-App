const TermOfServices = () => {
  return (
    <div className="min-h-screen bg-[#c9dcf3] text-gray-800 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full bg-[#e1ebfa] rounded-lg shadow-lg p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 text-black">
          Terms of Services
        </h1>
        <p className="text-sm md:text-base mb-4">
          Welcome to our blogging platform! By accessing or using our services,
          you agree to comply with and be bound by the following terms and
          conditions. Please read them carefully before using our platform.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              By using our services, you agree to these Terms of Services and
              our Privacy Policy. If you do not agree with any part of these
              terms, you may not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              2. User Responsibilities
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              Users are responsible for the content they publish on our
              platform. You agree not to post any content that is illegal,
              harmful, defamatory, or violates any third-party rights.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              3. Content Ownership
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              You retain ownership of the content you create and share on our
              platform. However, by posting content, you grant us a
              non-exclusive, royalty-free license to use, modify, and distribute
              your content for platform-related purposes.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              4. Termination of Use
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              We reserve the right to suspend or terminate your account if you
              violate these terms or engage in activities that harm the platform
              or its users.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              5. Modifications to Terms
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              We may update these Terms of Services from time to time. Changes
              will be notified to users through the platform or via email.
            </p>
          </div>

          <div>
            <h2 className="text-lg md:text-xl font-semibold mb-2 text-gray-700">
              6. Contact Information
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-gray-600">
              If you have any questions or concerns about these terms, please
              contact us at{" "}
              <a
                href="mailto:neuronest.noreply@gmail.com"
                className="text-blue-500 underline"
              >
                neuronest.noreply@gmail.com
              </a>
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

export default TermOfServices;
