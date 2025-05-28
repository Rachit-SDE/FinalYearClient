import './MyPaments.css'
import React from 'react'



const  MyPaments = () => {
       return(
        <div className="payment">
           <div className='innerPayment'>
             <div className='top'>
                <p className='username'>User ID: rs3501194@gmail.com</p>
                <p> Date : 14/05/2025</p>
             </div>
             <div className='middle'>
                <p className='heading'><strong>Transaction ID :</strong> 1362789258319427</p>
                <p className='heading'><strong>Amount :</strong> 300 rs</p>
             </div>
             <div className='bottom'>
                <p className='heading'><strong>Method :</strong> : Card </p>
                <p className='heading' ><strong>Status :</strong> : <span className='status'>Success</span></p>
             </div>
           </div>
           <div className='innerPayment'>
             <div className='top'>
                <p className='username'>User ID: rs3501194@gmail.com</p>
                <p> Date : 14/05/2025</p>
             </div>
             <div className='middle'>
                <p className='heading'><strong>Transaction ID :</strong> 1362789258319427</p>
                <p className='heading'><strong>Amount :</strong> 300 rs</p>
             </div>
             <div className='bottom'>
                <p className='heading'><strong>Method :</strong> : UPI </p>
                <p className='heading' ><strong>Status :</strong> : <span className='status'>Success</span></p>
             </div>
           </div>
           <div className='innerPayment'>
             <div className='top'>
                <p className='username'>User ID: rs3501194@gmail.com</p>
                <p> Date : 14/05/2025</p>
             </div>
             <div className='middle'>
                <p className='heading'><strong>Transaction ID :</strong> 1362789258319427</p>
                <p className='heading'><strong>Amount :</strong> 300 rs</p>
             </div>
             <div className='bottom'>
                <p className='heading'><strong>Method :</strong> : Card </p>
                <p className='heading' ><strong>Status :</strong> : <span className='status2'>Failed</span></p>
             </div>
           </div>
           <div className='innerPayment'>
             <div className='top'>
                <p className='username'>User ID: rs3501194@gmail.com</p>
                <p> Date : 14/05/2025</p>
             </div>
             <div className='middle'>
                <p className='heading'><strong>Transaction ID :</strong> 1362789258319427</p>
                <p className='heading'><strong>Amount :</strong> 300 rs</p>
             </div>
             <div className='bottom'>
                <p className='heading'><strong>Method :</strong> : UPI </p>
                <p className='heading' ><strong>Status :</strong> : <span className='status3'>Pending</span></p>
             </div>
           </div>
        </div>
       )
}
export default MyPaments