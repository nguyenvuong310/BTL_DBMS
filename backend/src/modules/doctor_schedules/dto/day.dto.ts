export class DayDto {
  label: string;

  value: string;

  constructor(dayKey: Date) {
    const dateObj = new Date(dayKey);

    // Adjust for the local time zone and set the time to "00:00:00"
    this.value = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj
      .getDate()
      .toString()
      .padStart(2, '0')} 00:00:00`;

    const vietnameseWeekdays = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const weekday = vietnameseWeekdays[dayKey.getDay()];
    this.label = `${weekday} - ${dayKey.getDate().toString().padStart(2, '0')}/${(dayKey.getMonth() + 1)
      .toString()
      .padStart(2, '0')}`;
  }
}
