import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, ShieldCheck, UserCircle2 } from 'lucide-react';
import { APP_NAME, DEPT_NAME } from '../constants';
import { Navigate } from 'react-router-dom';

// Official-style Accountant General Logo Big
const HashkavLogoBig = () => (
  <div className="w-full h-full flex items-center justify-center bg-white rounded-full p-2">
      <img 
         src="https://upload.wikimedia.org/wikipedia/he/thumb/c/c9/Accountant_General_%28Israel%29_logo.png/600px-Accountant_General_%28Israel%29_logo.png" 
         alt="Accountant General"
         className="w-full h-full object-contain"
         onError={(e) => {
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

const Login = () => {
  const { login, loginSSO, isLoading, isAuthenticated } = useAuth();
  const [mode, setMode] = useState<'sso' | 'manual'>('sso');

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleManualLogin = () => {
    login('demo@mof.gov.il');
  };

  const handleSSO = () => {
    loginSSO();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-br from-gov-900 to-gov-800 px-8 py-10 text-center relative overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-gov-700 rounded-full opacity-30 blur-3xl"></div>
           <div className="absolute top-10 -left-10 w-32 h-32 bg-gov-500 rounded-full opacity-20 blur-2xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 border-4 border-white/20">
              <HashkavLogoBig />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{APP_NAME}</h1>
            <p className="text-gov-200 text-sm mt-1">{DEPT_NAME}</p>
            <p className="text-gov-300 text-xs font-light mt-0.5">משרד האוצר</p>
          </div>
        </div>

        <div className="p-8">
            {mode === 'sso' ? (
              <div className="space-y-4">
                 <button
                  onClick={handleSSO}
                  disabled={isLoading}
                  className="w-full py-4 px-4 rounded-lg bg-white border-2 border-gov-100 text-gov-900 font-semibold transition-all hover:border-gov-500 hover:bg-gov-50 shadow-sm flex items-center justify-between group"
                >
                  <span className="flex items-center gap-3">
                    <span className="bg-gov-100 p-2 rounded-full text-gov-700 group-hover:bg-white group-hover:text-gov-600 transition-colors">
                      <ShieldCheck size={20} />
                    </span>
                    <span className="flex flex-col text-right">
                       <span>התחברות ארגונית</span>
                       <span className="text-xs text-slate-500 font-normal">הזדהות עובד מדינה (AD/SSO)</span>
                    </span>
                  </span>
                  {isLoading ? <span className="text-xs">טוען...</span> : <ArrowLeft size={20} className="text-slate-300 group-hover:text-gov-600" />}
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-xs">או</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button 
                   onClick={() => setMode('manual')}
                   className="w-full text-center text-sm text-slate-500 hover:text-gov-700 font-medium"
                >
                  כניסה למשתמשי פיתוח / אורחים
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800 mb-4">
                  מצב פיתוח: הכניסה תתבצע עם משתמש דמו.
                </div>
                <button
                  onClick={handleManualLogin}
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg text-white font-semibold transition-all shadow-md bg-gov-800 hover:bg-gov-700 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? 'מתחבר...' : 'כניסה למערכת'} <ArrowLeft size={18} />
                </button>
                <button 
                   onClick={() => setMode('sso')}
                   className="w-full text-center text-xs text-slate-400 hover:text-slate-600 mt-2"
                >
                  חזרה להתחברות ארגונית
                </button>
              </div>
            )}
            
            <div className="mt-8 text-center flex justify-center gap-4 opacity-60">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Emblem_of_Israel.svg/600px-Emblem_of_Israel.svg.png" className="h-8 grayscale opacity-50" alt="Israel" />
               <div className="text-right">
                 <p className="text-[10px] text-slate-400 leading-tight">משרד האוצר</p>
                 <p className="text-[10px] text-slate-400 font-bold">ממשל זמין</p>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;