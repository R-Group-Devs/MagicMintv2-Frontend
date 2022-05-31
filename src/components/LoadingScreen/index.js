import logo from '../../assets/images/logo_full_color.png';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '600px',
            height: 'auto',
          }}
        >
          <img src={logo} style={{ width: '100%', }} />
        </div>
        <div
          style={{
            width: '100px',
            height: '75px',
            marginTop: '15px'
          }}
        >
          <img src={'/mmm.png'} style={{ width: '100%', height: '100%' }} className='spin-img'/>
        </div>
      </div>
    );
};

export default LoadingScreen;