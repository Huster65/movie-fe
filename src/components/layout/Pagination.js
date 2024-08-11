import { Pagination as PaginationMui } from "@mui/material";

const Pagination = (props) => {
  const { totalPage, currentPage, handleChangePage, admin } = props;
  
  return (
    <div style={{ marginTop: 40, width:'100%',display: 'flex', 'justifyContent': 'center' }}>
      <PaginationMui
        defaultPage={currentPage || 1}
        count={totalPage}
        variant="outlined"
        shape="rounded"
        onChange={(e, value) => {
          if (handleChangePage) {
            handleChangePage(value);
          }
          console.log(value, "value");
        }}
        style={{ backgroundColor: 'none', width: 400, borderColor: admin ? 'black' : 'white', color: admin ? 'black' : 'white' }}
        sx={{
            '& .MuiPaginationItem-root': {
              color: admin ? 'black' : 'white', // Màu chữ của các item
              borderColor: 'white', // Màu border của các item
            },
            '& .Mui-selected': {
              backgroundColor: admin ? 'black' : 'blue', // Màu nền khi được chọn
              color: admin ? 'black' : 'white', // Màu chữ khi được chọn
            },
            '& .MuiPaginationItem-ellipsis': {
              color: admin ? 'black' : 'white', // Màu của dấu "..."
            },
          }}
      />
    </div>
  );
};

export default Pagination;
