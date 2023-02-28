
  import React from 'react'
  const Footer = () => {
  return (
  <footer className=" p-5" style={{    'display':'block', 'background': '#1b1d1f', 'color': '#bfbfbf' }}>
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-3">
          {/* Text widget*/}
          <aside className="widget widget_text">
            <div className="widget-title">
              <h5>ensaf.ac.ma</h5>
            </div>
            <div className="textwidget">
              <i className="fa fa-caret-right" aria-hidden="true" /> <a href="?controller=pages&action=home">Acceuil</a><br />

            </div>
          </aside>
        </div>
        <div className="col-md-6 col-lg-3">
          {/* Text widget*/}
          <aside className="widget widget_text">
            <div className="widget-title">
              <h5>ENSAF</h5>
            </div>
            <div className="textwidget">
              {/*<p><img src="assets/images/logo-light.png" width="100" alt=""></p>*/}
              <p>L'ENSA de Fès, composante de l’Université Sidi Mohamed Ben Abdellah, est une école d’ingénieurs de l'enseignement supérieur publique créée en 2005, assurant une formation des ingénieurs d’état avec un cursus de Bac+5.</p>
            </div></aside>
        </div>
        <div className="col-md-6 col-lg-3">
          {/* Text widget*/}
          <aside className="widget widget_text widget_tag_cloud">
            <div className="widget-title">
              <h5>Direct</h5>
            </div>
            <div className="textwidget">
              E-mail: <a href="mailto:webmaster@ensaf.ac.ma">webmaster@ensaf.ac.ma</a> <br />
              Phone: +212535600403 <br />
              Fax: +212535600386 <br />
            </div>
            <div className="tagcloud"><a className="m-t-20" href="">Nous contacter</a></div>
          </aside>
        </div>
        <div className="col-md-6 col-lg-3">
          {/* Tags widget*/}
          <aside className="widget widget_tag_cloud">
            <div className="widget-title">
              <h5>Adresse</h5>
            </div>
            <div className="textwidget counter">
              Ecole Nationale des Sciences Appliquées, Avenue My Abdallah Km 5<br />Route d'Imouzzer, Fès BP 72.<br />
             
            </div>

          </aside>
        </div>
      </div>
    </div>
    <hr />
    <div className="footer-copyright">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="text-center"><span className="copyright">© 2023 ENSAF, Copyright ensaf.ac.ma</span></div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
  }
  export default Footer

