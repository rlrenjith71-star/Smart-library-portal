function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © {new Date().getFullYear()} Smart Library Portal.
          All Rights Reserved.
        </p>

        <div className="company-branding">
          <span>Powered by</span>

          <img
            src="/company-logo.png"
            alt="Company Logo"
            className="company-logo"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;