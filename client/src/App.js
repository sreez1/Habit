import {LoginForm} from './pages/Login.js'
import {RegistrationForm} from './pages/Registration.js'
import {Home} from './pages/Home.js'
import {Layout} from "./pages/Layout.js";
import { NoPage } from './pages/NoPage.js';
import {Dashboard} from './pages/Dashboard.js'
import { HabitCreationForm } from "./pages/Creation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from './pages/DashboardLayout.js';
import { Edit } from './pages/Edit.js';

const App = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={(<Home />)} />
            <Route path="login" element={<LoginForm />} />
            <Route path="registration" element={<RegistrationForm />} />
            <Route path="" element={<NoPage/>} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={(<Dashboard />)} />
            <Route path="create" element={(<HabitCreationForm />)} />
            <Route path="edit/:habitId" element={(<Edit/>)} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
}
export default App;
