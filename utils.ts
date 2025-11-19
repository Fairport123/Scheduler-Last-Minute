import { TimeSlot, Period } from './types';

export const generateInitialSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  let currentDate = new Date();
  let count = 0;

  // Generate slots for next 10 working days
  while (count < 10) {
    // Skip weekends
    if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
      const dateStr = currentDate.toISOString().split('T')[0];
      const dateDisplay = currentDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });

      slots.push({
        id: `${dateStr}-AM`,
        date: dateStr,
        displayDate: dateDisplay,
        period: Period.MORNING,
        srAvailable: false,
        sfAvailable: false,
        isSelectedForOpportunity: false,
        srConfirmed: null,
        sfConfirmed: null
      });

      slots.push({
        id: `${dateStr}-PM`,
        date: dateStr,
        displayDate: dateDisplay,
        period: Period.AFTERNOON,
        srAvailable: false,
        sfAvailable: false,
        isSelectedForOpportunity: false,
        srConfirmed: null,
        sfConfirmed: null
      });

      count++;
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return slots;
};
