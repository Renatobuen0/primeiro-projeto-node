import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  date: Date;
  provider: string;
}
class CreateAppointmentService {
  private appotimentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appotimentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appotimentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appotimentsRepository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}
export default CreateAppointmentService;
