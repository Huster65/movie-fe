import { useEffect, useState } from "react";
import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import MovieCard from "../components/card/Card";
import Footer from "../components/layout/Footer";

function NewMovies() {

    const [data, setData] = useState([])

    useEffect(() => {
       getPosts() 
    },[])

    const getPosts = async () => {
        try {
            const posts = await axios.get('http://localhost:3000/movies/posts')
            setData(posts.data.posts)
            console.log('data', data);
        } catch (error) {
            console.log('error get post');
        }
    }

    return (  
        <>
        <NavbarMenu />
        <div className="dashboard">
                <div className="titleCard">
                    PHIM MỚI
                </div>
                <div className="movieCardContainer">
                {data
                    .filter(post => post.type === 'newmovie')
                    .map((post, index) => (
                    <MovieCard key={index} name={post.name} img={post.image} price={post.price} id={post._id} />
                ))}
                </div>

        </div>
        <div>
            <Footer />
        </div>
        </>
    );
}

export default NewMovies;