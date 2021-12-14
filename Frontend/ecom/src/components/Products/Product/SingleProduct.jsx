import React, {useState, useEffect} from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import axios from 'axios'
import {useParams} from 'react-router-dom'
import BidPopUp from "../../accountBox/BidPopUp";
import {Button} from "../../../components/button"
import {Navbar} from "../../../components/navbar"
import UpdateProductPropup from "../../accountBox/UpdateProductPropup";
import UpdateProductForm from "../../accountBox/UpdateProductForm";
import MTable from "./MTable";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from "react-router-dom";
const Container = styled.div``;

toast.configure()

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const qwerty = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #f8f4f4;
  }
`;

const styles = (theme) => ({
  root: {
    minWidth: 120,
    maxheight: 5,
    marginTop: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  listItem: {
    marginTop: "8px",
    float: "left",
  },
  img: {
    marginTop: "2px",
    height: "40px",
    width: "40px",
    float: "left",
  },
  heading: {
    marginTop: "8px",
    float: "left",
    fontSize: "15px"
  },
  collapse:{
    marginTop: "10px",
    float: "right",
  },
  spaceTitle: {
    overflow: "hidden",
  },
  plusSign: {
    float: "right",
  },
  itemRow: {
    overflow: "hidden",
  },
  addButton: {
    backgroundColor: "#3174AD",
    color: "white",
    marginLeft: "18px",
    fontSize: "12px",
  },
  mainTitle :{
    marginLeft: "20px"
  }
});
function SingleProduct(){

  const history= useHistory()
  const {id}= useParams()
  const userID= localStorage.getItem('user')
  const [product, setproduct] = useState([])
  const [BidPopUpOpen, setBidPopUpOpen] = useState(false)
  const [ProductPopUpOpen, setProductPopUpOpen] = useState(false)
  const [deletePopupOpen, setDeletePopupOpen]= useState(false)

  useEffect(() => {

      console.log("item ")
      console.log(id)
      
      async function fetchProduct(){
          const {data}= await axios.get(`http://127.0.0.1:8000/store/products/${id}`)
          setproduct(data)
      }

      fetchProduct()
  }, [])

  async function handleDelete(e)
  {
    e.preventDefault()
    const {data}= await axios.delete(`http://127.0.0.1:8000/store/products/${id}`)
    history.push("../myproducts")
  }

  function onclose() {

    if( BidPopUpOpen==true )
    {
      toast.success("Bid added successfully", {position:toast.POSITION.TOP_CENTER})
    }

    setBidPopUpOpen(false)
    setProductPopUpOpen(false)
    setDeletePopupOpen(false)
  }

  return (
      
    <Container>
       <Navbar/>
      <Wrapper>
        <ImgContainer>
          <Image src={'http://127.0.0.1:8000'+product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.description}
          </Desc>
          <Price>{product.budget}</Price>
          <div></div>
          <Price>
          { userID!=product.customer && (
            <div onClick={() => {
              console.log("clicked");
             setBidPopUpOpen(true);
             console.log(BidPopUpOpen);
            }}>
              <Button>
              Bid for this item
            </Button>
            </div>
          ) }
          </Price>
          { userID==product.customer &&
          <div onClick={() => {
            console.log("clicked");
           setProductPopUpOpen(true);
          }}>
          <Button>
              Update
            </Button>
            </div>
             }
            { userID==product.customer && 
            <div onClick={() => {
              console.log("clicked");
             setDeletePopupOpen(true);
            }} >
              <Button>
              Delete
            </Button>
            </div> }
        </InfoContainer>
        { userID==product.customer && <MTable id={id} /> }
          
      </Wrapper>

      <BidPopUp
          open={BidPopUpOpen}
          onClose= {onclose}
          productID= {id} />
      <UpdateProductPropup
          open={ProductPopUpOpen}
          onClose= {onclose}
          productID= {id}
          nowProduct= {product}
          />
      <Dialog
        open={deletePopupOpen}
        onClose={onclose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete this product?
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={onclose} autoFocus>
            No
          </button>
        </DialogActions>
      </Dialog>
      
    </Container>
  );
};

export default SingleProduct;