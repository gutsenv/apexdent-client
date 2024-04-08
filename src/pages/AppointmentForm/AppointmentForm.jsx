import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import AppointmentService from "@/services/appointmentService";

const appointmentFormSchema = z.object({
  dentist: z.string({ required_error: "Please enter a dentist" }),
  schedule: z.coerce.date({
    required_error: "Appointment schedule is required",
    invalid_type_error: "Please select a valid date.",
  }),
  status: z.string().optional().default("pending"),
});

function AppointmentForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(appointmentFormSchema),
  });

  const onSubmit = async (values) => {
    try {
      const params = {
        ...values,
        patient: localStorage.getItem("id"),
      };

      const res = await AppointmentService.create(params);

      if (res) {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/3 mx-auto items-center justify-center mt-10">
      <p className="text-3xl font-semibold mb-8">Appointment Form</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="dentist"
            render={({ field }) => (
              <FormItem className="mb-2">
                <FormLabel>Dentist</FormLabel>
                <FormControl>
                  <Input placeholder="Dentist" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem className="w-full mb-8">
                <FormLabel>Schedule</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "text-left font-normal w-full",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Schedule</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-end">
            <Button type="submit">Add Appointment</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default AppointmentForm;
