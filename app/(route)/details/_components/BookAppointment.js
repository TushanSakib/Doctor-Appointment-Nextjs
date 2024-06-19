import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, Clock } from 'lucide-react';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { PDFDocument, rgb } from 'pdf-lib';
import { v4 as uuidv4 } from 'uuid';

export default function BookAppointment({ doctor }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    getTime();
  }, [doctor]);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: `${i.toString().padStart(2, '0')}:00 AM` });
      timeList.push({ time: `${i.toString().padStart(2, '0')}:30 AM` });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: `${i}:00 PM` });
      timeList.push({ time: `${i}:30 PM` });
    }
    setTimeSlot(timeList);
  };

  const formattedDate = format(date, 'yyyy-MM-dd');

  const generatePdf = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();

    page.drawText(`Appointment Confirmation`, {
      x: 50,
      y: height - 50,
      size: 20,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Name: ${data.Username}`, {
      x: 50,
      y: height - 100,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Email: ${data.Email}`, {
      x: 50,
      y: height - 130,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Date: ${data.Date}`, {
      x: 50,
      y: height - 160,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Time: ${data.Time}`, {
      x: 50,
      y: height - 190,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Doctor: ${data.DoctorName}`, {
      x: 50,
      y: height - 220,
      size: 15,
      color: rgb(0, 0, 0),
    });
    page.drawText(`Token: ${data.Token}`, {
      x: 50,
      y: height - 250,
      size: 15,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Appointment_Confirmation.pdf';

    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const saveBooking = () => {
    const uid = uuidv4();
    const data = {
      data: {
        Username: username,
        Email: email,
        Time: selectedSlot,
        Date: formattedDate,
        doctor: doctor.id,
        DoctorName: doctor.attributes.Name,
        Token: uid,
      },
    };
    GlobalAPI.bookAppointment(data).then((resp) => {
      if (resp) {
        toast('Booking Confirmation will be sent to your Email');
        generatePdf(data.data);
      }
    });
  };

  const isPastDay = (day) => {
    return day < new Date().setHours(0, 0, 0, 0);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className='mt-3 rounded-full'>Book Appointment</Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-lg p-4 sm:p-6 overflow-y-auto max-h-96'>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            <div className='grid sm:flex sm:gap-1 md:grid-cols-2 mt-5'>
              <div className='flex flex-col gap-3 items-baseline'>
                <h2 className='flex gap-2 items-center'>
                  <CalendarDays className='text-primary h-5 w-5' />
                  Select Date
                </h2>
                <Calendar
                  mode='single'
                  selected={date}
                  onSelect={setDate}
                  disabled={isPastDay}
                  className='rounded-md border'
                />
              </div>

              <div className='mt-3 md:mt-0'>
                <h2 className='flex gap-2 items-center mb-3'>
                  <Clock className='text-primary h-5 w-5' />
                  Select Time Slot
                </h2>
                <div className='grid grid-cols-3 gap-2 border rounded-lg p-3'>
                  {timeSlot.map((item, index) => (
                    <div
                      onClick={() => setSelectedSlot(item.time)}
                      key={index}
                      className={`p-2 cursor-pointer border rounded-full text-center ${
                        selectedSlot === item.time
                          ? 'bg-primary text-white'
                          : 'hover:bg-primary hover:text-white'
                      }`}
                    >
                      {item.time}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='mt-5 flex flex-col gap-4'>
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='p-2 border border-blue-500 rounded-md'
                placeholder='Your Name'
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='p-2 border border-blue-500 rounded-md'
                placeholder='Your Email'
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={!(date && selectedSlot)}
            onClick={saveBooking}
            className='w-full'
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
