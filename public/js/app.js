const weatherForm = document.querySelector('form')
const loc = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')
const rainChance = document.querySelector('#rainChance')
const tempHigh = document.querySelector('#tempHigh')
const tempLow = document.querySelector('#tempLow')
const coordinates = document.querySelector('#coordinates')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search = loc.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${search}`).then((response)=>{
    response.json().then((data)=>{
        let m1='',m2='',rc='',th='',tl='', cc=''
      if(data.error){
            console.log(data.error)
            m1 = data.error
            m2 = ''
            rc = ''
            th = ''
            tl = ''
            cc = ''
      } else{
            console.log(data.location)
            console.log(data.forecast)
            m1 = data.location
            m2 = data.forecast
            rc = `Chance of rain: ${data.precipProbability}%`
            th = `Highest Temperature: ${data.tempHigh}`
            tl = `Lowest Temperature: ${data.tempLow}`
            cc = `${data.long}, ${data.lat}`
      }

      messageOne.textContent = m1
      messageTwo.textContent = m2
      rainChance.textContent  = rc
      tempHigh.textContent  = th
      tempLow.textContent  = tl
      coordinates.textContent  = cc

    })
})
})