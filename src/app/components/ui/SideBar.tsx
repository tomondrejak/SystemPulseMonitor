import { Bell, Info, Logs, Monitor, Settings, User, ChevronRight } from 'lucide-react';
import './SideBar.scss';

const SideBar = () => {
  return (
    <aside>
      <nav>
        <ul>
          <li>
            <div className="navItem navItem--active">
              <span className="svgIcon">
                <Monitor height={16} />
              </span>
              Monitoring
            </div>
            <ul>
              <li>
                <span className="svgIcon">
                  <ChevronRight height={16} />
                </span>
                Sensor_01
              </li>
              <li>
                {' '}
                <span className="svgIcon">
                  <ChevronRight height={16} />
                </span>
                Sensor_02
              </li>
              <li>
                <span className="svgIcon">
                  <ChevronRight height={16} />
                </span>
                Sensor_03
              </li>
            </ul>
          </li>
          <li>
            <div className="navItem">
              <span className="svgIcon">
                <User height={16} />
              </span>
              Users
            </div>
          </li>
          <li className="spacer"></li>
          <li>
            <div className="navItem">
              <span className="svgIcon">
                <Settings height={16} />
              </span>
              Settings
            </div>
          </li>
          <li>
            <div className="navItem">
              <span className="svgIcon">
                <Bell height={16} />
              </span>
              Notifications
            </div>
          </li>
          <li>
            <div className="navItem">
              <span className="svgIcon">
                <Info height={16} />
              </span>
              Support
            </div>
          </li>
          <li>
            <div className="navItem">
              <span className="svgIcon">
                <Logs height={16} />
              </span>
              Logs
            </div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default SideBar;
