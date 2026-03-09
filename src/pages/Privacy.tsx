const PrivacyPage = () => (
  <div className="min-h-screen" style={{ background: 'hsl(var(--nakshi-darkest))' }}>
    <div className="max-w-[720px] mx-auto px-5 py-16 md:py-24">
      <a href="/" className="font-heading text-[18px] font-semibold tracking-[0.12em] text-nakshi-text-on-dark mb-12 block">
        ← NAKSHI AI
      </a>
      <h1 className="font-heading text-[36px] md:text-[48px] font-light text-nakshi-text-on-dark mb-8">Privacy Policy</h1>
      <div className="font-body text-[14px] text-nakshi-text-on-dark/60 leading-[1.8] space-y-6">
        <p><strong className="text-nakshi-text-on-dark/80">Last updated:</strong> March 9, 2026</p>
        <p>Your privacy matters to us. This policy explains how Nakshi AI collects, uses, and protects your information.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">1. Information We Collect</h2>
        <p>We collect your name, WhatsApp number, shop name, city, and jewelry preferences when you join the waitlist. We also collect jewelry photos you submit for processing.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">2. How We Use Your Information</h2>
        <p>Your information is used to provide our AI photography service, communicate updates about your account, and improve our service quality.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">3. Data Storage & Security</h2>
        <p>All data is stored securely using industry-standard encryption. Jewelry photos are processed and stored temporarily, then deleted after 30 days unless you choose to save them.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">4. Sharing of Information</h2>
        <p>We do not sell or share your personal information with third parties. Your jewelry photos are never used for training AI models without explicit consent.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">5. Your Rights</h2>
        <p>You may request deletion of your data at any time by contacting us via WhatsApp. We will remove all your information within 30 days of the request.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">6. Cookies & Analytics</h2>
        <p>We use basic analytics to understand how visitors interact with our website. No third-party tracking cookies are used.</p>
        <h2 className="font-heading text-[24px] text-nakshi-text-on-dark/80 pt-4">7. Contact</h2>
        <p>For privacy-related inquiries, contact us via WhatsApp or email at privacy@nakshiai.com.</p>
      </div>
    </div>
  </div>
);

export default PrivacyPage;