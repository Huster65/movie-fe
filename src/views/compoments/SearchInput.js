import React,{useState} from 'react'
import {TextField, InputAdornment, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'initial', // Màu viền khi chưa focus
        },
        '&:hover fieldset': {
          borderColor: 'initial', // Màu viền khi hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'initial', // Màu viền khi focus
        },
      },
    },
  });
const SearchInput = () => {
    const [search,setSearch] = useState('')
    const classes = useStyles();
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
      };
    const navigate = useNavigate()
    const handleSearchSubmit = async () =>{
      navigate({
        pathname: '/movies',
        search: `?search=${encodeURIComponent(search)}` // Thêm query params vào URL
    });
    }
  return (
    <Box sx ={{ paddingTop:4, display: 'flex', justifyContent: 'center',width: '100%' }}>
                <TextField
                    variant="outlined"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        ),
                    }}
                    sx={{ backgroundColor: 'white', 
                        borderRadius: 4,
                        width: 500,
                        marginRight: 4
                    }}
                    className={classes.root}
                />
                <Button className='btn-card' style={{ marginRight: 50, width: 100, borderRadius: 60, }} onClick={() => handleSearchSubmit()} >Tìm kiếm</Button>
            </Box>
  )
}

export default SearchInput