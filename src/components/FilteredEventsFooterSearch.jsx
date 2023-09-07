import React from 'react'
import { Link } from 'react-router-dom';

export default function FilteredEventsFooterSearch() {


    



  return (


    <div >
    
    <Link to="/events/tecnológico" ><button> tecnológico</button></Link>
    <Link to="/events/medicina" ><button>medicina</button></Link>
    <Link to="/events/ciencia" ><button>ciencia</button></Link>
    <Link to="/events/gastronómico" ><button> gastronómico</button></Link>
    <Link to="/events/ocio" ><button>ocio</button></Link>
    <Link to="/events/Otro" ><button>Otro</button></Link>
        {/* <option value="todos">todos</option>
        <option value="Otro">Otro</option>
        <option value="tecnológico">tecnológico</option>
        <option value="medicina">medicina</option>
        <option value="ciencia">ciencia</option>
        <option value="gastronómico">gastronómico</option>
        <option value="ocio">ocio</option>
      */}

   
  </div>


  )
}
