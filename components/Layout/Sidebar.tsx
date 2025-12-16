import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Calendar, TrendingUp, Settings, PieChart } from 'lucide-react';
import { CATEGORY_LABELS } from '../../constants';
import { ReportCategory } from '../../types';
import { useAuth } from '../../context/AuthContext';

const HashkavLogo = () => {
  return (
    <div className="w-10 h-10 flex items-center justify-center shrink-0 bg-white rounded-full p-0.5 shadow-sm overflow-hidden">
       <img 
         src="https://upload.wikimedia.org/wikipedia/he/thumb/c/c9/Accountant_General_%28Israel%29_logo.png/600px-Accountant_General_%28Israel%29_logo.png" 
         alt="Accountant General"
         className="w-full h-full object-contain"
         onError={(e) => {
             // If image fails, hide it and show SVG fallback
             e.currentTarget.style.display = 'none';
             e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden');
         }}
       />
       <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden w-full h-full">
          <circle cx="50" cy="50" r="48" fill="#1e40af" />
          <path d="M70 35C70 26.7157 63.2843 20 55 20H45C36.7157 20 30 26.7157 30 35V35C30 43.2843 36.7157 50 45 50H55C63.2843 50 70 56.7157 70 65V65C70 73.2843 63.2843 80 55 80H45C36.7157 80 30 73.2843 30 65" 
            stroke="white" strokeWidth="10" strokeLinecap="round" />
       </svg>
    </div>
  );
};

const Sidebar = () => {
  const { user } = useAuth();
  
  const linkClass = ({ isActive }: { isActive: boolean }) => 
    `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-lg mx-2 mb-1 
    ${isActive 
      ? 'bg-gov-800 text-white shadow-md' 
      : 'text-slate-300 hover:bg-gov-900 hover:text-white'}`;

  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-gov-950 border-l border-gov-900 z-50 flex flex-col shadow-2xl">
      <div className="p-6 border-b border-gov-900 bg-gov-950">
        <div className="flex items-center gap-3">
          <HashkavLogo />
          <div>
            <h1 className="text-white font-bold tracking-tight text-lg leading-tight">אגף החשב הכללי</h1>
            <p className="text-xs text-gov-400 font-medium tracking-wide">היחידה לניהול החוב</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-6 overflow-y-auto custom-scrollbar">
        <div className="px-6 mb-2 text-xs font-semibold text-gov-500 uppercase tracking-wider">
          מודיעין שוק
        </div>
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard className="w-4 h-4 ml-2" />
          לוח בקרה (Market)
        </NavLink>

        <div className="mt-8 px-6 mb-2 text-xs font-semibold text-gov-500 uppercase tracking-wider">
          ספריית דוחות
        </div>
        
        <NavLink to={`/reports/${ReportCategory.WEEKLY}`} className={linkClass}>
          <Calendar className="w-4 h-4 ml-2" />
          {CATEGORY_LABELS[ReportCategory.WEEKLY]}
        </NavLink>
        <NavLink to={`/reports/${ReportCategory.MONTHLY}`} className={linkClass}>
          <PieChart className="w-4 h-4 ml-2" />
          {CATEGORY_LABELS[ReportCategory.MONTHLY]}
        </NavLink>
        <NavLink to={`/reports/${ReportCategory.DAILY}`} className={linkClass}>
          <FileText className="w-4 h-4 ml-2" />
          {CATEGORY_LABELS[ReportCategory.DAILY]}
        </NavLink>
        <NavLink to={`/reports/${ReportCategory.THEMATIC}`} className={linkClass}>
          <TrendingUp className="w-4 h-4 ml-2" />
          {CATEGORY_LABELS[ReportCategory.THEMATIC]}
        </NavLink>

        {user?.role === 'ADMIN' && (
          <>
             <div className="mt-8 px-6 mb-2 text-xs font-semibold text-gov-500 uppercase tracking-wider">
              ניהול מערכת
            </div>
            <NavLink to="/admin/upload" className={linkClass}>
              <Settings className="w-4 h-4 ml-2" />
              ניהול תוכן
            </NavLink>
          </>
        )}
      </nav>

      <div className="p-4 bg-gov-900 mx-2 mb-4 rounded-lg text-right border border-gov-800">
        <p className="text-xs text-gov-100 mb-2 font-semibold">צריך עזרה?</p>
        <p className="text-[10px] text-gov-400">תמיכה טכנית - שלוחה 4040</p>
        <p className="text-[10px] text-gov-400 mt-1">גרסה 2.1.0 (Prod)</p>
      </div>
    </aside>
  );
};

export default Sidebar;