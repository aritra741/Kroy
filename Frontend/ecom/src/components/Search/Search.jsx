import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { PageContainer } from "../pageContainer";
import { Navbar } from "../navbar";
import { TopSection } from "../../containers/HomePage/topSection";

function Search({ location }) {

    const [products, setproducts] = useState([])
    const [query, setquery] = useState("")
    
    const params = new URLSearchParams(location.search)
    const q = params.get('query')
    
    useEffect(() => {
        
        async function fetchProducts() {
            const { data } = await axios.get('http://127.0.0.1:8000/store/products')
            
            setproducts(data)
            console.log(data)

            // var data2 = {"username": "bob_baker","secret": "secret-123-jBj02","email": "b_baker@mail.com","first_name": "Bob","last_name": "Baker","custom_json": { "fav_game": "Candy Crush", "high_score": 2002 }};

            var config2 = {
                headers: {
                    'PRIVATE-KEY': '{{dbab5f23-8b77-4ffc-b8c6-6d2894ef1ea0}}'
                }
            };

            // const { data2 } = await axios.post(
            //     'https://api.chatengine.io/users/',
            //     {
            //       'username': 'test',
            //       'secret': '123456'
            //     },
            //     config2)

            // console.log()
        }

        fetchProducts()
        setquery(q)
        console.log(q)
    },[q])

    const listItems5 = products.filter(
        (val)=>{
            console.log(val.title.toLowerCase())
            if(query=="")
                return val;
            if( val.title.toLowerCase().includes(query.toLowerCase()) )
                return val;
        }
    ).map((item) => {
        

            return (
                <Link to={`/products/${item.id}`} >
                    <div className="card" key={item.id}>

                        <div className="card_img">
                            <img src={'http://127.0.0.1:8000' + item.image} />
                        </div>
                        <div className="card_header">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.budget}<span></span></p>
                            <div className="btn">Show Details</div>
                        </div>
                    </div>
                </Link>
            )
    }

    );

    return (
        <PageContainer>
            
                <Navbar />
 
            <div className='container'>
                
                {/* <Slider {...settings}> */}
                {/* <div><h1>
                    <FontAwesomeIcon icon={faSort} color="#fff"></FontAwesomeIcon>
                    <Dropdown options={options} onChange={()=>{}} value={defaultOption} placeholder="Select an option" />;
                    </h1></div> */}
                <div className="main_content">
                    {listItems5}
                </div>
                </div>
                </PageContainer>
    )
}

export default Search;