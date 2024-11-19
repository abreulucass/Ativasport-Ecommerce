import { useState } from 'react'
import { useParams } from 'react-router-dom';
import './EditProduct.css'
import { useEffect } from 'react';

export const EditProduct = () => {

    const { id } = useParams();

    const [image, setImage] = useState(false);
    let [productDatails, setProductDetails] = useState({})

    const fetchInfo = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/product/getproduct/${id}`);
            if (!res.ok) {
                console.error("Erro na requisição:", res.status, res.statusText);
                return;
            }
            const data = await res.json();
            console.log('Dados recebidos:', data);  // Verificar os dados recebidos
            setProductDetails(data[0]);
        } catch (error) {
            console.error('Erro ao buscar informações do produto:', error);
        }
    }

    useEffect(() => {
        console.log(id)
        console.log('chamando useEffect para fetchInfo');
        if (id) fetchInfo(id);
    }, [id]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({...productDatails, [e.target.name]: e.target.value})
    }

    const Edit_Product = async() => {
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
            await fetch(`http://localhost:8000/product/editproduct/${id}`,{
                method: 'PUT',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                data.success?alert("Produto Atualizado"):alert("Falhou")
            })
        }
    }

    

  return (
    
    <div className='add-product'>
        <h1>Editar Produto</h1>
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
                <img src={image?URL.createObjectURL(image):productDatails.image} className="addproduct-thumnail-img" alt="" />
                {/* <img src={image?URL.createObjectURL(image):upload_area} className="addproduct-thumnail-img" alt="" /> */}
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden/>
        </div>
        <button onClick={() => {Edit_Product()}} className='addproduct-btn'>Atualizar</button>
    </div>
  )
}
