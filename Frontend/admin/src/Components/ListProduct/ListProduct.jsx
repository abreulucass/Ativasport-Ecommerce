import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './ListProduct.css'
import cross_icon from '../../assets/Admin_Assets/cross_icon.png'
import edit_icon from '../../assets/Admin_Assets/Edit_Button.png'


export const ListProduct = () => {

  const navigate = useNavigate();
  const [allproduct, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:8000/product/getproducts')
    .then((res) => res.json())
    .then((data) => {setAllProducts(data)})
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const remove_product = async(id) => {
    await fetch(`http://localhost:8000/product/removeproduct/${id}`, {
      method: "DELETE",
    })
    await fetchInfo();
  }

  const edit_product =  (id) => {
    navigate(`/editproduct/${id}`)
  }

  return (
    <div className='list-product'>
      <h1>Lista de Todos os Produtos</h1>
      <div className="listproduct-format-main">
        <p>Produtos</p>
        <p>Titulo</p>
        <p>Preço</p>
        <p>Categoria</p>
        <p>Remover</p>
        <p>Editar</p>
      </div>
      <div className="listproduct-allproduct">
        <hr />
        {allproduct.map((product, index) => {
          return <> <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>R${product.price}</p>
            <p>{product.category}</p>
            <img onClick={() => {remove_product(product.id)}} className='listproduct-remove-icon'src={cross_icon} />
            <img onClick={() => {edit_product(product.id)}} className='listproduct-edit-icon'src={edit_icon} />
          </div>
          <hr /> 
          </>
        })}
      </div>
    </div>
  )
}
