import React, {Component} from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { singleProduct,  makeOrderId, addToOrder} from '../store'

class SingleProduct extends Component {

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  render() {

    const product = this.props.product

    return (
      <div id='single-product'>
        <img className='single-product-image' src={`${product.image}`} />
        <h1>
          {product.title}
        </h1>
        <h4>
          {product.description}
        </h4>
        <table className='text-center'>
          <tbody>
            <tr>
              <td>
                <h3>${product.price / 100}</h3>
              </td>
              <td>
                {/* glyphicon glyphicon-shopping-cart */}
                <button
                  className='btn btn-info'
                  value={product.id}
                  data-name={product.title}
                  data-id={product.id}
                  onClick={this.props.handleOnClick}>
                  Add To Cart
                </button>
              </td>
              <td className='quantity'>
                <label>Qty</label>
                <select id={product.id}>
                  {
                    [1, 2, 3, 4, 5, 6, 7, 8].map(num => {
                      return <option key={num}>{num}</option>
                    })
                  }
                </select>
              </td>
            </tr>
            {/* <tr className='prod-reviews'>REVIEWS HERE</tr> */}
          </tbody>
        </table>

      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
  }
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    fetchSingleProduct(id) {
      dispatch(singleProduct(id))
    },
    handleOnClick(event){
      event.preventDefault()
      if(confirm(`Please confirm addition of ${event.target.dataset.name}`)){
        dispatch(makeOrderId())
          .then(()=>{
            dispatch(addToOrder())
            ownProps.history.push('/orderdetail')
          })
      }
    }

  }
}


const SingleProductContainer = connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

export default SingleProductContainer
