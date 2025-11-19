import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './components/Header';
import { AboutModal, ConfigModal } from './components/Modals';
import { 
  Schedule1, 
  Schedule2, 
  Schedule3, 
  Schedule4, 
  Schedule5, 
  Schedule6 
} from './components/Schedules';
import { Role, AppState, VIEW_HOME, VIEW_SCHED_1, VIEW_SCHED_2, VIEW_SCHED_3, VIEW_SCHED_4, VIEW_SCHED_5, VIEW_SCHED_6 } from './types';
import { generateInitialSlots } from './utils';

const App: React.FC = () => {
  // --- State Management ---
  const [state, setState] = useState<AppState>({
    currentView: VIEW_HOME,
    currentUserRole: Role.SP,
    slots: [],
    jobNo: 'JOB-2023-001'
  });

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // --- Initialization ---
  useEffect(() => {
    // Simulate fetching initial data (the 20 slots)
    const initialSlots = generateInitialSlots();
    setState(prev => ({ ...prev, slots: initialSlots }));
  }, []);

  // --- Handlers ---
  const handleNavigate = (view: string) => {
    setState(prev => ({ ...prev, currentView: view }));
    window.scrollTo(0, 0);
  };

  const handleRoleChange = (role: Role) => {
    setState(prev => ({ ...prev, currentUserRole: role }));
  };

  const handleUpdateSlots = (newSlots: any[]) => {
    setState(prev => ({ ...prev, slots: newSlots }));
  };

  // --- View Routing ---
  const renderView = () => {
    const commonProps = {
      slots: state.slots,
      role: state.currentUserRole,
      onUpdateSlots: handleUpdateSlots,
      onNavigate: handleNavigate
    };

    switch (state.currentView) {
      case VIEW_HOME:
        return (
          <div className="max-w-4xl mx-auto text-center py-20 space-y-8 animate-in fade-in duration-700">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Last-Minute <span className="text-primary">Opportunity</span> Scheduler
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Maximize productivity by filling gaps in your schedule with urgent, high-priority appointments. 
              Coordinate seamlessly between Provider, Receiver, and Facilitator.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => handleNavigate(VIEW_SCHED_1)}
                className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-teal-800 shadow-lg transform hover:-translate-y-1 transition-all"
              >
                Start Scheduling Process
              </button>
              <button 
                onClick={() => setIsAboutOpen(true)}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-300 rounded-lg font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Learn More
              </button>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 font-bold text-xl">1</div>
                <h3 className="font-bold text-lg mb-2">Availability Check</h3>
                <p className="text-slate-500">SP sends 20 slots. SR ticks availability. SF matches availability.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4 font-bold text-xl">2</div>
                <h3 className="font-bold text-lg mb-2">Opportunity Arises</h3>
                <p className="text-slate-500">When a slot opens up, SP activates an urgency protocol for that specific time.</p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 font-bold text-xl">3</div>
                <h3 className="font-bold text-lg mb-2">Commitment</h3>
                <p className="text-slate-500">All parties confirm "Yes/No" immediately. Final schedule is locked.</p>
              </div>
            </div>
          </div>
        );
      case VIEW_SCHED_1: return <Schedule1 {...commonProps} />;
      case VIEW_SCHED_2: return <Schedule2 {...commonProps} />;
      case VIEW_SCHED_3: return <Schedule3 {...commonProps} />;
      case VIEW_SCHED_4: return <Schedule4 {...commonProps} />;
      case VIEW_SCHED_5: return <Schedule5 {...commonProps} />;
      case VIEW_SCHED_6: return <Schedule6 {...commonProps} />;
      default: return <div>View Not Found</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <Header 
        onNavigate={handleNavigate} 
        currentView={state.currentView}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
        currentRole={state.currentUserRole}
        onRoleChange={handleRoleChange}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Time Slot Opportunity Scheduler. All rights reserved.
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} />
    </div>
  );
};

export default App;
