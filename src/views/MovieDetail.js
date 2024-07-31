import { useParams } from "react-router-dom";
import NavbarMenu from "../components/layout/NavbarMenu";
import axios from "axios";
import { useEffect, useState } from "react";


function Detail() {

    const { id } = useParams();

    const [movieData, setMovieData] = useState({
        name: '',
        image: '',
        price: '',
        description: '',
        videoId: '',
        slug: '',
    });

    const getMovie = async () => {
        try {
            const movie = await axios.get(`http://localhost:3000/movies/${id}`)
            setMovieData(movie.data)
        } catch (error) {
            console.log('error get movie');
        }
    }

    useEffect(() => {
        getMovie()
    },[])


    return (  
        <>
            <NavbarMenu />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-40px', backgroundColor: '#121212' }}>
                <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${movieData.videoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </>
    );
}

export default Detail;