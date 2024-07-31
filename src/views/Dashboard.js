import axios from "axios";
import NavbarMenu from "../components/layout/NavbarMenu";
import { PostContext } from "../contexts/PostContext";
import { useContext, useEffect, useState } from "react";
import MovieCard from "../components/card/Card";

function Dashboard() {
    
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
        <div>
            <NavbarMenu />
            <div className="dashboard">
                <div className="titleCard">
                    PHIM HAY
                </div>
                <div className="movieCardContainer">
                    {data.map((post, index) => (
                        <MovieCard key={index} name={post.name} img={post.image} price={post.price} id={post._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;