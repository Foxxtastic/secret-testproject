import moment from "moment"

export const convertToLocalDate = (date: string) => {
    return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
}