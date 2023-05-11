CAU TRUC NHANH
1. main
1.1. dev
1.1.1. authen - ThanhTB4
1.1.2. chat-box - DuyenTTM7
1.1.3. chuyen-bay - DucNH66
1.1.4. hanh-khach - DuyenTTM7
1.1.5. thanh-toan - DuyNT58
1.1.6. thong-ke - TiTT
1.1.7. user - TiTT, ThanhTB4
1.1.8. ve-may-bay - DuyNT58
# mọi người clone git về và check-out sang nhánh của mình để code
# Ví dụ thứ tự cú pháp: git checkout dev >> git checkout chuyen-bay
# CÁC LỆNH GIT CƠ BẢN:
- git branch: kiểm tra nhánh đang đứng
- git checkout -b @tennhanh: tạo một nhánh mới ở local và chuyển sang nhánh đó --- ví dụ: git checkout -b new-thanh-toan
- git add . : thêm tất cả các thư mục tại thư mục đang đứng vào local stage để commit
- git add @tenthumuc: chỉ thêm thư mục chỉ định vào local stage để commit -- ví dụ: git add style.css
- git status: kiểm tra những thư mục nào đã được add vào local stage ở nhánh đang đứng
- git commit -m "@message": commit những thứ đã được add vào stage trước đó -- ví dụ: git commit -m "DuyNT58 update create ve-may-bay"
- git push origin @tennhanh: push những thứ đã được commit lên nhánh cần push -- ví dụ: git push origin thanh-toan

#LƯU Ý QUAN TRỌNG: 
# VỀ PUSH GIT: 
1. mọi người khi push git chỉ push trong phạm vi folder "src", không push folder "node-modules" lên source git, các tệp khác nếu nằm ngoài node-modules mà cần push lên thì nhắn trực tiếp Duy hoặc Thành để nắm tình hình nha
2. Nhớ trước khi push thì pull về và fix conflict (nếu có) rồi mới push lại
# VỀ MERGE GIT: mọi người đẩy source code lên nhánh cá nhân của mình và tạo pull request để Duy hoặc Thành merge vào nhánh dev, khi nào hoàn thiện dự án mới tính đến merge vào main

