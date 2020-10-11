interface Params {
  date: string
  formatEndDayTime?: boolean
}

export class DateUtils {
  public formatDateToIso = ({ date, formatEndDayTime }: Params) => {
    const newDate = new Date(date)

    if (formatEndDayTime) {
      newDate.setHours(23, 59, 59, 999)
    }

    return newDate.toISOString()
  }

  public formatDateToLocale = (date: string) => new Date(date).toLocaleDateString('en-US')
}
