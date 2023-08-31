import { Link, useNavigate } from "react-router-dom"

import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

export default function Navbar() {

   return (
    <div>
      <nav>
      <Link to="/"><button>Home</button></Link>
      <Link to="/signup"><button>signup</button></Link>
      <Link to="/login"><button>login</button></Link>
    
    </nav>
    </div>
  )
}
