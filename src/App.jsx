import { useState } from 'react'
import NavBar from "./components/NavBar.jsx";
import './index.css'
import TaskListComponent from "./components/TaskListComponent.jsx";
import RightSide from "./components/RightSide/RightSide.jsx";
import { DateContext } from './contexts/DateContext.jsx'
import {convertDate} from "./helpers/helpers.jsx";
function App() {
  const [date, setDate] = useState(convertDate(new Date()));
  const setCurrentDate = (date) => {
      setDate(date);
  }
  return (
      <DateContext.Provider value={date}>
          <div className='grid grid-rows-10 h-screen bg-[#121212] raleway-font'>
              <div className='sidebar-wrapper rounded-lg row-span-1'>
                  <NavBar />
              </div>
              <div className='app-wrapper grid grid-cols-4 p-8 row-span-9'>
                  <div className='task-list-wrapper col-span-3 mr-2 px-1 bg-[#282828] rounded-lg !p-2'>
                      <TaskListComponent date={date}/>
                  </div>
                  <div className='task-list-wrapper col-span-1 px-1 bg-[#282828] rounded-lg !p-2'>
                      <RightSide onCalendarChange={setCurrentDate}/>
                  </div>
              </div>
          </div>
      </DateContext.Provider>
  )
}

export default App
