import { Activity as IconPulse, LogIn as IconLogIn } from 'lucide-react';

const SiteHeader = () => {
  return (
    <header>
      <div className="appLogo">
        <h1>
          <span className="svgIcon">
            <IconPulse height={32} />
          </span>
          System Pulse <span>monitor</span>
        </h1>
      </div>
      <div className="appUserBar">
        <span className="svgIcon">
          <IconLogIn height={20} />
        </span>
        Login
      </div>
    </header>
  );
};

export default SiteHeader;
