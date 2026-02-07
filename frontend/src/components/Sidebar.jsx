import { NavLink } from "react-router-dom";

const Sidebar = ({ title, links }) => {
  return (
    <aside className="w-64 min-h-screen bg-base-200 border-r">
      <div className="p-4 text-xl font-bold border-b">
        {title}
      </div>

      <ul className="menu p-4 gap-1">
        {links.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "active font-semibold" : ""
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
