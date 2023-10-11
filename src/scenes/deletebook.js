import React, { Fragment, useEffect, useState } from 'react';
import '../styles/search.css'
import SearchIcon from '@mui/icons-material/Search';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useRef} from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


function DeleteBook() {
  const [searchValue, setSearchValue] = useState('')
  const [books, setBooks] = useState([])
  const ref = useRef(null);
  const nav = useNavigate()


  useEffect(() => {
    if (searchValue === '') {
      axios.get(`http://w22g7.int3306.freeddns.org/`).then(res => {
        console.log(res.data?.popular?.books);
        setBooks(res.data?.popular?.books);
      }).catch(() => {
        setBooks([])
      })
    } else {
      axios.get(`http://w22g7.int3306.freeddns.org/books/search?query=${searchValue}`).then(res => {
        setBooks(res.data)
      }).catch(() => {
        setBooks([])
      })
    }
  }, [searchValue])

  const readpopularBooks = async (e) => {
    console.log(e.currentTarget.id);
   const id = e.currentTarget.id
    console.log(ref.current.id);
    nav("/book/"+id) 
  }

  const toAuthor = async (e) => {
    console.log(e.currentTarget.id);
   const id = await e.currentTarget.id
    
    nav("/author/"+id) 
    }
    const DeleteBook = async(e) => {
        const id = await e.currentTarget.id
        axios.delete(`http://w22g7.int3306.freeddns.org/books?state=${localStorage.getItem('state')}&book_id=${id}`, {   
            headers: {
                "Access-Control-Allow-Origin": "*",
            
            "CORS_SUPPORTS_CREDENTIALS" : true 
              },
        })
          .then(function (response) {
            console.log(response.data);
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }
  
  const ratings = {
    position: "absolute",
    left: 0,
    bottom: 0,
    transform:" translateY(100%)",
    padding: "1rem",
    maxHeight:" 100%",
    transition: "transform 0.3s linear",
  }

  return (
    <div>
      <title>Tìm kiếm sách</title>

      <div id="wrapper">
        <div className="search-field">
          <input type="text" className="input is-medium" placeholder="Nhập tên sách hoặc tác giả..." onInput={e => setSearchValue(e.target.value)} />
          <div className="icon-margin">
            <SearchIcon sx={{ fontSize: 40 }} />
          </div>
        </div>

        <ul className="products">
          { books.map((book, key) => {
            return <li key={key}>
              <div className="product-item" ref={ref}  id ={book.book_id} onClick={DeleteBook} >
                <DeleteForeverIcon sx={{ fontSize: 40 }} />
                <div className="product-top">
                  
                  <a href className="product-thumb">
                    <img src={book.cover} alt="" />
                    
                    <div className="product-rating">
                            <Rating classes={ratings} value={book.current_rating} precision={1} />
                    </div>
                            {/* http://w22g7.int3306.freeddns.org/book/book_id */}
                         
                  </a>
                </div>
                
                <div className="product-info">
                  <a href className="product-name">{book.title}</a>
                  <a href className="product-author" id={Object.keys(book.authors[0])} onClick={toAuthor}>{Object.values(book.authors[0])}</a>
                </div>
              </div>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}
export default DeleteBook