import React from 'react';
import { CalendarClock, Info, Settings } from 'lucide-react';
import { Role } from '../types';

interface HeaderProps {
  onNavigate: (view: string) => void;
  currentView: string;
  onOpenAbout: () => void;
  onOpenConfig: () => void;
  currentRole: Role;
  onRoleChange: (role: Role) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  currentView, 
  onOpenAbout, 
  onOpenConfig,
  currentRole,
  onRoleChange
}) => {
  
  const navLinks = [
    { id: 'schedule-1', label: 'Sch 1' },
    { id: 'schedule-2', label: 'Sch 2' },
    { id: 'schedule-3', label: 'Sch 3' },
    { id: 'schedule-4', label: 'Sch 4' },
    { id: 'schedule-5', label: 'Sch 5' },
    { id: 'schedule-6', label: 'Sch 6' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left: Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('home')}>
            <CalendarClock className="h-8 w-8 text-primary group-hover:text-teal-600 transition-colors" />
            <div className="ml-3 hidden md:block">
              <h1 className="text-lg font-bold text-slate-800 leading-tight">Time Slot</h1>
              <p className="text-xs text-slate-500 font-medium">Opportunity Scheduler</p>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            <button 
              onClick={onOpenAbout}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all"
            >
              About
            </button>
            <button 
              onClick={onOpenConfig}
              className="px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:text-primary hover:bg-slate-50 transition-all"
            >
              Config
            </button>
            <div className="w-px h-6 bg-slate-300 mx-2 self-center"></div>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currentView === link.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right: Role Switcher (Demo Feature) */}
          <div className="flex items-center space-x-2">
            <div className="text-xs text-right hidden sm:block">
              <span className="block text-slate-400 uppercase tracking-wider">Viewing as</span>
            </div>
            <select 
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value as Role)}
              className="block w-full pl-3 pr-8 py-1 text-sm border-slate-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md border bg-slate-50 shadow-sm"
            >
              {Object.values(Role).map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Mobile Nav (Simple) */}
        <div className="md:hidden overflow-x-auto pb-2 flex space-x-2 scrollbar-hide">
             <button onClick={onOpenAbout} className="whitespace-nowrap px-3 py-1 text-xs border rounded">About</button>
             <button onClick={onOpenConfig} className="whitespace-nowrap px-3 py-1 text-xs border rounded">Config</button>
             {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`whitespace-nowrap px-3 py-1 text-xs border rounded ${
                  currentView === link.id ? 'bg-primary text-white border-primary' : 'bg-white text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
        </div>
      </div>
    </header>
  );
};
