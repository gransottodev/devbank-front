function HoursFormat(time : number){
  const hours = time / (60 * 60)

  return hours.toFixed(1)
}


export {HoursFormat}