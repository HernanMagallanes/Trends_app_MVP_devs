import { Button } from "@tremor/react";
import { useNavigate } from "react-router-dom";
import './LandingPage.css'
import landingImage from '../../assets/imagenes/5278.png';

export default function LandingPage() {
  const navigate = useNavigate()

  const handlePage = (to) => {
    navigate(to)
  }

  return (
    <main>
      <article>
        <section>
          <h1>
           ¡Bienvenido a <strong>#TRENDS!</strong>
          </h1>
          <h2>Descubre una plataforma que te brinda acceso directo a profesionales avanzados dispuestos a compartir sus experiencias contigo.</h2>
          <p>Aprovecha esta oportunidad de conectarte con personas que te acompañarán en tu desarrollo personal y profesional. ¡Únete a nuestra comunidad!</p>
          <div>
            <Button variant="light" onClick={() => handlePage("/Trends_app_MVP/login")}>
              LOG IN
            </Button>
            <Button onClick={() => handlePage("/Trends_app_MVP/register")}>SIGN UP</Button>
          </div>
        </section>
        <section>
        <img src={landingImage} alt="Image Sketch" />
        </section>
      </article>
    </main>
  )
}






