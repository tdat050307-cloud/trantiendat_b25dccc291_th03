Redux Toolkit: danh sách sản phẩm (items, status, error) và giỏ hàng. Lý do là nhiều trang cùng đọc/ghi, sản phẩm tải API một lần rồi dùng chung, giỏ hàng có nhiều thao tác nên cần reducer tập trung. Tổng số lượng và tổng tiền là selector, không lưu thành state.
Context API: theme và user (cùng toggleTheme, login, logout). Đây là dữ liệu đơn giản, ít thay đổi, nhưng Header, route bảo vệ và nhiều trang cần dùng, nên Context là đủ.
useState: ô nhập tìm kiếm trong Header, form đăng nhập (username, password, error) và cờ ordered ở trang Thanh toán, vì chỉ một component dùng.
URL: từ khoá ?q=, số trang ?page=, :id và location.state.from. Header và HomePage ở hai component khác nhau cần dùng chung từ khoá, để trên URL thì không phải thêm Context hay Redux, F5 vẫn giữ nguyên kết quả.
Không lưu thành state: danh sách đã lọc, tổng số trang và các sản phẩm của trang hiện tại đều tính lại khi render. Hiệu ứng bay vào giỏ và thông báo thao tác trực tiếp trên DOM.
