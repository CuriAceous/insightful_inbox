import { Routes, Route, Link, Router } from 'react-router-dom';
import Header from "./header"
import Writer from "./write"
import Tracker from "./tracker"
export default function Routing(props){
    return <div>
        <Header></Header>
        <Routes>
            <Route path='/' element={<Writer/>}/>
            <Route path='/tracker' element={<Tracker/>}/>
        </Routes>
    </div>
}