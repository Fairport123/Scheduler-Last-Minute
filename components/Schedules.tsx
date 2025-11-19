import React, { useState } from 'react';
import { Check, Clock, AlertCircle, Send, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { TimeSlot, Role } from '../types';

interface ScheduleProps {
  slots: TimeSlot[];
  role: Role;
  onUpdateSlots: (newSlots: TimeSlot[]) => void;
  onNavigate: (view: string) => void;
}

// ----------------------------------------------------------------------
// Schedule 1: SR Availability Questionnaire
// ----------------------------------------------------------------------
export const Schedule1: React.FC<ScheduleProps> = ({ slots, role, onUpdateSlots, onNavigate }) => {
  const [localSlots, setLocalSlots] = useState(slots);
  const isEditable = role === Role.SR || role === Role.SP; // Allow SP to debug/edit for demo

  const toggleSlot = (id: string) => {
    if (!isEditable) return;
    setLocalSlots(prev => prev.map(s => s.id === id ? { ...s, srAvailable: !s.srAvailable } : s));
  };

  const handleSubmit = () => {
    onUpdateSlots(localSlots);
    alert("Availability Sent to Service Provider!");
    onNavigate('schedule-2');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-primary">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Schedule 1: SR Availability Questionnaire</h2>
        <p className="text-slate-600">
          Please select all time slots below where you are available to receive the service.
        </p>
        {role !== Role.SR && (
           <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200 inline-block">
             Viewing as {role}. Switch to <strong>{Role.SR}</strong> to simulate the patient experience correctly.
           </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
          {localSlots.map(slot => (
            <div 
              key={slot.id} 
              onClick={() => toggleSlot(slot.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all flex justify-between items-center ${
                slot.srAvailable 
                  ? 'border-primary bg-teal-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="font-bold text-slate-700">{slot.displayDate}</div>
                <div className="text-sm text-slate-500">{slot.period}</div>
              </div>
              <div className={`w-6 h-6 rounded border flex items-center justify-center ${
                slot.srAvailable ? 'bg-primary border-primary' : 'bg-white border-slate-300'
              }`}>
                {slot.srAvailable && <Check className="w-4 h-4 text-white" />}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-slate-50 border-t flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={!isEditable}
            className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-teal-800 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Submit Availability</span>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Schedule 2: SR's Time Slots Available (Read Only for SP)
// ----------------------------------------------------------------------
export const Schedule2: React.FC<ScheduleProps> = ({ slots, role }) => {
  const availableSlots = slots.filter(s => s.srAvailable);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Schedule 2: SR's Time Slots Available</h2>
        <p className="text-slate-600">
          List of appointments identified by the Service Receiver as potential opportunities.
        </p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Period</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {availableSlots.length === 0 ? (
               <tr>
                 <td colSpan={3} className="px-6 py-12 text-center text-slate-500">No slots selected by SR yet.</td>
               </tr>
            ) : (
              availableSlots.map(slot => (
                <tr key={slot.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{slot.displayDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{slot.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      SR Available
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Schedule 3: SF Availability
// ----------------------------------------------------------------------
export const Schedule3: React.FC<ScheduleProps> = ({ slots, role, onUpdateSlots, onNavigate }) => {
  const [localSlots, setLocalSlots] = useState(slots);
  const isEditable = role === Role.SF || role === Role.SP; 
  const availableToSF = localSlots.filter(s => s.srAvailable); // SF only sees what SR has picked

  const toggleSlot = (id: string) => {
    if (!isEditable) return;
    setLocalSlots(prev => prev.map(s => s.id === id ? { ...s, sfAvailable: !s.sfAvailable } : s));
  };

  const handleSubmit = () => {
    onUpdateSlots(localSlots);
    alert("Facilitator Availability Confirmed!");
    onNavigate('schedule-4');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Schedule 3: SF's Availability</h2>
        <p className="text-slate-600">
          Service Facilitator: Please indicate availability for the slots already selected by the Receiver.
        </p>
        {role !== Role.SF && (
           <div className="mt-2 p-2 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200 inline-block">
             Viewing as {role}. Switch to <strong>{Role.SF}</strong> to simulate the facilitator experience correctly.
           </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 gap-4 p-4">
          {availableToSF.length === 0 ? (
            <div className="text-center py-12 text-slate-500">No SR slots available to review.</div>
          ) : (
            availableToSF.map(slot => (
              <div 
                key={slot.id} 
                onClick={() => toggleSlot(slot.id)}
                className={`p-4 rounded-lg border flex justify-between items-center cursor-pointer transition-colors ${
                  slot.sfAvailable ? 'bg-purple-50 border-purple-500' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                 <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-700">{slot.displayDate}</span>
                      <span className="text-sm px-2 py-0.5 rounded bg-green-100 text-green-800">SR Available</span>
                    </div>
                    <div className="text-sm text-slate-500 mt-1">{slot.period}</div>
                 </div>
                 <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-600">{slot.sfAvailable ? 'I am Available' : 'Not Selected'}</span>
                    <div className={`w-6 h-6 rounded border flex items-center justify-center ${
                      slot.sfAvailable ? 'bg-purple-600 border-purple-600' : 'bg-white border-slate-300'
                    }`}>
                      {slot.sfAvailable && <Check className="w-4 h-4 text-white" />}
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>
        {availableToSF.length > 0 && (
          <div className="p-4 bg-slate-50 border-t flex justify-end">
            <button 
              onClick={handleSubmit}
              disabled={!isEditable}
              className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors shadow-lg disabled:opacity-50"
            >
              <span>Submit SF Availability</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Schedule 4: Intersections & Selection
// ----------------------------------------------------------------------
export const Schedule4: React.FC<ScheduleProps> = ({ slots, role, onUpdateSlots, onNavigate }) => {
  const matchedSlots = slots.filter(s => s.srAvailable && s.sfAvailable);
  const isSP = role === Role.SP;

  const handleSelectOpportunity = (id: string) => {
    if (!isSP) {
      alert("Only the Service Provider can select an opportunity to proceed.");
      return;
    }
    // Reset selections and select only this one
    const newSlots = slots.map(s => ({
      ...s,
      isSelectedForOpportunity: s.id === id,
      srConfirmed: s.id === id ? null : s.srConfirmed, // Reset confirmations for new attempt
      sfConfirmed: s.id === id ? null : s.sfConfirmed
    }));
    onUpdateSlots(newSlots);
    alert("Opportunity Selected! Proceeding to Urgent Confirmation (Schedule 5).");
    onNavigate('schedule-5');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow p-6 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Schedule 4: Mutual Opportunities</h2>
        <p className="text-slate-600">
          These slots have been confirmed as available by BOTH the Receiver and Facilitator.
          <br/>
          <span className="font-semibold text-indigo-700">Action Required (SP):</span> Select one slot to activate the "Second Stage" urgent confirmation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {matchedSlots.length === 0 ? (
           <div className="bg-white p-12 rounded-lg shadow text-center text-slate-500">
             No matching time slots found yet. Ensure both SR (Sch 1) and SF (Sch 3) have submitted availability.
           </div>
        ) : (
          matchedSlots.map(slot => (
            <div key={slot.id} className="bg-white shadow rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center border border-indigo-100">
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-bold text-slate-800">{slot.displayDate}</h3>
                <p className="text-indigo-600 font-medium">{slot.period}</p>
                <div className="flex space-x-2 mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center"><Check className="w-3 h-3 mr-1"/> SR Ready</span>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center"><Check className="w-3 h-3 mr-1"/> SF Ready</span>
                </div>
              </div>
              <button
                onClick={() => handleSelectOpportunity(slot.id)}
                disabled={!isSP}
                className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Select This Opportunity
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Schedule 5: Urgent Confirmation
// ----------------------------------------------------------------------
export const Schedule5: React.FC<ScheduleProps> = ({ slots, role, onUpdateSlots, onNavigate }) => {
  const selectedSlot = slots.find(s => s.isSelectedForOpportunity);

  if (!selectedSlot) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center text-slate-500 animate-in fade-in">
        <AlertCircle className="w-12 h-12 mx-auto mb-4 text-slate-300" />
        <h3 className="text-lg font-medium">No Opportunity Selected</h3>
        <p>Please go back to Schedule 4 and select a time slot to proceed.</p>
        <button onClick={() => onNavigate('schedule-4')} className="mt-4 text-primary underline">Go to Schedule 4</button>
      </div>
    );
  }

  const handleConfirm = (confirmed: boolean) => {
    const timestamp = new Date().toLocaleTimeString();
    const newSlots = slots.map(s => {
      if (s.id === selectedSlot.id) {
        if (role === Role.SR) return { ...s, srConfirmed: confirmed, srResponseTime: timestamp };
        if (role === Role.SF) return { ...s, sfConfirmed: confirmed, sfResponseTime: timestamp };
      }
      return s;
    });
    onUpdateSlots(newSlots);
  };

  const myConfirmation = role === Role.SR ? selectedSlot.srConfirmed : (role === Role.SF ? selectedSlot.sfConfirmed : null);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow-lg border-t-8 border-red-500 p-6">
        <div className="flex items-start justify-between">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center text-red-600">
                <AlertTriangle className="w-6 h-6 mr-2" />
                URGENT: Confirmation Required
                </h2>
                <p className="text-slate-600 mt-2">
                An opportunity has arisen. Immediate commitment is required to secure this slot.
                </p>
            </div>
            <div className="text-right">
                <span className="block text-xs text-slate-400 uppercase">Status</span>
                <span className="font-bold text-slate-700">Waiting for Response</span>
            </div>
        </div>
      </div>

      {/* The Opportunity Card */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 rounded-xl shadow-xl p-8 text-white text-center">
        <h3 className="text-slate-300 uppercase tracking-widest text-sm mb-2">Proposed Appointment</h3>
        <div className="text-4xl font-bold mb-2">{selectedSlot.displayDate}</div>
        <div className="text-xl text-primary-200 font-light mb-6">{selectedSlot.period}</div>
        
        {role === Role.SP ? (
           <div className="bg-white/10 rounded-lg p-4 text-left max-w-md mx-auto backdrop-blur-sm">
             <div className="flex justify-between mb-2 border-b border-white/10 pb-2">
                <span>SR Confirmation:</span>
                {selectedSlot.srConfirmed === true && <span className="text-green-400 flex items-center"><Check className="w-4 h-4 mr-1"/> Confirmed</span>}
                {selectedSlot.srConfirmed === false && <span className="text-red-400 flex items-center"><XCircle className="w-4 h-4 mr-1"/> Declined</span>}
                {selectedSlot.srConfirmed === null && <span className="text-yellow-400 flex items-center"><Clock className="w-4 h-4 mr-1"/> Pending</span>}
             </div>
             <div className="flex justify-between">
                <span>SF Confirmation:</span>
                {selectedSlot.sfConfirmed === true && <span className="text-green-400 flex items-center"><Check className="w-4 h-4 mr-1"/> Confirmed</span>}
                {selectedSlot.sfConfirmed === false && <span className="text-red-400 flex items-center"><XCircle className="w-4 h-4 mr-1"/> Declined</span>}
                {selectedSlot.sfConfirmed === null && <span className="text-yellow-400 flex items-center"><Clock className="w-4 h-4 mr-1"/> Pending</span>}
             </div>
             {selectedSlot.srConfirmed && selectedSlot.sfConfirmed && (
                 <div className="mt-4 pt-4 border-t border-white/20 text-center">
                    <button onClick={() => onNavigate('schedule-6')} className="bg-green-500 text-white px-4 py-2 rounded font-bold w-full hover:bg-green-600 transition">Finalize in Schedule 6</button>
                 </div>
             )}
           </div>
        ) : (
            <div className="max-w-md mx-auto">
               <p className="mb-6 text-slate-300">
                 Do you confirm your immediate full commitment and undertake to be available for this time slot?
               </p>
               {myConfirmation === null ? (
                   <div className="flex space-x-4 justify-center">
                     <button onClick={() => handleConfirm(false)} className="bg-slate-600 hover:bg-slate-500 px-6 py-3 rounded-lg font-semibold transition w-1/2">No, I can't</button>
                     <button onClick={() => handleConfirm(true)} className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition w-1/2 shadow-lg shadow-green-900/20">Yes, I Confirm</button>
                   </div>
               ) : (
                   <div className={`p-4 rounded-lg font-bold text-lg flex items-center justify-center ${myConfirmation ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {myConfirmation ? 'You have confirmed attendance.' : 'You have declined.'}
                   </div>
               )}
            </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// Schedule 6: Final Commitment
// ----------------------------------------------------------------------
export const Schedule6: React.FC<ScheduleProps> = ({ slots, role }) => {
    const selectedSlot = slots.find(s => s.isSelectedForOpportunity);

    if (!selectedSlot) {
        return (
            <div className="bg-white p-8 rounded shadow text-center text-slate-500">No Active Schedule 6 Generated.</div>
        );
    }

    const isFullyBooked = selectedSlot.srConfirmed && selectedSlot.sfConfirmed;

    return (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${isFullyBooked ? 'border-green-500' : 'border-orange-500'}`}>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Schedule 6: Schedule of Responses & Commitments</h2>
                <p className="text-slate-600">
                    Official record of commitments.
                </p>
            </div>

            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Appointment Job Details</h3>
                        <p className="text-sm text-slate-500">Job #{Math.floor(Math.random() * 10000)}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{selectedSlot.displayDate}</div>
                        <div className="text-slate-600">{selectedSlot.period}</div>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SR Status */}
                    <div className="border rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                        <h4 className="font-bold text-slate-700 mb-4">Service Receiver (SR)</h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">Response:</span>
                            {selectedSlot.srConfirmed ? (
                                <span className="flex items-center text-green-600 font-bold"><CheckCircle2 className="w-5 h-5 mr-1"/> Confirmed</span>
                            ) : (
                                <span className="flex items-center text-red-600 font-bold"><XCircle className="w-5 h-5 mr-1"/> Declined/Pending</span>
                            )}
                        </div>
                        {selectedSlot.srResponseTime && (
                            <div className="text-xs text-slate-400 text-right">Recorded at: {selectedSlot.srResponseTime}</div>
                        )}
                    </div>

                    {/* SF Status */}
                    <div className="border rounded-lg p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                        <h4 className="font-bold text-slate-700 mb-4">Service Facilitator (SF)</h4>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-slate-500">Response:</span>
                            {selectedSlot.sfConfirmed ? (
                                <span className="flex items-center text-green-600 font-bold"><CheckCircle2 className="w-5 h-5 mr-1"/> Confirmed</span>
                            ) : (
                                <span className="flex items-center text-red-600 font-bold"><XCircle className="w-5 h-5 mr-1"/> Declined/Pending</span>
                            )}
                        </div>
                        {selectedSlot.sfResponseTime && (
                            <div className="text-xs text-slate-400 text-right">Recorded at: {selectedSlot.sfResponseTime}</div>
                        )}
                    </div>
                </div>

                <div className={`p-6 ${isFullyBooked ? 'bg-green-50' : 'bg-orange-50'} border-t border-slate-200 text-center`}>
                    {isFullyBooked ? (
                        <div>
                            <div className="flex justify-center mb-2">
                                <div className="bg-green-100 rounded-full p-3">
                                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-green-800">Service Confirmed & Scheduled</h3>
                            <p className="text-green-700 mt-2 max-w-2xl mx-auto">
                                All parties have committed to this time slot. Notifications have been sent to online calendars. 
                                Failure to attend may result in penalties as per the user agreement.
                            </p>
                        </div>
                    ) : (
                        <div>
                             <h3 className="text-xl font-bold text-orange-800">Pending Confirmations</h3>
                             <p className="text-orange-700 mt-2">Waiting for all parties to confirm attendance.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
