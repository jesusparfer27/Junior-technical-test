// import { useState } from 'react';

// const [colorLogo, setColorLogo] = useState('black');

// const handleChangeLogo = (e) => {
//     if (e.target.className === 'headerLogo') {
//         setColorLogo("white")
//     }
// };

const Header = () => {
    return (
        <header>
            <div className="headerFlex">
                <h2 className="headerLogo">Logo</h2>
                <button>Pulsa</button>
            </div>
        </header>
    )
}

export default Header