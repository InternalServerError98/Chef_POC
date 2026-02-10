"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import RSVPModal from "../components/rsvpModal";
import { useState } from "react";

type Event = {
  id: number;
  event_name: string;
  event_desc: string;
  event_date: string;
  tblChefs: {
    display_name: string;
  };
  tblEventTimes: {
    display_desc: string;
  };
};

export function EventsTable({ events }: { events: Event[] }) {

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (

    <>
    

    <div className="rounded-2xl border border-white/10 bg-white dark:bg-black shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>When</TableHead>
            <TableHead>Chef</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {events?.map((event) => (
            <TableRow key={event?.id}>
              <TableCell className="font-semibold">
                {event?.event_name}
              </TableCell>

              <TableCell className="max-w-md text-slate-600 dark:text-slate-300 break-words whitespace-normal">
                {event?.event_desc}
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span>{event?.tblEventTimes?.display_desc}</span>
                  <span className="text-xs text-slate-500">
                    {new Date(event?.event_date).toLocaleDateString()}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                {event?.tblChefs.display_name}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    setSelectedEvent(event);
                    setIsOpen(true);
                  }}
                >
                  RSVP
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

     {selectedEvent && isOpen &&
      (
        <RSVPModal
          event={selectedEvent}
          isOpen={isOpen}
          onOpenChange={() => setIsOpen(false)}
        />
      )}
    </>
    );

}
