import { useEffect, useRef, useState } from 'react';
import { SpinnerCircularFixed } from 'spinners-react';

const TweetsCards = ({ tweets, onTweetCardClick }) => {
  const [show, setShow] = useState(false);
  const objRef = useRef(null);
  useEffect(() => {
    console.log({ objRef });
    window.twttr.widgets.load(objRef.current);
  }, [objRef]);
    
  useEffect(() => {
    const to = setTimeout(() => setShow(true), 4000);
    return () => clearTimeout(to)
  }, [])
  return (
    <div
      ref={objRef}
      style={{
        width: '100%',
        minWidth: '600px',
        height: show ? 'fit-content' : '350px',
        overflow: 'hidden',
        padding: '10px 0'
      }}
    >
      {!show && (
        <SpinnerCircularFixed
          size={125}
          speed={200}
          color='#a3bcb6'
          secondaryColor='#DADED4'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        />
      )}
      <div
        style={{
          opacity: show ? 1 : 0,
          pointerEvents: show ? 'all' : 'none',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} onCardClick={onTweetCardClick} />
        ))}
      </div>
    </div>
  );
};

export const Tweet = ({ id, html, url, onCardClick }) => {
  const refObj = useRef(null);
    return (
      <div style={{ width: '50%', marginBottom: '30px' }}>
        <div
          style={{
            margin: 'auto',
            width: '250px',
            position: 'relative',
            cursor: 'pointer',
          }}
          className='tweet-wrap'
        >
          <div
            onClick={() => onCardClick(id, url)}
            style={{
              position: 'absolute',
              width: '100%',
              height: refObj?.current?.clientHeight ?? '100%',
            }}
          ></div>
          <div ref={refObj} dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      </div>
    );
};

export default TweetsCards;
