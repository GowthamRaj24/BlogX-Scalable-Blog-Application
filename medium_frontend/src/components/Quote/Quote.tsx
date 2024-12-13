import "./Qoute.css"

const Quote = () => {
    return(<>
        <div className="outer-quote">
            <div className="inner-quote">
                <div className="quote-title">
                    "Hi from quote component"
                </div>
                <div className="quote-description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas adipisci ab pariatur corrupti sint neque vel veritatis suscipit deleniti quae.
                </div>
            </div>
            <div className="quote-developer">
                <div className="image-developer">
                    Developed By:
                </div>
                <div className="description-developer">
                    Gowtham Raju
                </div>
            </div>
        </div>
    </>)
}


export default Quote;