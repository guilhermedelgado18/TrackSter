import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Cardlista from './Componentes/Card Lista/Cardlista';
import Banner from './Componentes/Banner/Banner';
import BotaoAdicionar from './Componentes/Botão Adicionar/Botaoadicionar';
import ModalLista from './Componentes/Modal Criar Lista/Modallista';
import ModalExcluirLista from './Componentes/Modal Excluir Lista/Modalexcluilista';
import Lista from './Páginas/Lista';

function App() {
  
  const [showModal, setShowModal] = useState(false);
  const [cardParaExcluir, setCardParaExcluir] = useState(null);

  const [cards, setCards] = useState(() => {
    const saved = localStorage.getItem("listas");
    return saved ? JSON.parse(saved) : [];
  });

  const handleDelete = (id) => {
    const updated = cards.filter((card) => card.id !== id);
    setCards(updated);
    localStorage.setItem("listas", JSON.stringify(updated));
  };

  const handleAdd = (novaLista) => {
    const updated = [...cards, novaLista];
    setCards(updated);
    localStorage.setItem("listas", JSON.stringify(updated));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="p-0">
          <Banner />
          <div className="container-fluid">
            <BotaoAdicionar onClick={() => setShowModal(true)}/>
            <ModalLista
              show={showModal}
              onClose={() => setShowModal(false)}
              onAdd={(novaLista) => {
                setCards([...cards, novaLista]);
                localStorage.setItem('listas', JSON.stringify([...cards, novaLista]));
                setShowModal(false);
              }}
            />
    
          <ModalExcluirLista
            show={!!cardParaExcluir}
            onCancel={() => setCardParaExcluir(null)}
            onConfirm={() => {
              const updated = cards.filter(card => card.id !== cardParaExcluir);
              setCards(updated);
              localStorage.setItem('listas', JSON.stringify(updated));
              setCardParaExcluir(null);
            }}
          />
    
    
            <div className="row g-4" id="listaCards">
              {cards.map((card) => (
                <div key={card.id} className="col-6 col-md-4 col-lg-3 col-xxl-2">
                  <Cardlista key={card.id} {...card} onSolicitarExclusao={setCardParaExcluir} />
                </div>
              ))}
            </div>
          </div>
        </div>
        }/>
        <Route path="/lista/:id" element={<Lista/>}/>
      </Routes>
    </Router>
    
  );
};

export default App;
