function CounterFormat(seconds : number){
  let days = Math.floor(seconds / (24 * 60 * 60)).toString().padStart(2, '0')
  let hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60)).toString().padStart(2, '0')
  let minutes = Math.floor((seconds % (60 * 60)) / 60).toString().padStart(2, '0')
  let remainingSeconds = Math.floor((seconds % 60)).toString().padStart(2, '0')

  return {
    days,
    hours,
    minutes,
    remainingSeconds
  }
}

export {CounterFormat}