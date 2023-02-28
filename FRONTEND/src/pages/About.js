import React from 'react'
import { Container } from 'react-bootstrap'

const About = () => {
  return (
<Container id='contact' >
  <h2>About Section</h2>
  <div className="container">
    <div className="row">
      <div className="col-sm-12">
        <div className="special-heading">
          <h4>ENSAF : CREATION &amp; OBJECTIFS</h4>
        </div>
        <p /><h5>Création &amp; chiffres</h5><p />
        <ul className="checklist">
          <li>L'ENSA de Fès est une école d’Ingénieurs créée en 2005;</li>
          <li>1324 étudiants dont 723 élèves ingénieurs en 2021;</li>
          <li>217 diplômés en 2021.</li>
        </ul>
        <p /><h5>Diplômes: (DI, Masters, L, DUT, Doctorat)<p />
          <p /></h5><h5>Objectifs</h5><p />
        <ul className="checklist">
          <li>Formation des ingénieurs d’état (avec un cursus de Bac+5);</li>
          <li>Recherche Scientifique et Technique et R&amp;D.</li>
        </ul>
        <div className="special-heading">
          <h4>ENSAF : RESSOURCES HUMAINES &amp; MATERIELLES</h4>
        </div>
        <p /><h5>Personnels enseignants </h5><p />
        <ul className="checklist">
          <li>64 Enseignants Chercheurs </li>
          <li>2 Ingénieurs </li>
        </ul>
        <p /><h5>Personnels techniques et administratif </h5><p />
        <ul className="checklist">
          <li>23 Personnels administratifs </li>
          <li>3 Personnels techniques </li>
        </ul>
        <div className="special-heading">
          <h4>ETUDES à l’ENSA</h4>
        </div>
        <p /><h5>Admission à l'ENSA : Présélection + concours </h5><p />
        <ul className="checklist">
          <li>Organisation des études </li>
          <ol className="checklist">
            <li>Cinq ans (dix semestres)</li>
            <li>Cycle préparatoire Intégré : Deux ans (4 semestres)</li>
            <li>Cycle ingénieur: en 3 ans (six semestres). </li>
          </ol>
          <li>La formation à l’ENSA est dispensée sous forme d’enseignements théoriques, activités pratiques et Stages (Initiation 4s, Application 8s et PFE 16s). </li>
        </ul>
        <div className="special-heading">
          <h4>OFFRE DE FORMATION</h4>
        </div>
        <p /><h5>6 Filières Ingénieurs :</h5><p />
        <ul className="checklist">
          <li>Génie Industriel</li>
          <li>Génie Informatique</li>
          <li>Génie Télécommunication et Réseaux</li>
          <li>Génie Mécanique et Systèmes Automatisés</li>
          <li>Génie des Systèmes Embarqués et Informatique Industrielle</li>
          <li>Génie énergétique et systèmes intelligents</li>
        </ul>
        <p /><h5>2 Filières MASTER </h5><p />
        <ul className="checklist">
          <li>Master Internet des Objets et Systèmes Mobiles</li>
          <li>Architectures et Applications des Systèmes d'information</li>
        </ul>
        {/*<div class="special-heading">
					<h4>RECHERCHE</h4>
				</div>
				<p><h5>Adossement sur</h5></p>
				<ul class="checklist">
				<li>6 équipes de recherche</li>
				<li>Un laboratoire : Laboratoire d’Ingénierie, Systèmes et Applications (LISA) </li>
				<li>8 doctorants </li>
				</ul>
				<p><h5>Coopération</h5></p>
				<ul class="checklist">
				<li>Réseau RMEI</li>
				<li>Réseau des ENSA Maroc, Réseau des Universités arabes </li>
				<li>INSAs France</li>
				<li>Polytech Marseille, Université de Montpellier, Le Havre, Nantes, … </li>
				<li>Projet ERRASMUS MUNDUS</li>
				</ul>*/}
      </div>
    </div>
  </div>
<hr />
</Container>
  )
}

export default About