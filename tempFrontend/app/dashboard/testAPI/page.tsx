import TestAPI from "../../components/TestAPI"
function testAPIPage(){
    return(
        <section className="container mx-auto py-20 px-8">
            <div className="flex justify-between md:items-center">
                <TestAPI />
            </div>
        </section>
    );
}
export default testAPIPage;