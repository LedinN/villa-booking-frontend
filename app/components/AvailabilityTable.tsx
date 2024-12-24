"use client"; // If using Next.js App Router

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import apiClient from "../lib/api"; // your Axios instance
import "react-calendar/dist/Calendar.css";

interface Booking {
  id: number;
  startDate: string; // e.g., "2024-01-01"
  endDate: string;   // e.g., "2024-01-07"
}

interface SelectedRange {
  start: Date | null;
  end: Date | null;
}

export default function AvailabilityCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedRange, setSelectedRange] = useState<SelectedRange>({
    start:null,
    end:null,
  });

  // Fetch existing bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await apiClient.get("/api/bookings");
        setBookings(res.data); 
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

 
  const getMonday = (date: Date) => {
    const day = date.getDay();
    const shift = day === 0 ? 6 : day - 1;
    const monday = new Date(date);
    monday.setDate(date.getDate() - shift);
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  const getSunday = (monday: Date) => {
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);
    return sunday;
  };

  const isWeekBooked = (monday: Date, sunday: Date) => {
    return bookings.some((booking) => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return bookingStart <= sunday && bookingEnd >= monday;
    });
  };

  const tileDisabled = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return false;
    const monday = getMonday(date);
    const sunday = getSunday(monday);
    return isWeekBooked(monday, sunday);
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return "";
    const monday = getMonday(date);
    const sunday = getSunday(monday);
    if (isWeekBooked(monday, sunday)) {
      return "bg-gray-300 text-gray-600 cursor-not-allowed";
    }

    // NOT WORKING
    if (selectedRange.start && selectedRange.end && date >= selectedRange.start && date <= selectedRange.end) {
      return "bg-blue-700 text-black";
    }

    return "";
  };

  const onClickDay = (value: Date) => {
    const monday = getMonday(value);
    const sunday = getSunday(monday);

    if (isWeekBooked(monday, sunday)) {
      return;
    }

    
    if (!selectedRange.start || !selectedRange.end) {
      setSelectedRange({ start: monday, end: sunday });
      return;
    }

    const nextMonday = new Date(selectedRange.end);
    nextMonday.setDate(nextMonday.getDate() + 1);
    nextMonday.setHours(0, 0, 0, 0);

    if (monday.getTime() === nextMonday.getTime()) {
      setSelectedRange({ start: selectedRange.start, end: sunday });
    } else {
      setSelectedRange({ start: monday, end: sunday });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">House Availability</h1>

      <div className="bg-white p-4 rounded shadow">
        <Calendar
          onClickDay={onClickDay}
          tileDisabled={tileDisabled}
          tileClassName={tileClassName}
          defaultView="month"
        />
      </div>

      <div className="mt-4">
        <h2 className="font-semibold mb-2">Selected Range:</h2>
        {selectedRange.start && selectedRange.end && (
          <div>
            {selectedRange.start.toDateString()} - {selectedRange.end.toDateString()}
          </div>
        )}
      </div>
    </div>
  );
}
