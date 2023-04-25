import React from 'react'

function FormatDate(date:Date | string) {
  const date2 = date + ''
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  const arrayDate = date2.split('-')
  var number 

  if(parseInt(arrayDate[1]) < 10){
    number = arrayDate[1]
    number = parseInt(number[1]) -1
  }else{
    number = parseInt(arrayDate[1]) -1
  }
 
  const dateFormated = `${arrayDate[2]} de ${months[number]} de ${arrayDate[0]}` 

  return dateFormated
}

export default FormatDate