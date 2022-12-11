import {Routes,Route} from 'react-router-dom'
import Games from './games'
import Dashboard from './dashboard'
import Admin from './admin'
function Middle(){
    return(
    <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/games'>
            <Route index element={<Dashboard/>}/>
            <Route path=':id' element={<Games/>}/>
            <Route path=':category/:id' element={<Games/>}/>
        </Route>
        <Route path='/admin' element={<Admin/>}/>
        
    </Routes>
    )
}

export default Middle