const TermsPage = () => (
  <div className="min-h-screen" style={{ background: 'hsl(var(--nakshi-darkest))' }}>
    <div className="max-w-[720px] mx-auto px-5 py-16 md:py-24">
      <a href="/" className="font-heading text-[18px] font-semibold tracking-[0.12em] text-nakshi-text-on-dark mb-12 block">
        ← NAKSHI AI
      </a>
      <h1 className="font-heading text-[36px] md:text-[48px] font-light text-nakshi-text-on-dark mb-8">Terms of Service</h1>
      <div className="font-body text-[14px] text-nakshi-text-on-dark/60 leading-[1.8] space-y-6">
        <p><strong className="text-nakshi-text-on-dark/80">Last updated:</strong> March 9, 2026</p>
        <p>Welcome to Nakshi AI. By accessing or using our service, you agree to be bound by these Terms of Service.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">1. Service Description</h2>
        <p>Nakshi AI provides AI-powered jewelry photography services via WhatsApp. Users can submit jewelry photos and receive AI-generated model shots.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">2. Eligibility</h2>
        <p>You must be at least 18 years old and a registered business owner to use Nakshi AI's services.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">3. Usage Rights</h2>
        <p>Images generated through Nakshi AI are licensed for commercial use by the subscribing business. You retain rights to your original jewelry photos.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">4. Payment & Refunds</h2>
        <p>Subscription fees are billed monthly. Refunds may be issued within 7 days of purchase if fewer than 5 images have been generated.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">5. Prohibited Use</h2>
        <p>You may not use Nakshi AI to generate misleading, fraudulent, or illegal content. Misrepresenting AI-generated images as real photographs for deceptive purposes is prohibited.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">6. Limitation of Liability</h2>
        <p>Nakshi AI is provided "as is." We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">7. Contact</h2>
        <p>For questions about these terms, contact us via WhatsApp or email at support@nakshiai.com.</p>
      </div>
    </div>
  </div>
);

export default TermsPage;