import { useIterativeContext } from '../context/IterativeContext';
import '../css/footer.css';

const Footer = () => {
    const { setFurnitureByViewport } = useIterativeContext();

    const showFirstDataMap = () => {
        setFurnitureByViewport("first");
    };

    const showSecondDataMap = () => {
        setFurnitureByViewport("second");
    };

    return (
        <footer className='footerBackground'>
            <div className="line-footer">
                <div className="animation-div1"></div>
                <div className="animation-div-2"></div>
            </div>
            <div className='flex-footer'>
                <button className="footer-button" onClick={showFirstDataMap}>
                    <div className="flex-button">
                        <div className='flex-number'>
                            01
                        </div>
                        <div className='flex-name'>
                            lalalalla
                        </div>
                    </div>
                </button>
                <button className="footer-button" onClick={showSecondDataMap}>
                <div className="flex-button">
                        <div className='flex-number'>
                            01
                        </div>
                        <div className='flex-name'>
                            lalalalla
                        </div>
                    </div>
                </button>
            </div>
        </footer>
    );
};

export default Footer;
