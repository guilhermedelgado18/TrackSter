import React, { useState } from 'react';

const ModalLista = ({ show, onClose, onAdd }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagem, setImagem] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = () => {
      const novaLista = {
        id: Date.now(),
        titulo,
        descricao,
        imagem: imagem ? reader.result : null,
      };

      onAdd(novaLista);
      setTitulo('');
      setDescricao('');
      setImagem(null);
    };

    if (imagem) {
      reader.readAsDataURL(imagem);
    } else {
      reader.onloadend();
    }
  };

  return (
    <>
      {/* Modal */}
      <div
        className={`modal fade ${show ? 'show d-block' : 'd-none'}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Nova Lista</h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="titulo" className="form-label">
                  Título
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="titulo"
                  maxLength="50"
                  required
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descricao" className="form-label">
                  Descrição
                </label>
                <textarea
                  id="descricao"
                  className="form-control"
                  maxLength="150"
                  style={{ height: '6.25rem', resize: 'none' }}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="text-end text-muted mt-1" style={{ fontSize: '0.875rem' }}>
                {descricao.length}/150
              </div>
              <div className="mb-3">
                <label htmlFor="imagem" className="form-label">
                  Imagem
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="imagem"
                  accept="image/*"
                  onChange={(e) => setImagem(e.target.files[0])}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none' }}
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Backdrop manual (opcional se quiser reforçar) */}
      {show && (
        <div
          className="modal-backdrop fade show"
          style={{ zIndex: 1040 }}
          onClick={onClose}
        ></div>
      )}
    </>
  );
};

export default ModalLista;
