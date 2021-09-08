import moment from "moment"

export const formatDateTime = (date: string | null) => {
    if (date !== null) {
        return moment.utc(date).local().format('YYYY-MM-DD HH:mm:ss')
    }
    return "Never"
}