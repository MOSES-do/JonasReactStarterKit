import data from '../data';
import { useMediaQuery } from './hooks/useMediaQuery';




//media query
const medQueryStyle = {
    container: (lg, md, sm, flexBase) => ({
        display: "flex",
        marginBottom: "20px",
        flexBasis: flexBase ? "100%" : "50%",
        paddingLeft: lg ? '70px' : md ? '20px' : sm ?
            '0' : ''
    }),
};

function Pizza() {

    const lg = useMediaQuery('(min-width: 715px)');
    const md = useMediaQuery('(min-width: 512px)');
    const sm = useMediaQuery('(min-width: 250px)');
    const flexBase = useMediaQuery('(max-width: 400px)');
    // const parse = data.filter((data) => data.name.includes('Spinaci'));


    const selection = data.map((ele, i) => {
        return (
            <div style={medQueryStyle.container(lg, md, sm, flexBase)} key={i}>
                <Display data={ele} />
            </div>
        )

    })


    const styles = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
        maxWidth: "80rem",
        margin: "0 auto",
    };
    return (
        <div>
            <div style={styles}
            >
                {data.length > 0 ?

                    (selection)
                    :
                    <p style={{ marginBottom: "30px" }}>Pizzas unavailable at the moment! Check back later</p>
                }
            </div>
        </div>
    )
}



const soldout = {
    color: '#888'
}

const Display = ({ data }) => {
    return (
        <div className={`${data.soldOut ? "sold-out" : ""}`} style={{ position: "relative", display: "flex", justifyContent: "center" }} >
            <div className="imgBox">
                <img className="img" src={data.photoName} alt="img" />
            </div>
            <div style={{ marginLeft: "10px" }}>
                <span>
                    <h4 style={{ fontSize: "1.2rem" }}>{data.name}</h4>
                    <p style={{ width: "80%" }}>{data.ingredients}</p>
                </span>
                <span style={{ position: "absolute", fontSize: "1.2rem", bottom: "5%" }}>
                    {data.soldOut ? 'soldout' : data.price}
                </span>
            </div>
        </div >
    )
}


export default Pizza;