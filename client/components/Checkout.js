import React from 'react'
import { Link } from 'react-router-dom'

const Checkout = (props) => {
  const states = [ 'AL','AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'HI', 'ID', 'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH', 'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY' ]

  //need handleCheckout function...where are we putting these?
  //also need handleEmailChange function
  return (
    <div id='checkout'>
      <h1>Checkout</h1>
      <form onSubmit={props.handleCheckout}>
        <div className="form-group">
          <label htmlFor="formName">Name</label>
          <input type="text" className="form-control" name="formName" placeholder="Enter full name" required />
        </div>
        <div className="form-group">
          <label htmlFor="formEmail">Email Address</label>
          <input onChange={props.handleEmailChange} type="email" className="form-control" name="formEmail" placeholder="Enter email" required />
        </div>
        <div className="form-group">
          <label htmlFor="formStreet">Street</label>
          <input type="text" className="form-control" name="formStreet" placeholder="Enter street address" required />
        </div>
        <div className="form-group">
          <label htmlFor="formCity">City</label>
          <input type="text" className="form-control" name="formCity" placeholder="Enter city" required />
        </div>
        <div className="form-group">
          <label htmlFor="formSelectState">State</label>
          <select className="form-control" name="formSelectState">{
            states.map(st => <option key={st}>{st}</option>)
          }
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="formZip">Zip Code</label>
          <input type="text" className="form-control" name="formZip" placeholder="Enter zip code" required />
        </div>
        <div className="form-group">
          <label htmlFor="formPhone">Phone Number</label>
          <input type="text" className="form-control" name="formPhone" placeholder="Enter phone number" required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )

}
export default Checkout
