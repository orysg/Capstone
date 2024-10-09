'use client';
import ChartsExample5 from '../components/Chart'
import DatePicker from '../components/Date'

function History(){
    return(
        <> 
                <div className="w-full max-w-8xl mx-auto "> 
                    <DatePicker />
                    <ChartsExample5 />
                </div>
        </>
    )
}
export default History;