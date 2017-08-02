import React from 'react'
import validator from 'email-validator'

export function theValidator (props) {
  let formNameValidation = null
  let formStreetValidation = null
  let formEmailValidation = null
  let formCityValidation = null
  let formZipValidation = null

  //Name
  if(props.name){
    if(props.name.length < 3){
      formNameValidation = 'error'
    }else{
      formNameValidation = 'success'
    }
  }
  //Street
  if(props.street){
    if(props.street.length < 3){
      formStreetValidation = 'error'
    }else{
      formStreetValidation = 'success'
    }
  }

  //email
  if(validator.validate(props.email)){
    formEmailValidation = 'success'
  }else{
    if(!props.email){
      formEmailValidation = null
    }else{
      formEmailValidation = 'error'
    }
  }
  //City
  if(props.city){
    if(props.city.length < 3){
      formCityValidation = 'error'
    }else{
      formCityValidation = 'success'
    }
  }

  //Zip
  if(props.zip){
    if(props.zip.length === 5){
      formZipValidation = 'success'
    }else{
      formZipValidation = 'error'
    }
  }

  return ({formNameValidation,formStreetValidation,formEmailValidation,formCityValidation,formZipValidation})
}

export function orderButton (first,street,email,city,zip){
  if(first !== 'success' || street !== 'success' || email !== 'success' || city !== 'success' || zip !== 'success'){
    return (
      <button disabled type="submit" className="btn btn-primary" >Submit</button>
    )
  }else{
    return(
      <button type="submit" className="btn btn-primary" >Submit</button>
    )
  }
}
