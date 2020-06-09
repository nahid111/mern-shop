import React, {Fragment, useState} from "react";

const Home = () => {
  const [modalFlag, setModlaFlag] = useState(false);

  const modalShow = () => {
    document.body.classList.add('is-clipped');
    setModlaFlag(true);
  }

  const modalHide = () => {
    document.body.classList.remove('is-clipped');
    setModlaFlag(false);
  }

  const modal = (
    <Fragment>
      <div id="modal" className={`modal ${modalFlag && 'is-active'}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <span className="has-text-light">Any other Bulma elements you want</span>
        </div>
        <button className="modal-close is-large" onClick={modalHide} aria-label="close"></button>
      </div>
    </Fragment>
  );


  return (
    <section className="section">
      <div className="container">
        <div className="block">
          <div className="block has-text-centered">
            <h1 className="title is-size-1 has-text-info">mern-shop</h1>
            <i className="fas fa-shopping-cart home-logo"  onClick={modalShow}></i>
          </div>
        </div>
      </div>
      {modalFlag && modal}
    </section>
  );
};

export default Home;
