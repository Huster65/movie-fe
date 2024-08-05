import Footer from "../components/layout/Footer";
import NavbarMenu from "../components/layout/NavbarMenu";

function UserBank() {
    const accountNumber = '1234567890';
  const accountName = 'Hoang Minh Nhat';
  const qrCodeImageUrl = 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'; // URL của ảnh QR code của bạn

  return (
    <>
        <NavbarMenu />
        <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
        <h2>Nạp Tiền</h2>
        <div style={{ marginBottom: '20px' }}>
            <img src={qrCodeImageUrl} alt="QR Code" style={{ width: '200px', height: '200px' }} />
        </div>
        <div>
            <p><strong>Số tài khoản:</strong> {accountNumber}</p>
            <p><strong>Tên người nhận:</strong> {accountName}</p>
            <p><strong>Cú pháp:</strong> Phimmoi + Tên người dùng</p>
        </div>
        </div>
        <Footer />
    </>
    
  );
};

export default UserBank;