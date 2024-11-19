import { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/Admin_Assets/upload_area.svg'

export const AddProduct = () => {

    const [image, setImage] = useState(false);
    const [productDatails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "feminino",
        price: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({...productDatails, [e.target.name]: e.target.value})
    }

    const Add_Product = async() => {
        console.log(productDatails)
        let responseData;
        let product = productDatails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:8000/upload', {
            method: 'POST',
            headers:{
                Accept: 'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data) => {responseData = data});

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:8000/product/addproduct',{
                method: 'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success?alert("Produto Adicionado"):alert("Falhou")
            })
        }
    }

  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Titulo do Produto</p>
            <input value={productDatails.name} onChange={changeHandler} type="text" name="name" placeholder="Digite aqui" />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Preço</p>
                <input value={productDatails.price} onChange={changeHandler} type="text" name="price" placeholder="Digite aqui" />
            </div>
            {/* <div className="addproduct-itemfield">
                <p>Preço Oferta</p>
                <input value={productDatails.new_price} onChange={changeHandler} type="text" name="new_price" id="Digite aqui" />
            </div> */}
        </div>
        <div className="addproduct-itemfield">
            <p>Categoria do Produto</p>
            <select value={productDatails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Infantil">Infantil</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" alt="" />
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={() => {Add_Product()}} className='addproduct-btn'>ADICIONAR</button>
    </div>
  )
}
