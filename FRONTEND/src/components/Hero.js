import React from 'react'
import { Carousel } from 'react-bootstrap';


const Hero = () => {
    
    return (
        <Carousel variant="dark">
          <Carousel.Item>
            <img
            style={{ 'maxHeight':'40rem','maxWidth':'90rem' }}
              className="d-block w-100 "
              src="https://www.infomaroc.net/wp-content/uploads/2021/09/LUniversite%CC%81-Sidi-Mohamed-Ben-Abdellah-de-Fe%CC%80s.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h1 className='fw-bold text-white'  >Université Sidi Mohamed Ben Abdellah </h1>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
                style={{ 'maxHeight':'40rem','maxWidth':'90rem' }}
              className="d-block w-100"
              src="https://www.ensaf.ac.ma/assets/images/ensa3.jpg"
              alt="Second slide"
            />
            <Carousel.Caption>
            <h1 className='fw-bold text-white'  >Université Sidi Mohamed Ben Abdellah </h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
                style={{ 'maxHeight':'40rem','maxWidth':'90rem' }}
              className="d-block w-100"
              src="https://asiaexchange.org/wp-content/uploads/2020/03/Hankuk-University-of-Foreign-Studies-Seoul-South-Korea-students.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
            <h1 className='fw-bold text-white'  >Université Sidi Mohamed Ben Abdellah </h1>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
}

export default Hero