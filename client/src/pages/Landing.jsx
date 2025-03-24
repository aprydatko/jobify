import { Link } from "react-router-dom"
import { Logo } from "../components"
import Wrapper from "../assets/wrappers/LandingPage"
import main from "../assets/images/main.svg"

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            I'm baby bushwick iPhone man bun beard, irony copper mug keytar
            bespoke poke live-edge banjo hexagon. Fit raw denim vibecession,
            pitchfork authentic cronut roof party vape gorpcore, fashion axe
            quinoa chartreuse you probably haven't heard of them actually
            listicle vexillologist.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn ">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing
