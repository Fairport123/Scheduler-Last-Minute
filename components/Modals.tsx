import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-4 text-slate-600 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export const AboutModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (props) => (
  <Modal {...props} title="About Time Slot Opportunity Scheduler">
    <p>
      This App is designed for making appointments between two parties where the governing factors are 
      limited time availability as well as the availability of appointment’s related essential facilities 
      and resources.
    </p>
    <p>
      <strong>Key Features:</strong>
    </p>
    <ul className="list-disc pl-5 space-y-1 text-sm">
      <li>Focuses on "last-minute" singular appointment events.</li>
      <li>Increases service provider productivity.</li>
      <li>Improves experience for service receivers needing urgent care/service.</li>
      <li>Coordinates 3 parties: Provider (SP), Receiver (SR), and Facilitator (SF).</li>
    </ul>
    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-sm text-blue-800 mt-4">
      <p className="font-semibold mb-1">Note on Communication:</p>
      Throughout the stages of the App, there is no use or reliance on time consuming phone or email communication. 
      All parties are provided with up-to-date status via the App.
    </div>
  </Modal>
);

export const ConfigModal: React.FC<{ isOpen: boolean; onClose: () => void }> = (props) => (
  <Modal {...props} title="Configuration">
    <p className="text-sm text-slate-500 mb-4">Configure application settings here.</p>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700">Service Provider Name</label>
        <input type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary border p-2" placeholder="Dr. Smith" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Service Type</label>
        <input type="text" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-primary focus:ring-primary border p-2" placeholder="Urgent Surgery" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Notification Settings</label>
        <div className="mt-2 space-y-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" defaultChecked />
            <span className="ml-2 text-sm text-slate-600">Enable SMS Simulation</span>
          </label>
        </div>
      </div>
    </div>
    <div className="mt-6 flex justify-end">
      <button onClick={props.onClose} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-teal-800">Save Configuration</button>
    </div>
  </Modal>
);
