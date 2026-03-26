import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link className="flex items-center gap-2 mb-6" to="/">
              <div className="bg-primary text-white p-1 rounded">
                <span className="material-symbols-outlined block text-[18px]">temp_preferences_custom</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-primary">HireMind</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Giải pháp tuyển dụng thông minh hàng đầu cho các doanh nghiệp công nghệ tại Việt Nam.
            </p>
            <div className="flex gap-4">
              <a className="size-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="https://hiremind.vn">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a className="size-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-colors" href="mailto:contact@hiremind.vn">
                <span className="material-symbols-outlined text-[18px]">alternate_email</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Sản phẩm</h4>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/features">Tính năng</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/pricing">Bảng giá</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/integrations">Tích hợp</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/ecosystem">Hệ sinh thái</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Về chúng tôi</h4>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/about">Giới thiệu</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/careers">Tuyển dụng</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/blog">Blog</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/contact">Liên hệ</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-slate-900">Hỗ trợ</h4>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/help">Trung tâm hỗ trợ</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/terms">Điều khoản dịch vụ</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/privacy">Chính sách bảo mật</Link>
            <Link className="text-sm text-slate-500 hover:text-primary transition-colors" to="/cookies">Cookie Policy</Link>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-400">
            © 2024 HireMind Recruitment Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">language</span> Tiếng Việt (VN)
            </span>
            <span className="text-xs text-slate-400">Powered by HireMind AI Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
