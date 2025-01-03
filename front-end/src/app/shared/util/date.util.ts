export class DateUtil {

  static stringToDate(dateString: string): Date {
    const [year, month, day] = dateString.split('-').map(Number);

    return new Date(year, month - 1, day);
  }

  static stringToDateTime(dateString: string): Date {
    const [date, time] = dateString.split('T');

    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute, second] = time.split(':').map(Number);

    return new Date(year, month - 1, day, hour, minute, second);
  }

}
