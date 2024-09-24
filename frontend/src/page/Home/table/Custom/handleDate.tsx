export function handleDate() {
    const date = new Date();
    const dayDate = date.getDate();
    let monthDate: string = date.getMonth().toString();
    const yearDate = date.getFullYear();
    if(monthDate.length < 2){
      monthDate = `0${+monthDate+1 }`
    }
    const dateBack = `${yearDate}-${monthDate}-${dayDate}`

  return { dateBack };
}
