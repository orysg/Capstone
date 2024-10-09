'use client';
import ChartsExample5 from '../components/Chart'
import DefaultSidebar from '../components/Sidebar';
import DatePicker from '../components/Date'

function History(){
    return(
        <> 
            <DefaultSidebar />
                <div className="w-full max-w-8xl mx-auto "> 
                    <DatePicker />
                    <ChartsExample5 />
                </div>
        </>
    )
}
export default History;