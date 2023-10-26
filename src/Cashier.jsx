import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Cashier.css'


function Header() {
    const [currentView, setCurrentView] = useState("");
    const order_buttons = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const buttonLabel = `Button ${i * 5 + j + 1}`;
            order_buttons.push(
                <button key={i * 5 + j + 1} className='grid-button'>
                    {buttonLabel}
                </button>
            );
        }
    }
    const ViewOrdersClick = () => {
        setCurrentView('viewOrders');
    };

    const PlaceOrdersClick = () => {
        setCurrentView('placeOrders');
    };

    return (
        <body>
            <nav className='header'>
                <div className='sharetea_header'>
                    ShareTea
                </div>
                <ul className='links'>
                    <li onClick={ViewOrdersClick}> View Orders</li>
                    <li onClick={PlaceOrdersClick}>Place Orders</li>
                    <li>Log Out</li>
                </ul>
            </nav>
            <div className='placeorders_page'>
                <div className='place_left_side'>
                    <h1 className='menu-title'>Menu Items</h1>
                    <div className='grid-container'>
                        {order_buttons}
                    </div>
                </div>
                <div className='place_right_side'>
                    <h1>Heading</h1>
                </div>
            </div>
        </body>

    );

}

function ViewOrders() {

}
function PlaceOrders() {
    const order_buttons = [];
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            const buttonLabel = `Button ${i * 5 + j + 1}`;
            order_buttons.push(
                <button key={i * 5 + j + 1} className='grid-button'>
                    {buttonLabel}
                </button>
            );
        }
    }

    return (
        <div className='placeorders_page'>
            <div className='place_left_side'>
                <h1>Menu Items</h1>
                {order_buttons} {/* Use order_buttons instead of buttons */}
            </div>
        </div>
    );
}

function Cashier() {
    // const [count, setCount] = useState(0)

    // return (
    //     <>
    //         <div>
    //             <a href="https://vitejs.dev" target="_blank">
    //                 <img src={viteLogo} className="logo" alt="Vite logo" />
    //             </a>
    //             <a href="https://react.dev" target="_blank">
    //                 <img src={reactLogo} className="logo react" alt="React logo" />
    //             </a>
    //         </div>
    //         <h1>Vite + React</h1>
    //         <div className="card">
    //             <button onClick={() => setCount((count) => count + 1)}>
    //                 count is {count}
    //             </button>
    //             <p>
    //                 Edit <code>src/App.jsx</code> and save to test HMR
    //             </p>
    //         </div>
    //         <p className="read-the-docs">
    //             Click on the Vite and React logos to learn more
    //         </p>
    //     </>
    // )
}

export default Cashier
export { Header }