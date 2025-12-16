import React from 'react';
import { Search, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = ({ title }: { title: string }) => {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
      </div>

      <div className="flex items-center gap-6">
        {/* Quick Search Placeholder */}
        <div className="relative hidden md:block">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="חיפוש מהיר..." 
            className="pr-9 pl-4 py-1.5 text-sm border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gov-500 w-64 bg-slate-50"
          />
        </div>

        <div className="flex items-center gap-4 border-r border-slate-200 pr-6">
          <button className="relative text-slate-500 hover:text-gov-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 left-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.name}</p>
              <p className="text-xs text-slate-500">
                  {user?.role === 'ADMIN' ? 'מנהל מערכת' : 'אנליסט'}
              </p>
            </div>
            <div className="w-8 h-8 bg-gov-100 rounded-full flex items-center justify-center text-gov-700 font-bold border border-gov-200">
              {user?.name.charAt(0)}
            </div>
            <button 
              onClick={logout}
              title="יציאה"
              className="mr-2 text-slate-400 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;