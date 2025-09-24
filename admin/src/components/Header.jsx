import { FiMenu, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import useAdminStore from "../store/adminStore";

const Header = ({ onMenuClick }) => {
  const { admin, logout } = useAdminStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("adminToken");
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <FiMenu size={20} />
        </button>
        <h2 className="ml-4 text-lg font-semibold text-gray-800">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100 relative">
          <FiBell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <FiUser size={16} className="text-primary-600" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {admin?.email || "Admin"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
          title="Logout"
        >
          <FiLogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
