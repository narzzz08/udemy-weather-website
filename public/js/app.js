fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const loc = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const search = loc.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`/weather?address=${search}`).then((response)=>{
    response.json().then((data)=>{
        let m1='',m2=''
      if(data.error){
            console.log(data.error)
            m1 = data.error
            m2 = ''
      } else{
            console.log(data.location)
            console.log(data.forecast)
            m1 = data.location
            m2 = data.forecast
      }

      messageOne.textContent = m1
      messageTwo.textContent = m2

    })
})
})