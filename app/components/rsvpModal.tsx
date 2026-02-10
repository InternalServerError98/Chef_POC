"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

type Event = {
  id: number;
  event_name: string;
  slots_available: number;
  tblChefs: {
    display_name: string;
  };
};

interface RSVPModalProps {
  event: any;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}


export default function RsvpModal({ event, isOpen, onOpenChange } : RSVPModalProps) {

  const [slots, setSlots] = useState<string>("0");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
        if (slots === "0") {
            toast.error("Please select the number of slots.", { description: "You must select at least 1 slot to RSVP.", duration: 4000 });
        }
        else{

             try{

            const res = await fetch("/api/slots", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    eventId: event?.id,
                    slots: parseInt(slots)
                }),
            })

            if(res.ok){
                toast.success("RSVP successful!", {
                    description: `You have successfully reserved ${slots} slot(s) for ${event.event_name}.`,
                    duration: 4000,
                });
                onOpenChange(false);
            }
            else{
                toast.error("RSVP failed", {
                    description: `Failed to reserve ${slots} slot(s) for ${event.event_name}. Please try again.`,
                    duration: 4000,
                });
            }
                

            }
            catch(error : any){
                toast.error("RSVP failed", {
                    description: error.message || "Something went wrong. Please try again.",
                });
            }

        }
   
    }

  useEffect(() => {

     fetch(`/api/slots?id=${event?.id}`)
      .then(async (res) => {
        const data = await res.json();
        const availableSlots = data[0].max_capacity - data[0].rsvp_current;
        console.log(availableSlots);
        setSlots(availableSlots.toString());
        setIsLoading(false);
      });
  }, [event]);

return (

    <>
     <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="border-2 border-white/30 dark:border-white/20 shadow-2xl">
        <DialogHeader>
          <DialogTitle>RSVP for {event.event_name}</DialogTitle>
          <DialogDescription>
            {
                isLoading ? 
                (<Skeleton className="h-5 w-32 mt-1"/>)
                :
                (
                    <>
                     Slots available: <span className="font-semibold text-white/90">{slots}</span>
                    </>
                )
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">

          {
            isLoading ? (<Skeleton className="h-10 w-full" />) : 
            (
                <Select value={slots} onValueChange={setSlots}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select number of slots" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: parseInt(slots) || 0 }, (_, i) => i + 1).map(
                            (num) => (
                            <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "slot" : "slots"}
                            </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            )
          }
          
          <div className="flex gap-2 justify-end pt-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Confirming..." : "Confirm RSVP"}
            </Button>
          </div>
        </div>
      </DialogContent>
     </Dialog>
    
    </>
);


}

