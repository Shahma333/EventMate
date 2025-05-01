import { BrowserRouter as Router } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from "./Router/appRoutes";


function App() {

    
    return (

        
        <Router>
          <AppRoutes></AppRoutes>
        </Router>
    );
}

export default App;

