import React from "react";

const TermsOfUse = () => {
  return (
    <div className="container policy-container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 bg-light p-4 rounded shadow">
          <h1 className="mb-4">Terms of Use</h1>
          <p>
            <strong>Service Name:</strong> Mov+
          </p>
          <h2>Mov+ Terms of Use</h2>

          <p>
            Mov+ is a personalized membership service that provides access to entertainment content over the internet on connected devices. Here are the key aspects of the Mov+ terms of use:
          </p>

          <h3>Membership:</h3>
          <ol>
            <li>Your Mov+ membership continues until canceled.</li>
            <li>You must have internet access and a compatible device to use the service.</li>
            <li>Different membership plans are offered with specific conditions and limitations.</li>
            <li>Promotional offers may be available, subject to requirements and eligibility.</li>
          </ol>

          <h3>Billing and Cancellation:</h3>
          <ol>
            <li>The membership fee is billed according to your Payment Method on a specific cycle.</li>
            <li>You must provide one or more valid Payment Methods.</li>
            <li>You can update your Payment Methods on your account page.</li>
            <li>You can cancel your membership at any time, with no refunds for partial periods.</li>
            <li>Changes in prices and membership plans are notified with 30 days' advance notice.</li>
          </ol>

          <h3>Mov+ Service:</h3>
          <ol>
            <li>You must be at least 18 years old to be a member, and minors must use it under supervision.</li>
            <li>The service is for personal, non-commercial use.</li>
            <li>Access to content varies by geographical location.</li>
            <li>You can download certain content for offline viewing on compatible devices.</li>
            <li>You must comply with all applicable laws and restrictions.</li>
            <li>Image quality depends on various factors, including bandwidth.</li>
            <li>Software is provided for streaming and accessing content.</li>
          </ol>

          <h3>Passwords and Account Access:</h3>
          <ol>
            <li>You are responsible for all activity that occurs on your account.</li>
            <li>You should not share your password or payment details.</li>
            <li>You must maintain accurate account information.</li>
          </ol>

          <h3>Disclaimer of Warranties and Limitation of Liability:</h3>
          <ol>
            <li>The service is provided "as is," with no warranties of interruption or errors.</li>
            <li>You waive certain types of damages, and there are limitations on liability.</li>
          </ol>

          <h3>Waiver of Class Action:</h3>
          <p>You and Mov+ agree to pursue claims individually and not as part of a class or collective action.</p>

          <h3>Miscellaneous Provisions:</h3>
          <ol>
            <li>These terms are governed by the laws of the state of Delaware, USA.</li>
            <li>Mov+ does not accept unsolicited materials.</li>
            <li>For assistance, visit the Mov+ Help Center.</li>
            <li>If any provision is void, the others remain valid.</li>
            <li>Mov+ may change these terms with prior notice.</li>
            <li>Information will be sent electronically.</li>
          </ol>

          <p>
            These terms are up-to-date as of January 5, 2023.
          </p>

          <p>
            If you disagree with any part of these terms and conditions, please do not use our website.
          </p>
          {/* Más contenido de los términos de uso */}
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;
