import React, { useState } from "react";
import "../styles/Cadastrar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Cadastrar: React.FC = () => {
  const navigate = useNavigate();

  // Estado do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    senha: "",
    phone: "",
    address: "",
    residenceType: "",
  });

  // Atualiza os campos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Envia o cadastro
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/usuarios/cadastrar`,
        formData,
        { withCredentials: true }
      );

      if (response.status === 201 || response.status === 200) {
        alert("✅ Cadastro realizado com sucesso!");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      alert("❌ Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="cadastrar-page">
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo">
            <i className="fas fa-paw"></i>
            <Link to="/" className="logo-text">
              Pet<span className="highlight">Palace</span>
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/servicos">Serviços</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/reservar">Reservar</Link>
            <Link to="/login" className="btn">Entrar</Link>
          </nav>
        </div>
      </header>

      {/* Formulário */}
      <section className="form-section">
        <div className="form-container">
          <div className="form-left">
            <h2>Faça o seu cadastro</h2>
            <p>Preencha os dados ao lado para efetivar o seu cadastro</p>
            <div className="contact">
              <i className="fas fa-phone-alt"></i>
              <span>(11) 98765-4321</span>
            </div>
            <div className="contact">
              <i className="fas fa-envelope"></i>
              <span>reservas@petpalace.com</span>
            </div>
          </div>

          <div className="form-right">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Seu Nome</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} required />

              <label htmlFor="email">E-mail</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />

              <label htmlFor="senha">Senha</label>
              <input type="password" id="senha" value={formData.senha} onChange={handleChange} required />

              <label htmlFor="phone">Telefone</label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required />

              <label htmlFor="address">Endereço</label>
              <input type="text" id="address" value={formData.address} onChange={handleChange} required />

              <label htmlFor="residenceType">Tipo de residência</label>
              <select id="residenceType" value={formData.residenceType} onChange={handleChange} required>
                <option value="">Selecione</option>
                <option value="house">Casa</option>
                <option value="apartment">Apartamento</option>
                <option value="condominium">Condomínio</option>
              </select>

              <button type="submit" className="submit-btn">Cadastrar</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cadastrar;
