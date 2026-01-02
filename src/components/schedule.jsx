import React from 'react';
import { Calendar } from "@/components/ui/calendar"
import { Text } from "@/components/ui/text"
import { enUS } from "date-fns/locale"

const Schedule = ({ data, updateData }) => {
  const handleDateSelect = (date) => {
    updateData({ ...data, date });
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Text variant="h3">Schedule your cleaning</Text>
        <Text variant="p" className="text-zinc-500 dark:text-zinc-400">
            Choose a date that works best for you.
        </Text>
      </div>
      
      <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-sm border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
        <Calendar
            mode="single"
            selected={data?.date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={{ before: new Date() }}
            locale={enUS}
        />
        <div className="mt-4 text-center">
             {data?.date ? (
                <Text variant="p" className="text-sm font-medium text-primary">
                    Selected: {data.date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Text>
             ) : (
                <Text variant="p" className="text-sm text-zinc-500">
                    Please select a date.
                </Text>
             )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
