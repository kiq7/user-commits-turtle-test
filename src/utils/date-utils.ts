interface Params {
  date: string
  formatEndDayTime?: boolean
}

export class DateUtils {
  public formatDateToIso = ({ date, formatEndDayTime }: Params) => {
    const newDate = new Date(date)

    if (formatEndDayTime) {
      newDate.setUTCHours(23, 59, 59, 999)
    }

    return newDate.toISOString()
  }

  public formatDateString = (date: string) => new Date(date).toISOString().split('T')[0]
}
